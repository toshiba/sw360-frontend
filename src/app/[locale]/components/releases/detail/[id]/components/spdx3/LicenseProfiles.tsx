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

const LicenseProfiles = () => {
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
                    <th colSpan={2}>4. License Profiles</th>
                </tr>
            </thead>
            <tbody hidden={toggle}>
                <tr>
                    <td>4.1 Custom Id To Uri</td>
                    <td>Custom Id To Uri</td>
                </tr>
                <tr>
                    <td>4.2 License Expression</td>
                    <td>License Expression</td>
                </tr>
                <tr>
                    <td>4.3 License List Version</td>
                    <td>License List Version</td>
                </tr>
                <tr>
                    <td>4.4 License Text</td>
                    <td>(c) Copyright 2000</td>
                </tr>
                <tr>
                    <td>4.5 Addition Text</td>
                    <td> All rights reserved</td>
                </tr>
                <tr>
                    <td>4.6 Deprecated Version</td>
                    <td>Deprecated Version</td>
                </tr>
                <tr>
                    <td>4.7 Is Deprecated Addition Id</td>
                    <td>True</td>
                </tr>
                <tr>
                    <td>4.8 Is Deprecated License Id</td>
                    <td>False</td>
                </tr>
                <tr>
                    <td>4.9 Is Fsf Libre</td>
                    <td>True</td>
                </tr>
                <tr>
                    <td>4.10 Is Osi Approved</td>
                    <td>False</td>
                </tr>
                <tr>
                    <td>4.11 License Xml</td>
                    <td>License Xml</td>
                </tr>
                <tr>
                    <td>4.12 List Version Added</td>
                    <td>List Version Added</td>
                </tr>
                <tr>
                    <td>4.13 Member</td>
                    <td>Member</td>
                </tr>
                <tr>
                    <td>4.14 Obsoleted By</td>
                    <td>Admin</td>
                </tr>
                <tr>
                    <td>4.15 See Also</td>
                    <td>See Also</td>
                </tr>
                <tr>
                    <td>4.16 Standard Addition Template</td>
                    <td>Standard Addition Template</td>
                </tr>
                <tr>
                    <td>4.17 Standard License Header</td>
                    <td>Standard License Header</td>
                </tr>
                <tr>
                    <td>4.18 Standard License Template</td>
                    <td>Standard License Template</td>
                </tr>
                <tr>
                    <td>4.19 Subject Addition</td>
                    <td>Subject Addition</td>
                </tr>
                <tr>
                    <td>4.20 Subject Extendable License</td>
                    <td>Subject Extendable License</td>
                </tr>
                <tr>
                    <td>4.21 Subject License</td>
                    <td>Subject License</td>
                </tr>
            </tbody>
        </table>
    )
}

export default LicenseProfiles
