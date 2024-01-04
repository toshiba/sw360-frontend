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
import DocumentCreationInformation from '../../../../../../../object-types/spdx/DocumentCreationInformation'
import ExternalDocumentReferences from '../../../../../../../object-types/spdx/ExternalDocumentReferences'
import styles from '../detail.module.css'

interface Props {
    documentCreationInformation?: DocumentCreationInformation
    externalDocumentRef?: ExternalDocumentReferences
    setExternalDocumentRef?: React.Dispatch<React.SetStateAction<ExternalDocumentReferences>>
    isModeFull?: boolean
}

const DocumentCreationInformationDetail = ({
    documentCreationInformation,
    externalDocumentRef,
    setExternalDocumentRef,
    isModeFull,
}: Props) => {
    const [toggle, setToggle] = useState(false)

    const displayIndex = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const index: string = e.target.value
        setExternalDocumentRef(documentCreationInformation.externalDocumentRefs[+index])
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
                    <th colSpan={3}>6. Document Creation Information</th>
                </tr>
            </thead>
            <tbody hidden={toggle}>
                <tr>
                    <td>
                        <div className='form-group' style={{ flex: 1 }}>
                            <label className='lableSPDX' htmlFor='spdxVersion'>
                                6.1 SPDX version
                            </label>
                            <div style={{ display: 'flex' }}>
                                <label className='sub-label'>SPDX-</label>
                                <input
                                    id='spdxVersion'
                                    className='form-control needs-validation'
                                    type='text'
                                    placeholder='Enter SPDX version'
                                    value=''
                                />
                            </div>
                        </div>
                    </td>
                    <td>
                        <div className='form-group' style={{ flex: 1 }}>
                            <label className='lableSPDX' htmlFor='dataLicense'>
                                6.2 Data license
                            </label>
                            <input
                                id='dataLicense'
                                className='form-control needs-validation'
                                type='text'
                                placeholder='Enter data license'
                                value=''
                            />
                        </div>
                    </td>
                    <td>
                        <div className='form-group' style={{ flex: 1 }}>
                            <label className='lableSPDX' htmlFor='spdxIdentifier'>
                                6.3 SPDX identifier
                            </label>
                            <div style={{ display: 'flex' }}>
                                <label className='sub-label'>SPDXRef-</label>
                                <input
                                    id='spdxIdentifier'
                                    className='form-control needs-validation'
                                    type='text'
                                    placeholder='Enter SPDX identifier'
                                    value=''
                                />
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colSpan={3}>
                        <div className='form-group'>
                            <label className='lableSPDX' htmlFor='documentName'>
                                6.4 Document name
                            </label>
                            <input
                                id='documentName'
                                type='text'
                                className='form-control needs-validation'
                                placeholder='Enter document name'
                                value=''
                            />
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colSpan={3}>
                        <div className='form-group'>
                            <label className='lableSPDX' htmlFor='documentNamespace'>
                                6.5 SPDX document namespace
                            </label>
                            <input
                                id='documentNamespace'
                                className='form-control needs-validation'
                                type='text'
                                placeholder='Enter SPDX document namespace'
                                value=''
                            />
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className='spdx-full' colSpan={3}>
                        <div className='form-group section section-external-doc-ref'>
                            <label className='lableSPDX' htmlFor='externalDocumentRefs'>
                                6.6 External document references
                            </label>
                            <br></br>
                            <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '1rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '0.75rem' }}>
                                    <label
                                        className='lableSPDX sub-title'
                                        htmlFor='externalDocumentRefs'
                                        style={{ textDecoration: 'underline' }}
                                    >
                                        Select Reference
                                    </label>
                                    <select id='externalDocumentRefs' className='form-control spdx-select'></select>
                                    <FaTrashAlt />
                                </div>
                                <button className='spdx-add-button-main' name='add-externalDocRef'>
                                    Add new Reference
                                </button>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '0.75rem' }}>
                                <label className='sub-title lableSPDX' htmlFor='externalDocumentId'>
                                    External document ID
                                </label>
                                <input
                                    id='externalDocumentId'
                                    style={{ width: 'auto', flex: 'auto' }}
                                    type='text'
                                    className='form-control'
                                    placeholder='Enter external document ID'
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '0.75rem' }}>
                                <label className='sub-title lableSPDX' htmlFor='externalDocument'>
                                    External document
                                </label>
                                <input
                                    id='externalDocument'
                                    style={{ width: 'auto', flex: 'auto' }}
                                    type='text'
                                    className='form-control'
                                    placeholder='Enter external document'
                                />
                            </div>
                            <div style={{ display: 'flex' }}>
                                <label className='sub-title lableSPDX'>Checksum</label>
                                <div style={{ display: 'flex', flexDirection: 'column', flex: 7 }}>
                                    <div style={{ display: 'flex', marginBottom: '0.75rem' }}>
                                        <input
                                            style={{ flex: 2, marginRight: '1rem' }}
                                            type='text'
                                            className='form-control'
                                            id='checksumAlgorithm'
                                            placeholder='Enter algorithm'
                                        />
                                        <input
                                            style={{ flex: 6 }}
                                            type='text'
                                            className='form-control'
                                            id='checksumValue'
                                            placeholder='Enter value'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colSpan={3}>
                        <div className='form-group'>
                            <label className='lableSPDX' htmlFor='licenseListVersion'>
                                6.7 License list version
                            </label>
                            <input
                                id='licenseListVersion'
                                className='form-control'
                                type='text'
                                placeholder='Enter license list version'
                                value=''
                            />
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colSpan={3}>
                        <div className='form-group'>
                            <label className='lableSPDX' htmlFor='creator'>
                                6.8 Creators
                            </label>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '0.75rem' }}>
                                    <label className='sub-title lableSPDX' htmlFor='creator-anonymous'>
                                        Anonymous
                                    </label>
                                    <input
                                        id='creator-anonymous'
                                        className='spdx-checkbox'
                                        type='checkbox'
                                        // onclick="setAnonymous()"
                                    />
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <label className='sub-title lableSPDX'>List</label>
                                    <div style={{ display: 'flex', flexDirection: 'column', flex: 7 }}>
                                        <div
                                            style={{ display: 'none', marginBottom: '0.75rem' }}
                                            className='creatorRow'
                                        >
                                            <select
                                                style={{ flex: 2, marginRight: '1rem' }}
                                                className='form-control creator-type'
                                            >
                                                <option value='Organization' selected>
                                                    Organization
                                                </option>
                                                <option value='Person'>Person</option>
                                                <option value='Tool'>Tool</option>
                                            </select>
                                            <input
                                                style={{ flex: 6, marginRight: '2rem' }}
                                                type='text'
                                                className='form-control creator-value'
                                                placeholder='Enter creator'
                                            />
                                            <FaTrashAlt />
                                        </div>
                                        <button
                                            className='spdx-add-button-sub spdx-add-button-sub-creator'
                                            name='add-spdx-creator'
                                        >
                                            Add new creator
                                        </button>
                                    </div>
                                </div>
                                <input
                                    id='spdxCreator'
                                    className='form-control'
                                    style={{ display: 'none' }}
                                    type='text'
                                />
                                {/* <div id="spdxCreator-error-messages">
                            <div className="invalid-feedback" rule="required">
                                <liferay-ui:message key="this.field.must.be.not.empty" />
                            </div>
                        </div> */}
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td style={{ display: 'flex', flexDirection: 'column' }} colSpan={3}>
                        <div className='form-group'>
                            <label className='lableSPDX' htmlFor='createdDate'>
                                6.9 Created
                            </label>
                            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '0.75rem' }}>
                                <div>
                                    <input
                                        id='createdDate'
                                        type='date'
                                        className='form-control spdx-date needs-validation'
                                        placeholder='created.date.yyyy.mm.dd'
                                    />
                                </div>
                                <div>
                                    <input
                                        id='createdTime'
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
                <tr>
                    <td colSpan={3}>
                        <div className='form-group'>
                            <label className='lableSPDX' htmlFor='creatorComment'>
                                6.10 Creator comment
                            </label>
                            <textarea
                                className='form-control'
                                id='creatorComment'
                                rows={5}
                                placeholder='Enter creator comment'
                            ></textarea>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colSpan={3}>
                        <div className='form-group'>
                            <label className='lableSPDX' htmlFor='documentComment'>
                                6.11 Document comment
                            </label>
                            <textarea
                                className='form-control'
                                id='documentComment'
                                rows={5}
                                placeholder='Enter document comment'
                            ></textarea>
                        </div>
                    </td>
                </tr>

                {isModeFull && (
                    <>
                        <tr className='spdx-full'>
                            <td>6.6 External document references</td>
                            <td className='spdx-flex-row'>
                                <div className='spdx-col-2 section' data-size='3'>
                                    <div className='spdx-flex-row'>
                                        <div className='spdx-col-1 spdx-label-index'>Index</div>
                                        <select
                                            className='spdx-col-3'
                                            id='externalDocumentRefs'
                                            onChange={displayIndex}
                                        >
                                            {documentCreationInformation?.externalDocumentRefs
                                                .toSorted((e1, e2) => e1.index - e2.index)
                                                .map((item) => (
                                                    <option key={item.index} value={item.index}>
                                                        {item.index + 1}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                    {externalDocumentRef && (
                                        <>
                                            <div className='spdx-flex-row'>
                                                <div className='spdx-col-1 spdx-key'>External document ID</div>
                                                <div className='spdx-col-3'>
                                                    {externalDocumentRef.externalDocumentId}
                                                </div>
                                            </div>
                                            <div className='spdx-flex-row'>
                                                <div className='spdx-col-1 spdx-key'>External document</div>
                                                <div className='spdx-col-3'>{externalDocumentRef.spdxDocument}</div>
                                            </div>
                                            <div className='spdx-flex-row'>
                                                <div className='spdx-col-2 spdx-key'>Checksum</div>
                                                <div className='spdx-col-3'>
                                                    {externalDocumentRef.checksum.algorithm}:
                                                    {externalDocumentRef.checksum.checksumValue}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>

                        <tr className='spdx-full'>
                            <td>6.7 License list version</td>
                            <td>{documentCreationInformation?.licenseListVersion}</td>
                        </tr>
                    </>
                )}
                <tr>
                    <td>6.8 Creators</td>
                    <td className='spdx-flex-row'>
                        <div className='spdx-col-2' id='creators'>
                            {documentCreationInformation?.creator &&
                                documentCreationInformation.creator.map((creatorData) => {
                                    return (
                                        <div
                                            key={creatorData.index}
                                            className='spdx-flex-row creator'
                                            data-index={creatorData.index}
                                        >
                                            <div className='spdx-col-1 spdx-key'>{creatorData.type}</div>
                                            <div className='spdx-col-3'>{creatorData.value}</div>
                                        </div>
                                    )
                                })}
                        </div>
                    </td>
                </tr>
                <tr className='spdx-full'>
                    <td>6.9 Created</td>
                    <td>{documentCreationInformation?.created}</td>
                </tr>
                {isModeFull && (
                    <>
                        <tr className='spdx-full'>
                            <td>6.10 Creator comment</td>
                            <td>{documentCreationInformation?.creatorComment}</td>
                        </tr>
                        <tr className='spdx-full'>
                            <td>6.11 Document comment</td>
                            <td>{documentCreationInformation?.documentComment}</td>
                        </tr>
                    </>
                )}
            </tbody>
        </table>
    )
}

export default DocumentCreationInformationDetail
