// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'

import { Obligation } from '@/object-types'
import CommonUtils from '@/utils/common.utils'
import { useTranslations } from 'next-intl'
import { Table, _ } from 'next-sw360'
import styles from './TableLinkedObligations.module.css'

interface Props {
    data: any[]
    setData: any
    obligationLinks?: Obligation[]
    setObligationLinks?: React.Dispatch<React.SetStateAction<Obligation[]>>
    setObligationIdToLicensePayLoad?: (releaseIdToRelationships: Array<string>) => void
}

export default function TableLinkedObligations({ data, setData, setObligationIdToLicensePayLoad }: Props) {
    const t = useTranslations('default')

    const handleClickDelete = (item: any) => {
        let obligations: any[] = []
        data.forEach((element) => {
            obligations.push(element)
        })
        obligations = obligations.filter((element) => element[1] !== item.title)
        setData(obligations)
        const obligationIds: string[] = []
        obligations.forEach((item: any) => {
            obligationIds.push(CommonUtils.getIdFromUrl(item[0]['_links'].self.href))
        })
        setObligationIdToLicensePayLoad(obligationIds)
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
            formatter: (item: any) => _(<i className={styles.collapse} onClick={buildAttachmentDetail(item)}></i>),
            sort: false,
            width: '5%',
        },
        {
            id: 'obligation',
            name: t('Obligation'),
            sort: true,
        },
        {
            id: 'obligationType',
            name: t('Obligation Type'),
            sort: true,
        },
        {
            id: 'furtherProperties',
            name: t('Further properties'),
            sort: true,
        },
        {
            id: 'action',
            name: t('Actions'),
            formatter: (item: any) =>
                _(
                    <span>
                        <FaTrashAlt className={styles['delete-btn']} onClick={() => handleClickDelete(item)} />
                    </span>
                ),
        },
    ]

    return (
        <div className='row'>
            <Table data={data} search={true} columns={columns} selector={true} />
        </div>
    )
}
