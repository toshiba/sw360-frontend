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
    licenseId: string
}

const EditWhitelist = ({ licenseId }: Props) => {
    const t = useTranslations('default')
    const { data: session } = useSession()
    const [data, setData] = useState([])
    const params = useSearchParams()

    const handlerCheckBoxButton = (item: any) => {
        console.log('handlerCheckBoxButton')
        console.log(item)
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
                const data = license.obligationDatabaseIds.map((item: Obligation) => [
                    item.id,
                    item.title,
                    item.obligationType,
                    item.customPropertyToValue,
                    item.text,
                ])
                setData(data)
            } catch (e) {
                console.error(e)
            }
        })()
        return () => controller.abort()
    }, [params, session, licenseId])

    const columns = [
        {
            id: 'id',
            name: 'Whitelist',
            formatter: (item: any) =>
                _(<Form.Check type='radio' name='VendorId' onChange={() => handlerCheckBoxButton(item)}></Form.Check>),
        },
        {
            id: 'text',
            name: t('Obligation'),
            sort: true,
        },
        {
            id: 'furtherProperties',
            name: t('Further properties'),
            sort: true,
        },
    ]

    return (
        <>
            <div className='row'>
                <Table data={data} search={true} columns={columns} selector={true} />
            </div>
        </>
    )
}

export default EditWhitelist
