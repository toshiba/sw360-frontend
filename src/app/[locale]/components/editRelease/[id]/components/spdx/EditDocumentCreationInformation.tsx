// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'
import CommonUtils from '@/utils/common.utils'
import React, { useEffect, useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import InputKeyValue from '../../../../../../../object-types/InputKeyValue'
import Creator from '../../../../../../../object-types/spdx/Creator'
import DocumentCreationInformation from '../../../../../../../object-types/spdx/DocumentCreationInformation'
import ExternalDocumentReferences from '../../../../../../../object-types/spdx/ExternalDocumentReferences'
import SPDX from '../../../../../../../object-types/spdx/SPDX'
import styles from '../detail.module.css'
import Creators from './Creators'
import Created from './DocumentCreationInfo/Created'

interface Props {
    documentCreationInformation?: DocumentCreationInformation
    setDocumentCreationInformation?: React.Dispatch<React.SetStateAction<DocumentCreationInformation>>
    isModeFull?: boolean
    externalDocumentRefs?: ExternalDocumentReferences[]
    setExternalDocumentRefs?: React.Dispatch<React.SetStateAction<ExternalDocumentReferences[]>>
    indexExternalDocumentRef?: number
    setIndexExternalDocumentRef?: React.Dispatch<React.SetStateAction<number>>
    SPDXPayload?: SPDX
    setSPDXPayload?: React.Dispatch<React.SetStateAction<SPDX>>
}

const EditDocumentCreationInformation = ({
    documentCreationInformation,
    setDocumentCreationInformation,
    isModeFull,
    externalDocumentRefs,
    setExternalDocumentRefs,
    indexExternalDocumentRef,
    setIndexExternalDocumentRef,
    SPDXPayload,
    setSPDXPayload,
}: Props) => {
    const [toggle, setToggle] = useState(false)

    const [creator, setCreator] = useState<InputKeyValue[]>([])
    const [numberIndex, setNumberIndex] = useState<number>(0)
    const [isAnonymous, setIsAnonymous] = useState(false)

    const displayIndex = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const index: string = e.target.value
        setIndexExternalDocumentRef(+index)
        setNumberIndex(+index)
    }

    const addDocumentReferences = () => {
        const arrayExternals: ExternalDocumentReferences[] = [...externalDocumentRefs]
        const externalDocumentReference: ExternalDocumentReferences = {
            externalDocumentId: '',
            checksum: { algorithm: '', checksumValue: '', index: 0 },
            spdxDocument: '',
            index: externalDocumentRefs.length,
        }
        arrayExternals.push(externalDocumentReference)
        setExternalDocumentRefs(arrayExternals)
        setSPDXPayload({
            ...SPDXPayload,
            documentCreationInformation: {
                ...SPDXPayload.documentCreationInformation,
                externalDocumentRefs: arrayExternals,
            },
        })
    }

    useEffect(() => {
        if (!CommonUtils.isNullEmptyOrUndefinedArray(documentCreationInformation?.creator)) {
            if (!isAnonymous) {
                setCreator(convertCreator(documentCreationInformation.creator))
            }
        }

        if (
            CommonUtils.isNullEmptyOrUndefinedArray(documentCreationInformation?.creator) &&
            typeof documentCreationInformation?.createdBy !== 'undefined'
        ) {
            const creators: InputKeyValue[] = []
            const creator: InputKeyValue = {
                key: 'Person',
                value: documentCreationInformation.createdBy,
            }
            creators.push(creator)
            setCreator(creators)
        }

        if (!CommonUtils.isNullEmptyOrUndefinedString(documentCreationInformation?.created)) {
            setDataCreated(handleCreated(documentCreationInformation.created))
        } else {
            setDataCreated(handleCreated(new Date().toISOString()))
        }
    }, [documentCreationInformation, setExternalDocumentRefs, setIndexExternalDocumentRef])

    const convertCreator = (creators: Creator[]) => {
        const inputs: InputKeyValue[] = []
        creators.forEach((creator: Creator) => {
            const input: InputKeyValue = {
                key: creator.type,
                value: creator.value,
            }
            inputs.push(input)
        })
        return inputs
    }

    const convertInputToCreator = (datas: InputKeyValue[]) => {
        if (datas === null) {
            return null
        }
        const creators: Creator[] = []
        datas.forEach((data: InputKeyValue, index: number) => {
            const creator: Creator = {
                type: data.key,
                value: data.value,
                index: index,
            }
            creators.push(creator)
        })

        return creators
    }

    const updateField = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setDocumentCreationInformation({
            ...documentCreationInformation,
            [e.target.name]: e.target.value,
        })
        setSPDXPayload({
            ...SPDXPayload,
            documentCreationInformation: {
                ...SPDXPayload.documentCreationInformation,
                [e.target.name]: e.target.value,
            },
        })
    }

    const handleClickAnonymous = () => {
        setIsAnonymous(!isAnonymous)
        if (!isAnonymous) {
            let creators: InputKeyValue[] = []
            creators = creator.filter((input) => input.key != 'Organization').filter((input) => input.key != 'Person')
            setDocumentCreationInformation({
                ...documentCreationInformation,
                creator: convertInputToCreator(creators),
            })
            setSPDXPayload({
                ...SPDXPayload,
                documentCreationInformation: {
                    ...SPDXPayload.documentCreationInformation,
                    creator: convertInputToCreator(creators),
                },
            })
        } else {
            setSPDXPayload({
                ...SPDXPayload,
                documentCreationInformation: {
                    ...SPDXPayload.documentCreationInformation,
                    creator: convertInputToCreator(creator),
                },
            })
        }
    }

    const setDataCreators = (inputs: InputKeyValue[]) => {
        if (isAnonymous) {
            inputs = inputs.filter((input) => input.key != 'Organization').filter((input) => input.key != 'Person')
        }
        setDocumentCreationInformation({
            ...documentCreationInformation,
            creator: convertInputToCreator(inputs),
        })

        setSPDXPayload({
            ...SPDXPayload,
            documentCreationInformation: {
                ...SPDXPayload.documentCreationInformation,
                creator: convertInputToCreator(inputs),
            },
        })
    }

    const [dataCreated, setDataCreated] = useState<InputKeyValue>()
    const handleCreated = (data: string) => {
        const input: InputKeyValue = {
            key: CommonUtils.fillDate(data),
            value: CommonUtils.fillTime(data),
        }
        return input
    }

    const convertInputToCreated = (data: InputKeyValue) => {
        if (data.key == '' || data.value == '') {
            return ''
        }
        const localDate = new Date(data.key + ' ' + data.value)
        return localDate.toISOString().slice(0, -5) + 'Z'
    }

    const setCreated = (inputs: InputKeyValue) => {
        setDocumentCreationInformation({
            ...documentCreationInformation,
            created: convertInputToCreated(inputs),
        })

        setSPDXPayload({
            ...SPDXPayload,
            documentCreationInformation: {
                ...SPDXPayload.documentCreationInformation,
                created: convertInputToCreated(inputs),
            },
        })
    }

    const deleteExternalReference = () => {
        if (externalDocumentRefs.length == 1) {
            setExternalDocumentRefs([])
        } else {
            let externalDocuments: ExternalDocumentReferences[] = []
            externalDocuments = externalDocumentRefs.filter(
                (externalDocumentRef) => numberIndex != externalDocumentRef.index
            )
            setExternalDocumentRefs(externalDocuments)
            setIndexExternalDocumentRef(0)
            setSPDXPayload({
                ...SPDXPayload,
                documentCreationInformation: {
                    ...SPDXPayload.documentCreationInformation,
                    externalDocumentRefs: externalDocuments,
                },
            })
            if (!CommonUtils.isNullEmptyOrUndefinedArray(externalDocumentRefs)) {
                setNumberIndex(externalDocuments[0].index)
            }
        }
    }

    const updateCheckSum = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        const externals: ExternalDocumentReferences[] = externalDocumentRefs.map((externalDocument, index) => {
            if (index === indexExternalDocumentRef) {
                return {
                    ...externalDocument,
                    checksum: {
                        ...externalDocument.checksum,
                        [e.target.name]: e.target.value,
                    },
                }
            }
            return externalDocument
        })
        setExternalDocumentRefs(externals)
        setSPDXPayload({
            ...SPDXPayload,
            documentCreationInformation: {
                ...SPDXPayload.documentCreationInformation,
                externalDocumentRefs: externals,
            },
        })
    }

    const updateExternalReferens = (
        e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const externals: ExternalDocumentReferences[] = externalDocumentRefs.map((externalDocument, index) => {
            if (index === indexExternalDocumentRef) {
                return {
                    ...externalDocument,
                    [e.target.name]: e.target.value,
                }
            }
            return externalDocument
        })

        setExternalDocumentRefs(externals)
        setSPDXPayload({
            ...SPDXPayload,
            documentCreationInformation: {
                ...SPDXPayload.documentCreationInformation,
                externalDocumentRefs: externals,
            },
        })
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
                                            name='spdxVersion'
                                            className='form-control needs-validation'
                                            type='text'
                                            placeholder='Enter SPDX version'
                                            onChange={updateField}
                                            value={
                                                documentCreationInformation.spdxVersion?.startsWith('SPDX-')
                                                    ? documentCreationInformation.spdxVersion.substring(5)
                                                    : documentCreationInformation.spdxVersion
                                            }
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
                                        name='dataLicense'
                                        className='form-control needs-validation'
                                        type='text'
                                        placeholder='Enter data license'
                                        onChange={updateField}
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
                                            name='SPDXID'
                                            className='form-control needs-validation'
                                            type='text'
                                            placeholder='Enter SPDX identifier'
                                            onChange={updateField}
                                            value={
                                                documentCreationInformation.SPDXID?.startsWith('SPDXRef-')
                                                    ? documentCreationInformation.SPDXID.substring(8)
                                                    : documentCreationInformation.SPDXID
                                            }
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
                                        name='name'
                                        type='text'
                                        className='form-control needs-validation'
                                        placeholder='Enter document name'
                                        onChange={updateField}
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
                                        name='documentNamespace'
                                        className='form-control needs-validation'
                                        type='text'
                                        placeholder='Enter SPDX document namespace'
                                        onChange={updateField}
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
                                                    <FaTrashAlt onClick={deleteExternalReference} />
                                                </div>
                                                <button
                                                    className='spdx-add-button-main'
                                                    name='add-externalDocRef'
                                                    onClick={addDocumentReferences}
                                                >
                                                    Add new Reference
                                                </button>
                                            </div>
                                            {externalDocumentRefs[indexExternalDocumentRef] && (
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
                                                            name='externalDocumentId'
                                                            className='form-control'
                                                            placeholder='Enter external document ID'
                                                            onChange={updateExternalReferens}
                                                            value={
                                                                externalDocumentRefs[indexExternalDocumentRef]
                                                                    .externalDocumentId ?? ''
                                                            }
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
                                                            name='spdxDocument'
                                                            className='form-control'
                                                            placeholder='Enter external document'
                                                            onChange={updateExternalReferens}
                                                            value={
                                                                externalDocumentRefs[indexExternalDocumentRef]
                                                                    .spdxDocument ?? ''
                                                            }
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
                                                                    name='algorithm'
                                                                    placeholder='Enter algorithm'
                                                                    onChange={updateCheckSum}
                                                                    value={
                                                                        externalDocumentRefs[indexExternalDocumentRef]
                                                                            .checksum?.algorithm ?? ''
                                                                    }
                                                                />
                                                                <input
                                                                    style={{ flex: 6 }}
                                                                    type='text'
                                                                    className='form-control'
                                                                    id='checksumValue'
                                                                    placeholder='Enter value'
                                                                    name='checksumValue'
                                                                    onChange={updateCheckSum}
                                                                    value={
                                                                        externalDocumentRefs[indexExternalDocumentRef]
                                                                            .checksum?.checksumValue ?? ''
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
                                                name='licenseListVersion'
                                                className='form-control'
                                                type='text'
                                                placeholder='Enter license list version'
                                                onChange={updateField}
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
                                                onChange={handleClickAnonymous}
                                            />
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                            <label className='sub-title lableSPDX'>List</label>
                                            <Creators
                                                inputList={creator}
                                                setInputList={setCreator}
                                                isAnonymous={isAnonymous}
                                                setDataCreators={setDataCreators}
                                            />
                                        </div>
                                        <input
                                            id='spdxCreator'
                                            className='form-control'
                                            style={{ display: 'none' }}
                                            type='text'
                                        />
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <Created
                                setCreated={setCreated}
                                dataCreated={dataCreated}
                                setDataCreated={setDataCreated}
                            />
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
                                                name='creatorComment'
                                                rows={5}
                                                placeholder='Enter creator comment'
                                                onChange={updateField}
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
                                                name='documentComment'
                                                id='documentComment'
                                                rows={5}
                                                onChange={updateField}
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
