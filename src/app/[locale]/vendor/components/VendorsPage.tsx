// Copyright (C) TOSHIBA CORPORATION, 2024. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2024. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import { Embedded, Vendor } from '@/object-types'
import { SW360_API_URL } from '@/utils/env'
import { signOut, useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { FiEdit2 } from 'react-icons/fi'
import { IoMdGitMerge } from 'react-icons/io'
import DownloadService from '@/services/download.service'
import { PageButtonHeader, QuickFilter, Table, _ } from 'next-sw360'

type EmbeddedVendors = Embedded<Vendor, 'sw360:vendors'>

export default function VendorIndex() {
    const t = useTranslations('default')
    const router = useRouter()
    const { data: session, status } = useSession()
    const [search, setSearch] = useState({})
    const [numVendors, setNumVendors] = useState<null | number>(null)

    const handleExportVendors = () => {
        const currentDate = new Date().toISOString().split('T')[0]
        DownloadService.download(`vendor/exportVendorDetails`, session, `Vendors-${currentDate}.xlsx`)
    }

    const headerButtons = {
        'Add Vendor': { link: '/vendor/add', type: 'primary', name: t('Add Vendor') },
        'Export Spreadsheet': {
            link: 'vendor',
            onClick: handleExportVendors,
            type: 'secondary',
            name: t('Export Spreadsheet'),
        },
    }

    const handleEditVendor = () => {
        router.push('/vendor/edit')
    }

    const columns = [
        {
            id: 'vendor.fullName',
            name: t('Full Name'),
            formatter: (name: string) =>
                _(
                    <>
                        <Link href='#' className='text-link' onClick={handleEditVendor}>
                            {name}
                        </Link>
                    </>
                ),
            sort: true,
        },
        {
            id: 'vendors.shortName',
            name: t('Short Name'),
            sort: true,
        },
        {
            id: 'vendors.url',
            name: t('URL'),
            sort: true,
        },
        {
            id: 'vendors.actions',
            name: t('Actions'),
            width: '8%',
            formatter: () =>
                _(
                    <div className='d-flex justify-content-between'>
                        <Link href='#' className='text-link'>
                            <div className='container'>
                                <FiEdit2 className='btn-icon' onClick={handleEditVendor}/>
                            </div>
                        </Link>
                        <IoMdGitMerge className='btn-icon' />
                        <FaTrashAlt className='btn-icon' />
                    </div>
                ),
            sort: true,
        },
    ]

    const server = {
        url: `${SW360_API_URL}/resource/api/vendors`,
        then: (data: EmbeddedVendors) => {
            setNumVendors(data.page.totalElements)
            return data._embedded['sw360:vendors'].map((elem: Vendor) => [
                elem.fullName ?? '',
                elem.shortName ?? '',
                elem.url ?? '',
            ])
        },
        total: (data: EmbeddedVendors) => data.page.totalElements,
        headers: { Authorization: `Bearer ${status === 'authenticated' ? session.user.access_token : ''}` },
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
                                    title={`${t('Vendor')} (${numVendors})`}
                                />
                                <Table server={server} columns={columns} search={search} selector={true} />

                                <div className='row mt-2'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
