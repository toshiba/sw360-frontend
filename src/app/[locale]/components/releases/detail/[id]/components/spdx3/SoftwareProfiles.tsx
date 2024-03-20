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

const SoftwareProfiles = () => {
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
                    <th colSpan={2}>2. Software Profiles</th>
                </tr>
            </thead>
            <tbody hidden={toggle}>
                <tr>
                    <td>2.1 Additional Purpose</td>
                    <td>Archive</td>
                </tr>
                <tr>
                    <td>2.2 Attribution Text</td>
                    <td>Attribution Text</td>
                </tr>
                <tr>
                    <td>2.3 Byte Range</td>
                    <td>Line</td>
                </tr>
                <tr>
                    <td>2.4 Content Type</td>
                    <td>Application/json</td>
                </tr>
                <tr>
                    <td>2.5 Copyright Text </td>
                    <td>Copyright 2010, 2011</td>
                </tr>
                <tr>
                    <td>2.6 Download Location</td>
                    <td>http://ftp.gnu.org/gnu/glibc/glibc-ports-2.15.tar.gz</td>
                </tr>
                <tr>
                    <td>2.7 Gitoid</td>
                    <td>Gitoid</td>
                </tr>
                <tr>
                    <td>2.8 Home Page</td>
                    <td>http://ftp.gnu.org/gnu/glibc</td>
                </tr>
                <tr>
                    <td>2.9 Is Directory</td>
                    <td>Yes</td>
                </tr>
                <tr>
                    <td>2.10 Line Range</td>
                    <td>Line Range</td>
                </tr>
                <tr>
                    <td>2.11 Package Url</td>
                    <td>http://glibc-2.11.1.tar</td>
                </tr>
                <tr>
                    <td>2.12 Package Version</td>
                    <td>1.0.0</td>
                </tr>
                <tr>
                    <td>2.13 Primary Purpose</td>
                    <td>Application</td>
                </tr>
                <tr>
                    <td>2.14 Sbom Type</td>
                    <td>Design</td>
                </tr>
                <tr>
                    <td>2.15 Snippet From File</td>
                    <td>Snippet From File</td>
                </tr>
                <tr>
                    <td>2.16 Source Info</td>
                    <td>Source Info</td>
                </tr>
            </tbody>
        </table>
    )
}

export default SoftwareProfiles
