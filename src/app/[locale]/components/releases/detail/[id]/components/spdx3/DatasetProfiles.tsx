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

const DatasetProfiles = () => {
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
                    <th colSpan={2}>5. Dataset Profiles</th>
                </tr>
            </thead>
            <tbody hidden={toggle}>
                <tr>
                    <td>5.1 Anonymization Method Used</td>
                    <td>11</td>
                </tr>
                <tr>
                    <td>5.2 Confidentiality Level</td>
                    <td>green</td>
                </tr>
                <tr>
                    <td>5.3 Data Collection Process</td>
                    <td>11</td>
                </tr>
                <tr>
                    <td>5.4 Data Preprocessing</td>
                    <td>11</td>
                </tr>
                <tr className='spdx-full'>
                    <td>5.5 Dataset Availability</td>
                    <td>Direct Download</td>
                </tr>
                <tr className='spdx-full'>
                    <td>5.6 Dataset Noise</td>
                    <td>11</td>
                </tr>
                <tr className='spdx-full'>
                    <td>5.7 Dataset Size</td>
                    <td>11</td>
                </tr>
                <tr className='spdx-full'>
                    <td>5.8 Dataset Type</td>
                    <td className='spdx-col-3'>structured</td>
                </tr>
                <tr className='spdx-full'>
                    <td>5.9 Dataset Update Mechanism</td>
                    <td>11</td>
                </tr>
                <tr className='spdx-full'>
                    <td>5.10 Intended Use</td>
                    <td>11</td>
                </tr>
                <tr className='spdx-full'>
                    <td>5.11 Known Bias</td>
                    <td>11</td>
                </tr>
                <tr className='spdx-full'>
                    <td>5.12 Sensitive Personal Information</td>
                    <td>11</td>
                </tr>
                <tr className='spdx-full'>
                    <td>5.13 Sensor</td>
                    <td>11</td>
                </tr>
            </tbody>
        </table>
    )
}

export default DatasetProfiles
