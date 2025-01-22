// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import { getSession, signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import React, { useRef, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

import { Attachment, HttpStatus } from '@/object-types'
import styles from './SelectAttachment.module.css'
import CommonUtils from '@/utils/common.utils'
import AttachmentRowData from '../AttachmentRowData'
import { ApiUtils } from '@/utils'
import MessageService from '@/services/message.service'

interface Props {
    show: boolean
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    attachmentsData: Array<AttachmentRowData>
    setAttachmentsData: React.Dispatch<React.SetStateAction<Array<AttachmentRowData>>>
}

function SelectAttachment({
    show,
    setShow,
    attachmentsData,
    setAttachmentsData
}: Props) : JSX.Element {
    const t = useTranslations('default')
    const [files, setFiles] = useState<Array<File>>([])
    const inputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files == null || e.target.files.length === 0) {
            setFiles([])
            return
        }
        const files = Array.prototype.slice.call(e.target.files) as Array<File>
        setFiles(files)
    }

    const handleButtonClick = () => {
        inputRef.current?.click()
    }
    const handleCloseDialog = () => {
        setFiles([])
        setShow(!show)
    }

    const handleUploadFiles = async () => {
        const formData = new FormData()

        for (const iterator of files) {
            formData.append('files', iterator)
        }

        const session = await getSession()
        if (CommonUtils.isNullOrUndefined(session))
            return signOut()
        const uploadAttachmentResponse = await ApiUtils.POST('attachments', formData, session.user.access_token)
        if (uploadAttachmentResponse.status === HttpStatus.UNAUTHORIZED) {
            MessageService.error(t('Session has expired'))
            return signOut()
        }

        if (uploadAttachmentResponse.status !== HttpStatus.OK) {
            MessageService.error(t('Something went wrong'))
            return
        }

        const uploadedAttachment = await uploadAttachmentResponse.json() as Array<Attachment>

        uploadedAttachment.forEach((attachment) => {
            attachmentsData.push({
                attachmentContentId: attachment.attachmentContentId,
                filename: attachment.filename,
                attachmentType: 'SOURCE',
                createdComment: attachment.createdComment,
                createdTeam: attachment.createdTeam,
                createdBy: attachment.createdBy,
                createdOn: attachment.createdOn,
                checkedComment: '',
                checkedTeam: '',
                checkedBy: '',
                checkedOn: '',
                isAddedNew: true,
            })
        })
        setAttachmentsData([...attachmentsData])
        setShow(!show)
    }

    const handleRemoveClick = (index: number) => {
        const list = [...files]
        list.splice(index, 1)
        setFiles(list)
    }

    return (
        <Modal show={show} onHide={handleCloseDialog} backdrop='static' centered size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>{t('Upload Attachment')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={`${styles['modal-body-first']}`}>
                    <div className={`${styles['modal-body-second']}`}>
                        <span>{t('Drop a File Here')}</span>
                        <br />
                        {t('Or')}
                        <br />
                        <input
                            className={`${styles['input']}`}
                            ref={inputRef}
                            type='file'
                            placeholder={t('Upload Attachment')}
                            multiple
                            onChange={handleFileChange}
                        />
                        <button className={`${styles['button-browse']}`} onClick={handleButtonClick}>
                            {t('Browse')}
                        </button>
                    </div>
                </div>
                <br />
                <br />
                <div style={{}}>
                    {files.map((file, j) => (
                        <>
                            <div key={file.name} className={`${styles['div-list-file']}`}>
                                <div className={`${styles['div-filename']}`}>
                                    {file.name} ({file.size}b)
                                </div>
                                <div className={`${styles['button-delete']}`}>
                                    <Button variant='danger' size='sm' onClick={() => handleRemoveClick(j)}>Delete</Button>
                                </div>
                            </div>
                            <br />
                            <br />
                        </>
                    ))}
                </div>
            </Modal.Body>
            <Modal.Footer className='justify-content-end'>
                <Button
                    type='button'
                    data-bs-dismiss='modal'
                    variant='secondary'
                    className={`fw-bold button-plain me-2`}
                    onClick={handleCloseDialog}
                >
                    {t('Close')}
                </Button>
                <Button type='button' className={`fw-bold btn btn-light button-plain me-2`} disabled>
                    {t('Pause')}
                </Button>
                <Button type='button' className={`fw-bold btn btn-primary button-orange`} disabled={files.length === 0} onClick={() => void handleUploadFiles()}>
                    {t('Upload')}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default SelectAttachment
