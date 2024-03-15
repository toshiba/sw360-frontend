// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'
import { useState } from 'react'
import styles from '../../detail.module.css'

const CoreProfiles = () => {
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
                    <th colSpan={2}>1. Core Profiles</th>
                </tr>
            </thead>
            <tbody hidden={toggle}>
                <tr className='spdx-full'>
                    <td>1.1 SPDX ID</td>
                    <td>11</td>
                </tr>
                <tr className='spdx-full'>
                    <td>1.2 Name</td>
                    <td>11</td>
                </tr>
                <tr className='spdx-full'>
                    <td>1.3 Summary</td>
                    <td>11</td>
                </tr>
                <tr className='spdx-full'>
                    <td>1.4 Description</td>
                    <td>11</td>
                </tr>
                <tr className='spdx-full'>
                    <td>1.5 Comment</td>
                    <td>11</td>
                </tr>
                <tr className='spdx-full'>
                    <td>1.6 Annotation </td>
                    <td>
                        <div className='spdx-col-2 section' data-size='4'>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-label-index'>Index</div>
                                <select className='spdx-col-3'>
                                    <option value='1'>1</option>
                                </select>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Annotation Type</div>
                                <div className='spdx-col-3 spdx-uppercase'>other</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Content Type</div>
                                <div className='spdx-col-3'>content type</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Statement</div>
                                <div className='spdx-col-3'>statement</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Subject</div>
                                <div className='spdx-col-3'>subject</div>
                            </div>
                        </div>
                    </td>
                </tr>

                <tr className='spdx-full'>
                    <td>1.7 Relationship </td>
                    <td>
                        <div className='spdx-col-2 section' data-size='4'>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-label-index'>Index</div>
                                <select id='externalReferenceSelect${package.index}' className='spdx-col-3'>
                                    <option value='1'>1</option>
                                </select>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Relationship Type</div>
                                <div className='spdx-col-3 spdx-uppercase'>contains</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Completeness</div>
                                <div className='spdx-col-3'>incomplete</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Start Time</div>
                                <div className='spdx-col-3'>2024-03-12</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>End time</div>
                                <div className='spdx-col-3'>2024-03-12</div>
                            </div>
                        </div>
                    </td>
                </tr>

                <tr className='spdx-full'>
                    <td>1.8 Imports </td>
                    <td>
                        <div className='spdx-col-2 section' data-size='4'>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-label-index'>Index</div>
                                <select id='externalReferenceSelect${package.index}' className='spdx-col-3'>
                                    <option value='1'>1</option>
                                </select>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>External Spdx Id</div>
                                <div className='spdx-col-3 spdx-uppercase'>123456</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Location Hint</div>
                                <div className='spdx-col-3'>location hint</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Verified Using</div>
                                <div className='spdx-col-3'>verified using</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Defining Artifact</div>
                                <div className='spdx-col-3'>defining artifact</div>
                            </div>
                        </div>
                    </td>
                </tr>

                <tr className='spdx-full'>
                    <td>1.9 External Identifier </td>
                    <td>
                        <div className='spdx-col-2 section' data-size='4'>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-label-index'>Index</div>
                                <select id='externalReferenceSelect${package.index}' className='spdx-col-3'>
                                    <option value='1'>1</option>
                                </select>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>External Identifier Type</div>
                                <div className='spdx-col-3 spdx-uppercase'>cpe22</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Identifier</div>
                                <div className='spdx-col-3'>identifier</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Comment</div>
                                <div className='spdx-col-3'>comment</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Identifier Locator</div>
                                <div className='spdx-col-3'>identifier locator</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Issuing Authority</div>
                                <div className='spdx-col-3'>issuing authority</div>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>1.10 Positive Integer Range</td>
                    <td>
                        <div className='spdx-col-2 spdx-flex-col'>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Begin Integer Range</div>
                                <div className='spdx-col-3'>11</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>End Integer Range</div>
                                <div className='spdx-col-3 ' id='excludedFiles'>
                                    99
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>

                <tr className='spdx-full'>
                    <td>1.11 Context</td>
                    <td>context</td>
                </tr>
                <tr className='spdx-full'>
                    <td>1.12 Data License</td>
                    <td>OSBD</td>
                </tr>
                <tr className='spdx-full'>
                    <td>1.13 Extension</td>
                    <td>extension</td>
                </tr>

                <tr className='spdx-full'>
                    <td>1.14 External Ref</td>
                    <td>
                        <div className='spdx-col-2 section' data-size='4'>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-label-index'>Index</div>
                                <select id='externalReferenceSelect${package.index}' className='spdx-col-3'>
                                    <option value='1'>1</option>
                                </select>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>External Ref Type</div>
                                <div className='spdx-col-3 spdx-uppercase'>altWebPage</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Locator</div>
                                <div className='spdx-col-3'>locator</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Content Type</div>
                                <div className='spdx-col-3'>content type</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Comment</div>
                                <div className='spdx-col-3'>comment</div>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>1.15 Dictionary Entry</td>
                    <td>
                        <div className='spdx-col-2 spdx-flex-col'>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Key</div>
                                <div className='spdx-col-3'>key</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Value</div>
                                <div className='spdx-col-3 ' id='excludedFiles'>
                                    value
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr className='spdx-full'>
                    <td>1.16 Originated By</td>
                    <td>admin</td>
                </tr>
                <tr className='spdx-full'>
                    <td>1.17 Supplied By</td>
                    <td>admin</td>
                </tr>
                <tr>
                    <td>1.18 Built Time</td>
                    <td>2024-03-12</td>
                </tr>
                <tr className='spdx-full'>
                    <td>1.19 Release Time</td>
                    <td>2024-03-12</td>
                </tr>
                <tr className='spdx-full'>
                    <td>1.20 Valid Until Time</td>
                    <td>2024-03-12</td>
                </tr>
                <tr className='spdx-full'>
                    <td>1.21 Standard Name</td>
                    <td>standard name</td>
                </tr>
                <tr className='spdx-full'>
                    <td>1.22 Support Level</td>
                    <td>development</td>
                </tr>
                <tr>
                    <td>1.23 Hash</td>
                    <td>
                        <div className='spdx-col-2 spdx-flex-col'>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Algorithm</div>
                                <div className='spdx-col-3'>Algorithm</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Comment</div>
                                <div className='spdx-col-3'>Comment</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Hash Value</div>
                                <div className='spdx-col-3 ' id='excludedFiles'>
                                    Hash Value
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>1.24 Package Verification Code</td>
                    <td>
                        <div className='spdx-col-2 spdx-flex-col'>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Hash Value</div>
                                <div className='spdx-col-3'>Hash Value</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>PackageVerificationCodeExcludedFile</div>
                                <div className='spdx-col-3 ' id='excludedFiles'>
                                    PackageVerificationCodeExcludedFile
                                </div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Comment</div>
                                <div className='spdx-col-3'>Comment</div>
                            </div>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td>1.25 Namespace Map</td>
                    <td>
                        <div className='spdx-col-2 spdx-flex-col'>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Prefix</div>
                                <div className='spdx-col-3'>prefix</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Namespace</div>
                                <div className='spdx-col-3 ' id='excludedFiles'>
                                    namespace
                                </div>
                            </div>
                        </div>
                        <div className='spdx-col-2 spdx-flex-col'>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Prefix</div>
                                <div className='spdx-col-3'>prefix1</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Namespace</div>
                                <div className='spdx-col-3 ' id='excludedFiles'>
                                    namespace1
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr className='spdx-full'>
                    <td>1.26 Profile Conformance</td>
                    <td>11</td>
                </tr>
                <tr className='spdx-full'>
                    <td>1.27 Scope</td>
                    <td>11</td>
                </tr>
                <tr className='spdx-full'>
                    <td>1.28 Spec version</td>
                    <td>11</td>
                </tr>
                <tr className='spdx-full'>
                    <td>1.29 Created</td>
                    <td>2024-03-12</td>
                </tr>
                <tr className='spdx-full'>
                    <td>1.30 Created By</td>
                    <td>admin</td>
                </tr>
                <tr className='spdx-full'>
                    <td>1.31 Created Using</td>
                    <td>tool</td>
                </tr>
            </tbody>
        </table>
    )
}

export default CoreProfiles
