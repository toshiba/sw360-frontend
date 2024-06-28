// Copyright (C) TOSHIBA CORPORATION, 2024. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2024. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import DownloadService from '@/services/download.service'
import { signOut, useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { PageButtonHeader } from 'next-sw360'
import { useState } from 'react'

import Link from 'next/link'
import { FaTrashAlt } from 'react-icons/fa'

import { useSearchParams } from 'next/navigation'
import React from 'react'

import { Embedded, Session, VendorPayload } from '@/object-types'
import { CommonUtils } from '@/utils'
import { SW360_API_URL } from '@/utils/env'
import { QuickFilter, Table, _ } from 'next-sw360'
import { FiEdit2 } from 'react-icons/fi'
import { IoMdGitMerge } from 'react-icons/io'
import styles from '../vendor.module.css'
import DeleteVendorDialog from './DeleteVendorDialog'

export default function VendorIndex() {
    const t = useTranslations('default')
    const { data: session, status } = useSession()
    const [search, setSearch] = useState({})
    const [numOfVendor, setNumOfVendor] = useState<null | number>(null)

    const params = useSearchParams()
    const searchParams = Object.fromEntries(params)
    const [deletingVendor, setDeletingVendor] = useState<string>('')
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

    const handleExportVendors = () => {
        const currentDate = new Date().toISOString().split('T')[0]
        DownloadService.download(`vendor/exportVendorDetails`, session, `Vendors-${currentDate}.xlsx`)
    }

    const handleClickDelete = (vendorId: string) => {
        setDeletingVendor(vendorId)
        setDeleteDialogOpen(true)
    }

    const columns = [
        {
            id: 'vendor.fullName',
            name: t('Full Name'),
            formatter: ([id, name]: Array<string>) =>
                _(
                    <Link href={'/vendor/detail/' + id} className='link'>
                        {name}
                    </Link>
                ),
            width: '15%',
            sort: true,
        },
        {
            id: 'vendors.shortName',
            name: t('Short Name'),
            width: '10%',
            sort: true,
        },
        {
            id: 'vendors.url',
            name: t('URL'),
            width: '45%',
            sort: true,
        },
        {
            id: 'action',
            name: t('Actions'),
            formatter: (id: string) =>
                _(
                    <span>
                        <Link href={'/vendor/edit/' + id} style={{ color: 'gray', fontSize: '14px' }}>
                            <FiEdit2 />
                        </Link>{' '}
                        &nbsp;
                        <IoMdGitMerge className='btn-icon' />
                        <FaTrashAlt className={styles['delete-btn']} onClick={() => handleClickDelete(id)} />
                    </span>
                ),
            width: '6%',
        },
    ]

    const headerButtons = {
        'Add Vendor': { link: '/vendor/add', type: 'primary', name: t('Add Vendor') },
        'Export Spreadsheet': {
            link: 'vendor',
            onClick: handleExportVendors,
            type: 'secondary',
            name: t('Export Spreadsheet'),
        },
    }

    const server = (session: Session) => {
        return {
            url: CommonUtils.createUrlWithParams(`${SW360_API_URL}/resource/api/vendors`, searchParams),
            then: (data: Embedded<VendorPayload, 'sw360:vendors'>) => {
                setNumOfVendor(data.page.totalElements)
                return data._embedded['sw360:vendors'].map((elem: VendorPayload) => [
                    [elem._links.self.href.split('/').at(-1), elem.fullname ?? ''],
                    elem.shortname ?? '',
                    elem.url ?? '',
                ])
            },
            total: (data: Embedded<VendorPayload, 'sw360:vendors'>) => data.page.totalElements,
            headers: { Authorization: `Bearer ${status === 'authenticated' ? session.user.access_token : ''}` },
        }
    }

    const doSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
        setSearch({ keyword: event.currentTarget.value })
    }

    if (status === 'unauthenticated') {
        signOut()
    } else {
        return (
            <div className='container' style={{ maxWidth: '98vw', marginTop: '10px' }}>
                <div className='row'>
                    <div className='col-2 sidebar'>
                        <QuickFilter id='vendorfilter' title={t('Quick Filter')} searchFunction={doSearch} />
                    </div>
                    <div className='col col-sm-9'>
                        <div className='col'>
                            <div className='row'>
                                <PageButtonHeader
                                    buttons={headerButtons}
                                    title={`${t('Vendor')} (${numOfVendor})`}
                                />

                                <div className='row' style={{ marginBottom: '20px' }}>
                                    <Table columns={columns} selector={true} search={search} server={server(session)} />
                                </div>
                                <div className='row mt-2'></div>
                            </div>
                        </div>
                    </div>
                </div>
                <DeleteVendorDialog
                    vendorId={deletingVendor}
                    show={deleteDialogOpen}
                    setShow={setDeleteDialogOpen}
                />
            </div>
        )
    }

}
