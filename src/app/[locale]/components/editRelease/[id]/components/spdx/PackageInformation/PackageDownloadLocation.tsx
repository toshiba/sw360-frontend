// Copyright (C) Siemens AG, 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

// import { useState } from 'react'
import PackageInformation from '../../../../../../../../object-types/spdx/PackageInformation'
// import { useTranslations } from 'next-intl'

interface Props {
    packageInformation?: PackageInformation
    setPackageDownloadLocationToPackage?: any
    packageDownloadLocationExist?: boolean
    setPackageDownloadLocationExist?: React.Dispatch<React.SetStateAction<boolean>>
    packageDownloadLocationNone?: boolean
    setPackageDownloadLocationNone?: React.Dispatch<React.SetStateAction<boolean>>
    packageDownloadLocationNoasserttion?: boolean
    setPackageDownloadLocationNoasserttion?: React.Dispatch<React.SetStateAction<boolean>>
}

function PackageDownloadLocation({
    packageInformation,
    setPackageDownloadLocationToPackage,
    packageDownloadLocationExist,
    setPackageDownloadLocationExist,
    packageDownloadLocationNone,
    setPackageDownloadLocationNone,
    packageDownloadLocationNoasserttion,
    setPackageDownloadLocationNoasserttion,
}: Props) {
    const selectPackageDownloadLocationExist = () => {
        setPackageDownloadLocationExist(true)
        setPackageDownloadLocationNone(false)
        setPackageDownloadLocationNoasserttion(false)
    }
    const selectPackageDownloadLocationNone = () => {
        setPackageDownloadLocationNone(true)
        setPackageDownloadLocationExist(false)
        setPackageDownloadLocationNoasserttion(false)
    }
    const selectPackageDownloadLocationNoasserttion = () => {
        setPackageDownloadLocationNoasserttion(true)
        setPackageDownloadLocationExist(false)
        setPackageDownloadLocationNone(false)
    }

    const updateField = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPackageDownloadLocationToPackage(e.target.value)
    }

    return (
        <td colSpan={3}>
            <div className='form-group'>
                <label className='lableSPDX'>7.7 Package download location</label>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ display: 'inline-flex', flex: 3, marginRight: '1rem' }}>
                        <input
                            className='spdx-radio'
                            type='radio'
                            id='downloadLocationExist'
                            name='_sw360_portlet_components_DOWNLOAD_LOCATION'
                            value='EXIST'
                            onChange={selectPackageDownloadLocationExist}
                            checked={packageDownloadLocationExist}
                        />
                        <input
                            style={{ flex: 6, marginRight: '1rem' }}
                            id='spdxConcludedLicenseValue'
                            className='form-control'
                            type='text'
                            name='downloadLocation'
                            placeholder='Enter package supplier'
                            onChange={updateField}
                            value={packageInformation.downloadLocation ?? ''}
                            disabled={packageDownloadLocationNone || packageDownloadLocationNoasserttion}
                        />
                    </div>
                    <div style={{ flex: 2 }}>
                        <input
                            className='spdx-radio'
                            id='downloadLocationNone'
                            type='radio'
                            name='downloadLocation'
                            value='NONE'
                            onChange={selectPackageDownloadLocationNone}
                            checked={packageDownloadLocationNone}
                        />
                        <label
                            style={{ marginRight: '2rem' }}
                            className='form-check-label radio-label lableSPDX'
                            htmlFor='packageDownloadLocationNone'
                        >
                            NONE
                        </label>
                        <input
                            className='spdx-radio'
                            id='downloadLocationNoAssertion'
                            type='radio'
                            name='downloadLocation'
                            value='NOASSERTION'
                            onChange={selectPackageDownloadLocationNoasserttion}
                            checked={packageDownloadLocationNoasserttion}
                        />
                        <label className='form-check-label radio-label lableSPDX' htmlFor='downloadLocationNoAssertion'>
                            NOASSERTION
                        </label>
                    </div>
                </div>
            </div>
        </td>
    )
}

export default PackageDownloadLocation
