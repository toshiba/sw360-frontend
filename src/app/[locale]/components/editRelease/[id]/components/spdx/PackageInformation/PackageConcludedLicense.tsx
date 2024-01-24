// Copyright (C) Siemens AG, 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

import { useState } from 'react'
import PackageInformation from '../../../../../../../../object-types/spdx/PackageInformation'
// import { useTranslations } from 'next-intl'

interface Props {
    packageInformation: PackageInformation
}

function PackageConcludedLicense({ packageInformation }: Props) {
    //concludedLicense
    const [concludedLicenseExist, setConcludedLicenseExist] = useState(true)
    const [concludedLicenseNone, setConcludedLicenseNone] = useState(false)
    const [concludedLicenseNoasserttion, setConcludedLicenseNoasserttion] = useState(false)

    const selectConcludedLicenseExist = () => {
        setConcludedLicenseExist(true)
        setConcludedLicenseNone(false)
        setConcludedLicenseNoasserttion(false)
    }
    const selectConcludedLicenseNone = () => {
        setConcludedLicenseExist(false)
        setConcludedLicenseNone(true)
        setConcludedLicenseNoasserttion(false)
    }
    const selectConcludedLicenseNoasserttion = () => {
        setConcludedLicenseExist(false)
        setConcludedLicenseNone(false)
        setConcludedLicenseNoasserttion(true)
    }

    return (
        <td colSpan={3}>
            <div className='form-group'>
                <label className='lableSPDX'>7.13 Concluded license</label>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ display: 'inline-flex', flex: 3, marginRight: '1rem' }}>
                        <input
                            className='spdx-radio'
                            id='licenseConcludedExist'
                            type='radio'
                            name='_sw360_portlet_components_LICENSE_CONCLUDED'
                            value='EXIST'
                            onClick={selectConcludedLicenseExist}
                            checked={concludedLicenseExist}
                        />
                        <input
                            style={{ flex: 6, marginRight: '1rem' }}
                            id='spdxConcludedLicenseValue'
                            className='form-control'
                            type='text'
                            name='_sw360_portlet_components_CONCLUDED_LICENSE_VALUE'
                            placeholder='Enter concluded license'
                            value={packageInformation.licenseConcluded ?? ''}
                            disabled={concludedLicenseNone || concludedLicenseNoasserttion}
                        />
                    </div>
                    <div style={{ flex: 2 }}>
                        <input
                            className='spdx-radio'
                            id='licenseConcludedNone'
                            type='radio'
                            name='_sw360_portlet_components_LICENSE_CONCLUDED'
                            value='NONE'
                            onClick={selectConcludedLicenseNone}
                            checked={concludedLicenseNone}
                        />
                        <label
                            style={{ marginRight: '2rem' }}
                            className='form-check-label radio-label lableSPDX'
                            htmlFor='spdxConcludedLicenseNone'
                        >
                            NONE
                        </label>
                        <input
                            className='spdx-radio'
                            id='licenseConcludedNoAssertion'
                            type='radio'
                            name='_sw360_portlet_components_LICENSE_CONCLUDED'
                            value='NOASSERTION'
                            onClick={selectConcludedLicenseNoasserttion}
                            checked={concludedLicenseNoasserttion}
                        />
                        <label className='form-check-label radio-label lableSPDX' htmlFor='licenseConcludedNoAssertion'>
                            NOASSERTION
                        </label>
                    </div>
                </div>
            </div>
        </td>
    )
}

export default PackageConcludedLicense
