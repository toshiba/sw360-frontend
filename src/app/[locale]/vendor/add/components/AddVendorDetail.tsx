// Copyright (C) TOSHIBA CORPORATION, 2024. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2024. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'
import { HttpStatus, Vendor } from '@/object-types'
import { ApiUtils } from '@/utils/index'
import { signOut, useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { notFound, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './VendorDetails.module.css'

interface Props {
    vendorPayload?: Vendor
    setVendorPayload?: React.Dispatch<React.SetStateAction<Vendor>>
    errorShortName?: boolean
    errorFullName?: boolean
    errorURL?: boolean
    inputValid?: boolean
    setErrorShortName?: React.Dispatch<React.SetStateAction<boolean>>
    setErrorFullName?: React.Dispatch<React.SetStateAction<boolean>>
    setErrorURL?: React.Dispatch<React.SetStateAction<boolean>>
}

const AddVendorDetail = ({
    vendorPayload,
    setVendorPayload,
    errorShortName,
    errorFullName,
    errorURL,
    inputValid,
}: Props) => {
    const [regexError] = useState(false)
    const t = useTranslations('default')
    const params = useSearchParams()
    const { data: session } = useSession()
    const [setVendorType] = useState([])


    const updateField = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        setVendorPayload({
            ...vendorPayload,
            [e.target.name]: e.target.value,
        })
    }

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        ;(async () => {
            try {
                const response = await ApiUtils.GET(`vendors`, session.user.access_token, signal)
                if (response.status === HttpStatus.UNAUTHORIZED) {
                    return signOut()
                } else if (response.status !== HttpStatus.OK) {
                    return notFound()
                }
                const vendors = await response.json()
                setVendorType(vendors._embedded['sw360:vendors'])
            } catch (e) {
                console.error(e)
            }
        })()
        return () => controller.abort()
    }, [params, session])

    return (
        <div className='row mb-4' style={{ padding: '0px 12px', fontSize: '14px' }}>
            <div className={`${styles['header']} mb-1`} style={{ paddingTop: '0.5rem', height: '45px' }}>
                <p className='fw-bold mt-1' style={{ fontSize: '0.875rem' }}>
                    {t('Vendor Details')}
                </p>
            </div>
            <div style={{ backgroundColor: '#FFF', borderBottom: '1px solid #DCDCDC' }}>
                <div className='row' style={{ paddingBottom: '0.7rem' }}>
                    <div className='col-lg-4'>
                        <label htmlFor='fullName' className='form-label fw-bold' style={{ cursor: 'pointer' }}>
                            {t('Full Name')}
                            <span className='text-red' style={{ color: '#F7941E' }}>
                                *
                            </span>
                        </label>
                        <input
                            type='text'
                            className={`form-control ${errorFullName ? 'is-invalid' : ''} ${
                                !errorFullName && inputValid ? 'is-valid' : ''
                            }`}
                            placeholder='Enter Fullname'
                            id='fullName'
                            required
                            aria-describedby='fullName'
                            name='fullName'
                            value={vendorPayload.fullName ?? ''}
                            onChange={updateField}
                        />
                    </div>
                    <div className='col-lg-4'>
                        <label htmlFor='shortName' className='form-label fw-bold' style={{ cursor: 'pointer' }}>
                            {t('Short Name')}
                            <span className='text-red' style={{ color: '#F7941E' }}>
                                *
                            </span>
                        </label>

                        <input
                            type='text'
                            className={`form-control ${errorShortName ? 'is-invalid' : ''} ${
                                regexError ? 'is-invalid' : ''
                            } ${!errorShortName && inputValid ? 'is-valid' : ''}`}
                            placeholder='Enter Shortname'
                            id='shortName'
                            required
                            aria-describedby='shortName'
                            name='shortName'
                            value={vendorPayload.shortName ?? ''}
                            onChange={updateField}
                            title='1*(ALPHA / DIGIT / "-" / "." / "+" )'
                        />
                    </div>
                    <div className='col-lg-4'>
                        <label htmlFor='url' className='form-label fw-bold' style={{ cursor: 'pointer' }}>
                            {t('URL')}
                            <span className='text-red' style={{ color: '#F7941E' }}>
                                *
                            </span>
                        </label>

                        <input
                            type='url'
                            className={`form-control ${errorURL ? 'is-invalid' : ''} ${
                                regexError ? 'is-invalid' : ''
                            } ${!errorURL && inputValid ? 'is-valid' : ''}`}
                            placeholder='Enter URL'
                            id='url'
                            required
                            aria-describedby='url'
                            name='url'
                            value={vendorPayload.url ?? ''}
                            onChange={updateField}
                            title='1*(ALPHA / DIGIT / "-" / "." / "+" )'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddVendorDetail
