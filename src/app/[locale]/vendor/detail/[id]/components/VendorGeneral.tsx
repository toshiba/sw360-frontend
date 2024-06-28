// Copyright (C) TOSHIBA CORPORATION, 2024. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2024. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import { VendorPayload } from '@/object-types'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import styles from './DetailVendor.module.css'

interface Props {
    vendorPayload: VendorPayload
}

const VendorGeneral = ({ vendorPayload }: Props) => {
    const t = useTranslations('default')
    const [toggle, setToggle] = useState(false)
    return (
        <table className={`table label-value-table ${styles['summary-table']}`}>
            <thead
                title='Click to expand or collapse'
                onClick={() => {
                    setToggle(!toggle)
                }}
            >
                <tr>
                    <th colSpan={2}>{t('General')}</th>
                </tr>
            </thead>
            <tbody hidden={toggle}>

                <tr>
                    <td>{t('Full Name')}:</td>
                    <td>{vendorPayload.fullname}</td>
                </tr>
                <tr>
                    <td>{t('Short Name')}:</td>
                    <td>{vendorPayload.shortname}</td>
                </tr>
                <tr>
                    <td>{t('URL')}:</td>
                    <td>{vendorPayload.url}</td>
                </tr>
            </tbody>
        </table>
    )
}

export default VendorGeneral
