// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'
import LicensePayload from '../../object-types/LicensePayload'
import styles from './LinkedObligations.module.css'
import TableLinkedObligations from './TableLinkedReleases/TableLinkedObligations'
// import TitleLinkedObligations from './TitleLinkedReleases/TitleLinkedObligations'

interface Props {
    data: any[]
    setData: any
    licensePayload?: LicensePayload
    setLicensePayload?: React.Dispatch<React.SetStateAction<LicensePayload>>
}

const LinkedObligations = ({ data, setData, licensePayload, setLicensePayload }: Props) => {
    const setObligationIdToLicensePayLoad = (obligationIds: Array<string>) => {
        setLicensePayload({
            ...licensePayload,
            obligationDatabaseIds: obligationIds,
        })
    }

    return (
        <div className='col' style={{ fontSize: '0.875rem' }}>
            <div
                className={`row ${styles['attachment-table']}`}
                style={{ padding: '25px', fontSize: '0.875rem', paddingTop: '1px' }}
            >
                <TableLinkedObligations
                    data={data}
                    setData={setData}
                    setObligationIdToLicensePayLoad={setObligationIdToLicensePayLoad}
                />
            </div>
        </div>
    )
}

export default LinkedObligations
