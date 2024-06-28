// Copyright (C) TOSHIBA CORPORATION, 2024. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2024. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import { VendorPayload } from '@/object-types'
import AddVendorDetail from './AddVendorDetail'

interface Props {
    vendorPayload?: VendorPayload
    setVendorPayload?: React.Dispatch<React.SetStateAction<VendorPayload>>
    errorShortName?: boolean
    errorFullName?: boolean
    inputValid?: boolean
    setErrorShortName?: React.Dispatch<React.SetStateAction<boolean>>
    setErrorFullName?: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddVendorSummary({
    vendorPayload,
    setVendorPayload,
    errorShortName,
    errorFullName,
    inputValid,
    setErrorShortName,
    setErrorFullName,
}: Props) {
    return (
        <div className='col'>
            <AddVendorDetail
                vendorPayload={vendorPayload}
                setVendorPayload={setVendorPayload}
                errorShortName={errorShortName}
                errorFullName={errorFullName}
                setErrorShortName={setErrorShortName}
                setErrorFullName={setErrorFullName}
                inputValid={inputValid}
            />
        </div>
    )
}
