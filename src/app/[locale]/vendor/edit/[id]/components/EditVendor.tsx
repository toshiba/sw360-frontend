// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import { signOut, useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { notFound, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import {
    ActionType,
    CommonTabIds,
    HttpStatus,
    VendorPayload
} from '@/object-types'
import MessageService from '@/services/message.service'
import { ApiUtils, CommonUtils } from '@/utils'
import { PageButtonHeader, SideBar } from 'next-sw360'
import DeleteVendorDialog from '../../../components/DeleteVendorDialog'
import VendorEditSummary from './CeditSummary'

interface Props {
    vendorId?: string
}

const tabList = [
    {
        id: CommonTabIds.SUMMARY,
        name: 'Summary',
    },
]

const EditVendor = ({ vendorId }: Props) => {
    const t = useTranslations('default')
    const { data: session } = useSession()
    const params = useSearchParams()
    const router = useRouter()
    const [selectedTab, setSelectedTab] = useState<string>(CommonTabIds.SUMMARY)
    const [vendorPayload, setVendorPayload] = useState<VendorPayload>()
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [vendorData, setVendorData] = useState<VendorPayload>({
        fullname: '',
        shortname: '',
        url: '',

    })

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        ;(async () => {
            try {
                const queryUrl = CommonUtils.createUrlWithParams(
                    `vendors/${vendorId}`,
                    Object.fromEntries(params)
                )
                const response = await ApiUtils.GET(queryUrl, session.user.access_token, signal)
                if (response.status === HttpStatus.UNAUTHORIZED) {
                    return signOut()
                } else if (response.status !== HttpStatus.OK) {
                    return notFound()
                }
                setVendorPayload(await response.json())
            } catch (e) {
                console.error(e)
            }
        })()

        return () => controller.abort()
    }, [params, session, vendorId])

    const submit = async () => {
        const response = await ApiUtils.PATCH(`vendors/${vendorId}`, vendorData, session.user.access_token)
        if (response.status == HttpStatus.OK) {
            MessageService.success(`Vendor ${vendorData.fullname}  updated successfully!`)
            router.push('/vendor/detail/' + vendorId)
        } else {
            MessageService.error(t('Edit Vendor Fail'))
        }
    }

    const handleDeleteVendor = () => {
        setDeleteDialogOpen(true)
    }

    const headerButtons = {
        'Update Vendor': {
            link: '/vendor/edit/' + vendorId,
            type: 'primary',
            name: t('Update Vendor'),
            onClick: submit,
        },
        'Delete Vendor': {
            link: '/vendor/edit/' + vendorId,
            type: 'danger',
            name: t('Delete Vendor'),
            onClick: handleDeleteVendor,
        },
        Cancel: { link: '/vendor/detail/' + vendorId, type: 'secondary', name: t('Cancel') },
    }

    return (
        vendorPayload && (
            <div className='container page-content'>
                <div className='row'>
                    <DeleteVendorDialog
                        vendorId={vendorId}
                        show={deleteDialogOpen}
                        setShow={setDeleteDialogOpen}
                        actionType={ActionType.EDIT}
                    />
                    <div className='col-2 sidebar'>
                        <SideBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} tabList={tabList} />
                    </div>
                    <div className='col'>
                        <div className='row' style={{ marginBottom: '20px' }}>
                            <PageButtonHeader title={vendorPayload.fullname} buttons={headerButtons}></PageButtonHeader>
                        </div>
                        <div className='row' hidden={selectedTab !== CommonTabIds.SUMMARY ? true : false}>
                            <VendorEditSummary
                                vendorId={vendorId}
                                vendorPayload={vendorData}
                                setVendorPayload={setVendorData}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default EditVendor
