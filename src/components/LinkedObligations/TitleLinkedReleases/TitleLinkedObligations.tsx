// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

import { useTranslations } from 'next-intl'
import styles from './TitleLinkedObligations.module.css'
export default function TitleLinkedObligations() {
    const t = useTranslations('default')
    return (
        <>
            <div className={`${styles['div-title-second']}`}>
                <div className={`${styles['div-id']}`}>
                    <p className='fw-bold mt-2'></p>
                </div>
                <div className={`${styles['div-filename']}`}>
                    <p className='fw-bold mt-2'>{t('Obligation Title')}</p>
                </div>
                <div className={`${styles['div-filename']}`}>
                    <p className='fw-bold mt-2'>{t('Obligation Type')}</p>
                </div>
                <div className={`${styles['div-filename']}`}>
                    <p className='fw-bold mt-2'>{t('Text')}</p>
                </div>
                <div className={`${styles['div-filename']}`}>
                    <p className='fw-bold mt-2'>{t('Action')}</p>
                </div>
            </div>
        </>
    )
}
