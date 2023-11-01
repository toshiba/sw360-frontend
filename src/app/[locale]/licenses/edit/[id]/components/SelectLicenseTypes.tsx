// Copyright (C) Siemens AG, 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use-client'

import { useTranslations } from 'next-intl'
import React from 'react'

interface Props {
    licenseTypes?: any[]
    selectTypes?: React.ChangeEventHandler<HTMLSelectElement>
    value?: string
}

interface LicenseType {
    id: string
    licenseType: string
}

function SelectLicenseTypes(props: Props) {
    const t = useTranslations('default')
    return (
        <>
            <label htmlFor='country' className='form-label fw-bold'>
                {t('License Types')}
            </label>
            <select
                className='form-select'
                aria-label='country'
                id='country'
                name='licenseTypeDatabaseId'
                onChange={props.selectTypes}
                defaultValue={props.value}
            >
                {props.value === '' ?? <option value=''>{t('No type selected')}</option>}
                {props.licenseTypes.map((item: LicenseType) => (
                    <option key={item.id} value={item.id}>
                        {item.licenseType}
                    </option>
                ))}
            </select>
        </>
    )
}

export default SelectLicenseTypes
