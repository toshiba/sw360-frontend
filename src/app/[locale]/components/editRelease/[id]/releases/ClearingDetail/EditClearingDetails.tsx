// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import ClearingDetails from './ClearingDetails'
import RequestInformation from './RequestInformation'
import SupplementalInformation from './SupplementalInformation'

const EditClearingDetails = () => {
    return (
        <>
            <div className='container' style={{ maxWidth: '98vw', marginTop: '10px', fontSize: '0.875rem'}}>
                <ClearingDetails />

                <RequestInformation />

                <SupplementalInformation />
            </div>
        </>
    )
}

export default EditClearingDetails
