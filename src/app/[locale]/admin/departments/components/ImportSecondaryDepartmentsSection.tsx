// Copyright (C) TOSHIBA CORPORATION, 2025. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2025. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

import { Button } from 'react-bootstrap'

const ImportSecondaryDepartmentsSection = (): JSX.Element => {
    return (
        <div>
            <div className='row'>
                <div className='col-lg-6'>
                    <table className='table import-config-table'>
                        <tbody>
                            <tr>
                                <th style={{ lineHeight: '40px' }} className='table-header'>Registration Folder Path</th>
                                <td>
                                    <form id='edit-path-folder' name='edit-path-folder' className='needs-validation'>
                                        <input id='pathFolderDepartment' type='text' className='form-control' name='import-folder-path' placeholder='Enter the directory path folder' />
                                    </form>
                                </td>
                                <td width='3%'>
                                    <button type='button' className='btn btn-primary' id='updatePathFolder'>Update</button>
                                </td>
                            </tr>
                            <tr>
                                <th className='table-header'>Interval</th>
                                <td>01:00:00 (hh:mm:ss)</td>
                                <td></td>
                            </tr>
                            <tr>
                                <th className='table-header'>Last Running Time</th>
                                <td>Tue Feb 11 03:11:28 GMT 2025</td>
                                <td></td>
                            </tr>
                            <tr>
                                <th className='table-header'>Next Running Time</th>
                                <td>Thu Feb 13 08:00:00 GMT 2025</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='row mb-3'>
                <div className='col'>
                    <Button variant='primary'>Schedule Dept. Generating</Button>
                    <Button variant='light' className='ms-4'>Cancel Dept. Generating</Button>
                    <Button variant='info' className='ms-4'>Manually Activate</Button>
                    <Button variant='secondary' className='ms-4'>View Logs</Button>
                </div>
            </div>
        </div>
    )
}

export default ImportSecondaryDepartmentsSection