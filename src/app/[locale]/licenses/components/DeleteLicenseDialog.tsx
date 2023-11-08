// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import { signOut, useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { Alert, Button, Form, Modal } from 'react-bootstrap'

import { HttpStatus } from '@/object-types'
import { ApiUtils } from '@/utils'

interface Props {
    licenseId?: string
    show?: boolean
    setShow?: React.Dispatch<React.SetStateAction<boolean>>
}

const DeleteLicenseDialog = ({ licenseId, show, setShow }: Props) => {
    const { data: session } = useSession()
    const t = useTranslations('default')
    const router = useRouter()
    const [variant, setVariant] = useState('success')
    const [message, setMessage] = useState('')
    const [showMessage, setShowMessage] = useState(false)
    const [reloadPage, setReloadPage] = useState(false)

    const displayMessage = (variant: string, message: string) => {
        setVariant(variant)
        setMessage(message)
        setShowMessage(true)
    }

    const handleError = useCallback(() => {
        displayMessage('danger', t('Error when processing'))
        setReloadPage(true)
    }, [])

    const deleteLicense = async () => {
        const response = await ApiUtils.DELETE(`licenses/${licenseId}`, session.user.access_token)
        try {
            if (response.status == HttpStatus.OK) {
                displayMessage('success', t('Delete License success!'))
                router.push('/licenses')
                setReloadPage(true)
            } else if (response.status == HttpStatus.ACCEPTED) {
                displayMessage('success', t('Created moderation request'))
            } else if (response.status == HttpStatus.UNAUTHORIZED) {
                await signOut()
            } else {
                displayMessage('danger', t('Error when processing'))
            }
        } catch (err) {
            handleError()
        }
    }

    const handleSubmit = () => {
        deleteLicense().catch((err) => {
            console.log(err)
        })
    }

    const handleCloseDialog = () => {
        setShow(!show)
        setShowMessage(false)
        if (reloadPage === true) {
            window.location.reload()
        }
    }

    return (
        <Modal show={show} onHide={handleCloseDialog} backdrop='static' centered size='lg'>
            <Modal.Header closeButton style={{ color: 'red' }}>
                <Modal.Title>{t('Delete License')} ?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert variant={variant} onClose={() => setShowMessage(false)} dismissible show={showMessage}>
                    {message}
                </Alert>
                <Form>
                    {t.rich('Do you really want to delete the license?', {
                        name: licenseId,
                        strong: (chunks) => <b>{chunks}</b>,
                    })}
                </Form>
            </Modal.Body>
            <Modal.Footer className='justify-content-end'>
                <Button className='delete-btn' variant='light' onClick={handleCloseDialog}>
                    {' '}
                    {t('Close')}{' '}
                </Button>
                <Button className='login-btn' variant='danger' onClick={() => handleSubmit()} hidden={reloadPage}>
                    {t('Delete License')}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteLicenseDialog
