// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import { Session } from '@/object-types/Session'
import COTSOSSInformation from './COTSOSSInformation'
import CommercialDetailsAdministration from './CommercialDetailsAdministration'
import ReleasePayload from '@/object-types/ReleasePayload'
import { useState } from 'react'
import COTSDetails from '@/object-types/COTSDetails'
import ComponentOwner from '@/object-types/ComponentOwner'
interface Props {
    session?: Session
    releasePayload?: ReleasePayload
    setReleasePayload?: React.Dispatch<React.SetStateAction<ReleasePayload>>
    cotsResponsible?: ComponentOwner
    setCotsResponsible?: React.Dispatch<React.SetStateAction<ComponentOwner>>
}
const EditCommercialDetails = ({
    session,
    releasePayload,
    setReleasePayload,
    cotsResponsible,
    setCotsResponsible,
}: Props) => {
    const [cotsDetails, setCotsDetails] = useState<COTSDetails>({
        usedLicense: '',
        licenseClearingReportURL: '',
        containsOSS: false,
        ossContractSigned: false,
        ossInformationURL: '',
        usageRightAvailable: false,
        cotsResponsible: '',
        clearingDeadline: '',
        sourceCodeAvailable: false,
    })
    return (
        <>
            <div className='container' style={{ maxWidth: '98vw', marginTop: '10px', fontSize: '0.875rem' }}>
                <CommercialDetailsAdministration
                    session={session}
                    releasePayload={releasePayload}
                    setReleasePayload={setReleasePayload}
                    cotsDetails={cotsDetails}
                    setCotsDetails={setCotsDetails}
                    cotsResponsible={cotsResponsible}
                    setCotsResponsible={setCotsResponsible}
                />

                <COTSOSSInformation
                    releasePayload={releasePayload}
                    setReleasePayload={setReleasePayload}
                    cotsDetails={cotsDetails}
                    setCotsDetails={setCotsDetails}
                />
            </div>
        </>
    )
}

export default EditCommercialDetails
