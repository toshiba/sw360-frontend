// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.
// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/
// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'
import { useTranslations } from 'next-intl'
import { ReactNode, useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'

interface Props {
    show: boolean
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const AddClientDialog = ({show, setShow }: Props) : ReactNode => {
    const t = useTranslations('default')
    const [description, setDescription] = useState('')
    const [authorities, setAuthorities] = useState('BASIC')
    const [readAccess, setReadAccess] = useState(false)
    const [writeAccess, setWriteAccess] = useState(false)
    const [accessTokenValidity, setAccessTokenValidity] = useState('')
    const [refreshTokenValidity, setRefreshTokenValidity] = useState('')
    const [accessTokenUnit, setAccessTokenUnit] = useState('Days')
    const [refreshTokenUnit, setRefreshTokenUnit] = useState('Days')

    const handleAccessTokenUnitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newUnit = e.target.value
        if (newUnit === 'Seconds' && accessTokenUnit === 'Days') {
            setAccessTokenValidity((Number(accessTokenValidity) * 86400).toString())
        } else if (newUnit === 'Days' && accessTokenUnit === 'Seconds') {
            setAccessTokenValidity((Number(accessTokenValidity) / 86400).toString())
        }
        setAccessTokenUnit(newUnit)
    }

    const handleRefreshTokenUnitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newUnit = e.target.value
        if (newUnit === 'Seconds' && refreshTokenUnit === 'Days') {
            setRefreshTokenValidity((Number(refreshTokenValidity) * 86400).toString())
        } else if (newUnit === 'Days' && refreshTokenUnit === 'Seconds') {
            setRefreshTokenValidity((Number(refreshTokenValidity) / 86400).toString())
        }
        setRefreshTokenUnit(newUnit)
    }

    const handleClose = () => {
        setShow(!show)
    }

    const requestBody = {
        description,
        access_token_validity: Number(accessTokenValidity) * (accessTokenUnit === 'Seconds' ? 1 : 86400),
        refresh_token_validity: Number(refreshTokenValidity) * (refreshTokenUnit === 'Seconds' ? 1 : 86400),
        authorities: [authorities],
        scope: [readAccess ? 'READ' : '', writeAccess ? 'WRITE' : ''].filter(Boolean)
    }

    const handleSubmit = () => {
        console.log(JSON.stringify(requestBody, null, 2))
    }

    return (
        <Modal show={show} onHide={handleClose} backdrop='static' centered size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Create new client</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className='mb-3'>
                        <Form.Label style={{ fontWeight: 'bold' }}>Description *</Form.Label>
                        <Form.Control 
                            type='text' 
                            placeholder='Enter Description' 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                        />
                    </Form.Group>
                    <Row>
                        <Col md={6}>
                            <Form.Group className='mb-3'>
                                <Form.Label style={{ fontWeight: 'bold' }}>Authorities *</Form.Label>
                                <Form.Control 
                                    type='text' 
                                    value={authorities}
                                    onChange={(e) => setAuthorities(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className='mb-3'>
                                <Form.Label style={{ fontWeight: 'bold' }}>Scope *</Form.Label>
                                <div>
                                    <Form.Check 
                                        type='checkbox'
                                        label='Read Access'
                                        checked={readAccess}
                                        onChange={(e) => setReadAccess(e.target.checked)}
                                    />
                                    <Form.Check 
                                        type='checkbox'
                                        label='Write Access'
                                        checked={writeAccess}
                                        onChange={(e) => setWriteAccess(e.target.checked)}
                                    />
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className='mb-3'>
                                <Form.Label style={{ fontWeight: 'bold' }}>Access Token Validity *</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Control 
                                            type='number' 
                                            placeholder='Enter access token validity' 
                                            value={accessTokenValidity} 
                                            onChange={(e) => setAccessTokenValidity(e.target.value)} 
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Control as='select' value={accessTokenUnit} onChange={handleAccessTokenUnitChange}>
                                            <option>Days</option>
                                            <option>Seconds</option>
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className='mb-3'>
                                <Form.Label style={{ fontWeight: 'bold' }}>Refresh Token Validity *</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Control 
                                            type='number' 
                                            placeholder='Enter refresh token validity' 
                                            value={refreshTokenValidity} 
                                            onChange={(e) => setRefreshTokenValidity(e.target.value)} 
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Control as='select' value={refreshTokenUnit} onChange={handleRefreshTokenUnitChange}>
                                            <option>Days</option>
                                            <option>Seconds</option>
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant='primary' onClick={handleSubmit}>
                    Create
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default AddClientDialog