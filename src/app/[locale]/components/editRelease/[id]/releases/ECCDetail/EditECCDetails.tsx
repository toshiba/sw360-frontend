// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'
import { useTranslations } from 'next-intl'
import styles from './EditECCDetails.module.css'
import { COMMON_NAMESPACE } from '@/object-types/Constants'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { BiInfoCircle } from 'react-icons/bi'

const ShowInfoOnHover = ({ text }: { text: string }) => {
    return (
        <>
            <OverlayTrigger overlay={<Tooltip>{text}</Tooltip>}>
                <span className='d-inline-block'>
                    <BiInfoCircle />
                </span>
            </OverlayTrigger>
        </>
    )
}

const EditECCDetails = () => {
    const t = useTranslations(COMMON_NAMESPACE)
    return (
        <>
            <div className='container' style={{ maxWidth: '98vw', marginTop: '10px', fontSize: '0.875rem' }}>
                <div className='col' style={{ padding: '0px 12px', fontSize: '0.875rem' }}>
                    <div className='row mb-4'>
                        <div className={`${styles['header']} mb-2`}>
                            <p className='fw-bold mt-3'>{t('ECC Information')}</p>
                        </div>
                        <div className='row'>
                            <div className='col-lg-4'>
                                <label htmlFor='ECC_Status' className='form-label fw-bold'>
                                    {t('ECC Status')}
                                </label>
                                <select
                                    className='form-select'
                                    aria-label='component_type'
                                    id='ECC_Status'
                                    required
                                    name='ECC_Status'
                                >
                                    <option value='OPEN'>{t('OPEN')}</option>
                                    <option value='IN_PROGRESS'> {t('IN_PROGRESS')}</option>
                                    <option value='APPROVED'>{t('APPROVED')}</option>
                                    <option value='REJECTED'>{t('REJECTED')}</option>
                                </select>
                                <div className='form-text' id='addProjects.visibility.HelpBlock'>
                                    <ShowInfoOnHover text={t('ECC_STATUS')} />
                                    {t('Learn more about ECC statuses')}.
                                </div>
                            </div>
                            <div className='col-lg-4'>
                                <label htmlFor='ECC_comment' className='form-label fw-bold'>
                                    {t('ECC Comment')}
                                </label>
                                <input
                                    type='text'
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
                        <div className='row'>
                            <div className='col-lg-4'>
                                <label htmlFor='ausfuhrliste' className='form-label fw-bold'>
                                    {t('Ausfuhrliste')}
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Enter AL'
                                    id='ausfuhrliste'
                                    aria-describedby='ausfuhrliste'
                                    name='ausfuhrliste'
                                />
                            </div>
                            <div className='col-lg-4'>
                                <label htmlFor='eccn' className='form-label fw-bold'>
                                    {t('ECCN')}
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Enter ECCN'
                                    id='eccn'
                                    aria-describedby='eccn'
                                    name='eccn'
                                />
                            </div>
                            <div className='col-lg-4'>
                                <label htmlFor='material_index_number' className='form-label fw-bold'>
                                    {t('Material Index Number')}
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Enter material index number'
                                    id='material_index_number'
                                    aria-describedby='material_index_number'
                                    name='material_index_number'
                                />
                            </div>
                        </div>
                        <hr className='my-2' />
                        <div className='row'>
                            <div className='col-lg-4'>
                                <label htmlFor='assessor_contact_person' className='form-label fw-bold'>
                                    {t('Assessor Contact Person')}
                                </label>
                                <input
                                    type='URL'
                                    className='form-control'
                                    placeholder='Will be set automatically'
                                    id='assessor_contact_person'
                                    aria-describedby='assessor_contact_person'
                                    name='assessor_contact_person'
                                    readOnly={true}
                                />
                            </div>
                            <div className='col-lg-4'>
                                <label htmlFor='assessor_department' className='form-label fw-bold'>
                                    {t('Assessor Department')}
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Will be set automatically'
                                    id='assessor_department'
                                    aria-describedby='assessor_department'
                                    name='assessor_department'
                                    readOnly={true}
                                />
                            </div>
                            <div className='col-lg-4'>
                                <label htmlFor='assessment_date' className='form-label fw-bold'>
                                    {t('Assessment Date')}
                                </label>
                                <input
                                    type='date'
                                    className='form-control'
                                    data-bs-toggle='modal'
                                    data-bs-target='#search_vendors_modal'
                                    placeholder={t('Will be set automatically')}
                                    id='assessment_date'
                                    aria-describedby='assessment_date'
                                    readOnly={true}
                                    name='assessment_date'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditECCDetails
