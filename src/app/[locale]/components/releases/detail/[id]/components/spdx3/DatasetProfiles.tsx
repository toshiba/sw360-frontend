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
                    <td>Anonymization MethodUsed</td>
                </tr>
                <tr>
                    <td>5.2 Confidentiality Level</td>
                    <td>Green</td>
                </tr>
                <tr>
                    <td>5.3 Data Collection Process</td>
                    <td>Data Collection Process</td>
                </tr>
                <tr>
                    <td>5.4 Data Preprocessing</td>
                    <td>Data Preprocessing</td>
                </tr>
                <tr className='spdx-full'>
                    <td>5.5 Dataset Availability</td>
                    <td>Direct Download</td>
                </tr>
                <tr className='spdx-full'>
                    <td>5.6 Dataset Noise</td>
                    <td>Dataset Noise</td>
                </tr>
                <tr className='spdx-full'>
                    <td>5.7 Dataset Size</td>
                    <td>Dataset Size</td>
                </tr>
                <tr className='spdx-full'>
                    <td>5.8 Dataset Type</td>
                    <td className='spdx-col-3'>Structured</td>
                </tr>
                <tr className='spdx-full'>
                    <td>5.9 Dataset Update Mechanism</td>
                    <td>Dataset Update Mechanism</td>
                </tr>
                <tr className='spdx-full'>
                    <td>5.10 Intended Use</td>
                    <td>Intended Use</td>
                </tr>
                <tr className='spdx-full'>
                    <td>5.11 Known Bias</td>
                    <td>Known Bias</td>
                </tr>
                <tr className='spdx-full'>
                    <td>5.12 Sensitive Personal Information</td>
                    <td>Sensitive Personal Information</td>
                </tr>
                <tr className='spdx-full'>
                    <td>5.13 Sensor</td>
                    <td>Sensor</td>
                </tr>
            </tbody>
        </table>
    )
}

export default DatasetProfiles
