// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'
import { LicenseDetail } from '@/object-types'
import { useTranslations } from 'next-intl'
import { Dispatch, SetStateAction, useState } from 'react'
import { Button } from 'react-bootstrap'
import { XCircle } from 'react-bootstrap-icons'
import { FiCheckCircle } from 'react-icons/fi'
import styles from '../detail.module.css'

interface Props {
    license: LicenseDetail
    setLicense: Dispatch<SetStateAction<LicenseDetail>>
}

const Detail = ({ license, setLicense }: Props) => {
    const t = useTranslations('default')
    const [toggle, setToggle] = useState(false)

    const hanldeExternalLicenseLink = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLicense({
            ...license,
            externalLicenseLink: e.target.value,
        })
    }

    const updateExternalLicenseLink = async () => {
        console.log(license.externalLicenseLink)
        // const response = await ApiUtils.POST('projects', projectPayload, session.user.access_token)

        // if (response.status == HttpStatus.CREATED) {
        //     await response.json()
        //     alert(true, 'success', t('Your project is created'), 'success')
        //     // router.push('/projects')
        // } else {
        //     alert(true, 'error', t('There are some errors while creating project'), 'danger')
        //     // router.push('/projects')
        // }
    }

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
                        <th colSpan={2}>{t('License Detail')}</th>
                    </tr>
                </thead>
                <tbody hidden={toggle}>
                    <tr>
                        <td>{t('Fullname')}:</td>
                        <td>{license.fullName ?? ''}</td>
                    </tr>
                    <tr>
                        <td>{t('Shortname')}:</td>
                        <td>{license.shortName ?? ''}</td>
                    </tr>
                    <tr>
                        <td>{t('Is checked')}:</td>
                        <td>
                            {' '}
                            {license && license.checked == true ? (
                                <span style={{ color: '#287d3c' }}>
                                    <FiCheckCircle /> {t('Yes')}
                                </span>
                            ) : (
                                <span style={{ color: 'red' }}>
                                    <XCircle color='red' />
                                </span>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>{t('Type')}:</td>
                        <td>{license.type ?? ''}</td>
                    </tr>
                    <tr>
                        <td>{t('OSI Approved?')}:</td>
                        <td>
                            {' '}
                            {license && license.OSIApproved == true ? (
                                <span style={{ color: '#287d3c' }}>
                                    <FiCheckCircle /> {t('Yes')}
                                </span>
                            ) : (
                                <span style={{ color: 'red' }}>
                                    <XCircle color='red' /> {t('(n/a)')}
                                </span>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>{t('FSF Free/Libre?')}:</td>
                        <td>
                            {' '}
                            {license && license.FSFLibre == true ? (
                                <span style={{ color: '#287d3c' }}>
                                    <FiCheckCircle /> {t('Yes')}
                                </span>
                            ) : (
                                <span style={{ color: 'red' }}>
                                    <XCircle color='red' /> {t('(n/a)')}
                                </span>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>{t('External link for more information')}:</td>
                        <td>
                            <input
                                type='text'
                                placeholder={t('Enter Name')}
                                id='name'
                                name='externalLicenseLink'
                                aria-describedby='name'
                                value={license.externalLicenseLink ?? ''}
                                onChange={hanldeExternalLicenseLink}
                            />
                            <Button type='submit' onClick={updateExternalLicenseLink}>
                                Save
                            </Button>
                        </td>
                    </tr>
                    <tr>
                        <td>{t('Note')}:</td>
                        <td>{license.note ?? ''}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Detail
