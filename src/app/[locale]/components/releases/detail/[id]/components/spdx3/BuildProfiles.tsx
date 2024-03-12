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
import styles from '../../detail.module.css'

const BuildProfiles = () => {
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
                    <th colSpan={2}>7. Build Profiles</th>
                </tr>
            </thead>
            <tbody hidden={toggle}>
                <tr>
                    <td>7.1 Build End Time</td>
                    <td>2024-03-12</td>
                </tr>
                <tr>
                    <td>7.2 Build Id</td>
                    <td>11</td>
                </tr>
                <tr>
                    <td>7.3 Build Start Time</td>
                    <td>2024-03-12</td>
                </tr>
                <tr>
                    <td>7.4 Build Type</td>
                    <td>11</td>
                </tr>
                <tr>
                    <td>7.5 Config Source Digest</td>
                    <td>11</td>
                </tr>
                <tr>
                    <td>7.6 Config Source Entrypoint</td>
                    <td>11</td>
                </tr>
                <tr>
                    <td>7.7 Config Source Uri</td>
                    <td>11</td>
                </tr>
                <tr>
                    <td>7.8 Environment</td>
                    <td>11</td>
                </tr>
                <tr>
                    <td>7.9 Parameters</td>
                    <td>11</td>
                </tr>
            </tbody>
        </table>
    )
}

export default BuildProfiles
