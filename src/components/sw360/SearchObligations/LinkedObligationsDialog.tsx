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
import { notFound, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

import { HttpStatus, LicensePayload, Obligation } from '@/object-types'
import { ApiUtils, CommonUtils } from '@/utils'
import SelectTableLinkedObligations from './SelectTableLinkedObligations'

interface Props {
    show?: boolean
    setShow?: React.Dispatch<React.SetStateAction<boolean>>
    onReRender?: () => void
    data: any[]
    setData: any
    licensePayload?: LicensePayload
    setLicensePayload?: React.Dispatch<React.SetStateAction<LicensePayload>>
}

const LinkedObligationsDialog = ({
    show,
    setShow,
    onReRender,
    data,
    setData,
    licensePayload,
    setLicensePayload,
}: Props) => {
    const t = useTranslations('default')
    const { data: session } = useSession()
    const [dataSearch, setDataSearch] = useState()
    const [linkObligations] = useState([])
    const [linkedObligationsResponse, setLinkedObligationsResponse] = useState([])
    const [obligations, setObligations] = useState([])

    const handleCloseDialog = () => {
        setShow(!show)
    }

    const searchLinkedObligations = () => {
        setObligations(dataSearch)
    }

    const params = useSearchParams()
    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        ;(async () => {
            try {
                const response = await ApiUtils.GET(
                    `obligations?obligationLevel=LICENSE_OBLIGATION`,
                    session.user.access_token,
                    signal
                )
                if (response.status === HttpStatus.UNAUTHORIZED) {
                    return signOut()
                } else if (response.status !== HttpStatus.OK) {
                    return notFound()
                }

                const obligations = await response.json()
                if (!CommonUtils.isNullEmptyOrUndefinedString(obligations._embedded['sw360:obligations'])) {
                    const data = obligations._embedded['sw360:obligations'].map((item: any) => [
                        item,
                        item,
                        item.title,
                        item.obligationType,
                        item.text,
                    ])
                    setDataSearch(data)
                }
            } catch (e) {
                console.error(e)
            }
        })()
        return () => controller.abort()
    }, [params, session])

    const handleClickSelectObligations = () => {
        const linkedObligationsResponseData = linkedObligationsResponse.map((item: Obligation) => [
            item,
            item.title,
            item.obligationType,
            item.customPropertyToValue,
            item,
        ])
        linkedObligationsResponseData.forEach((linkedObligations: any) => {
            data.push(linkedObligations)
        })
        console.log(linkedObligationsResponse)
        console.log(data)
        data = data.filter((v, index, a) => a.findIndex((v2) => v2[0].title === v[0].title) === index)
        console.log(data)
        const obligationIds: string[] = []
        data.forEach((item: any) => {
            if (!CommonUtils.isNullEmptyOrUndefinedString(item[0])) {
                obligationIds.push(CommonUtils.getIdFromUrl(item[0]['_links'].self.href))
            }
        })
        console.log(obligationIds)
        setLicensePayload({
            ...licensePayload,
            obligationDatabaseIds: obligationIds,
        })
        setData(data)
        setShow(!show)
        onReRender()
    }

    const getLinkObligations: (obligationsLink: any[]) => void = useCallback(
        (obligationsLink: any[]) => setLinkedObligationsResponse(obligationsLink),
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
