// Copyright (C) Siemens AG, 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

import PackageInformation from '../../../../../../../../object-types/spdx/PackageInformation'
// import { useTranslations } from 'next-intl'

interface Props {
    packageInformation?: PackageInformation
    setDeclaredLicenseToPackage?: any
    declaredLicenseExist?: boolean
    setDeclaredLicenseExist?: React.Dispatch<React.SetStateAction<boolean>>
    declaredLicenseNone?: boolean
    setDeclaredLicenseNone?: React.Dispatch<React.SetStateAction<boolean>>
    declaredLicenseNoasserttion?: boolean
    setDeclaredLicenseNoasserttion?: React.Dispatch<React.SetStateAction<boolean>>
}

function PackageDeclaredLicense({
    packageInformation,
    setDeclaredLicenseToPackage,
    declaredLicenseExist,
    setDeclaredLicenseExist,
    declaredLicenseNone,
    setDeclaredLicenseNone,
    declaredLicenseNoasserttion,
    setDeclaredLicenseNoasserttion,
}: Props) {
    const selectDeclaredLicenseExist = () => {
        setDeclaredLicenseExist(true)
        setDeclaredLicenseNone(false)
        setDeclaredLicenseNoasserttion(false)
    }
    const selectDeclaredLicenseNone = () => {
        setDeclaredLicenseExist(false)
        setDeclaredLicenseNone(true)
        setDeclaredLicenseNoasserttion(false)
    }
    const selectDeclaredLicenseNoasserttion = () => {
        setDeclaredLicenseExist(false)
        setDeclaredLicenseNone(false)
        setDeclaredLicenseNoasserttion(true)
    }

    const updateField = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDeclaredLicenseToPackage(e.target.value)
    }

    return (
        <td colSpan={3}>
            <div className='form-group'>
                <label className='lableSPDX'>7.15 Declared license</label>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ display: 'inline-flex', flex: 3, marginRight: '1rem' }}>
                        <input
                            className='spdx-radio'
                            id='licenseDeclaredExist'
                            type='radio'
                            name='_sw360_portlet_components_DECLARED_LICENSE'
                            value='EXIST'
                            onClick={selectDeclaredLicenseExist}
                            checked={declaredLicenseExist}
                        />
                        <input
                            style={{ flex: 6, marginRight: '1rem' }}
                            id='spdxConcludedLicenseValue'
                            className='form-control'
                            type='text'
                            name='licenseDeclared'
                            placeholder='Enter declared license'
                            onChange={updateField}
                            value={packageInformation.licenseDeclared ?? ''}
                            disabled={declaredLicenseNone || declaredLicenseNoasserttion}
                        />
                    </div>
                    <div style={{ flex: 2 }}>
                        <input
                            className='spdx-radio'
                            id='licenseDeclaredNone'
                            type='radio'
                            name='_sw360_portlet_components_DECLARED_LICENSE'
                            value='NONE'
                            onClick={selectDeclaredLicenseNone}
                            checked={declaredLicenseNone}
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
                            id='licenseDeclaredNoAssertion'
                            type='radio'
                            name='_sw360_portlet_components_DECLARED_LICENSE'
                            value='NOASSERTION'
                            onClick={selectDeclaredLicenseNoasserttion}
                            checked={declaredLicenseNoasserttion}
                        />
                        <label className='form-check-label radio-label lableSPDX' htmlFor='licenseDeclaredNoAssertion'>
                            NOASSERTION
                        </label>
                    </div>
                </div>
            </div>
        </td>
    )
}

export default PackageDeclaredLicense
