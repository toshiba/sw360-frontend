// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'
import { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import OtherLicensingInformationDetected from '../../../../../../../object-types/spdx/OtherLicensingInformationDetected'
import styles from '../detail.module.css'

interface Props {
    isModeFull?: boolean
    indexOtherLicense?: number
    setIndexOtherLicense?: any
    otherLicensingInformationDetecteds?: OtherLicensingInformationDetected[]
    setOtherLicensingInformationDetecteds?: React.Dispatch<React.SetStateAction<OtherLicensingInformationDetected[]>>
}

const EditOtherLicensingInformationDetected = ({
    isModeFull,
    indexOtherLicense,
    setIndexOtherLicense,
    otherLicensingInformationDetecteds,
    setOtherLicensingInformationDetecteds,
}: Props) => {
    const [toggle, setToggle] = useState(false)
    const [licenseName, setLicenseName] = useState(true)

    const displayIndex = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const index: string = e.target.value
        setIndexOtherLicense(+index)
    }

    const addOtherLicensingInformationDetecteds = () => {
        const arrayExternals: OtherLicensingInformationDetected[] = [...otherLicensingInformationDetecteds]
        const otherLicensingInformationDetected: OtherLicensingInformationDetected = {
            licenseId: '', // 10.1
            extractedText: '', // 10.2
            licenseName: '', // 10.3
            licenseCrossRefs: [], // 10.4
            licenseComment: '', // 10.5
            index: otherLicensingInformationDetecteds.length,
        }
        arrayExternals.push(otherLicensingInformationDetected)
        setOtherLicensingInformationDetecteds(arrayExternals)
    }

    const updateField = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        setOtherLicensingInformationDetecteds((currents) =>
            currents.map((otherLicensing, index) => {
                if (index === indexOtherLicense) {
                    return {
                        ...otherLicensing,
                        [e.target.name]:
                            e.target.name === 'licenseCrossRefs' ? e.target.value.split('\n') : e.target.value,
                    }
                }
                return otherLicensing
            })
        )
    }

    return (
        <table className={`table label-value-table ${styles['summary-table']}`}>
            <thead
                title='Click to expand or collapse'
                onClick={() => {
                    setToggle(!toggle)
                }}
            >
                <tr>
                    <th colSpan={3}>10. Other Licensing Information Detected</th>
                </tr>
            </thead>
            <tbody hidden={toggle}>
                <tr>
                    <td>
                        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '1rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '0.75rem' }}>
                                <label
                                    htmlFor='selectOtherLicensing'
                                    style={{ textDecoration: 'underline' }}
                                    className='sub-title lableSPDX'
                                >
                                    Select Other Licensing
                                </label>
                                <select
                                    id='selectOtherLicensing'
                                    className='form-control spdx-select'
                                    onChange={displayIndex}
                                >
                                    {otherLicensingInformationDetecteds.map((item) => (
                                        <option key={item.index} value={item.index}>
                                            {item.index + 1}
                                        </option>
                                    ))}
                                </select>
                                <FaTrashAlt />
                            </div>
                            <button
                                className='spdx-add-button-main'
                                name='add-otherLicensing'
                                onClick={addOtherLicensingInformationDetecteds}
                            >
                                Add new Licensing
                            </button>
                        </div>
                    </td>
                </tr>
                {otherLicensingInformationDetecteds[indexOtherLicense] && (
                    <>
                        <tr>
                            <td>
                                <div className='form-group'>
                                    <label className='mandatory lableSPDX' htmlFor='licenseId'>
                                        10.1 License identifier
                                    </label>
                                    <div style={{ display: 'flex' }}>
                                        <label className='sub-label lableSPDX'>LicenseRef-</label>
                                        <input
                                            id='licenseId'
                                            className='form-control needs-validation'
                                            type='text'
                                            placeholder='Enter license identifier'
                                            name='licenseId'
                                            onChange={updateField}
                                            value={
                                                otherLicensingInformationDetecteds[
                                                    indexOtherLicense
                                                ].licenseId?.startsWith('LicenseRef-')
                                                    ? otherLicensingInformationDetecteds[
                                                          indexOtherLicense
                                                      ].licenseId?.substring(11)
                                                    : otherLicensingInformationDetecteds[indexOtherLicense].licenseId
                                            }
                                        />
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className='form-group'>
                                    <label className='mandatory lableSPDX' htmlFor='extractedText'>
                                        10.2 Extracted text
                                    </label>
                                    <textarea
                                        className='form-control needs-validation'
                                        id='extractedText'
                                        rows={5}
                                        name='extractedText'
                                        onChange={updateField}
                                        placeholder='Enter extracted text'
                                        value={
                                            otherLicensingInformationDetecteds[indexOtherLicense].extractedText ?? ''
                                        }
                                    ></textarea>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}>
                                <div className='form-group'>
                                    <label className='lableSPDX'>10.3 License name</label>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <div style={{ display: 'inline-flex', flex: 3, marginRight: '1rem' }}>
                                            <input
                                                className='spdx-radio'
                                                id='licenseNameExist'
                                                type='radio'
                                                name='_sw360_portlet_components_LICENSE_NAME'
                                                value='EXIST'
                                                onClick={() => setLicenseName(true)}
                                                checked={licenseName}
                                            />
                                            <input
                                                style={{ flex: 6, marginRight: '1rem' }}
                                                id='licenseName'
                                                className='form-control needs-validation'
                                                type='text'
                                                placeholder='Enter license name'
                                                name='licenseName'
                                                onChange={updateField}
                                                value={
                                                    otherLicensingInformationDetecteds[indexOtherLicense].licenseName ??
                                                    ''
                                                }
                                                disabled={!licenseName}
                                            />
                                        </div>
                                        <div style={{ flex: 2 }}>
                                            <input
                                                className='spdx-radio'
                                                id='licenseNameNoAssertion'
                                                type='radio'
                                                name='_sw360_portlet_components_LICENSE_NAME'
                                                value='NOASSERTION'
                                                onClick={() => setLicenseName(false)}
                                                checked={!licenseName}
                                            />
                                            <label
                                                className='form-check-label radio-label lableSPDX'
                                                htmlFor='licenseNameNoAssertion'
                                            >
                                                NOASSERTION
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        {isModeFull && (
                            <tr className='spdx-full'>
                                <td>
                                    <div className='form-group'>
                                        <label className='lableSPDX' htmlFor='licenseCrossRefs'>
                                            10.4 License cross reference
                                        </label>
                                        <textarea
                                            className='form-control'
                                            id='licenseCrossRefs'
                                            rows={5}
                                            placeholder='Enter license cross reference'
                                            name='licenseCrossRefs'
                                            onChange={updateField}
                                            value={
                                                otherLicensingInformationDetecteds[indexOtherLicense]
                                                    .licenseCrossRefs ?? ''
                                            }
                                        ></textarea>
                                    </div>
                                </td>
                            </tr>
                        )}
                        <tr>
                            <td>
                                <div className='form-group'>
                                    <label className='lableSPDX' htmlFor='licenseComment'>
                                        10.5 License comment
                                    </label>
                                    <textarea
                                        className='form-control'
                                        id='licenseCommentOnOtherLicensing'
                                        rows={5}
                                        placeholder='Enter license comment'
                                        name='licenseComment'
                                        onChange={updateField}
                                        value={
                                            otherLicensingInformationDetecteds[indexOtherLicense].licenseComment ?? ''
                                        }
                                    ></textarea>
                                </div>
                            </td>
                        </tr>
                    </>
                )}
            </tbody>
        </table>
    )
}

export default EditOtherLicensingInformationDetected
