// Copyright (C) TOSHIBA CORPORATION, 2024. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2024. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import React, { useEffect, useRef } from 'react'
import { Form } from 'react-bootstrap'
import { _ } from 'next-sw360'
import Table from '../Table/Table'

interface Props {
    tableData: any[],
    selectingReleaseOnTable: Array<string>
    setSelectingReleaseOnTable: React.Dispatch<React.SetStateAction<Array<string>>>
}

const compare = (preState: any, nextState: any) => {
    return Object.entries(preState.data).sort().toString() === Object.entries(nextState.data).sort().toString()
}

const MemoTable = React.memo(Table, compare) 

const ReleasesTable = ({ tableData, selectingReleaseOnTable, setSelectingReleaseOnTable }: Props) => {
    const releaseIds = useRef<Array<string>>([])
    const handleSelectRelease = (releaseId: string) => {
        if (releaseIds.current.includes(releaseId)) {
            setSelectingReleaseOnTable(releaseIds.current.filter(id => id !== releaseId))
            return
        }

        setSelectingReleaseOnTable([...releaseIds.current, releaseId])
        return
    }

    const columns = [
        {
            id: 'release-selection',
            name: '',
            formatter: (releaseId: string) =>
                _(
                    <Form.Check
                        name='release-selection'
                        className='release-selection'
                        type= 'checkbox'
                        onClick={() => {
                            handleSelectRelease(releaseId)
                        }}
                    ></Form.Check>
                ),
            width: '7%',
            sort: false,
        },
        {
            id: 'vendorName',
            name: 'Vendor',
            sort: true,
        },
        {
            id: 'componentName',
            name: 'Component Name',
            formatter: (name: string) =>
                _(<a href={`#`}>{name}</a>),
            sort: true,
        },
        {
            id: 'releaseVersion',
            name: 'Release Version',
            formatter: (version: string) =>
                _(<a href={`#`}>{version}</a>),
            sort: true,
        },
        {
            id: 'clearingState',
            name: 'Clearing State',
            sort: true,
        },
        {
            id: 'mainlineState',
            name: 'Mainline State',
            sort: true,
        },
    ]

    useEffect(() => {
        releaseIds.current = selectingReleaseOnTable
    }, [selectingReleaseOnTable])

    return (
        <div className='row'>
            <MemoTable data={tableData} columns={columns} sort={false} pagination={false}/>
        </div>
    )
}

export default ReleasesTable
