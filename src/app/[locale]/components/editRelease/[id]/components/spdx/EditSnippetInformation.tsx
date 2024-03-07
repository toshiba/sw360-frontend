// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'
import CommonUtils from '@/utils/common.utils'
import { useEffect, useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import InputKeyValue from '../../../../../../../object-types/InputKeyValue'
import SPDX from '../../../../../../../object-types/spdx/SPDX'
import SnippetInformation from '../../../../../../../object-types/spdx/SnippetInformation'
import SnippetRange from '../../../../../../../object-types/spdx/SnippetRange'
import styles from '../detail.module.css'
import SnippetConcludedLicense from './SnippetInformation/SnippetConcludedLicense'
import SnippetCopyrightText from './SnippetInformation/SnippetCopyrightText'
import SnippetFileSPDXIdentifier from './SnippetInformation/SnippetFileSPDXIdentifier'
import SnippetLicenseInformation from './SnippetInformation/SnippetLicenseInformation'
import SnippetRanges from './SnippetRanges'

interface Props {
    indexSnippetInformation?: number
    setIndexSnippetInformation?: React.Dispatch<React.SetStateAction<number>>
    snippetInformations?: SnippetInformation[]
    setSnippetInformations?: React.Dispatch<React.SetStateAction<SnippetInformation[]>>
    SPDXPayload?: SPDX
    setSPDXPayload?: React.Dispatch<React.SetStateAction<SPDX>>
}

const EditSnippetInformation = ({
    indexSnippetInformation,
    setIndexSnippetInformation,
    snippetInformations,
    setSnippetInformations,
    SPDXPayload,
    setSPDXPayload,
}: Props) => {
    const [toggle, setToggle] = useState(false)
    const [snippetRanges, setSnippetRanges] = useState<SnippetRange[]>([])

    const [dataSnippetFromFile, setDataSnippetFromFile] = useState<InputKeyValue>()

    const setDataSnippetRanges = (inputs: SnippetRange[]) => {
        const snippets: SnippetInformation[] = snippetInformations.map((snippet, index) => {
            if (index === indexSnippetInformation) {
                return {
                    ...snippet,
                    snippetRanges: inputs,
                }
            }
            return snippet
        })
        setSnippetInformations(snippets)
        setSPDXPayload({
            ...SPDXPayload,
            spdxDocument: {
                ...SPDXPayload.spdxDocument,
                snippets: snippets,
            },
        })
    }

    const displayIndex = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const index: string = e.target.value
        setIndexSnippetInformation(+index)
        setNumberIndex(+index)
        setDataSnippetFromFile({
            key: '',
            value: '',
        })
    }

    const addSnippet = () => {
        const arrayExternals: SnippetInformation[] = [...snippetInformations]
        const snippetInformation: SnippetInformation = {
            SPDXID: '', // 9.1
            snippetFromFile: '', // 9.2
            snippetRanges: [], // 9.3, 9.4
            licenseConcluded: '', // 9.5
            licenseInfoInSnippets: [], // 9.6
            licenseComments: '', // 9.7
            copyrightText: '', // 9.8
            comment: '', // 9.9
            name: '', // 9.10
            snippetAttributionText: '', // 9.11
            index: snippetInformations.length,
        }
        arrayExternals.push(snippetInformation)
        setSnippetInformations(arrayExternals)
        setSPDXPayload({
            ...SPDXPayload,
            spdxDocument: {
                ...SPDXPayload.spdxDocument,
                snippets: arrayExternals,
            },
        })
    }

    const [snippetConcludedLicense, setSnippetConcludedLicense] = useState('')
    const [snippetConcludedLicenseExist, setSnippetConcludedLicenseExist] = useState(true)
    const [snippetConcludedLicenseNone, setSnippetConcludedLicenseNone] = useState(false)
    const [snippetConcludedLicenseNoasserttion, setSnippetConcludedLicenseNoasserttion] = useState(false)

    const setSnippetConcludedLicenseToSnippet = (data: string) => {
        const snippets: SnippetInformation[] = snippetInformations.map((snippet, index) => {
            if (index === indexSnippetInformation) {
                return {
                    ...snippet,
                    licenseConcluded: data,
                }
            }
            return snippet
        })
        setSnippetInformations(snippets)
        setSPDXPayload({
            ...SPDXPayload,
            spdxDocument: {
                ...SPDXPayload.spdxDocument,
                snippets: snippets,
            },
        })
    }

    const [snippetCopyrightText, setSnippetCopyrightText] = useState('')
    const [snippetCopyrightTextExist, setSnippetCopyrightTextExist] = useState(true)
    const [snippetCopyrightTextNone, setSnippetCopyrightTextNone] = useState(false)
    const [snippetCopyrightTextNoasserttion, setSnippetCopyrightTextNoasserttion] = useState(false)

    const setSnippetCopyrightTextToSnippet = (data: string) => {
        const snippets: SnippetInformation[] = snippetInformations.map((snippet, index) => {
            if (index === indexSnippetInformation) {
                return {
                    ...snippet,
                    copyrightText: data,
                }
            }
            return snippet
        })
        setSnippetInformations(snippets)
        setSPDXPayload({
            ...SPDXPayload,
            spdxDocument: {
                ...SPDXPayload.spdxDocument,
                snippets: snippets,
            },
        })
    }

    useEffect(() => {
        if (typeof snippetInformations[indexSnippetInformation]?.snippetRanges !== 'undefined') {
            setSnippetRanges(convertSnippetRanges(snippetInformations[indexSnippetInformation].snippetRanges))
        }

        if (typeof snippetInformations[indexSnippetInformation]?.snippetFromFile !== 'undefined') {
            setDataSnippetFromFile(handleSnippetFromFile(snippetInformations[indexSnippetInformation].snippetFromFile))
        }

        if (typeof snippetInformations[indexSnippetInformation]?.licenseConcluded !== 'undefined') {
            if (
                snippetInformations[indexSnippetInformation]?.licenseConcluded === 'NONE' ||
                snippetInformations[indexSnippetInformation]?.licenseConcluded === 'NOASSERTION'
            ) {
                const data: string = snippetConcludedLicense
                setSnippetConcludedLicense(data)
            } else {
                setSnippetConcludedLicense(snippetInformations[indexSnippetInformation].licenseConcluded)
            }
        }

        if (typeof snippetInformations[indexSnippetInformation]?.licenseInfoInSnippets !== 'undefined') {
            if (
                snippetInformations[indexSnippetInformation].licenseInfoInSnippets.toString() === 'NONE' ||
                snippetInformations[indexSnippetInformation].licenseInfoInSnippets.at(0) === 'NOASSERTION'
            ) {
                const data: string[] = licenseInfoInSnippets
                setLicenseInfoInSnippets(data)
            } else {
                setLicenseInfoInSnippets(snippetInformations[indexSnippetInformation].licenseInfoInSnippets)
            }
        }

        if (typeof snippetInformations[indexSnippetInformation]?.copyrightText !== 'undefined') {
            if (
                snippetInformations[indexSnippetInformation]?.copyrightText === 'NONE' ||
                snippetInformations[indexSnippetInformation]?.copyrightText === 'NOASSERTION'
            ) {
                const data: string = snippetCopyrightText
                setSnippetCopyrightText(data)
            } else {
                setSnippetCopyrightText(snippetInformations[indexSnippetInformation].copyrightText)
            }
        }
    }, [indexSnippetInformation, snippetInformations])

    const convertSnippetRanges = (snippetRanges: SnippetRange[]) => {
        const inputs: SnippetRange[] = []
        snippetRanges.forEach((snippetRange: SnippetRange) => {
            const input: SnippetRange = {
                rangeType: snippetRange.rangeType,
                startPointer: snippetRange.startPointer,
                endPointer: snippetRange.endPointer,
                reference: snippetRange.reference,
                index: snippetRange.index,
            }
            inputs.push(input)
        })
        return inputs
    }

    const updateField = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        const snippets: SnippetInformation[] = snippetInformations.map((snippet, index) => {
            if (index === indexSnippetInformation) {
                return {
                    ...snippet,
                    [e.target.name]:
                        e.target.name === 'licenseInfoInSnippets' ? e.target.value.split('\n') : e.target.value,
                }
            }
            return snippet
        })
        setSnippetInformations(snippets)
        setSPDXPayload({
            ...SPDXPayload,
            spdxDocument: {
                ...SPDXPayload.spdxDocument,
                snippets: snippets,
            },
        })
    }

    const [licenseInfoInSnippets, setLicenseInfoInSnippets] = useState<Array<string>>()
    const [licenseInfoInSnippetsExist, setLicenseInfoInSnippetsExist] = useState(true)
    const [licenseInfoInSnippetsNone, setLicenseInfoInSnippetsNone] = useState(false)
    const [licenseInfoInSnippetsNoasserttion, setLicenseInfoInSnippetsNoasserttion] = useState(false)

    const setAllLicensesInformationToSnippet = (data: string[]) => {
        const snippets: SnippetInformation[] = snippetInformations.map((snippet, index) => {
            if (index === indexSnippetInformation) {
                return {
                    ...snippet,
                    licenseInfoInSnippets: data,
                }
            }
            return snippet
        })
        setSnippetInformations(snippets)
        setSPDXPayload({
            ...SPDXPayload,
            spdxDocument: {
                ...SPDXPayload.spdxDocument,
                snippets: snippets,
            },
        })
    }

    const handleInputKeyToSnippetFromFile = (data: InputKeyValue) => {
        return data.key + '-' + data.value
    }
    const setSnippetFromFileToSnippet = (input: InputKeyValue) => {
        if (input.key === '') {
            input.key = 'SPDXRef'
        }
        const snippets: SnippetInformation[] = snippetInformations.map((snippet, index) => {
            if (index === indexSnippetInformation) {
                return {
                    ...snippet,
                    snippetFromFile: handleInputKeyToSnippetFromFile(input),
                }
            }
            return snippet
        })
        setSnippetInformations(snippets)
        setSPDXPayload({
            ...SPDXPayload,
            spdxDocument: {
                ...SPDXPayload.spdxDocument,
                snippets: snippets,
            },
        })
    }

    const handleSnippetFromFile = (data: string) => {
        if (data == null) {
            const input: InputKeyValue = {
                key: '',
                value: '',
            }
            return input
        }
        const input: InputKeyValue = {
            key: data.split('-')[0],
            value: data.split('-')[1],
        }
        return input
    }

    const [numberIndex, setNumberIndex] = useState<number>(0)

    const deleteSnippetInformations = () => {
        if (snippetInformations.length == 1) {
            setSnippetInformations([])
        } else {
            let snippetInformationDatas: SnippetInformation[] = []
            snippetInformationDatas = snippetInformations.filter(
                (snippetInformation) => numberIndex != snippetInformation.index
            )
            setSnippetInformations(snippetInformationDatas)
            setIndexSnippetInformation(0)
            setSPDXPayload({
                ...SPDXPayload,
                spdxDocument: {
                    ...SPDXPayload.spdxDocument,
                    snippets: snippetInformationDatas,
                },
            })
            if (!CommonUtils.isNullEmptyOrUndefinedArray(snippetInformationDatas)) {
                setNumberIndex(snippetInformationDatas[0].index)
            }
        }
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
                                <select id='selectSnippet' className='form-control spdx-select' onChange={displayIndex}>
                                    {snippetInformations.map((item) => (
                                        <option key={item.index} value={item.index}>
                                            {item.index + 1}
                                        </option>
                                    ))}
                                </select>
                                <FaTrashAlt onClick={deleteSnippetInformations} />
                            </div>
                            <button className='spdx-add-button-main' name='add-snippet' onClick={addSnippet}>
                                Add new Snippet
                            </button>
                        </div>
                    </td>
                </tr>
                {snippetInformations[indexSnippetInformation] && (
                    <>
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
                                            type='text'
                                            placeholder='Enter snippet SPDX identifier'
                                            name='SPDXID'
                                            onChange={updateField}
                                            value={
                                                CommonUtils.isNullEmptyOrUndefinedString(
                                                    snippetInformations[indexSnippetInformation].SPDXID
                                                )
                                                    ? 'Snippet-'
                                                    : snippetInformations[indexSnippetInformation].SPDXID?.startsWith(
                                                          'SPDXRef-'
                                                      )
                                                    ? snippetInformations[indexSnippetInformation].SPDXID?.substring(8)
                                                    : snippetInformations[indexSnippetInformation].SPDXID
                                            }
                                        />
                                    </div>
                                </div>
                            </td>
                            <SnippetFileSPDXIdentifier
                                dataSnippetFromFile={dataSnippetFromFile}
                                setDataSnippetFromFile={setDataSnippetFromFile}
                                setSnippetFromFileToSnippet={setSnippetFromFileToSnippet}
                            />
                        </tr>
                        <tr>
                            <td colSpan={3}>
                                <div className='form-group'>
                                    <label className='lableSPDX'>9.3 & 9.4 Snippet ranges</label>
                                    <SnippetRanges
                                        inputList={snippetRanges}
                                        setInputList={setSnippetRanges}
                                        setDataSnippetRanges={setDataSnippetRanges}
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <SnippetConcludedLicense
                                snippetConcludedLicense={snippetConcludedLicense}
                                setSnippetConcludedLicenseToSnippet={setSnippetConcludedLicenseToSnippet}
                                snippetConcludedLicenseExist={snippetConcludedLicenseExist}
                                setSnippetConcludedLicenseExist={setSnippetConcludedLicenseExist}
                                snippetConcludedLicenseNone={snippetConcludedLicenseNone}
                                setSnippetConcludedLicenseNone={setSnippetConcludedLicenseNone}
                                snippetConcludedLicenseNoasserttion={snippetConcludedLicenseNoasserttion}
                                setSnippetConcludedLicenseNoasserttion={setSnippetConcludedLicenseNoasserttion}
                                updateField={updateField}
                            />
                        </tr>
                        <tr>
                            <SnippetLicenseInformation
                                licenseInfoInSnippets={licenseInfoInSnippets}
                                setAllLicensesInformationToSnippet={setAllLicensesInformationToSnippet}
                                licenseInfoInSnippetsExist={licenseInfoInSnippetsExist}
                                setLicenseInfoInSnippetsExist={setLicenseInfoInSnippetsExist}
                                licenseInfoInSnippetsNone={licenseInfoInSnippetsNone}
                                setLicenseInfoInSnippetsNone={setLicenseInfoInSnippetsNone}
                                licenseInfoInSnippetsNoasserttion={licenseInfoInSnippetsNoasserttion}
                                setLicenseInfoInSnippetsNoasserttion={setLicenseInfoInSnippetsNoasserttion}
                            />
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
                                        name='licenseComments'
                                        onChange={updateField}
                                        value={snippetInformations[indexSnippetInformation].licenseComments ?? ''}
                                    ></textarea>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <SnippetCopyrightText
                                snippetCopyrightText={snippetCopyrightText}
                                setSnippetConcludedLicenseToSnippet={setSnippetCopyrightTextToSnippet}
                                snippetCopyrightTextExist={snippetCopyrightTextExist}
                                setSnippetCopyrightTextExist={setSnippetCopyrightTextExist}
                                snippetCopyrightTextNone={snippetCopyrightTextNone}
                                setSnippetCopyrightTextNone={setSnippetCopyrightTextNone}
                                snippetCopyrightTextNoasserttion={snippetCopyrightTextNoasserttion}
                                setSnippetCopyrightTextNoasserttion={setSnippetCopyrightTextNoasserttion}
                                updateField={updateField}
                            />
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
                                        name='comment'
                                        onChange={updateField}
                                        value={snippetInformations[indexSnippetInformation].comment ?? ''}
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
                                        name='name'
                                        onChange={updateField}
                                        value={snippetInformations[indexSnippetInformation].name ?? ''}
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
                                        name='snippetAttributionText'
                                        onChange={updateField}
                                        value={
                                            snippetInformations[indexSnippetInformation].snippetAttributionText ?? ''
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

export default EditSnippetInformation
