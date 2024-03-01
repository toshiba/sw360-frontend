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
    setAllLicensesInformationToPackage?: any
    allLicensesInformationExist?: boolean
    setAllLicensesInformationExist?: React.Dispatch<React.SetStateAction<boolean>>
    allLicensesInformationNone?: boolean
    setAllLicensesInformationNone?: React.Dispatch<React.SetStateAction<boolean>>
    allLicensesInformationNoasserttion?: boolean
    setAllLicensesInformationNoasserttion?: React.Dispatch<React.SetStateAction<boolean>>
    allLicensesInformation?: string[]
}

function PackageAllLicensesInformation({
    allLicensesInformation,
    packageInformation,
    setAllLicensesInformationToPackage,
    allLicensesInformationExist,
    setAllLicensesInformationExist,
    allLicensesInformationNone,
    setAllLicensesInformationNone,
    allLicensesInformationNoasserttion,
    setAllLicensesInformationNoasserttion,
}: Props) {
    const selectAllLicensesInformationExist = () => {
        setAllLicensesInformationExist(true)
        setAllLicensesInformationNone(false)
        setAllLicensesInformationNoasserttion(false)
        setAllLicensesInformationToPackage(allLicensesInformation)
    }
    const selectAllLicensesInformationNone = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAllLicensesInformationExist(false)
        setAllLicensesInformationNone(true)
        setAllLicensesInformationNoasserttion(false)
        setAllLicensesInformationToPackage(e.target.value)
    }
    const selectAllLicensesInformationNoasserttion = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAllLicensesInformationExist(false)
        setAllLicensesInformationNone(false)
        setAllLicensesInformationNoasserttion(true)
        setAllLicensesInformationToPackage(e.target.value)
    }

    const updateField = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAllLicensesInformationToPackage(e.target.value.split('\n'))
    }
    return (
        <td colSpan={3}>
            <div className='form-group'>
                <label className='lableSPDX'>7.14 All licenses information from file</label>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ display: 'inline-flex', flex: 3, marginRight: '1rem' }}>
                        <input
                            className='spdx-radio'
                            id='licenseInfoFromFilesExist'
                            type='radio'
                            name='licenseInfoFromFiles'
                            value='EXIST'
                            onClick={selectAllLicensesInformationExist}
                            checked={allLicensesInformationExist}
                            disabled={!packageInformation?.filesAnalyzed}
                        />
                        <textarea
                            style={{ flex: 6, marginRight: '1rem' }}
                            id='licenseInfoInFileValue'
                            rows={5}
                            className='form-control'
                            name='licenseInfoFromFiles'
                            placeholder='Enter all licenses information from files'
                            onChange={updateField}
                            value={allLicensesInformation?.toString().replaceAll(',', '\n')}
                            disabled={
                                allLicensesInformationNone ||
                                allLicensesInformationNoasserttion ||
                                !packageInformation?.filesAnalyzed
                            }
                        ></textarea>
                    </div>
                    <div style={{ flex: 2 }}>
                        <input
                            className='spdx-radio'
                            id='licenseInfoFromFilesNone'
                            type='radio'
                            name='licenseInfoFromFiles'
                            value='NONE'
                            onChange={selectAllLicensesInformationNone}
                            checked={allLicensesInformationNone}
                            disabled={!packageInformation?.filesAnalyzed}
                        />
                        <label
                            style={{ marginRight: '2rem' }}
                            className='form-check-label radio-label lableSPDX'
                            htmlFor='licenseInfoInFileNone'
                        >
                            NONE
                        </label>
                        <input
                            className='spdx-radio'
                            id='licenseInfoFromFilesNoAssertion'
                            type='radio'
                            name='licenseInfoFromFiles'
                            value='NOASSERTION'
                            onChange={selectAllLicensesInformationNoasserttion}
                            checked={allLicensesInformationNoasserttion}
                            disabled={!packageInformation?.filesAnalyzed}
                        />
                        <label
                            className='form-check-label radio-label lableSPDX'
                            htmlFor='licenseInfoFromFilesNoAssertion'
                        >
                            NOASSERTION
                        </label>
                    </div>
                </div>
            </div>
        </td>
    )
}

export default PackageAllLicensesInformation
