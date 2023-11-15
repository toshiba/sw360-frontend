// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

import { Table } from 'next-sw360'
import { memo, useState } from 'react'
import FilterObligation from './FilterObligation'

interface Props {
    data?: any
    columns?: any
}

const compare = (preState: any, nextState: any) => {
    return Object.entries(preState.data).sort().toString() === Object.entries(nextState.data).sort().toString()
}

const style = {
    th: {
        'text-align': 'center',
        'font-size': '14px',
    },
    td: {
        'text-align': 'center',
    },
}

const LinkedObligationsTable = memo(function LinkedObligationsTable({ columns, data }: Props) {
    const [search, setSearch] = useState({})
    const doSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
        setSearch({ keyword: event.currentTarget.value })
    }
    return (
        <>
            <FilterObligation title='search' searchFunction={doSearch} />
            <Table columns={columns} data={data} style={style} search={search} selector={true} />
        </>
    )
}, compare)

export default LinkedObligationsTable
