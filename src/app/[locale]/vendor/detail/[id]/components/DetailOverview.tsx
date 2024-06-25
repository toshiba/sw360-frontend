// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import { PageButtonHeader, SideBar } from '@/components/sw360'
import {
    CommonTabIds,
    HttpStatus,
    Vendor,
} from '@/object-types'
import { ApiUtils } from '@/utils'
import { signOut, useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useState } from 'react'
import Summary from './Summary'

interface Props {
    vendorId: string
}

const tabList = [
    {
        id: CommonTabIds.SUMMARY,
        name: 'Summary',
    },
]

const DetailOverview = ({ vendorId }: Props) => {
    const t = useTranslations('default')
    const { data: session } = useSession()
    const [selectedTab, setSelectedTab] = useState<string>(CommonTabIds.SUMMARY)

    const [vendor, setVendor] = useState<Vendor>(undefined)

    const fetchData = useCallback(
        async (url: string) => {
            const response = await ApiUtils.GET(url, session.user.access_token)
            if (response.status == HttpStatus.OK) {
                const data = (await response.json()) as Vendor
                return data
            } else if (response.status == HttpStatus.UNAUTHORIZED) {
                await signOut()
                return undefined
            } else {
                return undefined
            }
        },
        [session]
    )

    useEffect(() => {
        fetchData(`vendors/${vendorId}`)
            .then((vendor: Vendor) => {
                setVendor(vendor)
            })
            .catch((err) => console.error(err))
    }, [vendorId, fetchData])

    const headerButtons = {
        Edit: { link: `/vendor/edit/${vendorId}`, type: 'primary', name: t('Edit Vendor') },
    }

    return (
        vendor && (
            <div className='container page-content'>
                <div className='row'>
                    <div className='col-2 sidebar'>
                        <SideBar
                            selectedTab={selectedTab}
                            setSelectedTab={setSelectedTab}
                            tabList={tabList}
                        />
                    </div>
                    <div className='col'>
                        <div className='row' style={{ marginBottom: '20px' }}>
                            <PageButtonHeader title={vendor.fullName} buttons={headerButtons}>
                            </PageButtonHeader>
                        </div>
                        <div className='row' hidden={selectedTab !== CommonTabIds.SUMMARY ? true : false}>
                            <Summary vendor={vendor} />
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default DetailOverview
