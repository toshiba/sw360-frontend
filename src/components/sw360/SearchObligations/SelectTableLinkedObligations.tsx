// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import React from 'react'
import { Form } from 'react-bootstrap'

import { Obligation } from '@/object-types'
import CommonUtils from '@/utils/common.utils'
import { _ } from 'next-sw360'
import LinkedObligationsTable from './LinkedObligationsTable'

interface Props {
    obligations?: any[]
    setObligations?: any
    linkObligations?: Obligation[]
}

const SelectTableLinkedObligations = ({ obligations, setObligations, linkObligations }: Props) => {
    const handlerRadioButton = (item: any) => {
        if (linkObligations.includes(item)) {
            const index = linkObligations.indexOf(item)
            linkObligations.splice(index, 1)
        } else {
            linkObligations.push(item)
        }
        const linkObligation: Obligation[] = []
        linkObligations.forEach((item: any) => {
            const obligationLink: Obligation = {
                id: CommonUtils.getIdFromUrl(item._links.self.href),
                title: item.title,
                obligationType: item.obligationType,
                text: item.text,
            }
            linkObligation.push(obligationLink)
        })
        setObligations(linkObligation)
    }

    const columns = [
        {
            id: 'obligationId',
            name: '',
            formatter: (item: string) =>
                _(
                    <Form.Check
                        name='obligationId'
                        type='checkbox'
                        onClick={() => {
                            handlerRadioButton(item)
                        }}
                    ></Form.Check>
                ),
            width: '7%',
        },
        {
            id: 'Obligation Title',
            name: 'Obligation Title',
            sort: true,
        },
        {
            id: 'Obligations Type',
            name: 'Obligations Type',
            sort: true,
        },
    ]

    return (
        <>
            <div className='row'>
                <LinkedObligationsTable data={obligations} columns={columns} />
            </div>
        </>
    )
}

export default React.memo(SelectTableLinkedObligations)
