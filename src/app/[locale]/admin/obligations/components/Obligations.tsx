// Copyright (c) Helio Chissini de Castro, 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import { Embedded, Obligation } from '@/object-types'
import { CommonUtils } from '@/utils'
import { SW360_API_URL } from '@/utils/env'
import { signOut, useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { PageButtonHeader, QuickFilter, Table, _ } from 'next-sw360'
import { useSearchParams } from 'next/navigation'
import React, { ReactNode, useState } from 'react'
import { OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap'
import { FaClipboard, FaPencilAlt, FaTrashAlt } from 'react-icons/fa'
import { MdOutlineTask } from 'react-icons/md'
import DeleteObligationDialog from './DeleteObligationDialog'

const levels = {
    COMPONENT_OBLIGATION: 'Component Obligation',
    ORGANISATION_OBLIGATION: 'Organisation Obligation',
    PROJECT_OBLIGATION: 'Project Obligation',
    LICENSE_OBLIGATION: 'License Obligation',
}

function Obligations(): ReactNode {
    const params = useSearchParams()
    const searchParams = Object.fromEntries(params)
    const t = useTranslations('default')
    const [search, setSearch] = useState({})
    const [obligationCount, setObligationCount] = useState(0)
    const { data: session, status } = useSession()

    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [deletedObligationId, setDeletedObligationId] = useState('')

    const openDeleteDialog = (obligationId: string | undefined) => {
        if (obligationId !== undefined) {
            setDeletedObligationId(obligationId)
            setShowDeleteDialog(true)
        }
    }


    const extractObligationId = (obligation: Obligation): string | undefined => {
        if (!obligation._links) return undefined
        const href = obligation._links.self.href
        const match = href.match(/\/([^/]+)$/)
        return match ? match[1] : undefined
    }

    const headerButtons = {
        'Add Obligation': { type: 'primary', link: '/admin/obligations/add', name: t('Add Obligation') },
    }

    const server = {
        url: CommonUtils.createUrlWithParams(`${SW360_API_URL}/resource/api/obligations`, searchParams),
        then: (data: Embedded<Obligation, 'sw360:obligations'>) => {
            const obligations = data._embedded['sw360:obligations']
            setObligationCount(data.page ? data.page.totalElements : 0)
            return obligations.length > 0
                ? obligations.map((item: Obligation) => [
                      item.title,
                      item.text,
                      item.obligationLevel !== undefined && item.obligationLevel in levels
                          ? levels[item.obligationLevel as keyof typeof levels]
                          : '',
                      item,
                  ])
                : []
        },
        total: (data: Embedded<Obligation, 'sw360:obgligations'>) => (data.page ? data.page.totalElements : 0),
        headers: { Authorization: `${status === 'authenticated' ? session.user.access_token : ''}` },
    }

    const columns = [
        {
            name: t('Title'),
            sort: true,
        },
        { name: t('Text'), width: '40%', sort: true },
        { name: t('Obligation Level'), width: '30%', sort: true },
        {
            name: t('Actions'),
            width: '13%',
            formatter: (item: Obligation) =>
                _(
                    <>
                        <span className='d-flex justify-content-evenly'>
                            <OverlayTrigger overlay={<Tooltip>{t('Edit')}</Tooltip>}>
                                <span className='d-inline-block btn-overlay cursor-pointer'>
                                    <FaPencilAlt className='btn-icon' />
                                </span>
                            </OverlayTrigger>
                            <OverlayTrigger overlay={<Tooltip>{t('Create Clearing Request')}</Tooltip>}>
                                <span
                                    className='d-inline-block btn-overlay cursor-pointer'
                                    onClick={() => {}}
                                >
                                    <MdOutlineTask className='btn-icon overlay-trigger' />
                                </span>
                            </OverlayTrigger>

                            <OverlayTrigger overlay={<Tooltip>{t('Duplicate')}</Tooltip>}>
                                <span className='d-inline-block btn-overlay cursor-pointer'>
                                    <FaClipboard className='btn-icon' />
                                </span>
                            </OverlayTrigger>

                            <OverlayTrigger overlay={<Tooltip>{t('Delete')}</Tooltip>}>
                                <span className='d-inline-block btn-overlay cursor-pointer'>
                                    <FaTrashAlt
                                        className='btn-icon'
                                        onClick={() => {
                                            openDeleteDialog(extractObligationId(item))
                                        }}
                                        style={{ color: 'gray', fontSize: '18px' }}
                                    />
                                </span>
                            </OverlayTrigger>
                        </span>
                    </>,
                ),
            sort: true,
        },
    ]

    const doSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
        setSearch({ keyword: event.currentTarget.value })
    }
    if (status === 'unauthenticated') {
        return signOut()
    } else {
        return (
            <div className='container page-content'>
                <DeleteObligationDialog
                    obligationId={deletedObligationId}
                    show={showDeleteDialog}
                    setShow={setShowDeleteDialog}
                />
                <div className='row'>
                    <div className='col-2 sidebar'>
                        <QuickFilter
                            id='obligationsFilter'
                            title={t('Quick Filter')}
                            searchFunction={doSearch}
                        />
                    </div>
                    <div className='col col-10'>
                        <div className='col'>
                            <div className='row'>
                                <PageButtonHeader
                                    buttons={headerButtons}
                                    title={`${t('Obligations')} (${obligationCount})`}
                                />
                                {status === 'authenticated' ? (
                                    <Table
                                        server={server}
                                        columns={columns}
                                        search={search}
                                        selector={true}
                                    />
                                ) : (
                                    <div className='col-12 d-flex justify-content-center align-items-center'>
                                        <Spinner className='spinner' />
                                    </div>
                                )}

                                <div className='row mt-2'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Obligations
