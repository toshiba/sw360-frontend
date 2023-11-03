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
import { notFound, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Props {
    licenseId: string
}

const EditWhitelist = ({ licenseId }: Props) => {
    const { data: session } = useSession()
    const [data, setData] = useState([])
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
                const dataObligations: Array<Obligation> = []
                const data = license._embedded['sw360:obligations'].forEach((item: any) => {
                    const obligation: Obligation = {
                        id: item._links.self.href.split('/').pop(),
                        text: item.text,
                        title: item.title,
                    }
                    dataObligations.push(obligation)
                })

                setData(dataObligations)
                console.log(data)
            } catch (e) {
                console.error(e)
            }
        })()
        return () => controller.abort()
    }, [params, session, licenseId])

    const updateFieldChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('------updateFieldChecked-------' + e.target.checked)
    }

    return (
        <div className='row'>
            {data.map((item: Obligation, index: number) => {
                return (
                    <div key={index}>
                        <div>
                            <input
                                name='ObligationId'
                                type='checkbox'
                                // checked={item ?? false}
                                onChange={updateFieldChecked}
                                placeholder='Enter Comment'
                            />
                            <label>{item.text ?? ''}</label>
                            <label>{item.customPropertyToValue ?? ''}</label>
                        </div>
                        <hr />
                    </div>
                )
            })}
        </div>
    )
}

export default EditWhitelist
