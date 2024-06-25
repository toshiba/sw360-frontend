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
import { useCallback, useEffect, useState } from 'react'
import { Alert, Button, Form, Modal } from 'react-bootstrap'

import { ActionType, HttpStatus, Vendor } from '@/object-types'
import { ApiUtils } from '@/utils'

const DEFAULT_VENDOR_INFO: Vendor = { id: '', shortName: '' }

interface Props {
    vendorId?: string
    show?: boolean
    setShow?: React.Dispatch<React.SetStateAction<boolean>>
    actionType?: string
}

interface DeleteResponse {
    resourceId: string
    status: number
}

const DeleteVendorDialog = ({ vendorId, show, setShow, actionType }: Props) => {
    const { data: session } = useSession()
    const t = useTranslations('default')
    const router = useRouter()
    const [vendor, setVendor] = useState<Vendor>(DEFAULT_VENDOR_INFO)
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
    }, [t])

    const deleteVendor = async () => {
        const response = await ApiUtils.DELETE(`vendors/${vendorId}`, session.user.access_token)
        try {
            if (response.status == HttpStatus.MULTIPLE_STATUS) {
                const body = (await response.json()) as Array<DeleteResponse>
                const deleteStatus = body[0].status
                if (deleteStatus == HttpStatus.OK) {
                    displayMessage('success', t('Delete vendor success'))
                    actionType === ActionType.EDIT && router.push('/vendor')
                    setReloadPage(true)
                } else if (deleteStatus == HttpStatus.ACCEPTED) {
                    displayMessage('success', t('Created moderation request'))
                } else {
                    displayMessage('danger', t('Error when processing'))
                }
            } else if (response.status == HttpStatus.UNAUTHORIZED) {
                await signOut()
            } else {
                handleError()
            }
        } catch (err) {
            handleError()
        }
    }

    const fetchData = useCallback(
        async (signal: AbortSignal) => {
            if (session) {
                const vendorsResponse = await ApiUtils.GET(
                    `vendors/${vendorId}`,
                    session.user.access_token,
                    signal
                )
                if (vendorsResponse.status == HttpStatus.OK) {
                    const vendor = (await vendorsResponse.json()) as Vendor
                    console.log(vendor.shortName)
                    setVendor(vendor)
                } else if (vendorsResponse.status == HttpStatus.UNAUTHORIZED) {
                    await signOut()
                } else {
                    setVendor(DEFAULT_VENDOR_INFO)
                    handleError()
                }
            }
        },
        [vendorId, handleError, session]
    )

    const handleSubmit = () => {
        deleteVendor().catch((err) => {
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

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal
        fetchData(signal).catch((err) => {
            console.error(err)
        })

        return () => {
            controller.abort()
        }
    }, [show, vendorId, fetchData])

    return (
        <Modal show={show} onHide={handleCloseDialog} backdrop='static' centered size='lg'>
            <Modal.Header closeButton style={{ color: 'red' }}>
                <Modal.Title>{t('Delete Vendor')} ?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert variant={variant} onClose={() => setShowMessage(false)} dismissible show={showMessage}>
                    {message}
                </Alert>
                <Form>
                    {t.rich('Do you really want to delete the vendor', {
                        name: vendor.shortName,
                        strong: (chunks) => <b>{chunks}</b>,
                    })}
                    <hr />
                    <Form.Group className='mb-3'>
                        <Form.Label style={{ fontWeight: 'bold' }}>{t('Please comment your changes')}</Form.Label>
                        <Form.Control as='textarea' aria-label='With textarea' />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className='justify-content-end'>
                <Button className='delete-btn' variant='light' onClick={handleCloseDialog}>
                    {' '}
                    {t('Close')}{' '}
                </Button>
                <Button className='login-btn' variant='danger' onClick={() => handleSubmit()} hidden={reloadPage}>
                    {t('Delete Vendor')}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteVendorDialog
