// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import TitleLinkedReleases from './TitleLinkedReleases/TitleLinkedReleases'
import styles from '../../Attachments/Attachment.module.css'
import TableLinkedReleases from './TableLinkedReleases/TableLinkedReleases'
import { useTranslations } from 'next-intl'
import { COMMON_NAMESPACE } from '@/object-types/Constants'
const LinkedReleases = () => {
    const t = useTranslations(COMMON_NAMESPACE)
    return (
        <>
            <div className={`row ${styles['attachment-table']}`} style={{ padding: '25px' }}>
                <TitleLinkedReleases />
                <TableLinkedReleases />
            </div>
            <div>
                <button
                    type='button'
                    className={`fw-bold btn btn-light button-plain`}
                >
                    {t('Click to add Releases')}
                </button>
            </div>
        </>
    )
}

export default LinkedReleases
