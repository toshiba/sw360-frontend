// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

import { Vendor } from '@/object-types'
import VendorGeneral from './VendorGeneral'


interface Props {
    vendor: Vendor
}

const Summary = ({ vendor }: Props) => {
    return (
        <div className='col'>
            <div>
                <p id='up_Summary'>{vendor.fullName}</p>
            </div>
            <div>
                <VendorGeneral vendor={vendor} />
            </div>
        </div>
    )
}

export default Summary
