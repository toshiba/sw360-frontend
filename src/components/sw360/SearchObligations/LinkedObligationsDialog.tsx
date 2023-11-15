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
import { CheckSquare } from 'react-bootstrap-icons'
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
    licensePayload,
    setLicensePayload,
}: Props) => {
    const t = useTranslations('default')
    const [linkObligations] = useState([])
    const [linkedObligationsResponse, setLinkedObligationsResponse] = useState([])

    const handleCloseDialog = () => {
        setShow(!show)
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
        onReRender()
    }

    const getLinkObligations: (obligationsLink: Array<Obligation>) => void = useCallback(
        (obligationsLink: Array<Obligation>) => setLinkedObligationsResponse(obligationsLink),
        []
    )

    return (
        <Modal show={show} onHide={handleCloseDialog} backdrop='static' centered size='lg'>
            <Modal.Header closeButton style={{ backgroundColor: '#eef2fa', borderColor: '#89a7e0', color: '#2e5aac' }}>
                <h5>
                    <Modal.Title style={{ fontSize: '16px' }}>
                        <CheckSquare />
                        &nbsp;
                        {t('Select License Obligations to be added')}
                    </Modal.Title>
                </h5>
            </Modal.Header>
            <Modal.Body>
                <div className='modal-body'>
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
                <Button type='button' data-bs-dismiss='modal' variant='light' onClick={handleCloseDialog}>
                    {t('Cancel')}
                </Button>
                <Button
                    type='button'
                    style={{ backgroundColor: '#2e5aac', borderColor: '#2e5aac', color: '#fff' }}
                    variant='info'
                    onClick={handleClickSelectObligations}
                >
                    {t('Add')}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default LinkedObligationsDialog
