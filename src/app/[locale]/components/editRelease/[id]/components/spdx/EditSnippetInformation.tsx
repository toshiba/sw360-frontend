// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'
import { useEffect, useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import SnippetInformation from '../../../../../../../object-types/spdx/SnippetInformation'
import SnippetRange from '../../../../../../../object-types/spdx/SnippetRange'
import styles from '../detail.module.css'
import SnippetConcludedLicense from './SnippetInformation/SnippetConcludedLicense'
import SnippetCopyrightText from './SnippetInformation/SnippetCopyrightText'
import SnippetLicenseInformation from './SnippetInformation/SnippetLicenseInformation'
import SnippetRanges from './SnippetRanges'

interface Props {
    // snippetInformations?: Array<SnippetInformation>
    snippetInformation?: SnippetInformation
    setSnippetInformation?: React.Dispatch<React.SetStateAction<SnippetInformation>>
    snippetInformations?: SnippetInformation[]
    setSnippetInformations?: React.Dispatch<React.SetStateAction<SnippetInformation[]>>
}

const EditSnippetInformation = ({
    snippetInformation,
    setSnippetInformation,
    snippetInformations,
    setSnippetInformations,
}: Props) => {
    const [toggle, setToggle] = useState(false)
    const [snippetRanges, setSnippetRanges] = useState<SnippetRange[]>([])

    const displayIndex = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const index: string = e.target.value
        setSnippetInformation(snippetInformations[+index])
    }

    const addSnippet = () => {
        const arrayExternals: SnippetInformation[] = snippetInformations
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
        setSnippetInformation(snippetInformation)
    }

    useEffect(() => {
        if (typeof snippetInformation?.snippetRanges !== 'undefined') {
            setSnippetRanges(convertSnippetRanges(snippetInformation.snippetRanges))
        }
    }, [snippetInformation])

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
        setSnippetInformation({
            ...snippetInformation,
            [e.target.name]: e.target.value,
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
                    <th colSpan={3}>9. Snippet Information</th>
                </tr>
            </thead>
            <tbody hidden={toggle}>
                {snippetInformation && (
                    <>
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
                                        <select
                                            id='selectSnippet'
                                            className='form-control spdx-select'
                                            onChange={displayIndex}
                                        >
                                            {' '}
                                            {snippetInformations.map((item) => (
                                                <option key={item.index} value={item.index}>
                                                    {item.index + 1}
                                                </option>
                                            ))}
                                        </select>
                                        <FaTrashAlt />
                                    </div>
                                    <button className='spdx-add-button-main' name='add-snippet' onClick={addSnippet}>
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
                                            type='text'
                                            placeholder='Enter snippet SPDX identifier'
                                            name='SPDXID'
                                            onChange={updateField}
                                            value={
                                                snippetInformation.SPDXID?.startsWith('SPDXRef-')
                                                    ? snippetInformation.SPDXID?.substring(8)
                                                    : snippetInformation.SPDXID
                                            }
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
                                            value={snippetInformation.snippetFromFile.substring(8) ?? ''}
                                        />
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}>
                                <div className='form-group'>
                                    <label className='lableSPDX'>9.3 & 9.4 Snippet ranges</label>
                                    <SnippetRanges inputList={snippetRanges} setInputList={setSnippetRanges} />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <SnippetConcludedLicense snippetInformation={snippetInformation} />
                        </tr>
                        <tr>
                            <SnippetLicenseInformation snippetInformation={snippetInformation} />
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
                                        value={snippetInformation.licenseComments ?? ''}
                                    ></textarea>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <SnippetCopyrightText snippetInformation={snippetInformation} />
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
                                        value={snippetInformation.comment ?? ''}
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
                                        value={snippetInformation.name ?? ''}
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
                                        value={snippetInformation.snippetAttributionText ?? ''}
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
