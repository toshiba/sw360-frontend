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

const AIProfiles = () => {
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
                    <th colSpan={2}>6. AI Profiles</th>
                </tr>
            </thead>
            <tbody hidden={toggle}>
                <tr>
                    <td>6.1 Autonomy Type</td>
                    <td>11</td>
                </tr>
                <tr>
                    <td>6.2 Domain</td>
                    <td>11</td>
                </tr>
                <tr>
                    <td>6.3 Energy Consumption</td>
                    <td>11</td>
                </tr>
                <tr>
                    <td>6.4 Hyper Parameter</td>
                    <td>11</td>
                </tr>
                <tr>
                    <td>6.5 Information About Training</td>
                    <td>11</td>
                </tr>
                <tr>
                    <td>6.6 Limitation</td>
                    <td>11</td>
                </tr>
                <tr>
                    <td>6.7 Metric</td>
                    <td>11</td>
                </tr>
                <tr>
                    <td>6.8 Metric Decision Threshold</td>
                    <td>11</td>
                </tr>
                <tr>
                    <td>6.9 Model Data Preprocessing</td>
                    <td>11</td>
                </tr>
                <tr>
                    <td>6.10 Safety Risk Assessment</td>
                    <td>serious</td>
                </tr>
                <tr>
                    <td>6.11 SensitivePersonal Information</td>
                    <td>11</td>
                </tr>
                <tr>
                    <td>6.12 Standard Compliance</td>
                    <td>11</td>
                </tr>
                <tr>
                    <td>6.13 Type Of Model</td>
                    <td>11</td>
                </tr>
            </tbody>
        </table>
    )
}

export default AIProfiles
