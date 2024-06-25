// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'
import { HttpStatus, Vendor, VendorType } from '@/object-types'
import { ApiUtils } from '@/utils/index'
import { signOut, useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { notFound, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import styles from './VendorDetails.module.css'

interface Props {
    inputValid?: boolean
    errorFullName?: boolean
    setErrorFullName?: React.Dispatch<React.SetStateAction<boolean>>
    Vendor?: Vendor
    setVendor?: React.Dispatch<React.SetStateAction<Vendor>>
    VendorType?: VendorType
    setVendorType?: React.Dispatch<React.SetStateAction<VendorType>>
}

const EditVendorDetail = ({
    Vendor,
    setVendor,
    inputValid,
    errorFullName,
    setErrorFullName,
}: Props) => {
    const t = useTranslations('default')
    const params = useSearchParams()
    const { data: session } = useSession()
    const [vendorType, setVendorsTypes] = useState([])

    const updateField = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target.name === 'fullName') {
            setErrorFullName(false)
        }
        setVendor({
            ...Vendor,
            [e.target.name]: e.target.value,
        })
    }

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        ;(async () => {
            try {
                const response = await ApiUtils.GET(`vendorTypes`, session.user.access_token, signal)
                if (response.status === HttpStatus.UNAUTHORIZED) {
                    return signOut()
                } else if (response.status !== HttpStatus.OK) {
                    return notFound()
                }
                const vendors = await response.json()
                setVendorsTypes(vendors._embedded['sw360:vendorTypes'])
            } catch (e) {
                console.error(e)
            }
        })()
        return () => controller.abort()
    }, [params, session])
    console.log(vendorType)
    return (
        <div className='row mb-4' style={{ padding: '0px 12px', fontSize: '14px' }}>
            <div className={`${styles['header']} mb-1`} style={{ paddingTop: '0.5rem', height: '45px' }}>
                <p className='fw-bold mt-1' style={{ fontSize: '0.875rem' }}>
                    {'Vendor Details'}
                </p>
            </div>
            <div style={{ backgroundColor: '#FFF', borderBottom: '1px solid #DCDCDC' }}>
                <div className='row' style={{ paddingBottom: '0.7rem' }}>
                    <div className='col-lg-4'>
                        <label htmlFor='fullName' className='form-label fw-bold' style={{ cursor: 'pointer' }}>
                            {t('Fullname')}
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
                            required
                            id='fullName'
                            aria-describedby='fullName'
                            name='fullName'
                            value={Vendor.fullName ?? ''}
                            onChange={updateField}
                        />
                    </div>
                    <div className='col-lg-4'>
                        <label htmlFor='shortName' className='form-label fw-bold' style={{ cursor: 'pointer' }}>
                            {t('Shortname')}
                            <span className='text-red' style={{ color: '#F7941E' }}>
                                *
                            </span>
                        </label>

                        <input
                            type='text'
                            className='form-control readonly'
                            placeholder='Enter Shortname'
                            id='shortName'
                            readOnly
                            aria-describedby='shortName'
                            name='shortName'
                            value={Vendor.shortName ?? ''}
                            onChange={updateField}
                            title='1*(ALPHA / DIGIT / "-" / "." / "+" )'
                        />
                    </div>
                    <div className='col-lg-4'>
                        <label htmlFor='url' className='form-label fw-bold' style={{ cursor: 'pointer' }}>
                            {'Url'}
                            <span className='text-red' style={{ color: '#F7941E' }}>
                                *
                            </span>
                        </label>

                        <input
                            type='text'
                            className='form-control readonly'
                            placeholder='Enter Url'
                            id='url'
                            readOnly
                            aria-describedby='url'
                            name='url'
                            value={Vendor.url ?? ''}
                            onChange={updateField}
                            title='1*(ALPHA / DIGIT / "-" / "." / "+" )'
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default EditVendorDetail
