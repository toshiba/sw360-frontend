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

interface Props {
    licenseId?: string
    isEditWhitelist?: boolean
}

const Obligations = ({ licenseId, isEditWhitelist }: Props) => {
    const t = useTranslations('default')
    const { data: session } = useSession()
    const [data, setData] = useState([])
    const [dataEditWhitelist, setDataEditWhitelist] = useState([])
    const params = useSearchParams()

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
                        item.id,
                        item.title,
                        item.obligationType,
                        item.customPropertyToValue,
                        item.text,
                        item.whitelist,
                    ])
                    .filter((item: any) => item[5].length !== 0)

                setData(data)
                console.log(data)
                const dataEditWhitelist = license.obligations.map((item: any) => [
                    item,
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
            id: '',
            name: '',
            sort: true,
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
            id: 'text',
            name: t('Text'),
            sort: true,
        },
    ]

    const handlerRadioButton = (item: string) => {
        console.log(item)
        // console.log(item)
        // if (linkObligations.includes(item)) {
        //     const index = linkObligations.indexOf(item)
        //     linkObligations.splice(index, 1)
        // } else {
        //     linkObligations.push(item)
        // }
        // const linkObligation: Obligation[] = []
        // linkObligations.forEach((item: any) => {
        //     const obligationLink: Obligation = {
        //         id: CommonUtils.getIdFromUrl(item._links.self.href),
        //         title: item.title,
        //         obligationType: item.obligationType,
        //         text: item.text,
        //     }
        //     linkObligation.push(obligationLink)
        // })
        // setObligations(linkObligation)
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
        <>
            <div className='row'>
                {isEditWhitelist ? (
                    <Table data={dataEditWhitelist} search={true} columns={columnEditWhitelists} selector={true} />
                ) : (
                    <Table data={data} search={true} columns={columns} selector={true} />
                )}
            </div>
        </>
    )
}

export default Obligations
