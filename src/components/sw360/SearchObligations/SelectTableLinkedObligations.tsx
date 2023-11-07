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
import { _ } from 'next-sw360'
import styles from './LinkedObligations.module.css'
import LinkedObligationsTable from './LinkedObligationsTable'

interface Props {
    obligations?: any[]
    setObligations?: (obligationsLink: Array<Obligation>) => void
    linkObligations?: Obligation[]
}

const SelectTableLinkedObligations = ({ obligations, setObligations, linkObligations }: Props) => {
    const handlerRadioButton = (item: Obligation) => {
        if (linkObligations.includes(item)) {
            const index = linkObligations.indexOf(item)
            linkObligations.splice(index, 1)
        } else {
            linkObligations.push(item)
        }
        const linkObligation: Obligation[] = []
        linkObligations.forEach((item: Obligation) => {
            linkObligation.push(item)
        })
        setObligations(linkObligation)
    }

    const buildAttachmentDetail = (item: any) => {
        return (event: React.MouseEvent<HTMLElement>) => {
            if ((event.target as HTMLElement).className == styles.expand) {
                ;(event.target as HTMLElement).className = styles.collapse
            } else {
                ;(event.target as HTMLElement).className = styles.expand
            }

            const attachmentDetail = document.getElementById(item.title)
            if (!attachmentDetail) {
                const parent = (event.target as HTMLElement).parentElement.parentElement.parentElement
                const html = `<td colspan="10">
                    <table class="table table-borderless">
                        <tbody>
                            <tr>
                            <td>${item.text ?? ''}</td>
                            </tr>
                        </tbody>
                    </table>
                </td>`
                const tr = document.createElement('tr')
                tr.id = item.title
                tr.innerHTML = html

                parent.parentNode.insertBefore(tr, parent.nextSibling)
            } else {
                if (attachmentDetail.hidden == true) {
                    attachmentDetail.hidden = false
                } else {
                    attachmentDetail.hidden = true
                }
            }
        }
    }

    const columns = [
        {
            id: 'check',
            name: '',
            formatter: (item: Obligation) =>
                _(<i className={styles.collapse} onClick={buildAttachmentDetail(item)}></i>),
            sort: false,
        },
        {
            id: 'obligationId',
            name: '',
            formatter: (item: Obligation) =>
                _(
                    <Form.Check
                        name='obligationId'
                        type='checkbox'
                        onClick={() => {
                            handlerRadioButton(item)
                        }}
                    ></Form.Check>
                ),
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
        <div className='row'>
            <LinkedObligationsTable data={obligations} columns={columns} />
        </div>
    )
}

export default React.memo(SelectTableLinkedObligations)
