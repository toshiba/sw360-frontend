// Copyright (C) Siemens AG, 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

import { useState } from 'react'
import PackageInformation from '../../../../../../../../object-types/spdx/PackageInformation'
// import { useTranslations } from 'next-intl'

interface Props {
    packageInformation?: PackageInformation
    updateField?: any
}

function PackageCopyrightText({ packageInformation, updateField }: Props) {
    //copyrightText
    const [copyrightTextExist, setCopyrightTextExist] = useState(true)
    const [copyrightTextNone, setCopyrightTextNone] = useState(false)
    const [copyrightTextNoasserttion, setCopyrightTextNoasserttion] = useState(false)

    const selectCopyrightTextExist = () => {
        setCopyrightTextExist(true)
        setCopyrightTextNone(false)
        setCopyrightTextNoasserttion(false)
    }
    const selectCopyrightTextNone = () => {
        setCopyrightTextExist(false)
        setCopyrightTextNone(true)
        setCopyrightTextNoasserttion(false)
    }
    const selectCopyrightTextNoasserttion = () => {
        setCopyrightTextExist(false)
        setCopyrightTextNone(false)
        setCopyrightTextNoasserttion(true)
    }

    return (
        <td colSpan={3}>
            <div className='form-group'>
                <label className='lableSPDX'>7.17 Copyright text</label>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ display: 'inline-flex', flex: 3, marginRight: '1rem' }}>
                        <input
                            className='spdx-radio'
                            id='copyrightTextExist'
                            type='radio'
                            name='_sw360_portlet_components_COPYRIGHT_TEXT'
                            value='EXIST'
                            onClick={selectCopyrightTextExist}
                            checked={copyrightTextExist}
                        />
                        <textarea
                            style={{ flex: 6, marginRight: '1rem' }}
                            id='licenseInfoInFileValue'
                            rows={5}
                            className='form-control'
                            name='copyrightText'
                            placeholder='Enter copyright text'
                            onChange={updateField}
                            value={packageInformation.copyrightText ?? ''}
                            disabled={copyrightTextNone || copyrightTextNoasserttion}
                        ></textarea>
                    </div>
                    <div style={{ flex: 2 }}>
                        <input
                            className='spdx-radio'
                            id='copyrightTextNone'
                            type='radio'
                            name='_sw360_portlet_components_COPYRIGHT_TEXT'
                            value='NONE'
                            onClick={selectCopyrightTextNone}
                            checked={copyrightTextNone}
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
                            id='copyrightTextNoAssertion'
                            type='radio'
                            name='_sw360_portlet_components_COPYRIGHT_TEXT'
                            value='NOASSERTION'
                            onClick={selectCopyrightTextNoasserttion}
                            checked={copyrightTextNoasserttion}
                        />
                        <label className='form-check-label radio-label lableSPDX' htmlFor='copyrightTextNoAssertion'>
                            NOASSERTION
                        </label>
                    </div>
                </div>
            </div>
        </td>
    )
}

export default PackageCopyrightText
