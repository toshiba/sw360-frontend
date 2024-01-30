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

function PackageHomePage({ packageInformation, updateField }: Props) {
    //packageHomePage
    const [packageHomePageExist, setPackageHomePageExist] = useState(true)
    const [packageHomePageNone, setPackageHomePageNone] = useState(false)
    const [packageHomePageNoasserttion, setPackageHomePageNoasserttion] = useState(false)

    const selectPackageHomePageExist = () => {
        setPackageHomePageExist(true)
        setPackageHomePageNone(false)
        setPackageHomePageNoasserttion(false)
    }
    const selectPackageHomePageNone = () => {
        setPackageHomePageExist(false)
        setPackageHomePageNone(true)
        setPackageHomePageNoasserttion(false)
    }
    const selectPackageHomePageNoasserttion = () => {
        setPackageHomePageExist(false)
        setPackageHomePageNone(false)
        setPackageHomePageNoasserttion(true)
    }

    return (
        <td colSpan={3}>
            <div className='form-group'>
                <label className='lableSPDX'>7.11 Package home page</label>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ display: 'inline-flex', flex: 3, marginRight: '1rem' }}>
                        <input
                            className='spdx-radio'
                            id='packageHomepageExist'
                            type='radio'
                            name='_sw360_portlet_components_PACKAGE_HOMEPAGE'
                            value='EXIST'
                            onClick={selectPackageHomePageExist}
                            checked={packageHomePageExist}
                        />
                        <input
                            style={{ flex: 6, marginRight: '1rem' }}
                            id='packageHomePage'
                            className='form-control'
                            type='text'
                            name='homepage'
                            placeholder='Enter package homepage'
                            onChange={updateField}
                            value={packageInformation.homepage ?? ''}
                            disabled={packageHomePageNone || packageHomePageNoasserttion}
                        />
                    </div>
                    <div style={{ flex: 2 }}>
                        <input
                            className='spdx-radio'
                            id='packageHomepageNone'
                            type='radio'
                            name='_sw360_portlet_components_PACKAGE_HOMEPAGE'
                            value='NONE'
                            onClick={selectPackageHomePageNone}
                            checked={packageHomePageNone}
                        />
                        <label
                            style={{ marginRight: '2rem' }}
                            className='form-check-label radio-label lableSPDX'
                            htmlFor='packageHomePageNone'
                        >
                            NONE
                        </label>
                        <input
                            className='spdx-radio'
                            id='packageHomepageNoAssertion'
                            type='radio'
                            name='_sw360_portlet_components_PACKAGE_HOMEPAGE'
                            value='NOASSERTION'
                            onClick={selectPackageHomePageNoasserttion}
                            checked={packageHomePageNoasserttion}
                        />
                        <label className='form-check-label radio-label lableSPDX' htmlFor='packageHomePageNoAssertion'>
                            NOASSERTION
                        </label>
                    </div>
                </div>
            </div>
        </td>
    )
}

export default PackageHomePage
