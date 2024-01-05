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
import styles from '../detail.module.css'

// interface Props {
//     packageInformation?: PackageInformation
//     externalRefsData?: ExternalReference
//     setExternalRefsData?: React.Dispatch<React.SetStateAction<ExternalReference>>
//     isModeFull?: boolean
// }

const PackageInformationDetail = () =>
    // { packageInformation, externalRefsData, setExternalRefsData, isModeFull }: Props
    {
        const [toggle, setToggle] = useState(false)

        // const displayIndex = (e: React.ChangeEvent<HTMLSelectElement>) => {
        //     const index: string = e.target.value
        //     setExternalRefsData(packageInformation.externalRefs[+index])
        // }

        return (
            <table className={`table label-value-table ${styles['summary-table']}`}>
                <thead
                    title='Click to expand or collapse'
                    onClick={() => {
                        setToggle(!toggle)
                    }}
                >
                    <tr>
                        <th colSpan={3}>7. Package Information</th>
                    </tr>
                </thead>
                <tbody hidden={toggle}>
                    <tr>
                        <td>
                            <div className='form-group'>
                                <label className='lableSPDX' htmlFor='packageName'>
                                    7.1 Package name
                                </label>
                                <div style={{ display: 'flex' }}>
                                    <input
                                        id='packageName'
                                        className='form-control needs-validation'
                                        type='text'
                                        placeholder='Enter package name'
                                        name='_sw360_portlet_components_PACKAGE_NAME'
                                        value=''
                                    />
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className='form-group'>
                                <label className='lableSPDX' htmlFor='packageSPDXId'>
                                    7.2 Package SPDX identifier
                                </label>
                                <div style={{ display: 'flex' }}>
                                    <label className='sub-label'>SPDXRef-</label>
                                    <input
                                        id='packageSPDXId'
                                        className='form-control needs-validation'
                                        type='text'
                                        placeholder='Enter package SPDX identifier'
                                        name='_sw360_portlet_components_PACKAGE_SPDX_ID'
                                        value=''
                                    />
                                </div>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <div className='form-group'>
                                <label className='lableSPDX' htmlFor='packageName'>
                                    7.3 Package version
                                </label>
                                <div style={{ display: 'flex' }}>
                                    <input
                                        id='versionInfo'
                                        className='form-control'
                                        type='text'
                                        placeholder='Enter package version'
                                        name='_sw360_portlet_components_VERSION_INFO'
                                        value=''
                                    />
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className='form-group'>
                                <label className='lableSPDX' htmlFor='packageSPDXId'>
                                    7.4 Package file name
                                </label>
                                <div style={{ display: 'flex' }}>
                                    <input
                                        id='packageFileName'
                                        className='form-control'
                                        type='text'
                                        placeholder='Enter package file name'
                                        name='_sw360_portlet_components_PACKAGE_FILE_NAME'
                                        value=''
                                    />
                                </div>
                            </div>
                        </td>
                    </tr>

                    <tr className='spdx-full'>
                        <td colSpan={3}>
                            <div className='form-group'>
                                <label className='lableSPDX'>7.5 Package supplier</label>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <div style={{ display: 'inline-flex', flex: 3, marginRight: '1rem' }}>
                                        <input
                                            className='spdx-radio'
                                            type='radio'
                                            name='_sw360_portlet_components_SUPPLIER'
                                            value='EXIST'
                                        />
                                        <select
                                            id='supplierType'
                                            style={{ flex: 2, marginRight: '1rem' }}
                                            className='form-control'
                                        >
                                            <option>Organization</option>
                                            <option>Person</option>
                                        </select>
                                        <input
                                            style={{ flex: 6, marginRight: '1rem' }}
                                            id='supplierValue'
                                            className='form-control'
                                            type='text'
                                            name='_sw360_portlet_components_SUPPLIER_VALUE'
                                            placeholder='Enter package supplier'
                                        />
                                    </div>
                                    <div style={{ flex: 2 }}>
                                        <input
                                            className='spdx-radio lableSPDX'
                                            id='supplierNoAssertion'
                                            type='radio'
                                            name='_sw360_portlet_components_SUPPLIER'
                                            value='NOASSERTION'
                                        />
                                        <label
                                            className='form-check-label radio-label lableSPDX'
                                            htmlFor='supplierNoAssertion'
                                        >
                                            NOASSERTION
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr className='spdx-full'>
                        <td colSpan={3}>
                            <div className='form-group'>
                                <label className='lableSPDX'>7.6 Package originator</label>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <div style={{ display: 'inline-flex', flex: 3, marginRight: '1rem' }}>
                                        <input
                                            className='spdx-radio'
                                            type='radio'
                                            name='_sw360_portlet_components_ORIGINATOR'
                                            value='EXIST'
                                        />
                                        <select
                                            id='originatorType'
                                            style={{ flex: 2, marginRight: '1rem' }}
                                            className='form-control'
                                        >
                                            <option>Organization</option>
                                            <option>Person</option>
                                        </select>
                                        <input
                                            style={{ flex: 6, marginRight: '1rem' }}
                                            className='form-control'
                                            id='originatorValue'
                                            type='text'
                                            name='_sw360_portlet_components_ORIGINATOR_VALUE'
                                            placeholder='Enter package originator'
                                        />
                                    </div>
                                    <div style={{ flex: 2 }}>
                                        <input
                                            className='spdx-radio'
                                            id='originatorNoAssertion'
                                            type='radio'
                                            name='_sw360_portlet_components_ORIGINATOR'
                                            value='NOASSERTION'
                                        />
                                        <label
                                            className='form-check-label radio-label lableSPDX'
                                            htmlFor='originatorNoAssertion'
                                        >
                                            NOASSERTION
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <div className='form-group'>
                                <label className='lableSPDX'>7.7 Package download location</label>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <div style={{ display: 'inline-flex', flex: 3, marginRight: '1rem' }}>
                                        <input
                                            className='spdx-radio'
                                            id='spdxConcludedLicenseExist'
                                            type='radio'
                                            name='_sw360_portlet_components_CONCLUDED_LICENSE'
                                            value='EXIST'
                                        />
                                        <input
                                            style={{ flex: 6, marginRight: '1rem' }}
                                            id='spdxConcludedLicenseValue'
                                            className='form-control'
                                            type='text'
                                            name='_sw360_portlet_components_CONCLUDED_LICENSE_VALUE'
                                            placeholder='Enter package supplier'
                                        />
                                    </div>
                                    <div style={{ flex: 2 }}>
                                        <input
                                            className='spdx-radio'
                                            id='spdxConcludedLicenseNone'
                                            type='radio'
                                            name='_sw360_portlet_components_CONCLUDED_LICENSE'
                                            value='NONE'
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
                                            id='spdxConcludedLicenseNoAssertion'
                                            type='radio'
                                            name='_sw360_portlet_components_CONCLUDED_LICENSE'
                                            value='NOASSERTION'
                                        />
                                        <label
                                            className='form-check-label radio-label lableSPDX'
                                            htmlFor='spdxConcludedLicenseNoAssertion'
                                        >
                                            NOASSERTION
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <div className='form-group'>
                                <label className='lableSPDX'>7.8 Files analyzed</label>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <div>
                                        <input
                                            className='spdx-radio'
                                            id='FilesAnalyzedTrue'
                                            type='radio'
                                            name='_sw360_portlet_components_FILES_ANALYZED'
                                            checked
                                            value='true'
                                        />
                                        <label
                                            style={{ marginRight: '2rem' }}
                                            className='form-check-label radio-label lableSPDX'
                                            htmlFor='FilesAnalyzedTrue'
                                        >
                                            TRUE
                                        </label>
                                        <input
                                            className='spdx-radio'
                                            id='FilesAnalyzedFalse'
                                            type='radio'
                                            name='_sw360_portlet_components_FILES_ANALYZED'
                                            value='false'
                                        />
                                        <label
                                            className='form-check-label radio-label lableSPDX'
                                            htmlFor='FilesAnalyzedFalse'
                                        >
                                            FALSE
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr className='spdx-full'>
                        <td colSpan={3}>
                            <div className='form-group'>
                                <label className='lableSPDX' htmlFor='verificationCodeValue'>
                                    7.9 Package verification code
                                </label>
                                <div>
                                    <input
                                        style={{ marginBottom: '0.75rem' }}
                                        className='form-control'
                                        id='verificationCodeValue'
                                        name='_sw360_portlet_components_VERIFICATION_CODE_VALUE'
                                        placeholder='Enter verification code value'
                                    ></input>
                                    <textarea
                                        className='form-control'
                                        id='excludedFiles'
                                        rows={5}
                                        name='_sw360_portlet_components_EXCLUDED_FILES'
                                        placeholder='Enter excluded files'
                                    ></textarea>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr className='spdx-full'>
                        <td colSpan={3}>
                            <div className='form-group'>
                                <label className='lableSPDX'>7.10 Package checksum</label>
                                <div style={{ display: 'flex' }}>
                                    <label className='sub-title lableSPDX'>Checksum</label>
                                    <div style={{ display: 'flex', flexDirection: 'column', flex: 7 }}>
                                        <div style={{ display: 'none', marginBottom: '0.75rem' }}>
                                            <input
                                                style={{ flex: 2, marginRight: '1rem' }}
                                                type='text'
                                                className='form-control checksum-algorithm'
                                                placeholder='Enter algorithm'
                                            />
                                            <input
                                                style={{ flex: 6, marginRight: '2rem' }}
                                                type='text'
                                                className='form-control checksum-value'
                                                placeholder='Enter value'
                                            />
                                            <FaTrashAlt />
                                        </div>
                                        <button
                                            id='addNewAlgorithm'
                                            className='spdx-add-button-sub spdx-add-button-sub-checksum'
                                        >
                                            Add new algorithm
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <div className='form-group'>
                                <label className='lableSPDX'>7.11 Package home page</label>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <div style={{ display: 'inline-flex', flex: 3, marginRight: '1rem' }}>
                                        <input
                                            className='spdx-radio'
                                            id='spdxConcludedLicenseExist'
                                            type='radio'
                                            name='_sw360_portlet_components_CONCLUDED_LICENSE'
                                            value='EXIST'
                                        />
                                        <input
                                            style={{ flex: 6, marginRight: '1rem' }}
                                            id='spdxConcludedLicenseValue'
                                            className='form-control'
                                            type='text'
                                            name='_sw360_portlet_components_CONCLUDED_LICENSE_VALUE'
                                            placeholder='Enter package homepage'
                                        />
                                    </div>
                                    <div style={{ flex: 2 }}>
                                        <input
                                            className='spdx-radio'
                                            id='spdxConcludedLicenseNone'
                                            type='radio'
                                            name='_sw360_portlet_components_CONCLUDED_LICENSE'
                                            value='NONE'
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
                                            id='spdxConcludedLicenseNoAssertion'
                                            type='radio'
                                            name='_sw360_portlet_components_CONCLUDED_LICENSE'
                                            value='NOASSERTION'
                                        />
                                        <label
                                            className='form-check-label radio-label lableSPDX'
                                            htmlFor='spdxConcludedLicenseNoAssertion'
                                        >
                                            NOASSERTION
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr className='spdx-full'>
                        <td colSpan={3}>
                            <div className='form-group'>
                                <label className='lableSPDX' htmlFor='verificationCodeValue'>
                                    7.12 Source information
                                </label>
                                <div>
                                    <textarea
                                        className='form-control'
                                        id='excludedFiles'
                                        rows={5}
                                        name='_sw360_portlet_components_EXCLUDED_FILES'
                                        placeholder='Enter excluded files'
                                    ></textarea>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <div className='form-group'>
                                <label className='lableSPDX'>7.13 Concluded license</label>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <div style={{ display: 'inline-flex', flex: 3, marginRight: '1rem' }}>
                                        <input
                                            className='spdx-radio'
                                            id='spdxConcludedLicenseExist'
                                            type='radio'
                                            name='_sw360_portlet_components_CONCLUDED_LICENSE'
                                            value='EXIST'
                                        />
                                        <input
                                            style={{ flex: 6, marginRight: '1rem' }}
                                            id='spdxConcludedLicenseValue'
                                            className='form-control'
                                            type='text'
                                            name='_sw360_portlet_components_CONCLUDED_LICENSE_VALUE'
                                            placeholder='Enter concluded license'
                                        />
                                    </div>
                                    <div style={{ flex: 2 }}>
                                        <input
                                            className='spdx-radio'
                                            id='spdxConcludedLicenseNone'
                                            type='radio'
                                            name='_sw360_portlet_components_CONCLUDED_LICENSE'
                                            value='NONE'
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
                                            id='spdxConcludedLicenseNoAssertion'
                                            type='radio'
                                            name='_sw360_portlet_components_CONCLUDED_LICENSE'
                                            value='NOASSERTION'
                                        />
                                        <label
                                            className='form-check-label radio-label lableSPDX'
                                            htmlFor='spdxConcludedLicenseNoAssertion'
                                        >
                                            NOASSERTION
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <div className='form-group'>
                                <label className='lableSPDX'>7.14 All licenses information from file</label>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <div style={{ display: 'inline-flex', flex: 3, marginRight: '1rem' }}>
                                        <input
                                            className='spdx-radio'
                                            id='licenseInfoInFile'
                                            type='radio'
                                            name='_sw360_portlet_components_LICENSE_INFO_IN_FILE'
                                            value='EXIST'
                                        />
                                        <textarea
                                            style={{ flex: 6, marginRight: '1rem' }}
                                            id='licenseInfoInFileValue'
                                            rows={5}
                                            className='form-control'
                                            name='_sw360_portlet_components_LICENSE_INFO_IN_FILE_SOURCE'
                                            placeholder='Enter all licenses information from files'
                                        ></textarea>
                                    </div>
                                    <div style={{ flex: 2 }}>
                                        <input
                                            className='spdx-radio'
                                            id='licenseInfoInFileNone'
                                            type='radio'
                                            name='_sw360_portlet_components_LICENSE_INFO_IN_FILE'
                                            value='NONE'
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
                                            id='licenseInfoInFileNoAssertion'
                                            type='radio'
                                            name='_sw360_portlet_components_LICENSE_INFO_IN_FILE'
                                            value='NOASSERTION'
                                        />
                                        <label
                                            className='form-check-label radio-label lableSPDX'
                                            htmlFor='licenseInfoInFileNoAssertion'
                                        >
                                            NOASSERTION
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <div className='form-group'>
                                <label className='lableSPDX'>7.15 Declared license</label>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <div style={{ display: 'inline-flex', flex: 3, marginRight: '1rem' }}>
                                        <input
                                            className='spdx-radio'
                                            id='spdxConcludedLicenseExist'
                                            type='radio'
                                            name='_sw360_portlet_components_CONCLUDED_LICENSE'
                                            value='EXIST'
                                        />
                                        <input
                                            style={{ flex: 6, marginRight: '1rem' }}
                                            id='spdxConcludedLicenseValue'
                                            className='form-control'
                                            type='text'
                                            name='_sw360_portlet_components_CONCLUDED_LICENSE_VALUE'
                                            placeholder='Enter declared license'
                                        />
                                    </div>
                                    <div style={{ flex: 2 }}>
                                        <input
                                            className='spdx-radio'
                                            id='spdxConcludedLicenseNone'
                                            type='radio'
                                            name='_sw360_portlet_components_CONCLUDED_LICENSE'
                                            value='NONE'
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
                                            id='spdxConcludedLicenseNoAssertion'
                                            type='radio'
                                            name='_sw360_portlet_components_CONCLUDED_LICENSE'
                                            value='NOASSERTION'
                                        />
                                        <label
                                            className='form-check-label radio-label lableSPDX'
                                            htmlFor='spdxConcludedLicenseNoAssertion'
                                        >
                                            NOASSERTION
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr className='spdx-full'>
                        <td colSpan={3}>
                            <div className='form-group'>
                                <label className='lableSPDX' htmlFor='verificationCodeValue'>
                                    7.16 Comments on license
                                </label>
                                <div>
                                    <textarea
                                        className='form-control'
                                        id='excludedFiles'
                                        rows={5}
                                        name='_sw360_portlet_components_EXCLUDED_FILES'
                                        placeholder='Enter excluded files'
                                    ></textarea>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <div className='form-group'>
                                <label className='lableSPDX'>7.17 Copyright text</label>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <div style={{ display: 'inline-flex', flex: 3, marginRight: '1rem' }}>
                                        <input
                                            className='spdx-radio'
                                            id='licenseInfoInFile'
                                            type='radio'
                                            name='_sw360_portlet_components_LICENSE_INFO_IN_FILE'
                                            value='EXIST'
                                        />
                                        <textarea
                                            style={{ flex: 6, marginRight: '1rem' }}
                                            id='licenseInfoInFileValue'
                                            rows={5}
                                            className='form-control'
                                            name='_sw360_portlet_components_LICENSE_INFO_IN_FILE_SOURCE'
                                            placeholder='Enter copyright text'
                                        ></textarea>
                                    </div>
                                    <div style={{ flex: 2 }}>
                                        <input
                                            className='spdx-radio'
                                            id='licenseInfoInFileNone'
                                            type='radio'
                                            name='_sw360_portlet_components_LICENSE_INFO_IN_FILE'
                                            value='NONE'
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
                                            id='licenseInfoInFileNoAssertion'
                                            type='radio'
                                            name='_sw360_portlet_components_LICENSE_INFO_IN_FILE'
                                            value='NOASSERTION'
                                        />
                                        <label
                                            className='form-check-label radio-label lableSPDX'
                                            htmlFor='licenseInfoInFileNoAssertion'
                                        >
                                            NOASSERTION
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr className='spdx-full'>
                        <td colSpan={3}>
                            <div className='form-group'>
                                <label className='lableSPDX' htmlFor='verificationCodeValue'>
                                    7.18 Package summary description
                                </label>
                                <div>
                                    <textarea
                                        className='form-control'
                                        id='excludedFiles'
                                        rows={5}
                                        name='_sw360_portlet_components_EXCLUDED_FILES'
                                        placeholder='Enter excluded files'
                                    ></textarea>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr className='spdx-full'>
                        <td colSpan={3}>
                            <div className='form-group'>
                                <label className='lableSPDX' htmlFor='verificationCodeValue'>
                                    7.19 Package detailed description
                                </label>
                                <div>
                                    <textarea
                                        className='form-control'
                                        id='excludedFiles'
                                        rows={5}
                                        name='_sw360_portlet_components_EXCLUDED_FILES'
                                        placeholder='Enter excluded files'
                                    ></textarea>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr className='spdx-full'>
                        <td colSpan={3}>
                            <div className='form-group'>
                                <label className='lableSPDX' htmlFor='verificationCodeValue'>
                                    7.20 Package comment
                                </label>
                                <div>
                                    <textarea
                                        className='form-control'
                                        id='excludedFiles'
                                        rows={5}
                                        name='_sw360_portlet_components_EXCLUDED_FILES'
                                        placeholder='Enter excluded files'
                                    ></textarea>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr className='spdx-full'>
                        <td colSpan={3}>
                            <div className='form-group section section-external-ref'>
                                <label className='lableSPDX'>7.21 External references</label>
                                <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '1rem' }}>
                                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '0.75rem' }}>
                                        <label style={{ textDecoration: 'underline' }} className='sub-title lableSPDX'>
                                            Select Reference
                                        </label>
                                        <select className='form-control spdx-select' id='externalReferences'></select>
                                        <svg
                                            className='disabled lexicon-icon spdx-delete-icon-main'
                                            name='delete-externalRef'
                                            data-row-id=''
                                            viewBox='0 0 512 512'
                                        >
                                            <title></title>
                                            <use href='/o/org.eclipse.sw360.liferay-theme/images/clay/icons.svg#trash' />
                                        </svg>
                                    </div>
                                    <button className='spdx-add-button-main' name='add-externalRef'>
                                        Add new Reference
                                    </button>
                                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '0.75rem' }}>
                                        <label className='sub-title lableSPDX'>Category</label>
                                        <select
                                            style={{ width: 'auto', flex: 'auto' }}
                                            id='referenceCategory'
                                            className='form-control'
                                            name='_sw360_portlet_components_REFERENCE_CATEGORY'
                                        >
                                            <option value='SECURITY'>SECURITY</option>
                                            <option value='PACKAGE-MANAGER'>PACKAGE-MANAGER</option>
                                            <option value='PERSISTENT-ID'>PERSISTENT-ID</option>
                                            <option value='OTHER'>OTHER</option>
                                        </select>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '0.75rem' }}>
                                        <label className='sub-title lableSPDX'>Type</label>
                                        <select
                                            style={{ width: 'auto', flex: 'auto' }}
                                            id='referenceType-1'
                                            className='form-control'
                                            name='_sw360_portlet_components_REFERENCE_TYPE-1'
                                        >
                                            <option>cpe22Type</option>
                                            <option>cpe23Type</option>
                                        </select>
                                        <input
                                            style={{ width: 'auto', flex: 'auto', display: 'none' }}
                                            id='referenceType-2'
                                            type='text'
                                            className='form-control'
                                            placeholder='Enter type'
                                            name='_sw360_portlet_components_REFERENCE_TYPE-2'
                                        />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '0.75rem' }}>
                                        <label className='sub-title lableSPDX'>Locator</label>
                                        <input
                                            style={{ width: 'auto', flex: 'auto' }}
                                            type='text'
                                            className='form-control'
                                            id='externalReferencesLocator'
                                            placeholder='Enter locator'
                                            name='_sw360_portlet_components_REFERENCE_LOCATOR'
                                        />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <label className='sub-title lableSPDX'>7.22 Comment</label>
                                        <textarea
                                            style={{ width: 'auto', flex: 'auto' }}
                                            rows={5}
                                            className='form-control'
                                            id='externalReferencesComment'
                                            placeholder='Enter comment'
                                            name='_sw360_portlet_components_REFERENCE_COMMENT'
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr className='spdx-full'>
                        <td colSpan={3}>
                            <div className='form-group'>
                                <label className='lableSPDX' htmlFor='verificationCodeValue'>
                                    7.23 Package attribution text
                                </label>
                                <div>
                                    <textarea
                                        className='form-control'
                                        id='excludedFiles'
                                        rows={5}
                                        name='_sw360_portlet_components_EXCLUDED_FILES'
                                        placeholder='Enter excluded files'
                                    ></textarea>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr className='spdx-full'>
                        <td colSpan={3}>
                            <div className='form-group'>
                                <label className='lableSPDX' htmlFor='verificationCodeValue'>
                                    7.24 Primary Package Purpose
                                </label>
                                <div>
                                    <textarea
                                        className='form-control'
                                        id='excludedFiles'
                                        rows={5}
                                        name='_sw360_portlet_components_EXCLUDED_FILES'
                                        placeholder='Enter excluded files'
                                    ></textarea>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr className='spdx-full'>
                        <td colSpan={3}>
                            <div className='form-group'>
                                <label className='lableSPDX' htmlFor='createdDate'>
                                    7.25 Release Date
                                </label>
                                <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '0.75rem' }}>
                                    <div>
                                        <input
                                            id='createdReleaseDate'
                                            type='date'
                                            className='form-control spdx-date needs-validation'
                                            placeholder='created.date.yyyy.mm.dd'
                                        />
                                    </div>
                                    <div>
                                        <input
                                            id='createdReleaseTime'
                                            type='time'
                                            step='1'
                                            className='form-control spdx-time needs-validation'
                                            placeholder='created.time.hh.mm.ss'
                                        />
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr className='spdx-full'>
                        <td colSpan={3}>
                            <div className='form-group'>
                                <label className='lableSPDX' htmlFor='createdDate'>
                                    7.26 Built Date
                                </label>
                                <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '0.75rem' }}>
                                    <div>
                                        <input
                                            id='createdReleaseDate'
                                            type='date'
                                            className='form-control spdx-date needs-validation'
                                            placeholder='created.date.yyyy.mm.dd'
                                        />
                                    </div>
                                    <div>
                                        <input
                                            id='createdReleaseTime'
                                            type='time'
                                            step='1'
                                            className='form-control spdx-time needs-validation'
                                            placeholder='created.time.hh.mm.ss'
                                        />
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr className='spdx-full'>
                        <td colSpan={3}>
                            <div className='form-group'>
                                <label className='lableSPDX' htmlFor='createdDate'>
                                    7.27 Valid Until Date
                                </label>
                                <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '0.75rem' }}>
                                    <div>
                                        <input
                                            id='createdReleaseDate'
                                            type='date'
                                            className='form-control spdx-date needs-validation'
                                            placeholder='created.date.yyyy.mm.dd'
                                        />
                                    </div>
                                    <div>
                                        <input
                                            id='createdReleaseTime'
                                            type='time'
                                            step='1'
                                            className='form-control spdx-time needs-validation'
                                            placeholder='created.time.hh.mm.ss'
                                        />
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }

export default PackageInformationDetail
