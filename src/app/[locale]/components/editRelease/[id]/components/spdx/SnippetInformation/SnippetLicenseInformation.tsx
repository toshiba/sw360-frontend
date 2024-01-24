// Copyright (C) Siemens AG, 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

import { useState } from 'react'
import SnippetInformation from '../../../../../../../../object-types/spdx/SnippetInformation'
interface Props {
    snippetInformation: SnippetInformation
}

function SnippetLicenseInformation({ snippetInformation }: Props) {
    // licenseInfoSnippet
    const [licenseInfoSnippetExist, setLicenseInfoSnippetExist] = useState(true)
    const [licenseInfoSnippetNone, setLicenseInfoSnippetNone] = useState(false)
    const [licenseInfoSnippetNoasserttion, setLicenseInfoSnippetNoasserttion] = useState(false)

    const selectLicenseInfoSnippetExist = () => {
        setLicenseInfoSnippetExist(true)
        setLicenseInfoSnippetNone(false)
        setLicenseInfoSnippetNoasserttion(false)
    }
    const selectLicenseInfoSnippetNone = () => {
        setLicenseInfoSnippetExist(false)
        setLicenseInfoSnippetNone(true)
        setLicenseInfoSnippetNoasserttion(false)
    }
    const selectLicenseInfoSnippetNoasserttion = () => {
        setLicenseInfoSnippetExist(false)
        setLicenseInfoSnippetNone(false)
        setLicenseInfoSnippetNoasserttion(true)
    }

    return (
        <td colSpan={3}>
            <div className='form-group'>
                <label className='lableSPDX'>9.6 License information in snippet</label>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ display: 'inline-flex', flex: 3, marginRight: '1rem' }}>
                        <input
                            className='spdx-radio'
                            id='licenseInfoInFile'
                            type='radio'
                            name='_sw360_portlet_components_LICENSE_INFO_IN_FILE'
                            value='EXIST'
                            onClick={selectLicenseInfoSnippetExist}
                            checked={licenseInfoSnippetExist}
                        />
                        <textarea
                            style={{ flex: 6, marginRight: '1rem' }}
                            id='licenseInfoInFileValue'
                            rows={5}
                            className='form-control'
                            name='_sw360_portlet_components_LICENSE_INFO_IN_FILE_SOURCE'
                            placeholder='Enter license information in snippet'
                            value={snippetInformation.licenseInfoInSnippets ?? ''}
                            disabled={licenseInfoSnippetNone || licenseInfoSnippetNoasserttion}
                        ></textarea>
                    </div>
                    <div style={{ flex: 2 }}>
                        <input
                            className='spdx-radio'
                            id='licenseInfoInFileNone'
                            type='radio'
                            name='_sw360_portlet_components_LICENSE_INFO_IN_FILE'
                            value='NONE'
                            onClick={selectLicenseInfoSnippetNone}
                            checked={licenseInfoSnippetNone}
                        />
                        <label
                            style={{ marginRight: '2rem' }}
                            className='form-check-label radio-label lableSPDX'
                            htmlFor='licenseInfoInFileNone'
                        >
                            NONE
                        </label>
                        <input
                            className='spdx-radio'
                            id='licenseInfoInFileNoAssertion'
                            type='radio'
                            name='_sw360_portlet_components_LICENSE_INFO_IN_FILE'
                            value='NOASSERTION'
                            onClick={selectLicenseInfoSnippetNoasserttion}
                            checked={licenseInfoSnippetNoasserttion}
                        />
                        <label
                            className='form-check-label radio-label lableSPDX'
                            htmlFor='licenseInfoInFileNoAssertion'
                        >
                            NOASSERTION
                        </label>
                    </div>
                </div>
            </div>
        </td>
    )
}

export default SnippetLicenseInformation
