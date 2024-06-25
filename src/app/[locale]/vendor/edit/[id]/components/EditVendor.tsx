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

import { HttpStatus, Vendor } from '@/object-types'
import MessageService from '@/services/message.service'
import { ApiUtils, CommonUtils } from '@/utils'
import { PageButtonHeader } from 'next-sw360'
import EditVendorSummary from './EditVendorSummary'

interface Props {
    vendorId?: string
}

export default function EditVendor({ vendorId }: Props) {
    const t = useTranslations('default')
    const { data: session, status } = useSession()
    // const [data, setData] = useState([])

    const params = useSearchParams()

    // const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    // const [setDeleteDialogOpen] = useState(false)
    const router = useRouter()
    const [inputValid, setInputValid] = useState(false)
    const [errorFullName, setErrorFullName] = useState(false)
    const [Vendor, setVendor] = useState<Vendor>({
        shortName: '',
        fullName: '',
        url:'',
    })

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        ;(async () => {
            try {
                const queryUrl = CommonUtils.createUrlWithParams(`/vendors/${vendorId}`, Object.fromEntries(params))
                const response = await ApiUtils.GET(queryUrl, session.user.access_token, signal)
                if (response.status === HttpStatus.UNAUTHORIZED) {
                    return signOut()
                } else if (response.status !== HttpStatus.OK) {
                    return notFound()
                }
            } catch (e) {
                console.error(e)
            }
        })()
        return () => controller.abort()
    }, [params, session, vendorId])


    const submit = async () => {
        setInputValid(true)
        if (CommonUtils.isNullEmptyOrUndefinedString(Vendor.fullName)) {
            setErrorFullName(true)
            MessageService.error(t('Fullname not null or empty'))
        } else {
            const response = await ApiUtils.PATCH(`/vendors/${vendorId}`, Vendor, session.user.access_token)
            if (response.status == HttpStatus.OK) {
                const data = (await response.json()) as Vendor
                MessageService.success(t('Vendor updated successfully'))
                router.push(`/vendors/detail?id=${data.shortName}&update=success`)
            } else {
                MessageService.error(t('Vendor updated failed'))
            }
        }
    }

    // const deleteVendor= () => {
    //     setDeleteDialogOpen(true)
    // }

    const headerButtons = {
        'Update Vendor': { link: '', type: 'primary', onClick: submit, name: t('Update Vendor') },
        'Delete Vendor': { link: '', type: 'danger', name: t('Delete Vendor') },
        // 'Delete Vendor': { link: '', type: 'danger', onClick: deleteVendor, name: t('Delete Vendor') },
        Cancel: { link: `/vendor`, type: 'light', name: t('Cancel') },
    }

    if (status === 'unauthenticated') {
        signOut()
    } else {
        return (
            Vendor && (
                <div className='container' style={{ maxWidth: '98vw', marginTop: '10px' }}>
                    <div className='row'>
                        <div className='col'>
                            <div className='row' style={{ marginBottom: '20px' }}>
                                <PageButtonHeader
                                    title={`${Vendor.fullName} (${Vendor.shortName})`}
                                    buttons={headerButtons}
                                ></PageButtonHeader>

                            </div>
                            <div
                                className='row'
                                style={{ fontSize: '14px' }}
                            >
                                <EditVendorSummary
                                    errorFullName={errorFullName}
                                    inputValid={inputValid}
                                    setErrorFullName={setErrorFullName}
                                    Vendor={Vendor}
                                    setVendor={setVendor}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )
        )
    }
}
