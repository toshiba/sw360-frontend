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
// import SPDXDocument from '../../../../../../../object-types/spdx/SPDXDocument'
// import SnippetInformation from '../../../../../../../object-types/spdx/SnippetInformation'
import styles from '../detail.module.css'

// interface Props {
//     // snippetInformations?: Array<SnippetInformation>
//     spdxDocument?: SPDXDocument
//     snippetInformation?: SnippetInformation
//     setSnippetInformation?: React.Dispatch<React.SetStateAction<SnippetInformation>>
// }

const SnippetInformationDetail = () =>
    // { spdxDocument, snippetInformation, setSnippetInformation }: Props
    {
        const [toggle, setToggle] = useState(false)

        // const displayIndex = (e: React.ChangeEvent<HTMLSelectElement>) => {
        //     const index: string = e.target.value
        //     setSnippetInformation(spdxDocument.snippets[+index])
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
                        <th colSpan={3}>9. Snippet Information</th>
                    </tr>
                </thead>
                <tbody hidden={toggle}>
                    <tr>
                        <td colSpan={3}>
                            <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '1rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '0.75rem' }}>
                                    <label
                                        htmlFor='selectSnippet'
                                        style={{ textDecoration: 'underline' }}
                                        className='sub-title lableSPDX'
                                    >
                                        Select Snippet
                                    </label>
                                    <select id='selectSnippet' className='form-control spdx-select'></select>
                                    <FaTrashAlt />
                                </div>
                                <button className='spdx-add-button-main' name='add-snippet'>
                                    Add new Snippet
                                </button>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td style={{ width: '600px' }}>
                            <div className='form-group' style={{ flex: 1 }}>
                                <label className='lableSPDX' htmlFor='snippetSpdxIdentifier'>
                                    9.1 Snippet SPDX identifier
                                </label>
                                <div style={{ display: 'flex' }}>
                                    <label className='sub-label lableSPDX'>SPDXRef-</label>
                                    <input
                                        id='snippetSpdxIdentifier'
                                        className='form-control'
                                        name='_sw360_portlet_components_SPDXSPDX_IDENTIFIER'
                                        type='text'
                                        placeholder='Enter snippet SPDX identifier'
                                    />
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className='form-group' style={{ flex: 1 }}>
                                <label className='lableSPDX' htmlFor='snippetFromFile'>
                                    9.2 Snippet from file SPDX identifier
                                </label>
                                <div style={{ display: 'flex' }}>
                                    <select id='snippetFromFile' className='form-control' style={{ flex: 1 }}>
                                        <option>SPDXRef</option>
                                        <option>DocumentRef</option>
                                    </select>
                                    <div style={{ margin: '0.5rem' }}>-</div>
                                    <input
                                        style={{ flex: 3 }}
                                        id='snippetFromFileValue'
                                        className='form-control'
                                        name='_sw360_portlet_components_SPDXSPDX_VERSION'
                                        type='text'
                                        placeholder='Enter snippet from file SPDX identifier'
                                    />
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <div className='form-group'>
                                <label className='lableSPDX'>9.3 & 9.4 Snippet ranges</label>
                                <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '1rem' }}>
                                    <div style={{ display: 'none', marginBottom: '0.75rem' }}>
                                        <select
                                            style={{ flex: 1, marginRight: '1rem' }}
                                            className='form-control range-type'
                                        >
                                            <option value='BYTE' selected>
                                                BYTE
                                            </option>
                                            <option value='LINE'>LINE</option>
                                        </select>
                                        <input
                                            style={{ flex: 2, marginRight: '1rem' }}
                                            type='text'
                                            className='form-control start-pointer'
                                            placeholder='Enter start pointer'
                                        />
                                        <input
                                            style={{ flex: 2, marginRight: '1rem' }}
                                            type='text'
                                            className='form-control end-pointer'
                                            placeholder='Enter end pointer'
                                        />
                                        <input
                                            style={{ flex: 4, marginRight: '2rem' }}
                                            type='text'
                                            className='form-control reference'
                                            placeholder='Enter reference'
                                        />
                                        <svg
                                            className='lexicon-icon spdx-delete-icon-sub hidden'
                                            name='delete-snippetRange'
                                            data-row-id=''
                                            viewBox='0 0 512 512'
                                        >
                                            <title>delete</title>
                                            <path
                                                className='lexicon-icon-outline lx-trash-body-border'
                                                d='M64.4,440.7c0,39.3,31.9,71.3,71.3,71.3h240.6c39.3,0,71.3-31.9,71.3-71.3v-312H64.4V440.7z M128.2,192.6h255.5v231.7c0,13.1-10.7,23.8-23.8,23.8H152c-13.1,0-23.8-10.7-23.8-23.8V192.6z'
                                            ></path>
                                            <polygon
                                                className='lexicon-icon-outline lx-trash-lid'
                                                points='351.8,32.9 351.8,0 160.2,0 160.2,32.9 64.4,32.9 64.4,96.1 447.6,96.1 447.6,32.9 '
                                            ></polygon>
                                            <rect
                                                className='lexicon-icon-outline lx-trash-line-2'
                                                x='287.9'
                                                y='223.6'
                                                width='63.9'
                                                height='191.6'
                                            ></rect>
                                            <rect
                                                className='lexicon-icon-outline lx-trash-line-1'
                                                x='160.2'
                                                y='223.6'
                                                width='63.9'
                                                height='191.6'
                                            ></rect>
                                        </svg>
                                    </div>
                                    <button id='addNewRange' className='spdx-add-button-sub'>
                                        Add new Range
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <div className='form-group'>
                                <label className='lableSPDX'>9.5 Snippet concluded license</label>
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
                                            placeholder='Enter snippet concluded license'
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
                                <label className='lableSPDX'>9.6 License information in snippet</label>
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
                                            placeholder='Enter license information in snippet'
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
                                <label className='lableSPDX' htmlFor='snippetLicenseComments'>
                                    9.7 Snippet comments on license
                                </label>
                                <textarea
                                    className='form-control'
                                    id='snippetLicenseComments'
                                    rows={5}
                                    placeholder='Enter snippet comments on license'
                                ></textarea>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <div className='form-group'>
                                <label className='lableSPDX'>9.8 Snippet copyright text</label>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <div style={{ display: 'inline-flex', flex: 3, marginRight: '1rem' }}>
                                        <input
                                            className='spdx-radio'
                                            id='snippetCopyrightText'
                                            type='radio'
                                            name='_sw360_portlet_components_SNIPPET_COPYRIGHT_TEXT'
                                            value='EXIST'
                                        />
                                        <textarea
                                            style={{ flex: 6, marginRight: '1rem' }}
                                            id='copyrightTextValueSnippet'
                                            rows={5}
                                            className='form-control'
                                            placeholder='Enter snippet copyright text'
                                        ></textarea>
                                    </div>
                                    <div style={{ flex: 2 }}>
                                        <input
                                            className='spdx-radio'
                                            id='snippetCopyrightTextNone'
                                            type='radio'
                                            name='_sw360_portlet_components_SNIPPET_COPYRIGHT_TEXT'
                                            value='NONE'
                                        />
                                        <label
                                            style={{ marginRight: '2rem' }}
                                            className='form-check-label radio-label lableSPDX'
                                            htmlFor='snippetCopyrightTextNone'
                                        >
                                            NONE
                                        </label>
                                        <input
                                            className='spdx-radio'
                                            id='snippetCopyrightTextNoAssertion'
                                            type='radio'
                                            name='_sw360_portlet_components_SNIPPET_COPYRIGHT_TEXT'
                                            value='NOASSERTION'
                                        />
                                        <label
                                            className='form-check-label radio-label lableSPDX'
                                            htmlFor='snippetCopyrightTextNoAssertion'
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
                                <label className='lableSPDX' htmlFor='snippetComment'>
                                    9.9 Snippet comment
                                </label>
                                <textarea
                                    className='form-control'
                                    id='snippetComment'
                                    rows={5}
                                    placeholder='Enter snippet comment'
                                ></textarea>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <div className='form-group'>
                                <label className='lableSPDX' htmlFor='snippetName'>
                                    9.10 Snippet name
                                </label>
                                <input
                                    id='snippetName'
                                    type='text'
                                    className='form-control'
                                    placeholder='Enter snippet name'
                                />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <div className='form-group'>
                                <label className='lableSPDX' htmlFor='snippetAttributionText'>
                                    9.11 Snippet attribution text
                                </label>
                                <textarea
                                    className='form-control'
                                    id='snippetAttributionText'
                                    rows={5}
                                    placeholder='Enter snippet attribution text'
                                ></textarea>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }

export default SnippetInformationDetail
