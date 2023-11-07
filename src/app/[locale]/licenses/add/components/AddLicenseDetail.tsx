// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'
import { ApiUtils } from '@/utils/index'
import { signOut, useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { notFound, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import LicensePayload from '../../../../../object-types/LicensePayload'
import HttpStatus from '../../../../../object-types/enums/HttpStatus'
import styles from './LicenseDetails.module.css'

interface Props {
    licensePayload?: LicensePayload
    setLicensePayload?: React.Dispatch<React.SetStateAction<LicensePayload>>
}

const AddLicenseDetail = ({ licensePayload, setLicensePayload }: Props) => {
    const t = useTranslations('default')
    const params = useSearchParams()
    const { data: session } = useSession()
    const [licenseTypes, setLicenseTypes] = useState([])

    const updateField = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        setLicensePayload({
            ...licensePayload,
            [e.target.name]: e.target.value,
        })
    }

    const updateFieldChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLicensePayload({
            ...licensePayload,
            [e.target.name]: e.target.checked,
        })
    }

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        ;(async () => {
            try {
                const response = await ApiUtils.GET(`licenseTypes`, session.user.access_token, signal)
                if (response.status === HttpStatus.UNAUTHORIZED) {
                    return signOut()
                } else if (response.status !== HttpStatus.OK) {
                    return notFound()
                }
                const licenses = await response.json()
                setLicenseTypes(licenses._embedded['sw360:licenseTypes'])
            } catch (e) {
                console.error(e)
            }
        })()
        return () => controller.abort()
    }, [params, session])

    return (
        <div className='row mb-4'>
            <div className={`${styles['header']} mb-2`}>
                <p className='fw-bold mt-3'>{t('License Details')}</p>
            </div>
            <div className='row'>
                <div className='col-lg-4'>
                    <label htmlFor='used_license' className='form-label fw-bold'>
                        {t('Fullname')}
                        <span className='text-red' style={{ color: '#F7941E' }}>
                            *
                        </span>
                    </label>
                    <input
                        type='text'
                        className='form-control'
                        placeholder='Enter fullName'
                        id='fullName'
                        required
                        aria-describedby='fullName'
                        name='fullName'
                        value={licensePayload.fullName ?? ''}
                        onChange={updateField}
                    />
                </div>
                <div className='col-lg-4'>
                    <label htmlFor='shortname' className='form-label fw-bold'>
                        {t('Shortname')}
                        <span className='text-red' style={{ color: '#F7941E' }}>
                            *
                        </span>
                    </label>

                    <input
                        type='text'
                        className='form-control'
                        placeholder='Enter shortName'
                        id='shortName'
                        required
                        aria-describedby='shortName'
                        name='shortName'
                        value={licensePayload.shortName ?? ''}
                        onChange={updateField}
                    />
                </div>
                <div className='col-lg-4'>
                    <label htmlFor='licenseTypeDatabaseId' className='form-label fw-bold'>
                        {t('License Type')}{' '}
                    </label>
                    <select
                        className='form-select'
                        aria-label='licenseTypeDatabaseId'
                        id='licenseTypeDatabaseId'
                        required
                        name='licenseTypeDatabaseId'
                        onChange={updateField}
                        // value={licensePayload.licenseType.licenseType ?? ''}
                    >
                        <option value=''>{t('No type selected')}</option>
                        {licenseTypes.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.licenseType}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <hr className='my-2' />
            <div className='row'>
                <div className='col-lg-4'>
                    <label htmlFor='OSIApproved' className='form-label fw-bold'>
                        {t('OSI Approved?')}{' '}
                    </label>
                    <select
                        className='form-select'
                        aria-label='OSIApproved'
                        id='OSIApproved'
                        required
                        name='OSIApproved'
                        onChange={updateField}
                        value={licensePayload.OSIApproved ?? ''}
                    >
                        <option value='NA'>{t('(n/a)')}</option>
                        <option value='YES'>{t('yes')}</option>
                    </select>
                </div>
                <div className='col-lg-4'>
                    <label htmlFor='FSFLibre' className='form-label fw-bold'>
                        {t('FSF Free/Libre?')}{' '}
                    </label>
                    <select
                        className='form-select'
                        aria-label='FSFLibre'
                        id='FSFLibre'
                        required
                        name='FSFLibre'
                        value={licensePayload.FSFLibre ?? ''}
                        onChange={updateField}
                    >
                        <option value='NA'>{t('(n/a)')}</option>
                        <option value='YES'>{t('yes')}</option>
                    </select>
                </div>
                <div className='col-lg-4'>
                    <div className='form-check'>
                        <input
                            id='isChecked'
                            type='checkbox'
                            className='form-check-input'
                            name='checked'
                            checked={licensePayload.checked ?? false}
                            onChange={updateFieldChecked}
                        />
                        <label className='form-label fw-bold' htmlFor='isChecked'>
                            {t('Is checked')}
                        </label>
                    </div>
                </div>
            </div>
            <hr className='my-2' />
            <div className='row'>
                <div className='col-lg-4'>
                    <label htmlFor='note' className='form-label fw-bold'>
                        {t('Note')}
                    </label>
                    <input
                        type='text'
                        className='form-control'
                        placeholder='Enter Note'
                        id='note'
                        aria-describedby='note'
                        name='note'
                        value={licensePayload.note ?? ''}
                        onChange={updateField}
                    />
                </div>
            </div>
            <hr className='my-2' />
        </div>
    )
}

export default AddLicenseDetail
