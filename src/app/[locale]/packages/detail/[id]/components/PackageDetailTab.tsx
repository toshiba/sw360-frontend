// Copyright (C) Siemens AG, 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import { HttpStatus, Package } from '@/object-types'
import MessageService from '@/services/message.service'
import { ApiUtils, CommonUtils } from '@/utils'
import { signOut, useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { notFound, useRouter } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'
import { ListGroup, Spinner, Tab } from 'react-bootstrap'
import ChangeLog from './Changelog'
import Summary from './Summary'

export default function PackageDetailTab({ packageId }: { packageId: string }): ReactNode {
    const t = useTranslations('default')
    const { data: session, status } = useSession()
    const [summaryData, setSummaryData] = useState<Package | undefined>(undefined)
    const router = useRouter()

    useEffect(() => {
        if (status !== 'authenticated') return

        const controller = new AbortController()
        const signal = controller.signal

        void (async () => {
            try {
                const response = await ApiUtils.GET(`packages/${packageId}`, session.user.access_token, signal)
                if (response.status === HttpStatus.UNAUTHORIZED) {
                    return signOut()
                } else if (response.status !== HttpStatus.OK) {
                    return notFound()
                }

                const data = (await response.json()) as Package

                setSummaryData({ id: packageId, ...data })
            } catch (e) {
                console.error(e)
            }
        })()

        return () => controller.abort()
    }, [packageId, session, status])

    const handleEditPackage = () => {
        if (CommonUtils.isNullOrUndefined(session)) return
        if (session.user.email === summaryData?._embedded?.createdBy?.email) {
            MessageService.success(t('You are editing the original document'))
            router.push(`/packages/edit/${packageId}`)
        } else {
            MessageService.success(t('You will create a moderation request if you update'))
            router.push(`/packages/edit/${packageId}`)
        }
    }

    return (
        <>
            <div className='container page-content'>
                <Tab.Container
                    defaultActiveKey='summary'
                    mountOnEnter={true}
                    unmountOnExit={true}
                >
                    <div className='row'>
                        <div className='col-sm-2 me-3'>
                            <ListGroup>
                                <ListGroup.Item
                                    action
                                    eventKey='summary'
                                >
                                    <div className='my-2'>{t('Summary')}</div>
                                </ListGroup.Item>
                                <ListGroup.Item
                                    action
                                    eventKey='changeLog'
                                >
                                    <div className='my-2'>{t('Change Log')}</div>
                                </ListGroup.Item>
                            </ListGroup>
                        </div>
                        <div className='col ps-2 me-3'>
                            <div className=' row d-flex justify-content-between'>
                                <button
                                    type='button'
                                    className='me-2 col-auto btn btn-primary'
                                    onClick={() => handleEditPackage()}
                                >
                                    {t('Edit Package')}
                                </button>
                                <div className='col-lg-5 text-truncate buttonheader-title me-3'>
                                    {summaryData && `${summaryData.name} (${summaryData.version})`}
                                </div>
                            </div>
                            <div className='mt-3'>
                                <Tab.Content>
                                    <Tab.Pane eventKey='summary'>
                                        {!summaryData ? (
                                            <div
                                                className='col-12'
                                                style={{ textAlign: 'center' }}
                                            >
                                                <Spinner className='spinner' />
                                            </div>
                                        ) : (
                                            <Summary summaryData={summaryData} />
                                        )}
                                    </Tab.Pane>
                                    <Tab.Pane eventKey='changeLog'>
                                        <ChangeLog packageId={packageId} />
                                    </Tab.Pane>
                                </Tab.Content>
                            </div>
                        </div>
                    </div>
                </Tab.Container>
            </div>
        </>
    )
}
