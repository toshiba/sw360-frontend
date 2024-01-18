// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'
import CommonUtils from '@/utils/common.utils'
import React, { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import InputKeyValue from '../../../../../../../object-types/InputKeyValue'
import DocumentCreationInformation from '../../../../../../../object-types/spdx/DocumentCreationInformation'
import ExternalDocumentReferences from '../../../../../../../object-types/spdx/ExternalDocumentReferences'
import styles from '../detail.module.css'
import Creators from './Creators'

interface Props {
    documentCreationInformation?: DocumentCreationInformation
    externalDocumentRef?: ExternalDocumentReferences
    setExternalDocumentRef?: React.Dispatch<React.SetStateAction<ExternalDocumentReferences>>
    isModeFull?: boolean
    externalDocumentRefs?: ExternalDocumentReferences[]
    setExternalDocumentRefs?: React.Dispatch<React.SetStateAction<ExternalDocumentReferences[]>>
}

const EditDocumentCreationInformation = ({
    documentCreationInformation,
    externalDocumentRef,
    setExternalDocumentRef,
    isModeFull,
    externalDocumentRefs,
    setExternalDocumentRefs,
}: Props) => {
    const [toggle, setToggle] = useState(false)
    // const [addExternal, setAddExternal] = useState(false)

    const [creator, setCreator] = useState<InputKeyValue[]>([])

    const displayIndex = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const index: string = e.target.value
        setExternalDocumentRef(externalDocumentRefs[+index])
    }
    console.log(externalDocumentRefs.toSorted((e1, e2) => e1.index - e2.index))

    const addDocumentReferences = () => {
        // setAddExternal(true)
        const arrayExternals: ExternalDocumentReferences[] = externalDocumentRefs
        const externalDocumentReference: ExternalDocumentReferences = {
            externalDocumentId: '',
            checksum: { algorithm: '', checksumValue: '', index: 0 },
            spdxDocument: '',
            index: externalDocumentRefs.length,
        }
        arrayExternals.push(externalDocumentReference)
        // const externalElement = document.getElementById('externalDocumentRefs')
        // externalElement.append(`<option  value=${externalDocumentRefs.length - 1}>${externalDocumentRefs.length}</option>`)

        // {$('externalDocumentRefs').append}
        setExternalDocumentRefs(arrayExternals)
        setExternalDocumentRef(externalDocumentReference)
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
                {documentCreationInformation && (
                    <>
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
                                            value={documentCreationInformation.spdxVersion.substring(5) ?? ''}
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
                                        value={documentCreationInformation.dataLicense ?? ''}
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
                                            value={documentCreationInformation.SPDXID.substring(8) ?? ''}
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
                                        value={documentCreationInformation.name ?? ''}
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
                                        value={documentCreationInformation.documentNamespace ?? ''}
                                    />
                                </div>
                            </td>
                        </tr>
                        {isModeFull && (
                            <>
                                <tr>
                                    <td className='spdx-full' colSpan={3}>
                                        <div className='form-group section section-external-doc-ref'>
                                            <label className='lableSPDX' htmlFor='externalDocumentRefs'>
                                                6.6 External document references
                                            </label>
                                            <br></br>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    paddingLeft: '1rem',
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        marginBottom: '0.75rem',
                                                    }}
                                                >
                                                    <label
                                                        className='lableSPDX sub-title'
                                                        htmlFor='externalDocumentRefs'
                                                        style={{ textDecoration: 'underline' }}
                                                    >
                                                        Select Reference
                                                    </label>
                                                    <select
                                                        id='externalDocumentRefs'
                                                        className='form-control spdx-select'
                                                        onChange={displayIndex}
                                                    >
                                                        {externalDocumentRefs.map((item) => (
                                                            <option key={item.index} value={item.index}>
                                                                {item.index + 1}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <FaTrashAlt />
                                                </div>
                                                <button
                                                    className='spdx-add-button-main'
                                                    name='add-externalDocRef'
                                                    onClick={addDocumentReferences}
                                                >
                                                    Add new Reference
                                                </button>
                                            </div>
                                            {externalDocumentRef && (
                                                <>
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection: 'row',
                                                            marginBottom: '0.75rem',
                                                        }}
                                                    >
                                                        <label
                                                            className='sub-title lableSPDX'
                                                            htmlFor='externalDocumentId'
                                                        >
                                                            External document ID
                                                        </label>
                                                        <input
                                                            id='externalDocumentId'
                                                            style={{ width: 'auto', flex: 'auto' }}
                                                            type='text'
                                                            className='form-control'
                                                            placeholder='Enter external document ID'
                                                            value={externalDocumentRef.externalDocumentId ?? ''}
                                                        />
                                                    </div>
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection: 'row',
                                                            marginBottom: '0.75rem',
                                                        }}
                                                    >
                                                        <label
                                                            className='sub-title lableSPDX'
                                                            htmlFor='externalDocument'
                                                        >
                                                            External document
                                                        </label>
                                                        <input
                                                            id='externalDocument'
                                                            style={{ width: 'auto', flex: 'auto' }}
                                                            type='text'
                                                            className='form-control'
                                                            placeholder='Enter external document'
                                                            value={externalDocumentRef.spdxDocument ?? ''}
                                                        />
                                                    </div>
                                                    <div style={{ display: 'flex' }}>
                                                        <label className='sub-title lableSPDX'>Checksum</label>
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                flex: 7,
                                                            }}
                                                        >
                                                            <div style={{ display: 'flex', marginBottom: '0.75rem' }}>
                                                                <input
                                                                    style={{ flex: 2, marginRight: '1rem' }}
                                                                    type='text'
                                                                    className='form-control'
                                                                    id='checksumAlgorithm'
                                                                    placeholder='Enter algorithm'
                                                                    value={
                                                                        externalDocumentRef.checksum?.algorithm ?? ''
                                                                    }
                                                                />
                                                                <input
                                                                    style={{ flex: 6 }}
                                                                    type='text'
                                                                    className='form-control'
                                                                    id='checksumValue'
                                                                    placeholder='Enter value'
                                                                    value={
                                                                        externalDocumentRef.checksum?.checksumValue ??
                                                                        ''
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
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
                                                value={documentCreationInformation.licenseListVersion ?? ''}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            </>
                        )}

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
                                            <Creators inputList={creator} setInputList={setCreator} />
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
                                                value={CommonUtils.fillDate(documentCreationInformation.created) ?? ''}
                                            />
                                        </div>
                                        <div>
                                            <input
                                                id='createdTime'
                                                type='time'
                                                step='1'
                                                className='form-control spdx-time needs-validation'
                                                placeholder='created.time.hh.mm.ss'
                                                value={CommonUtils.fillTime(documentCreationInformation.created) ?? ''}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        {isModeFull && (
                            <>
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
                                                value={documentCreationInformation.creatorComment ?? ''}
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
                                                value={documentCreationInformation.documentComment ?? ''}
                                            ></textarea>
                                        </div>
                                    </td>
                                </tr>
                            </>
                        )}
                    </>
                )}
            </tbody>
        </table>
    )
}

export default EditDocumentCreationInformation
