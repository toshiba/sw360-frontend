// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'
import { useState } from 'react'
// import SnippetInformation from '../../../../../../../../object-types/spdx/SnippetInformation'
import SPDXDocument from '../../../../../../../../object-types/spdx/SPDXDocument'
import SnippetInformation from '../../../../../../../../object-types/spdx/SnippetInformation'
import styles from '../../detail.module.css'

interface Props {
    // snippetInformations?: Array<SnippetInformation>
    spdxDocument?: SPDXDocument
    snippetInformation?: SnippetInformation
    setSnippetInformation?: React.Dispatch<React.SetStateAction<SnippetInformation>>
}

const SnippetInformationDetail = ({ spdxDocument, snippetInformation, setSnippetInformation }: Props) => {
    const [toggle, setToggle] = useState(false)

    const displayIndex = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const index: string = e.target.value
        setSnippetInformation(spdxDocument.snippets[+index])
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
                    <th colSpan={2}>9. Snippet Information</th>
                </tr>
            </thead>
            <tbody hidden={toggle}>
                <tr>
                    <td className='spdx-label-index'>Index</td>
                    <td className='spdx-flex-row'>
                        <select id='snippetInfoSelect' className='spdx-col-2' onChange={displayIndex}>
                            {spdxDocument?.snippets
                                .toSorted((e1, e2) => e1.index - e2.index)
                                .map((item) => (
                                    <option key={item.index} value={item.index}>
                                        {item.index + 1}
                                    </option>
                                ))}
                        </select>
                    </td>
                </tr>
                {snippetInformation && (
                    <>
                        <tr data-index={snippetInformation.index}>
                            <td>9.1 Snippet SPDX identifier</td>
                            <td>{snippetInformation.SPDXID}</td>
                        </tr>
                        <tr data-index={snippetInformation.index}>
                            <td>9.2 Snippet from file SPDX identifier</td>
                            <td>{snippetInformation.snippetFromFile}</td>
                        </tr>
                        <tr data-index={snippetInformation.index}>
                            <td>9.3 & 9.4 Snippet ranges</td>
                            <td className='spdx-flex-row'>
                                <div
                                    className='spdx-col-2 spdx-flex-col'
                                    id='snippetRanges-${snippetInformation.index}'
                                >
                                    {snippetInformation?.snippetRanges &&
                                        snippetInformation?.snippetRanges.map((snippetRangeData) => {
                                            return (
                                                <div
                                                    key={snippetInformation.index}
                                                    className='spdx-flex-row'
                                                    data-index={snippetRangeData.index}
                                                >
                                                    <div className='spdx-col-1 spdx-key'>
                                                        {snippetRangeData.rangeType}
                                                    </div>
                                                    <div className='spdx-col-1' style={{ display: 'flex' }}>
                                                        <div className='spdx-col-1'>
                                                            {snippetRangeData.startPointer}
                                                        </div>
                                                        <div className='spdx-col-1'>~</div>
                                                        <div className='spdx-col-1'>{snippetRangeData.endPointer}</div>
                                                    </div>
                                                    <div className='spdx-col-3'>{snippetRangeData.reference}</div>
                                                </div>
                                            )
                                        })}
                                </div>
                            </td>
                        </tr>
                        <tr data-index={snippetInformation.index}>
                            <td>9.5 Snippet concluded license</td>
                            <td>{snippetInformation.licenseConcluded}</td>
                        </tr>
                        <tr data-index={snippetInformation.index}>
                            <td>9.6 License information in snippet</td>
                            <td className='spdx-flex-row'>
                                <p className='spdx-col-2 '>
                                    {snippetInformation?.licenseInfoInSnippets &&
                                        snippetInformation?.licenseInfoInSnippets.map((licenseInfoInSnippetData) => {
                                            return <>{licenseInfoInSnippetData}</>
                                        })}
                                </p>
                            </td>
                        </tr>
                        <tr data-index={snippetInformation.index}>
                            <td>9.7 Snippet comments on license</td>
                            <td className='spdx-flex-row'>
                                <p className='spdx-col-2 ' id='snippetLicenseComments-${snippetInformation.index}'>
                                    {snippetInformation.licenseComments}
                                </p>
                            </td>
                        </tr>
                        <tr data-index={snippetInformation.index}>
                            <td>9.8 Snippet copyright text</td>
                            <td className='spdx-flex-row'>
                                <p className='spdx-col-2 ' id='snippetCopyrightText-${snippetInformation.index}'>
                                    {snippetInformation.copyrightText}
                                </p>
                            </td>
                        </tr>
                        <tr data-index={snippetInformation.index}>
                            <td>9.9 Snippet comment</td>
                            <td className='spdx-flex-row'>
                                <p className='spdx-col-2 ' id='snippetComment-${snippetInformation.index}'>
                                    {snippetInformation.comment}
                                </p>
                            </td>
                        </tr>
                        <tr data-index={snippetInformation.index}>
                            <td>9.10 Snippet name</td>
                            <td className='spdx-flex-row'>
                                <p className='spdx-col-2 '>{snippetInformation?.name}</p>
                            </td>
                        </tr>
                        <tr data-index={snippetInformation.index}>
                            <td>9.11 Snippet attribution text</td>
                            <td>
                                <p className='spdx-col-2 ' id='snippetAttributionText-${snippetInformation.index}'>
                                    {snippetInformation?.snippetAttributionText}
                                </p>
                            </td>
                        </tr>
                    </>
                )}
            </tbody>
        </table>
    )
}

export default SnippetInformationDetail
