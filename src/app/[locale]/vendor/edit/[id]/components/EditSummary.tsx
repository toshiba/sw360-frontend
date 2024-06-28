// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import { signOut, useSession } from 'next-auth/react'
import { notFound } from 'next/navigation'
import { useCallback, useEffect } from 'react'

import {
    HttpStatus,
    VendorPayload
} from '@/object-types'
import { ApiUtils } from '@/utils'
import GeneralInfoVendor from './GeneralInfoVendor'

interface Props {
    vendorId?: string
    vendorPayload?: VendorPayload
    setVendorPayload?: React.Dispatch<React.SetStateAction<VendorPayload>>
}

export default function CEditSummary({
    vendorId,
    vendorPayload,
    setVendorPayload,
}: Props) {
    const { data: session } = useSession()

    const fetchData = useCallback(
        async (url: string) => {
            const response = await ApiUtils.GET(url, session.user.access_token)
            if (response.status == HttpStatus.OK) {
                const data = (await response.json()) as VendorPayload
                return data
            } else if (response.status == HttpStatus.UNAUTHORIZED) {
                return signOut()
            } else {
                notFound()
            }
        },
        [session.user.access_token]
    )

    useEffect(() => {
        void fetchData(`vendors/${vendorId}`).then((vendorPayload: VendorPayload) => {
            const VendorData: VendorPayload = {
                fullname: vendorPayload.fullname,
                shortname: vendorPayload.shortname,
                url: vendorPayload.url,
            }
            setVendorPayload(VendorData)
        })
    }, [vendorId, fetchData, setVendorPayload])

    return (
        <>
            <form
                action=''
                id='form_submit'
                method='post'
                onSubmit={(e) => {
                    e.preventDefault()
                }}
            >
                <div className='col'>
                    <div className='col'>
                        <GeneralInfoVendor
                            vendorPayload={vendorPayload}
                            setVendorPayload={setVendorPayload}
                        />
                    </div>
                </div>
            </form>
        </>
    )
}
