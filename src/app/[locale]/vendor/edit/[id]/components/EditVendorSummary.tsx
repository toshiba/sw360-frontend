// Copyright (C) TOSHIBA CORPORATION, 2024. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2024. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import { Vendor } from '@/object-types'
import EditVendorDetail from './EditVendorDetail'

interface Props {
    errorFullName?: boolean
    setErrorFullName?: React.Dispatch<React.SetStateAction<boolean>>
    Vendor?: Vendor
    inputValid?: boolean
    setVendor?: React.Dispatch<React.SetStateAction<Vendor>>
}

export default function EditVendorSummary({
    Vendor,
    setVendor,
    errorFullName,
    setErrorFullName,
    inputValid,
}: Props) {
    return (
        <div className='col'>
            <EditVendorDetail
                Vendor={Vendor}
                setVendor={setVendor}
                inputValid={inputValid}
                errorFullName={errorFullName}
                setErrorFullName={setErrorFullName}
            />
        </div>
    )
}
