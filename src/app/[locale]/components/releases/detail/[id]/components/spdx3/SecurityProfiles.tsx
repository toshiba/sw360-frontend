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

const SecurityProfiles = () => {
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
                    <th colSpan={2}>3. Security Profiles</th>
                </tr>
            </thead>
            <tbody hidden={toggle}>
                <tr>
                    <td>3.1 Published Time</td>
                    <td>2024-03-22</td>
                </tr>
                <tr>
                    <td>3.2 Modified Time</td>
                    <td>2024-03-12</td>
                </tr>
                <tr>
                    <td>3.3 Withdrawn Time</td>
                    <td>2024-03-12</td>
                </tr>

                <tr className='spdx-full'>
                    <td>3.4 Cvss V2 VulnAssessment Relationship </td>
                    <td>
                        <div className='spdx-col-2 section' data-size='4'>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Assessed Element</div>
                                <div className='spdx-col-3 spdx-uppercase'>assessed element</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Score</div>
                                <div className='spdx-col-3 spdx-uppercase'>score</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Severity</div>
                                <div className='spdx-col-3'>severity</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Vector</div>
                                <div className='spdx-col-3'>vector</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Relationship Type</div>
                                <div className='spdx-col-3'>hasCvssV2AssesmentFor</div>
                            </div>
                        </div>
                    </td>
                </tr>

                <tr className='spdx-full'>
                    <td>3.5 Cvss V3 VulnAssessment Relationship </td>
                    <td>
                        <div className='spdx-col-2 section' data-size='4'>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Assessed Element</div>
                                <div className='spdx-col-3 spdx-uppercase'>assessed element</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Score</div>
                                <div className='spdx-col-3 spdx-uppercase'>score</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Severity</div>
                                <div className='spdx-col-3'>severity</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Vector</div>
                                <div className='spdx-col-3'>vector</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Relationship Type</div>
                                <div className='spdx-col-3'>hasCvssV3AssesmentFor</div>
                            </div>
                        </div>
                    </td>
                </tr>

                <tr className='spdx-full'>
                    <td>3.6 Epss Vuln Assessment Relationship </td>
                    <td>
                        <div className='spdx-col-2 section' data-size='4'>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Assessed Element</div>
                                <div className='spdx-col-3 spdx-uppercase'>assessed element</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Probability</div>
                                <div className='spdx-col-3 spdx-uppercase'>probability</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Severity</div>
                                <div className='spdx-col-3'>severity</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Relationship Type</div>
                                <div className='spdx-col-3'>HasSsvcCatalogAssesmentFor</div>
                            </div>
                        </div>
                    </td>
                </tr>

                <tr className='spdx-full'>
                    <td>3.7 Ssvc Vuln Assessment Relationship </td>
                    <td>
                        <div className='spdx-col-2 section' data-size='4'>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Assessed Element</div>
                                <div className='spdx-col-3 spdx-uppercase'>assessed element</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Decision Type</div>
                                <div className='spdx-col-3 spdx-uppercase'>decision type</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Relationship Type</div>
                                <div className='spdx-col-3'>HasSsvcCatalogAssesmentFor</div>
                            </div>
                        </div>
                    </td>
                </tr>

                <tr className='spdx-full'>
                    <td>3.8 Exploit Catalog Vuln Assessment Relationship </td>
                    <td>
                        <div className='spdx-col-2 section' data-size='4'>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Assessed Element</div>
                                <div className='spdx-col-3 spdx-uppercase'>assessed element</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>exploited</div>
                                <div className='spdx-col-3 spdx-uppercase'>exploited</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Catalog Type</div>
                                <div className='spdx-col-3 spdx-uppercase'>Catalog</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Locator</div>
                                <div className='spdx-col-3 spdx-uppercase'>locator</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Relationship Type</div>
                                <div className='spdx-col-3'>hasExploitCatalogAssessmentFor</div>
                            </div>
                        </div>
                    </td>
                </tr>

                <tr className='spdx-full'>
                    <td>3.9 Vex Affected Assessment Relationship </td>
                    <td>
                        <div className='spdx-col-2 section' data-size='4'>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Assessed Element</div>
                                <div className='spdx-col-3 spdx-uppercase'>assessed element</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Vex Published</div>
                                <div className='spdx-col-3 spdx-uppercase'>2024-03-22</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Vex Last Updated</div>
                                <div className='spdx-col-3 spdx-uppercase'>2024-03-22</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Action Statement</div>
                                <div className='spdx-col-3 spdx-uppercase'>action</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Relationship Type</div>
                                <div className='spdx-col-3'>affects</div>
                            </div>
                        </div>
                    </td>
                </tr>

                <tr className='spdx-full'>
                    <td>3.10 Vex Not Affected Vuln Assessment Relationship </td>
                    <td>
                        <div className='spdx-col-2 section' data-size='4'>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Assessed Element</div>
                                <div className='spdx-col-3 spdx-uppercase'>assessed element</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Vex Published</div>
                                <div className='spdx-col-3 spdx-uppercase'>2024-03-22</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Vex Last Updated</div>
                                <div className='spdx-col-3 spdx-uppercase'>2024-03-22</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Impact</div>
                                <div className='spdx-col-3 spdx-uppercase'>impact</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Justification</div>
                                <div className='spdx-col-3 spdx-uppercase'>VexJustificationType</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Relationship Type</div>
                                <div className='spdx-col-3'>affects</div>
                            </div>
                        </div>
                    </td>
                </tr>

                <tr className='spdx-full'>
                    <td>3.11 Vex Fixed Vuln Assessment Relationship </td>
                    <td>
                        <div className='spdx-col-2 section' data-size='4'>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Assessed Element</div>
                                <div className='spdx-col-3 spdx-uppercase'>assessed element</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Vex Published</div>
                                <div className='spdx-col-3 spdx-uppercase'>2024-03-22</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Vex Last Updated</div>
                                <div className='spdx-col-3 spdx-uppercase'>2024-03-22</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Relationship Type</div>
                                <div className='spdx-col-3'>affects</div>
                            </div>
                        </div>
                    </td>
                </tr>

                <tr className='spdx-full'>
                    <td>3.12 Vex Under Investigation Vuln Assessment Relationship </td>
                    <td>
                        <div className='spdx-col-2 section' data-size='4'>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Assessed Element</div>
                                <div className='spdx-col-3 spdx-uppercase'>assessed element</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Vex Published</div>
                                <div className='spdx-col-3 spdx-uppercase'>2024-03-22</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Vex Last Updated</div>
                                <div className='spdx-col-3 spdx-uppercase'>2024-03-22</div>
                            </div>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-key'>Relationship Type</div>
                                <div className='spdx-col-3'>affects</div>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default SecurityProfiles
