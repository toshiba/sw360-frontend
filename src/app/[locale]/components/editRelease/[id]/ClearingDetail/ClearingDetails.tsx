// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import { COMMON_NAMESPACE } from '@/object-types/Constants'
import { useTranslations } from 'next-intl'
import styles from './ClearingDetails.module.css'
const ClearingDetails = () => {
    const t = useTranslations(COMMON_NAMESPACE)
    return (
        <>
            <div className='col' style={{ padding: '0px 12px' }}>
                <div className='row mb-4'>
                    <div className={`${styles['header']} mb-2`}>
                        <p className='fw-bold mt-3'>{t('Clearing Details')}</p>
                    </div>
                    <div className='row'>
                        <div className='col-lg-4'>
                            <div className='form-check'>
                                <input id='binaries_original' type='checkbox' className='form-check-input' name='' />
                                <label className='form-label fw-bold' htmlFor='binaries_original'>
                                    {t('Binaries Original from Community')}
                                    
                                </label>
                            </div>
                        </div>
                        <div className='col-lg-4'>
                            <div className='form-check'>
                                <input id='binaries_original' type='checkbox' className='form-check-input' name='' />
                                <label className='form-label fw-bold' htmlFor='binaries_original'>
                                    {t('Binaries Self-Made')}
                                </label>
                            </div>
                        </div>
                        <div className='col-lg-4'>
                            <div className='form-check'>
                                <input id='binaries_original' type='checkbox' className='form-check-input' name='' />
                                <label className='form-label fw-bold' htmlFor='binaries_original'>
                                    {t('Component License Information')}
                                </label>
                            </div>
                        </div>
                    </div>
                    <hr className='my-2' />
                    <div className='row'>
                        <div className='col-lg-4'>
                            <div className='form-check'>
                                <input id='binaries_original' type='checkbox' className='form-check-input' name='' />
                                <label className='form-label fw-bold' htmlFor='binaries_original'>
                                    {t('Source Code Delivery')}
                                </label>
                            </div>
                        </div>
                        <div className='col-lg-4'>
                            <div className='form-check'>
                                <input id='binaries_original' type='checkbox' className='form-check-input' name='' />
                                <label className='form-label fw-bold' htmlFor='binaries_original'>
                                    {t('Source Code Original from Community')}
                                </label>
                            </div>
                        </div>
                        <div className='col-lg-4'>
                            <div className='form-check'>
                                <input id='binaries_original' type='checkbox' className='form-check-input' name='' />
                                <label className='form-label fw-bold' htmlFor='binaries_original'>
                                    {t('Source Code Tool-Made')}
                                </label>
                            </div>
                        </div>
                    </div>
                    <hr className='my-2' />
                    <div className='row'>
                        <div className='col-lg-4'>
                            <div className='form-check'>
                                <input id='binaries_original' type='checkbox' className='form-check-input' name='' />
                                <label className='form-label fw-bold' htmlFor='binaries_original'>
                                    {t('Source Code Self-Made')}
                                </label>
                            </div>
                        </div>
                        <div className='col-lg-4'>
                            <div className='form-check'>
                                <input id='binaries_original' type='checkbox' className='form-check-input' name='' />
                                <label className='form-label fw-bold' htmlFor='binaries_original'>
                                    
                                    {t('Screenshot of Website')}
                                </label>
                            </div>
                        </div>
                        <div className='col-lg-4'>
                            <div className='form-check'>
                                <input id='binaries_original' type='checkbox' className='form-check-input' name='' />
                                <label className='form-label fw-bold' htmlFor='binaries_original'>
                                    {t('Finalized License Scan Report')}
                                </label>
                            </div>
                        </div>
                    </div>
                    <hr className='my-2' />
                    <div className='row'>
                        <div className='col-lg-4'>
                            <div className='form-check'>
                                <input id='binaries_original' type='checkbox' className='form-check-input' name='' />
                                <label className='form-label fw-bold' htmlFor='binaries_original'>
                                    {t('License Scan Report Result')}
                                </label>
                            </div>
                        </div>
                        <div className='col-lg-4'>
                            <div className='form-check'>
                                <input id='binaries_original' type='checkbox' className='form-check-input' name='' />
                                <label className='form-label fw-bold' htmlFor='binaries_original'>
                                    
                                    {t('Legal Evaluation')}
                                </label>
                            </div>
                        </div>
                        <div className='col-lg-4'>
                            <div className='form-check'>
                                <input id='binaries_original' type='checkbox' className='form-check-input' name='' />
                                <label className='form-label fw-bold' htmlFor='binaries_original'>
                                   
                                    {t('License Agreement')}
                                </label>
                            </div>
                        </div>
                    </div>
                    <hr className='my-2' />
                    <div className='row'>
                        <div className='col-lg-4'>
                            <label htmlFor='programming_languages' className='form-label fw-bold'>
                                {t('Scanned')}
                            </label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter scanned'
                                id='programming_languages'
                                aria-describedby='programming_languages'
                                name='languages'
                            />
                        </div>
                        <div className='col-lg-4'>
                            <div className='form-check'>
                                <input id='binaries_original' type='checkbox' className='form-check-input' name='' />
                                <label className='form-label fw-bold' htmlFor='binaries_original'>
                                    
                                    {t('Component Clearing Report')}
                                </label>
                            </div>
                        </div>
                        <div className='col-lg-4'>
                            <label htmlFor='tag' className='form-label fw-bold'>
                                {t('Clearing Standard')}
                            </label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter clearing standard'
                                id='tag'
                                aria-describedby='Tag'
                                name='cpeid'
                            />
                        </div>
                    </div>
                    <hr className='my-2' />
                    <div className='row'>
                        <div className='col-lg-4'>
                            <label htmlFor='programming_languages' className='form-label fw-bold'>
                                {t('External URL')}
                            </label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter URL'
                                id='programming_languages'
                                aria-describedby='programming_languages'
                                name='languages'
                            />
                        </div>
                        <div className='col-lg-4'>
                            <label htmlFor='tag' className='form-label fw-bold'>
                                {t('Comment')}
                            </label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter your comments'
                                id='tag'
                                aria-describedby='Tag'
                                name='cpeid'
                            />
                        </div>
                    </div>
                    <hr className='my-2' />
                </div>
            </div>
        </>
    )
}

export default ClearingDetails
