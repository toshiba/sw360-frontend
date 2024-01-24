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

function SnippetConcludedLicense({ snippetInformation }: Props) {
    //snippetConcludedLicense
    const [snippetConcludedLicenseExist, setSnippetConcludedLicenseExist] = useState(true)
    const [snippetConcludedLicenseNone, setSnippetConcludedLicenseNone] = useState(false)
    const [snippetConcludedLicenseNoasserttion, setSnippetConcludedLicenseNoasserttion] = useState(false)

    const selectSnippetConcludedLicenseExist = () => {
        setSnippetConcludedLicenseExist(true)
        setSnippetConcludedLicenseNone(false)
        setSnippetConcludedLicenseNoasserttion(false)
    }
    const selectSnippetConcludedLicenseNone = () => {
        setSnippetConcludedLicenseExist(false)
        setSnippetConcludedLicenseNone(true)
        setSnippetConcludedLicenseNoasserttion(false)
    }
    const selectSnippetConcludedLicenseNoasserttion = () => {
        setSnippetConcludedLicenseExist(false)
        setSnippetConcludedLicenseNone(false)
        setSnippetConcludedLicenseNoasserttion(true)
    }

    return (
        <td colSpan={3}>
            <div className='form-group'>
                <label className='lableSPDX'>9.5 Snippet concluded license</label>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ display: 'inline-flex', flex: 3, marginRight: '1rem' }}>
                        <input
                            className='spdx-radio'
                            id='spdxConcludedLicenseExist'
                            type='radio'
                            name='_sw360_portlet_components_CONCLUDED_LICENSE'
                            value='EXIST'
                            onClick={selectSnippetConcludedLicenseExist}
                            checked={snippetConcludedLicenseExist}
                        />
                        <input
                            style={{ flex: 6, marginRight: '1rem' }}
                            id='spdxConcludedLicenseValue'
                            className='form-control'
                            type='text'
                            name='_sw360_portlet_components_CONCLUDED_LICENSE_VALUE'
                            placeholder='Enter snippet concluded license'
                            value={snippetInformation.licenseConcluded ?? ''}
                            disabled={snippetConcludedLicenseNone || snippetConcludedLicenseNoasserttion}
                        />
                    </div>
                    <div style={{ flex: 2 }}>
                        <input
                            className='spdx-radio'
                            id='spdxConcludedLicenseNone'
                            type='radio'
                            name='_sw360_portlet_components_CONCLUDED_LICENSE'
                            value='NONE'
                            onClick={selectSnippetConcludedLicenseNone}
                            checked={snippetConcludedLicenseNone}
                        />
                        <label
                            style={{ marginRight: '2rem' }}
                            className='form-check-label radio-label lableSPDX'
                            htmlFor='spdxConcludedLicenseNone'
                        >
                            NONE
                        </label>
                        <input
                            className='spdx-radio'
                            id='spdxConcludedLicenseNoAssertion'
                            type='radio'
                            name='_sw360_portlet_components_CONCLUDED_LICENSE'
                            value='NOASSERTION'
                            onClick={selectSnippetConcludedLicenseNoasserttion}
                            checked={snippetConcludedLicenseNoasserttion}
                        />
                        <label
                            className='form-check-label radio-label lableSPDX'
                            htmlFor='spdxConcludedLicenseNoAssertion'
                        >
                            NOASSERTION
                        </label>
                    </div>
                </div>
            </div>
        </td>
    )
}

export default SnippetConcludedLicense
