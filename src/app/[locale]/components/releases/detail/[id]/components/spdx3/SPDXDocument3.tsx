// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import AIProfiles from './AIProfiles'
import BuildProfiles from './BuildProfiles'
import CoreProfiles from './CoreProfiles'
import styles from './CssButton.module.css'
import DatasetProfiles from './DatasetProfiles'
import ExtensionProfiles from './ExtensionProfiles'
import LicenseProfiles from './LicenseProfiles'
import SecurityProfiles from './SecurityProfiles'
import SoftwareProfiles from './SoftwareProfiles'

const SPDXDocument3 = () => {
    const t = useTranslations('default')
    const [isModeFull, setIsModeFull] = useState(true)
    const changeModeFull = () => {
        setIsModeFull(true)
    }

    const changeModeLite = () => {
        setIsModeFull(false)
    }

    return (
        <>
            <div className='list-group-companion' data-belong-to='tab-Attachments'>
                <div className='btn-group'>
                    <button
                        className={`btn ${isModeFull ? styles['btn-full'] : styles['btn-lite']}`}
                        onClick={changeModeFull}
                    >
                        {t('SPDX FULL')}
                    </button>
                    <button
                        className={`btn ${isModeFull ? styles['btn-lite'] : styles['btn-full']}`}
                        onClick={changeModeLite}
                    >
                        {t('SPDX LITE')}
                    </button>
                </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <div className='col'>
                <CoreProfiles />
                <SoftwareProfiles />
                <SecurityProfiles />
                <LicenseProfiles />
                <DatasetProfiles />
                <AIProfiles />
                <BuildProfiles />
                <ExtensionProfiles />
            </div>
        </>
    )
}

export default SPDXDocument3
