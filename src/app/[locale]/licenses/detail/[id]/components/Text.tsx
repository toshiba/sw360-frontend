// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'
import LicenseDetail from '@/object-types/LicenseDetail'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import styles from '../detail.module.css'

interface Props {
    license: LicenseDetail
}

const Text = ({ license }: Props) => {
    const t = useTranslations('default')
    const [toggle, setToggle] = useState(false)
    return (
        <div className='col'>
            <table className={`table label-value-table ${styles['summary-table']}`}>
                <thead
                    title='Click to expand or collapse'
                    onClick={() => {
                        setToggle(!toggle)
                    }}
                >
                    <tr>
                        <th colSpan={2}>{t('License Text')}</th>
                    </tr>
                </thead>
                <tbody hidden={toggle}>
                    <tr>
                        <td>{license.text ?? ''}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Text
