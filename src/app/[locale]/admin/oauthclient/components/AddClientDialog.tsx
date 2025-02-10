// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.
// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/
// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'
import { OAuthClient } from '@/object-types'
import { useTranslations } from 'next-intl'
import { ReactNode, useState, useEffect } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'

interface Props {
    show: boolean
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    client: OAuthClient | null
}

interface FormState {
    description: string
    authorities: string
    readAccess: boolean
    writeAccess: boolean
    accessTokenValidity: string
    refreshTokenValidity: string
    accessTokenUnit: 'Days' | 'Seconds'
    refreshTokenUnit: 'Days' | 'Seconds'
}

const defaultState: FormState = {
    description: '',
    authorities: 'BASIC',
    readAccess: false,
    writeAccess: false,
    accessTokenValidity: '',
    refreshTokenValidity: '',
    accessTokenUnit: 'Days',
    refreshTokenUnit: 'Days'
}

const AddClientDialog = ({show, setShow, client }: Props) : ReactNode => {
    const t = useTranslations('default')
    const [formState, setFormState] = useState<FormState>(defaultState)

    const updateField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
        setFormState(prev => ({ ...prev, [field]: value }))
    }

    useEffect(() => {
        if (client !== null) {
            setFormState({
                description: client.description,
                authorities: client.authorities.join(", "),
                readAccess: client.scope.includes("READ"),
                writeAccess: client.scope.includes("WRITE"),
                accessTokenValidity: client.access_token_validity.toString(),
                refreshTokenValidity: client.refresh_token_validity.toString(),
                accessTokenUnit: "Seconds",
                refreshTokenUnit: "Seconds"
            })
        } else {
            setFormState(defaultState)
        }
    }, [client])

    const handleTokenUnitChange = (tokenType: 'access' | 'refresh') => (e: React.ChangeEvent<HTMLInputElement>) => {
        const newUnit = e.target.value as 'Days' | 'Seconds'
        const isAccess = tokenType === 'access'
        const currentValue = isAccess ? formState.accessTokenValidity : formState.refreshTokenValidity
        const currentUnit = isAccess ? formState.accessTokenUnit : formState.refreshTokenUnit
        
        const oldValue = Number(currentValue)
        const newValue = newUnit === 'Seconds' && currentUnit === 'Days'
            ? oldValue * 86400
            : newUnit === 'Days' && currentUnit === 'Seconds'
            ? oldValue / 86400
            : oldValue

        updateField(isAccess ? 'accessTokenUnit' : 'refreshTokenUnit', newUnit)
        updateField(isAccess ? 'accessTokenValidity' : 'refreshTokenValidity', newValue.toString())
    }

    const handleClose = () => {
        setShow(!show)
    }

    const requestBody = {
        ...(client && {
            client_id: client.client_id,
            client_secret: client.client_secret,
        }),
        description: formState.description,
        access_token_validity: Number(formState.accessTokenValidity) * (formState.accessTokenUnit === 'Seconds' ? 1 : 86400),
        refresh_token_validity: Number(formState.refreshTokenValidity) * (formState.refreshTokenUnit === 'Seconds' ? 1 : 86400),
        authorities: [formState.authorities],
        scope: [formState.readAccess ? 'READ' : '', formState.writeAccess ? 'WRITE' : ''].filter(Boolean)
    }

    const handleSubmit = () => {
        console.log(JSON.stringify(requestBody, null, 2))
    }

    return (
        <Modal show={show} onHide={handleClose} backdrop='static' centered size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>{client === null ? ("Create new client") : ("Edit client")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className='mb-3'>
                        <Form.Label style={{ fontWeight: 'bold' }}>Description *</Form.Label>
                        <Form.Control 
                            type='text' 
                            placeholder='Enter Description' 
                            value={formState.description} 
                            onChange={(e) => updateField('description', e.target.value)} 
                        />
                    </Form.Group>
                    <Row>
                        <Col md={6}>
                            <Form.Group className='mb-3'>
                                <Form.Label style={{ fontWeight: 'bold' }}>Authorities *</Form.Label>
                                <Form.Control 
                                    type='text' 
                                    value={formState.authorities}
                                    onChange={(e) => updateField('authorities', e.target.value)}
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
                                        checked={formState.readAccess}
                                        onChange={(e) => updateField('readAccess', e.target.checked)}
                                    />
                                    <Form.Check 
                                        type='checkbox'
                                        label='Write Access'
                                        checked={formState.writeAccess}
                                        onChange={(e) => updateField('writeAccess', e.target.checked)}
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
                                            value={formState.accessTokenValidity} 
                                            onChange={(e) => updateField('accessTokenValidity', e.target.value)} 
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Control as='select' value={formState.accessTokenUnit} onChange={handleTokenUnitChange('access')}>
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
                                            value={formState.refreshTokenValidity} 
                                            onChange={(e) => updateField('refreshTokenValidity', e.target.value)} 
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Control as='select' value={formState.refreshTokenUnit} onChange={handleTokenUnitChange('refresh')}>
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
                    {client === null ? ("Create") : ("Update")}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default AddClientDialog