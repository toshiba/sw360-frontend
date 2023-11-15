// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import LicensePayload from '../../../../../object-types/LicensePayload'
import AddLicenseDetail from './AddLicenseDetail'
import AddLicenseText from './AddLicenseText'

interface Props {
    licensePayload?: LicensePayload
    setLicensePayload?: React.Dispatch<React.SetStateAction<LicensePayload>>
}

export default function AddLicenseSummary({ licensePayload, setLicensePayload }: Props) {
    return (
        <div className='col'>
            <AddLicenseDetail licensePayload={licensePayload} setLicensePayload={setLicensePayload} />
            <AddLicenseText licensePayload={licensePayload} setLicensePayload={setLicensePayload} />
        </div>
    )
}
