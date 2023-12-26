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
import styles from '../../detail.module.css'

interface Props {
    // snippetInformations?: Array<SnippetInformation>
    spdxDocument?: SPDXDocument
}

const SnippetInformationDetail = ({ spdxDocument }: Props) => {
    const [toggle, setToggle] = useState(false)

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
                    <td>Index</td>
                    <td className='spdx-flex-row'>
                        <select
                            id='snippetInfoSelect'
                            className='spdx-col-2'
                            // onchange='displayIndex(this)'
                        ></select>
                    </td>
                </tr>
                {spdxDocument?.snippets.length !== 0 &&
                    spdxDocument?.snippets.map((snippetsData) => {
                        return (
                            <>
                                <tr data-index={snippetsData.index}>
                                    <td>9.1 Snippet SPDX identifier</td>
                                    <td className='spdx-flex-row'>
                                        <div className='spdx-col-2'>{snippetsData.SPDXID}</div>
                                    </td>
                                </tr>
                                <tr data-index={snippetsData.index}>
                                    <td>9.2 Snippet from file SPDX identifier</td>
                                    <td className='spdx-flex-row'>
                                        <div className='spdx-col-2'>{snippetsData.snippetFromFile}</div>
                                    </td>
                                </tr>
                                <tr data-index={snippetsData.index}>
                                    <td>9.3 & 9.4 Snippet ranges</td>
                                    <td className='spdx-flex-row'>
                                        <div
                                            className='spdx-col-2 spdx-flex-col'
                                            id='snippetRanges-${snippetsData.index}'
                                        >
                                            {snippetsData?.snippetRanges &&
                                                snippetsData?.snippetRanges.map((snippetRangeData) => {
                                                    return (
                                                        <div
                                                            key={snippetsData.index}
                                                            className='spdx-flex-row snippetRange-${snippetsData.index}'
                                                            data-index={snippetRangeData.index}
                                                        >
                                                            <div className='spdx-col-1 spdx-key'>
                                                                {snippetRangeData.rangeType}
                                                            </div>
                                                            <div className='spdx-col-1 spdx-flex-row'>
                                                                <td>{snippetRangeData.startPointer}</td>
                                                                <td>~</td>
                                                                <td>{snippetRangeData.endPointer}</td>
                                                            </div>
                                                            <div className='spdx-col-3'>
                                                                {snippetRangeData.reference}
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                        </div>
                                    </td>
                                </tr>
                                <tr data-index={snippetsData.index}>
                                    <td>9.5 Snippet concluded license</td>
                                    <td className='spdx-flex-row'>
                                        <div className='spdx-col-2'>{snippetsData.licenseConcluded}</div>
                                    </td>
                                </tr>
                                <tr data-index={snippetsData.index}>
                                    <td>9.6 License information in snippet</td>
                                    <td className='spdx-flex-row'>
                                        <p className='spdx-col-2 '>
                                            {snippetsData?.licenseInfoInSnippets &&
                                                snippetsData?.licenseInfoInSnippets.map((licenseInfoInSnippetData) => {
                                                    return <>{licenseInfoInSnippetData}</>
                                                })}
                                        </p>
                                    </td>
                                </tr>
                                <tr data-index={snippetsData.index}>
                                    <td>9.7 Snippet comments on license</td>
                                    <td className='spdx-flex-row'>
                                        <p className='spdx-col-2 ' id='snippetLicenseComments-${snippetsData.index}'>
                                            {snippetsData.licenseComments}
                                        </p>
                                    </td>
                                </tr>
                                <tr data-index={snippetsData.index}>
                                    <td>9.8 Snippet copyright text</td>
                                    <td className='spdx-flex-row'>
                                        <p className='spdx-col-2 ' id='snippetCopyrightText-${snippetsData.index}'>
                                            {snippetsData.copyrightText}
                                        </p>
                                    </td>
                                </tr>
                                <tr data-index={snippetsData.index}>
                                    <td>9.9 Snippet comment</td>
                                    <td className='spdx-flex-row'>
                                        <p className='spdx-col-2 ' id='snippetComment-${snippetsData.index}'>
                                            {snippetsData.comment}
                                        </p>
                                    </td>
                                </tr>
                                <tr data-index={snippetsData.index}>
                                    <td>9.10 Snippet name</td>
                                    <td className='spdx-flex-row'>
                                        <p className='spdx-col-2 '>{snippetsData?.name}</p>
                                    </td>
                                </tr>
                                <tr data-index={snippetsData.index}>
                                    <td>9.11 Snippet attribution text</td>
                                    <td>
                                        <p className='spdx-col-2 ' id='snippetAttributionText-${snippetsData.index}'>
                                            {snippetsData?.snippetAttributionText}
                                        </p>
                                    </td>
                                </tr>
                            </>
                        )
                    })}
            </tbody>
        </table>
    )
}

export default SnippetInformationDetail
