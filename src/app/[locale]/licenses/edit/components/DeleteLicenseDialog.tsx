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
import { Button, Form, Modal } from 'react-bootstrap'

import { HttpStatus, LicensePayload } from '@/object-types'
import { ApiUtils } from '@/utils'
import { BsQuestionCircle } from 'react-icons/bs'
import MessageService from '@/services/message.service'

interface Props {
    licensePayload?: LicensePayload
    show?: boolean
    setShow?: React.Dispatch<React.SetStateAction<boolean>>
}

const DeleteLicenseDialog = ({ licensePayload, show, setShow }: Props) => {
    const { data: session } = useSession()
    const t = useTranslations('default')
    const router = useRouter()

    const deleteLicense = async () => {
        const response = await ApiUtils.DELETE(`licenses/${licensePayload.shortName}`, session.user.access_token)
        try {
            if (response.status == HttpStatus.OK) {
                MessageService.success(t('Delete License success!'))
                router.push('/licenses')
            } else if (response.status == HttpStatus.ACCEPTED) {
                MessageService.success(t('Created moderation request'))
            } else if (response.status == HttpStatus.UNAUTHORIZED) {
                await signOut()
            } else {
                MessageService.error(t('Error when processing'))
            }
        } catch (err) {
            MessageService.error(t('Error when processing'))
        }
    }

    const handleSubmit = () => {
        deleteLicense()
    }

    const handleCloseDialog = () => {
        setShow(!show)
    }

    return (
        licensePayload && (
            <Modal show={show} onHide={handleCloseDialog} backdrop='static' centered size='lg'>
                <Modal.Header style={{ backgroundColor: '#FEEFEF', color: '#da1414' }}>
                    <h5>
                        <Modal.Title style={{ fontSize: '1.25rem', fontWeight: '700' }}>
                            <BsQuestionCircle />
                            &nbsp;
                            {t('Delete License')}?
                        </Modal.Title>
                    </h5>
                    <button
                        type='button'
                        style={{
                            color: 'red',
                            backgroundColor: '#FEEFEF',
                            alignItems: 'center',
                            borderColor: '#FEEFEF',
                            borderWidth: '0px',
                            fontSize: '1.1rem',
                            margin: '-1rem -1rem auto',
                        }}
                        onClick={handleCloseDialog}
                    >
                        <span aria-hidden='true'>&times;</span>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {t.rich('Do you really want to delete the license?', {
                            name: `${licensePayload.fullName} (${licensePayload.shortName})`,
                            strong: (chunks) => <b>{chunks}</b>,
                        })}
                    </Form>
                </Modal.Body>
                <Modal.Footer className='justify-content-end'>
                    <Button className='delete-btn' variant='light' onClick={handleCloseDialog}>
                        {t('Cancel')}
                    </Button>
                    <Button className='login-btn' variant='danger' onClick={() => handleSubmit()}>
                        {t('Delete License')}
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    )
}

export default DeleteLicenseDialog
