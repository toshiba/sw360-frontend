// Copyright (C) TOSHIBA CORPORATION, 2024. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2024. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import { useTranslations } from 'next-intl'
import React from 'react'

import { VendorPayload } from '@/object-types'

interface Props {
    vendorPayload?: VendorPayload
    setVendorPayload?: React.Dispatch<React.SetStateAction<VendorPayload>>
}

const GeneralInfoVendor = ({ vendorPayload, setVendorPayload }: Props) => {
    const t = useTranslations('default')

    const updateField = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        setVendorPayload({
            ...vendorPayload,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <>
            <div className='col' style={{ padding: '0px 12px' }}>
                <div className='row mb-4'>
                    <div className='section-header mb-2'>
                        <span className='fw-bold'>{t('General Information')}</span>
                    </div>
                    <div className='row with-divider pt-2 pb-2'>
                        <div className='col-lg-4'>
                            <label htmlFor='fullname' className='form-label fw-bold'>
                                {t('Full Name')}{' '}
                                <span className='text-red' style={{ color: '#F7941E' }}>
                                    *
                                </span>
                            </label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder={t('Enter Full Name')}
                                id='fullname'
                                name='fullname'
                                aria-describedby='fullname'
                                required
                                value={vendorPayload.fullname ?? ''}
                                onChange={updateField}
                            />
                        </div>
                        <div className='col-lg-4'>
                            <label htmlFor='shortname' className='form-label fw-bold'>
                                {t('Short Name')}{' '}
                                <span className='text-red' style={{ color: '#F7941E' }}>
                                    *
                                </span>
                            </label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder={t('Enter Short Name')}
                                id='shortname'
                                name='shortname'
                                aria-describedby='shortname'
                                required
                                value={vendorPayload.shortname ?? ''}
                                onChange={updateField}
                            />
                        </div>
                        <div className='col-lg-4'>
                            <label htmlFor='url' className='form-label fw-bold'>
                                {t('URL')}{' '}
                                <span className='text-red' style={{ color: '#F7941E' }}>
                                    *
                                </span>
                            </label>
                            <input
                                type='link'
                                className='form-control'
                                placeholder={t('Enter URL')}
                                id='url'
                                name='url'
                                aria-describedby='url'
                                required
                                value={vendorPayload.url ?? ''}
                                onChange={updateField}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default React.memo(GeneralInfoVendor)
