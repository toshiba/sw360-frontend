// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import { useTranslations } from 'next-intl'

import { Button, Form, Modal } from 'react-bootstrap'

import { Obligation } from '@/object-types'
import { CommonUtils } from '@/utils'

interface Props {
    data: Array<any>
    setData: (data: Array<any>) => void
    setObligationIdToLicensePayLoad?: (releaseIdToRelationships: Array<string>) => void
    obligation: Obligation
    show?: boolean
    setShow?: React.Dispatch<React.SetStateAction<boolean>>
}

const DeleteObligationDialog = ({
    obligation,
    data,
    setData,
    setObligationIdToLicensePayLoad,
    show,
    setShow,
}: Props) => {
    const t = useTranslations('default')

    const handleSubmit = () => {
        let obligations: Array<any> = []
        data.forEach((element) => {
            obligations.push(element)
        })
        obligations = obligations.filter((element) => element[1] !== obligation.title)
        setData(obligations)
        const obligationIds: string[] = []
        obligations.forEach((item: any) => {
            obligationIds.push(CommonUtils.getIdFromUrl(item[0]['_links'].self.href))
        })
        setObligationIdToLicensePayLoad(obligationIds)
        setShow(!show)
    }

    const handleCloseDialog = () => {
        setShow(!show)
    }

    return (
        obligation && (
            <Modal show={show} onHide={handleCloseDialog} backdrop='static' centered size='lg'>
                <Modal.Header closeButton style={{ color: 'red' }}>
                    <Modal.Title>{t('Delete Obligation')} ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {t.rich('Do you really want to delete the Obligation?', {
                            name: obligation.title,
                            strong: (chunks) => <b>{chunks}</b>,
                        })}
                    </Form>
                </Modal.Body>
                <Modal.Footer className='justify-content-end'>
                    <Button className='delete-btn' variant='light' onClick={handleCloseDialog}>
                        {' '}
                        {t('Close')}{' '}
                    </Button>
                    <Button className='login-btn' variant='danger' onClick={() => handleSubmit()}>
                        {t('Delete Obligation')}
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    )
}

export default DeleteObligationDialog
