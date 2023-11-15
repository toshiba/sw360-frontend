// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'
import { LicensePayload } from '@/object-types'
import { useTranslations } from 'next-intl'
import styles from './LicenseDetails.module.css'

interface Props {
    licensePayload?: LicensePayload
    setLicensePayload?: React.Dispatch<React.SetStateAction<LicensePayload>>
}

const EditLicenseText = ({ licensePayload, setLicensePayload }: Props) => {
    const t = useTranslations('default')

    const updateField = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setLicensePayload({
            ...licensePayload,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <div className='row mb-4' style={{ padding: '0px 12px' }}>
            <div className={`${styles['header']} mb-2`}>
                <p className='fw-bold mt-2' style={{ fontSize: '14px' }}>
                    {t('License Text')}
                </p>
            </div>
            <div className='row'>
                <div className='col-lg-4'>
                    <textarea
                        style={{ height: '500px', width: '1460px' }}
                        className='form-control'
                        placeholder='Enter the license-text here...'
                        id='text'
                        aria-describedby='fullnatextme'
                        name='text'
                        value={licensePayload.text ?? ''}
                        onChange={updateField}
                    />
                </div>
            </div>
        </div>
    )
}

export default EditLicenseText
