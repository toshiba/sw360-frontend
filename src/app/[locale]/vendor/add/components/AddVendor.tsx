// Copyright (C) TOSHIBA CORPORATION, 2024. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2024. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import { signOut, useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { CommonTabIds, HttpStatus, Vendor } from '@/object-types'
import { ApiUtils, CommonUtils } from '@/utils'
import { PageButtonHeader, SideBar } from 'next-sw360'
import AddVendorSummary from './AddVendorSummary'

import MessageService from '@/services/message.service'

export default function AddVendor() {
    const t = useTranslations('default')
    const { data: session, status } = useSession()

    const router = useRouter()
    const [errorShortName, setErrorShortName] = useState(false)
    const [errorFullName, setErrorFullName] = useState(false)
    const [selectedTab, setSelectedTab] = useState<string>(CommonTabIds.SUMMARY)
    const [inputValid, setInputValid] = useState(false)
    const [vendorPayload, setVendorPayload] = useState<Vendor>({
        shortName: '',
        fullName: '',
        url: ''
    })

    const tabList = [
        {
            id: CommonTabIds.SUMMARY,
            name: 'Summary',
        },
    ]
    const validateVendorShortName = () => {
        if (CommonUtils.isNullEmptyOrUndefinedString(vendorPayload.shortName)) {
            setErrorShortName(true)
            return true
        }
        return false
    }

    const validateVendorFullName = () => {
        if (CommonUtils.isNullEmptyOrUndefinedString(vendorPayload.fullName)) {
            setErrorFullName(true)
            return true
        }
        return false
    }

    const submit = async () => {
        setInputValid(true)
        if (validateVendorShortName() && validateVendorFullName()) {
            setErrorShortName(true)
            setErrorFullName(true)
        }
        if (validateVendorShortName() || validateVendorFullName()) {
            MessageService.error(t('Full Name or Short Name is not Null or Empty or Undefined'))
        } else if (!vendorPayload.shortName.match(/^[A-Za-z0-9\-.+]*$/)) {
            MessageService.error(t('Short Name is invalid'))
        } else {
            const response = await ApiUtils.POST('vendors', vendorPayload, session.user.access_token)
            if (response.status == HttpStatus.CREATED) {
                MessageService.success(t('Vendor added successfully'))
                router.push('/vendor')
            } else if (response.status == HttpStatus.CONFLICT) {
                MessageService.error(t('Short Name is already existed'))
            } else {
                MessageService.error(t('Create Vendor Failed'))
            }
        }
    }

    const headerButtons = {
        'Create Vendor': { link: '', type: 'primary', onClick: submit, name: t('Create Vendor') },
        Cancel: { link: '/vendor', type: 'light', name: t('Cancel') },
    }

    if (status === 'unauthenticated') {
        signOut()
    } else {
        return (
            <div className='container' style={{ maxWidth: '98vw', marginTop: '10px' }}>
                <div className='row'>
                    <div className='col-2 sidebar'>
                        <SideBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} tabList={tabList} />
                    </div>
                    <div className='col'>
                        <div className='row' style={{ marginBottom: '20px' }}>
                            <PageButtonHeader
                                buttons={headerButtons}
                                title='()'
                            ></PageButtonHeader>
                        </div>
                        <div className='row' >
                            <AddVendorSummary
                                errorShortName={errorShortName}
                                setErrorShortName={setErrorShortName}
                                errorFullName={errorFullName}
                                inputValid={inputValid}
                                setErrorFullName={setErrorFullName}
                                vendorPayload={vendorPayload}
                                setVendorPayload={setVendorPayload}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
