// Copyright (C) TOSHIBA CORPORATION, 2025. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2025. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import { useTranslations } from 'next-intl'
import { Modal, Form, Button, Table } from 'react-bootstrap'
import { ReactNode, useState } from 'react'

interface Props {
    show: boolean
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}

interface ObligationElement {
    languageElement: string
    action: string
    object: string
    selected: boolean
}

function ImportElementDialog({ show, setShow }: Props): ReactNode {
    const t = useTranslations('default')
    const [searchText, setSearchText] = useState('')

    const obligationElements: ObligationElement[] = [
        { languageElement: 'YOU MUST NOT', action: 'Modify', object: 'License text', selected: false },
        { languageElement: 'YOU MUST', action: 'Provide', object: 'License text', selected: true }
    ]

    const handleClose = () => setShow(false)
    const handleImport = () => {
        console.log('Importing selected elements')
        setShow(false)
    }

    return (
        <Modal show={show} onHide={handleClose} backdrop='static' centered size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Import Obligation Element</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table bordered hover>
                    <thead>
                        <tr style={{ backgroundColor: '#6c757d', color: 'white' }}>
                            <th style={{ width: '40%' }}>Language Element</th>
                            <th style={{ width: '30%' }}>Action</th>
                            <th style={{ width: '30%' }}>Object</th>
                        </tr>
                    </thead>
                    <tbody>
                        {obligationElements.map((element, index) => (
                            <tr
                                key={index}
                            >
                                <td>
                                    <Form.Check
                                        type="radio"
                                        name="obligationElement"
                                        checked={element.selected}
                                        onChange={() => {
                                            const updatedElements = obligationElements.map((item, i) => ({
                                                ...item,
                                                selected: i === index
                                            }))
                                            console.log('Selected:', updatedElements[index])
                                        }}
                                    />
                                    {element.languageElement}
                                </td>
                                <td>{element.action}</td>
                                <td>{element.object}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="warning" onClick={handleImport}>
                    Import Obligation Element
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ImportElementDialog