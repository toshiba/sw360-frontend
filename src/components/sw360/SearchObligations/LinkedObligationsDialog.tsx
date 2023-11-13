// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import { useTranslations } from 'next-intl'
import { useCallback, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

import { LicensePayload, Obligation } from '@/object-types'
import { CommonUtils } from '@/utils'
import SelectTableLinkedObligations from './SelectTableLinkedObligations'

interface Props {
    show?: boolean
    setShow?: React.Dispatch<React.SetStateAction<boolean>>
    onReRender?: () => void
    data: Array<any>
    setData: (data: Array<any>) => void
    obligations: Array<any>
    setObligations: (data: Array<any>) => void
    licensePayload?: LicensePayload
    setLicensePayload?: React.Dispatch<React.SetStateAction<LicensePayload>>
}

const LinkedObligationsDialog = ({
    show,
    setShow,
    onReRender,
    data,
    setData,
    obligations,
    setObligations,
    licensePayload,
    setLicensePayload,
}: Props) => {
    const t = useTranslations('default')
    const [linkObligations] = useState([])
    const [linkedObligationsResponse, setLinkedObligationsResponse] = useState([])
    const [key, setKey] = useState('')

    const handleCloseDialog = () => {
        setShow(!show)
        setKey('')
    }

    const searchLinkedObligations = () => {
        CommonUtils.isNullEmptyOrUndefinedString(key)
            ? setObligations(obligations)
            : setObligations(obligations.filter((item) => item[2].includes(key)))
    }

    const updateField = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKey(e.target.value)
    }

    const handleClickSelectObligations = () => {
        const linkedObligationsResponseData = linkedObligationsResponse.map((item: Obligation) => [
            item,
            item.title,
            item.obligationType,
            item,
        ])
        linkedObligationsResponseData.forEach((linkedObligations: any) => {
            data.push(linkedObligations)
        })
        data = data.filter((v, index, a) => a.findIndex((v2) => v2[0].title === v[0].title) === index)
        const obligationIds: string[] = []
        data.forEach((item: any) => {
            if (!CommonUtils.isNullEmptyOrUndefinedString(item[0])) {
                obligationIds.push(CommonUtils.getIdFromUrl(item[0]['_links'].self.href))
            }
        })
        setLicensePayload({
            ...licensePayload,
            obligationDatabaseIds: obligationIds,
        })
        setData(data)
        setShow(!show)
        setKey('')
        onReRender()
    }

    const getLinkObligations: (obligationsLink: Array<Obligation>) => void = useCallback(
        (obligationsLink: Array<Obligation>) => setLinkedObligationsResponse(obligationsLink),
        []
    )

    return (
        <Modal show={show} onHide={handleCloseDialog} backdrop='static' centered size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>{t('Select License Obligations to be added')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='modal-body'>
                    <div className='row'>
                        <div className='col-lg-8'>
                            <input
                                type='text'
                                className='form-control'
                                placeholder={t('Enter search text')}
                                aria-describedby='Link Releases'
                                onChange={updateField}
                                value={key}
                            />
                        </div>
                        <div className='col-lg-4'>
                            <button
                                type='button'
                                className={`fw-bold btn btn-secondary`}
                                onClick={searchLinkedObligations}
                            >
                                {t('Search')}
                            </button>
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <SelectTableLinkedObligations
                            obligations={obligations}
                            setObligations={getLinkObligations}
                            linkObligations={linkObligations}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className='justify-content-end'>
                <Button
                    type='button'
                    data-bs-dismiss='modal'
                    className={`fw-bold btn btn-secondary`}
                    onClick={handleCloseDialog}
                >
                    {t('Cancel')}
                </Button>
                <Button type='button' className={`fw-bold btn btn-secondary`} onClick={handleClickSelectObligations}>
                    {t('Add')}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default LinkedObligationsDialog
