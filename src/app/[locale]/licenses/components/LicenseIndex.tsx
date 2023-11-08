// Copyright (c) Helio Chissini de Castro, 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import { HttpStatus, LicensePayload } from '@/object-types'
import DownloadService from '@/services/download.service'
import { ApiUtils, CommonUtils } from '@/utils'
import { signOut, useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { PageButtonHeader, QuickFilter, Table, _ } from 'next-sw360'
import Link from 'next/link'
import { notFound, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { Check2Circle, XCircle } from 'react-bootstrap-icons'

function LicensesPage() {
    const params = useSearchParams()
    const t = useTranslations('default')
    const [search, setSearch] = useState({})
    const [loading, setLoading] = useState(true)
    const [licenseData, setLicenseData] = useState([])
    const { data: session, status } = useSession()

    const handleExportLicense = () => {
        DownloadService.download(`reports?reports?module=licenses`, session, `Licenses.xlsx`)
    }

    const headerButtons = {
        'Add License': { link: '/licenses/add', type: 'primary', name: t('Add License') },
        'Export Spreadsheet': {
            link: '/licenses',
            onClick: handleExportLicense,
            type: 'secondary',
            name: t('Export Spreadsheet'),
        },
    }

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        ;(async () => {
            try {
                const queryUrl = CommonUtils.createUrlWithParams('licenses', Object.fromEntries(params))
                const response = await ApiUtils.GET(queryUrl, session.user.access_token, signal)
                if (response.status === HttpStatus.UNAUTHORIZED) {
                    return signOut()
                } else if (response.status !== HttpStatus.OK) {
                    return notFound()
                }

                const licenses = await response.json()

                if (!CommonUtils.isNullOrUndefined(licenses['_embedded']['sw360:licenses'])) {
                    setLicenseData(
                        licenses['_embedded']['sw360:licenses'].map((item: LicensePayload) => [
                            item._links.self.href.split('/').pop(),
                            item.fullName,
                            _(
                                <center>
                                    {item.checked ? (
                                        <Check2Circle color='#287d3c' size='16' />
                                    ) : (
                                        <XCircle color='red' />
                                    )}
                                </center>
                            ),
                            _(<>{item.licenseType ? item.licenseType.licenseType : '--'}</>),
                        ])
                    )
                    setLoading(false)
                }
            } catch (e) {
                console.error(e)
            }
        })()

        return () => controller.abort()
    }, [params, session])

    const columns = [
        {
            name: t('License Shortname'),
            formatter: (id: string) =>
                _(
                    <Link href={`/licenses/detail/${id}`} className='link'>
                        {id}
                    </Link>
                ),
            sort: true,
        },
        { name: t('License Fullname'), width: '45%' },
        { name: t('Is Checked'), width: '10%' },
        { name: t('License Type'), width: '15%' },
    ]

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
                        <QuickFilter id='licensefilter' title={t('Quick Filter')} searchFunction={doSearch} />
                    </div>
                    <div className='col col-sm-9'>
                        <div className='col'>
                            <div className='row'>
                                <PageButtonHeader
                                    buttons={headerButtons}
                                    title={`${t('Licenses')} (${licenseData.length})`}
                                />
                                {!loading ? (
                                    <Table
                                        data={licenseData}
                                        columns={columns}
                                        sort={true}
                                        search={search}
                                        selector={true}
                                    />
                                ) : (
                                    <div className='col-12' style={{ textAlign: 'center' }}>
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
export default LicensesPage
