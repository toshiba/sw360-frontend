// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { ReactNode, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

import DownloadService from '@/services/download.service'
import { useSearchParams } from 'next/navigation'

interface Props {
    projectId: string
    show: boolean
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const OuputFormatDialog = ({projectId, show, setShow }: Props) : ReactNode => {
    const { data: session } = useSession()
    const t = useTranslations('default')
    const searchParams = useSearchParams()
    const withSubProject = searchParams.get('withSubProject')
    const [generatorClassName, setGeneratorClassName] = useState<'DocxGenerator' | 'XhtmlGenerator' | 'TextGenerator'>('TextGenerator')
    const downloadVariant = 'DISCLOSURE'
    const [contained, setContained] = useState(true)

    const handleDownloadLicenseInfo = () => {
        const fileExtension = {
            'TextGenerator': 'txt',
            'XhtmlGenerator': 'html',
            'DocxGenerator': 'docx'
        }[generatorClassName]

        const queryParams = new URLSearchParams({
            module: 'licenseInfo',
            projectId: projectId,
            variant: downloadVariant,
            generatorClassName: generatorClassName,
            excludeReleaseVersion: (!contained).toString(),
            withSubProject: (withSubProject ?? false).toString()
        })

        DownloadService.download(
            `reports?${queryParams.toString()}`,
            session,
            `LicenseInfo.${fileExtension}`,
        )
    }

    const handleCloseDialog = () => {
        setShow(!show)
        window.location.reload()
    }

    return (
        <Modal show={show} onHide={handleCloseDialog} backdrop='static' centered size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>{t('Select Other Options')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className='mb-4'>
                        <Form.Label>{t('Uncheck project release relationships to be excluded')}:</Form.Label>
                        <Form.Check 
                            type="checkbox"
                            id="contained-checkbox"
                            label={t("Contained")}
                            checked={contained}
                            onChange={(e) => setContained(e.target.checked)}
                        />
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label>{t('Select output format')}:</Form.Label>
                        <Form.Check
                            type="radio"
                            name="outputFormat"
                            id="format-text"
                            label="License Disclosure as TEXT"
                            defaultChecked
                            onChange={() => setGeneratorClassName('TextGenerator')}
                            checked={generatorClassName === 'TextGenerator'}
                        />
                        <Form.Check
                            type="radio"
                            name="outputFormat"
                            id="format-xhtml"
                            label="License Disclosure as XHTML"
                            onChange={() => setGeneratorClassName('XhtmlGenerator')}
                            checked={generatorClassName === 'XhtmlGenerator'}
                        />
                        <Form.Check
                            type="radio"
                            name="outputFormat"
                            id="format-docx"
                            label="License Disclosure as DOCX"
                            onChange={() => setGeneratorClassName('DocxGenerator')}
                            checked={generatorClassName === 'DocxGenerator'}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className='justify-content-end'>
                <Button variant='secondary' onClick={handleCloseDialog}>
                    {t('Close')}
                </Button>
                <Button variant='primary' onClick={handleDownloadLicenseInfo}>
                    {t('Download')}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default OuputFormatDialog