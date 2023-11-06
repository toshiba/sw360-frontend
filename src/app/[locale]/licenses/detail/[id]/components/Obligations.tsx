// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import { HttpStatus, Obligation } from '@/object-types'
import { ApiUtils } from '@/utils/index'
import { signOut, useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { Table, _ } from 'next-sw360'
import { notFound, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import styles from '../detail.module.css'
interface Props {
    licenseId?: string
    isEditWhitelist?: boolean
    whitelist?: Map<string, boolean>
}

const Obligations = ({ licenseId, isEditWhitelist, whitelist }: Props) => {
    const t = useTranslations('default')
    const { data: session } = useSession()
    const [data, setData] = useState([])
    const [dataEditWhitelist, setDataEditWhitelist] = useState([])
    const params = useSearchParams()

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

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        ;(async () => {
            try {
                const response = await ApiUtils.GET(`licenses/${licenseId}`, session.user.access_token, signal)
                if (response.status === HttpStatus.UNAUTHORIZED) {
                    return signOut()
                } else if (response.status !== HttpStatus.OK) {
                    return notFound()
                }

                const license = await response.json()
                const data = license.obligations
                    .map((item: Obligation) => [
                        item,
                        item.title,
                        item.obligationType,
                        item.customPropertyToValue,
                        item.text,
                        item.whitelist,
                    ])
                    .filter((item: any) => item[5].length !== 0)
                setData(data)
                const dataEditWhitelist = license._embedded['sw360:obligations'].map((item: any) => [
                    item._links.self.href.split('/').pop(),
                    item.text,
                    item.customPropertyToValue,
                ])
                setDataEditWhitelist(dataEditWhitelist)
            } catch (e) {
                console.error(e)
            }
        })()
        return () => controller.abort()
    }, [params, session, licenseId])

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
        // {
        //     id: 'text',
        //     name: t('Text'),
        //     sort: true,
        // },
    ]

    const handlerRadioButton = (id: string) => {
        const obligationIds: Array<string> = []

        dataEditWhitelist.forEach((item: any) => {
            obligationIds.push(item[0])
        })

        obligationIds.forEach((id: string) => {
            whitelist.set(id, false)
        })

        whitelist.forEach((value: boolean, key: string) => {
            if (key === id && value === false) {
                whitelist.set(key, true)
            }
        })

        // console.log("--obligationIds---1111111111");
        // console.log(obligationIds);

        // if (!obligationIds.includes(id)) {
        //     const index = obligationIds.indexOf(id)
        //     obligationIds.splice(index, 1)
        // } else {
        //     obligationIds.push(id)
        // }
        // console.log("--obligationIds---22222222222222222");
        // console.log(obligationIds);
        // console.log(dataEditWhitelist)
        // console.log(id)
        // // const obligationIds = new Map<string, boolean>()
        // dataEditWhitelist.forEach((item: any) => {
        //     console.log(item)
        //     if(item[0] == id) {
        //         whitelist.set(id, true);
        //     }
        // })
        // console.log(obligationIds)
        // setWhitelist(obligationIds);
    }

    const columnEditWhitelists = [
        {
            id: 'obligationId',
            name: 'whitelist',
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
            width: '40%',
        },
        {
            id: 'text',
            name: 'obligation',
            sort: true,
            width: '30%',
        },
        {
            id: 'Further properties',
            name: 'Further properties',
            sort: true,
            width: '10%',
        },
    ]

    return (
        <div className='row'>
            {isEditWhitelist ? (
                // <EditWhitelist licenseId={licenseId} />
                <Table data={dataEditWhitelist} search={true} columns={columnEditWhitelists} selector={true} />
            ) : (
                <Table data={data} search={true} columns={columns} selector={true} />
            )}
        </div>
    )
}

export default Obligations
