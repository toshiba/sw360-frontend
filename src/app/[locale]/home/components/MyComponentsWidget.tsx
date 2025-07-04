// Copyright (c) Helio Chissini de Castro, 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

import { getSession, signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ReactNode, useCallback, useEffect, useState, type JSX } from 'react'
import { Spinner } from 'react-bootstrap'

import { HttpStatus } from '@/object-types'
import { ApiUtils, CommonUtils } from '@/utils'
import { Table, _ } from 'next-sw360'

import { Component, Embedded } from '@/object-types'
import HomeTableHeader from './HomeTableHeader'

type EmbeddedComponents = Embedded<Component, 'sw360:components'>

function MyComponentsWidget(): ReactNode {
    const [data, setData] = useState<Array<(string | JSX.Element)[]>>([])
    const t = useTranslations('default')
    const params = useSearchParams()
    const [loading, setLoading] = useState(true)
    const [reload, setReload] = useState(false)

    const fetchData = useCallback(async (queryUrl: string, signal: AbortSignal) => {
        const session = await getSession()
        if (CommonUtils.isNullOrUndefined(session)) return signOut()
        const response = await ApiUtils.GET(queryUrl, session.user.access_token, signal)
        if (response.status === HttpStatus.OK) {
            const data = (await response.json()) as EmbeddedComponents
            return data
        } else {
            return undefined
        }
    }, [])

    useEffect(() => {
        setLoading(true)
        const searchParams = Object.fromEntries(params)
        const queryUrl = CommonUtils.createUrlWithParams('components/mycomponents', searchParams)

        const controller = new AbortController()
        const signal = controller.signal

        fetchData(queryUrl, signal)
            .then((components: EmbeddedComponents | undefined) => {
                if (components === undefined) {
                    return
                }

                if (
                    !CommonUtils.isNullOrUndefined(components['_embedded']) &&
                    !CommonUtils.isNullOrUndefined(components['_embedded']['sw360:components'])
                ) {
                    setData(
                        components['_embedded']['sw360:components'].map((item: Component) => [
                            `${item.name}|${item.id}`,
                            CommonUtils.truncateText(item.description ?? '', 40),
                        ]),
                    )
                } else {
                    setData([])
                }
            })
            .catch((err: Error) => {
                throw new Error(err.message)
            })
            .finally(() => {
                setLoading(false)
            })

        return () => {
            controller.abort()
        }
    }, [fetchData, params, reload])

    const title = t('My Components')
    const columns = [
        {
            id: 'Component name',
            name: t('Component Name'),
            formatter: (cell: string) => {
                const [name, id] = cell.split('|')
                return _(<Link href={'components/detail/' + id}>{name}</Link>)
            },
        },
        t('Description'),
    ]
    const language = { noRecordsFound: t('NotOwnComponent') }

    return (
        <div>
            <HomeTableHeader
                title={title}
                setReload={setReload}
            />
            {loading === false ? (
                <Table
                    columns={columns}
                    data={data}
                    pagination={{ limit: 5 }}
                    selector={false}
                    language={language}
                />
            ) : (
                <div className='col-12'>
                    <Spinner className='spinner' />
                </div>
            )}
        </div>
    )
}

export default MyComponentsWidget
