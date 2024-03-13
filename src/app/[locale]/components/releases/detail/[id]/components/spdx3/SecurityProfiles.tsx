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
                    <td>3.1 Action Statement</td>
                    <td>11</td>
                </tr>
                <tr>
                    <td>3.2 Action Statement Time</td>
                    <td>2024-03-12</td>
                </tr>
                <tr>
                    <td>3.3 Assessed Element</td>
                    <td>11</td>
                </tr>
                <tr>
                    <td>3.4 Catalog Type</td>
                    <td>11</td>
                </tr>
                <tr>
                    <td>3.5 DecisionType</td>
                    <td>act</td>
                </tr>
                <tr>
                    <td>3.6 Exploited</td>
                    <td>kev</td>
                </tr>
                <tr>
                    <td>3.7 Impact Statement</td>
                    <td>11</td>
                </tr>
                <tr>
                    <td>3.8 Impact Statement Time</td>
                    <td>2024-03-12</td>
                </tr>
                <tr>
                    <td>3.9 Justification Type</td>
                    <td>component not present</td>
                </tr>
                <tr>
                    <td>3.10 Locator</td>
                    <td>11</td>
                </tr>
                <tr>
                    <td>3.11 Modified Time</td>
                    <td>2024-03-12</td>
                </tr>
                <tr>
                    <td>3.12 Percentile</td>
                    <td>11</td>
                </tr>
                <tr>
                    <td>3.13 Probability</td>
                    <td>11</td>
                </tr>

                <tr>
                    <td>3.15 Score</td>
                    <td>11</td>
                </tr>
                <tr>
                    <td>3.16 Severity</td>
                    <td>critical</td>
                </tr>
                <tr>
                    <td>3.17 Status Notes</td>
                    <td>11</td>
                </tr>
                <tr>
                    <td>3.18 Vector String</td>
                    <td>11</td>
                </tr>
                <tr>
                    <td>3.19 Vex Version</td>
                    <td>11</td>
                </tr>
                <tr>
                    <td>3.20 Withdrawn Time</td>
                    <td>2024-03-12</td>
                </tr>
            </tbody>
        </table>
    )
}

export default SecurityProfiles
