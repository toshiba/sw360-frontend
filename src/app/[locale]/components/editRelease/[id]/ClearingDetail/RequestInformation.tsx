// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import { COMMON_NAMESPACE } from "@/object-types/Constants"
import { useTranslations } from "next-intl"
import styles from './ClearingDetails.module.css'
const RequestInformation = () => {
    const t = useTranslations(COMMON_NAMESPACE)
    return (
        <>
            <div className='col' style={{ padding: '0px 12px' }}>
                <div className='row mb-4'>
                    <div className={`${styles['header']} mb-2`}>
                        <p className='fw-bold mt-3'>{t('Request Information')}</p>
                    </div>
                    <div className='row'>
                        <div className='col-lg-4'>
                            <label htmlFor='ECC_Status' className='form-label fw-bold'>
                                {t('Request ID')}
                            </label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter request ID'
                                id='ECC_comment'
                                aria-describedby='version'
                                required
                                name='ECC_comment'
                            />
                        </div>
                        <div className='col-lg-4'>
                            <label htmlFor='ECC_comment' className='form-label fw-bold'>
                                {t('Additional request Info')}
                            </label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter additional request Info'
                                id='ECC_comment'
                                aria-describedby='version'
                                required
                                name='ECC_comment'
                            />
                        </div>
                    </div>
                    <hr className='my-2' />
                    <div className='row'>
                        <div className='col-lg-4'>
                            <label htmlFor='ECC_Status' className='form-label fw-bold'>
                                {t('Evaluation Start')}
                            </label>
                            <input
                                type='date'
                                className='form-control'
                                placeholder='Enter ECC comment'
                                id='ECC_comment'
                                aria-describedby='version'
                                required
                                name='ECC_comment'
                            />
                        </div>
                        <div className='col-lg-4'>
                            <label htmlFor='ECC_comment' className='form-label fw-bold'>
                                {t('Evaluation End')}
                            </label>
                            <input
                                type='date'
                                className='form-control'
                                placeholder='Enter ECC comment'
                                id='ECC_comment'
                                aria-describedby='version'
                                required
                                name='ECC_comment'
                            />
                        </div>
                    </div>
                    <hr className='my-2' />
                </div>
            </div>
        </>
    )
}

export default RequestInformation
