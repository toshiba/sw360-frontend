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
                <tr>
                    <td>1.6 Algorithm</td>
                    <td>SHA</td>
                </tr>
                <tr className='spdx-full'>
                    <td>1.7 Hash Value </td>
                    <td>11</td>
                </tr>

                <tr className='spdx-full'>
                    <td>1.8 Annotation </td>
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
                                <div className='spdx-col-3 spdx-uppercase'>11</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Content Type</div>
                                <div className='spdx-col-3'>11</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Statement</div>
                                <div className='spdx-col-3'>11</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Subject</div>
                                <div className='spdx-col-3'>11</div>
                            </div>
                        </div>
                    </td>
                </tr>

                <tr className='spdx-full'>
                    <td>1.9 Relationship </td>
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
                                <div className='spdx-col-3 spdx-uppercase'>11</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Completeness</div>
                                <div className='spdx-col-3'>11</div>
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
                    <td>1.10 Imports </td>
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
                                <div className='spdx-col-3 spdx-uppercase'>11</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Location Hint</div>
                                <div className='spdx-col-3'>11</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Verified Using</div>
                                <div className='spdx-col-3'>11</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Defining Artifact</div>
                                <div className='spdx-col-3'>11</div>
                            </div>
                        </div>
                    </td>
                </tr>

                <tr className='spdx-full'>
                    <td>1.11 External Identifier </td>
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
                                <div className='spdx-col-3 spdx-uppercase'>11</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Identifier</div>
                                <div className='spdx-col-3'>11</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Comment</div>
                                <div className='spdx-col-3'>11</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Identifier Locator</div>
                                <div className='spdx-col-3'>11</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Issuing Authority</div>
                                <div className='spdx-col-3'>11</div>
                            </div>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td>1.12 Begin Integer Range</td>
                    <td>11</td>
                </tr>
                <tr className='spdx-full'>
                    <td>1.13 End Integer Range</td>
                    <td>11</td>
                </tr>
                <tr className='spdx-full'>
                    <td>1.14 Context</td>
                    <td>11</td>
                </tr>
                <tr className='spdx-full'>
                    <td>1.15 Data License</td>
                    <td>11</td>
                </tr>

                <tr className='spdx-full'>
                    <td>1.16 Element</td>
                    <td>11</td>
                </tr>
                <tr className='spdx-full'>
                    <td>1.17 Extension</td>
                    <td>11</td>
                </tr>

                <tr className='spdx-full'>
                    <td>1.18 External Ref</td>
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
                                <div className='spdx-col-3 spdx-uppercase'>11</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Locator</div>
                                <div className='spdx-col-3'>11</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Content Type</div>
                                <div className='spdx-col-3'>11</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Comment</div>
                                <p className='spdx-col-3'>11</p>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>External SpdxId</div>
                                <div className='spdx-col-3'>11</div>
                            </div>
                        </div>
                    </td>
                </tr>

                <tr className='spdx-full'>
                    <td>1.19 From</td>
                    <td>11</td>
                </tr>
                <tr className='spdx-full'>
                    <td>1.20 To</td>
                    <td>11</td>
                </tr>
                <tr className='spdx-full'>
                    <td>1.21 Key</td>
                    <td>11</td>
                </tr>
                <tr className='spdx-full'>
                    <td>1.22 Value</td>
                    <td>11</td>
                </tr>
                <tr className='spdx-full'>
                    <td>1.23 Originated By</td>
                    <td>11</td>
                </tr>
                <tr className='spdx-full'>
                    <td>1.24 Supplied By</td>
                    <td>11</td>
                </tr>
                <tr>
                    <td>1.25 Built Time</td>
                    <td>2024-03-12</td>
                </tr>
                <tr className='spdx-full'>
                    <td>1.26 Release Time</td>
                    <td>2024-03-12</td>
                </tr>
                <tr className='spdx-full'>
                    <td>1.27 Valid Until Time</td>
                    <td>2024-03-12</td>
                </tr>
                <tr className='spdx-full'>
                    <td>1.28 Standard Name</td>
                    <td>11</td>
                </tr>
                <tr className='spdx-full'>
                    <td>1.29 Support Level</td>
                    <td>11</td>
                </tr>
                <tr className='spdx-full'>
                    <td>1.30 Hash Value </td>
                    <td>11</td>
                </tr>
                <tr className='spdx-full'>
                    <td>1.31 PackageVerificationCodeExcludedFile</td>
                    <td>11</td>
                </tr>
                <tr className='spdx-full'>
                    <td>1.32 Prefix</td>
                    <td>11</td>
                </tr>
                <tr className='spdx-full'>
                    <td>1.33 Name Space</td>
                    <td>11</td>
                </tr>
                <tr className='spdx-full'>
                    <td>1.34 Profile Conformance</td>
                    <td>11</td>
                </tr>
                <tr className='spdx-full'>
                    <td>1.35 Root Element</td>
                    <td>11</td>
                </tr>
                <tr className='spdx-full'>
                    <td>1.36 Scope</td>
                    <td>11</td>
                </tr>
                <tr className='spdx-full'>
                    <td>1.37 Spec version</td>
                    <td>11</td>
                </tr>
                <tr className='spdx-full'>
                    <td>1.38 Created</td>
                    <td>11</td>
                </tr>
                <tr className='spdx-full'>
                    <td>1.39 Created By</td>
                    <td>11</td>
                </tr>
                <tr className='spdx-full'>
                    <td>1.40 Created Using</td>
                    <td>11</td>
                </tr>
            </tbody>
        </table>
    )
}

export default CoreProfiles
