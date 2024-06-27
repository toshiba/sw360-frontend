// Copyright (C) TOSHIBA CORPORATION, 2024. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2024. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

import { Table } from 'react-bootstrap'
import { ShowInfoOnHover } from 'next-sw360'

const LinkedReleasesTable = ({children}: {children: React.ReactNode}) => {
    return (
        <Table>
            <TableHeader />
            {children}
        </Table>
    )
}

const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th>
                    Release Name
                </th>
                <th>
                    Release version
                </th>
                <th style={{width: '5%'}}>
                    <div>
                        <span>Reload Info </span> <ShowInfoOnHover text='Load default child releases'/>
                    </div>
                </th>
                <th>
                    <div>
                        <span>Release relation </span>
                        <ShowInfoOnHover text={
                            <>
                            <b>Unkown</b>: If you just do not know
                            <br /><b>Contained</b>: If you just do not know whether it is dynamically linked
                            <br /><b>Refered</b>: Referencing a stand alone used other part
                            <br /><b>Dynamically Linked</b>: Software dynamically linked - as the name says
                            <br /><b>Statically linked</b>: Software statically linked - as the name says
                            <br /><b>Side by side</b>: Not decided so far
                            <br /><b>Standalone</b>: Software is given as standalone delivery, ie. not technically connected
                            <br /><b>Internal Use</b>: Used for creating or building or ? the product or projects but not delivered
                            <br /><b>Optional</b>: Is not mandatory part of the installation
                            <br /><b>To be replaced</b>: Is there but should be moved out
                            <br /><b>Code Snippet</b>: From references release, a fragment is used.
                            </>
                        }
                        />
                    </div>
                </th>
                <th>
                    <div>
                        <span>Project Mainline State </span>
                        <ShowInfoOnHover text={
                            <>
                            <b>Open</b>: Not decided so far
                            <br /><b>Mainline</b>: Organisation or person thinks that use of this software is recommended, which included multiple versions
                            <br /><b>Specific</b>: The software is not recommended in general, but for special use case or for this particular version it is acceptable
                            <br /><b>In Phaseout</b>: The software has issues, please consider removing it soon, if in use
                            <br /><b>Denied</b>: Software which is not allowed for use. For example, software that does not have licensing
                            </>
                        }
                        />
                    </div>
                </th>
                <th>
                    Comments
                </th>
                <th style={{width: '5%'}}>
                    Action
                </th>
            </tr>
        </thead>
    )
}

export default LinkedReleasesTable