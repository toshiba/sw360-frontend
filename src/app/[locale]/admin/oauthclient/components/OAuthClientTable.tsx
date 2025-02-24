// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

import { OAuthClient } from '@/object-types'
import { useTranslations } from 'next-intl'
import React, { useMemo, useState } from 'react'
import { FaCaretDown, FaCaretRight, FaPencilAlt, FaTrashAlt } from 'react-icons/fa'

interface TableData {
    description: string
    clientId: string
    authorities: string
    scope: string
    actions: JSX.Element
    details: string
}

interface Props {
    clients: OAuthClient[],
    updateClient: (client: OAuthClient) => void
    deleteClient: (client: OAuthClient) => void
}

export default function OAuthClientTable({ clients, updateClient, deleteClient }: Props): JSX.Element {
    const t = useTranslations('default')

    const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({})
    const [allRowsExpanded, setAllRowsExpanded] = useState(false)
    const [sortConfig, setSortConfig] = useState<{
        key: keyof (typeof tableData)[0] | null
        direction: 'ascending' | 'descending' | null
    }>({ key: null, direction: null })

    const toggleRow = (clientId: string) => {
        setExpandedRows((prev) => ({
            ...prev,
            [clientId]: !prev[clientId],
        }))
    }

    const toggleAllRows = () => {
        const newState = !allRowsExpanded
        setAllRowsExpanded(newState)
        setExpandedRows(
            clients.reduce(
                (acc, client) => ({
                    ...acc,
                    [client.client_id]: newState,
                }),
                {},
            ),
        )
    }

    const sortTableData = (
        data: typeof tableData,
        key: keyof (typeof tableData)[0],
        direction: 'ascending' | 'descending',
    ) => {
        return [...data].sort((a, b) => {
            if (a[key] === b[key]) return 0
            if (direction === 'ascending') {
                return a[key] > b[key] ? 1 : -1
            } else {
                return a[key] < b[key] ? 1 : -1
            }
        })
    }

    const handleSort = (key: keyof (typeof tableData)[0]) => {
        let direction: 'ascending' | 'descending' = 'ascending'
        if (sortConfig.key === key) {
            direction = sortConfig.direction === 'ascending' ? 'descending' : 'ascending'
        }
        setSortConfig({ key, direction })
    }

    const tableData: TableData[] = useMemo(() => {
        let sortedData = clients.map((client) => ({
            description: client.description,
            clientId: client.client_id,
            authorities: client.authorities.join(', '),
            scope: client.scope.join(', '),
            actions: (
                <span className='d-flex justify-content-evenly'>
                    <span className='d-inline-block'>
                        <FaPencilAlt
                            className='btn-icon overlay-trigger'
                            onClick={() => updateClient(client)}
                            style={{ color: 'gray', fontSize: '15px' }}
                        />
                    </span>
                    <span className='d-inline-block'>
                        <FaTrashAlt
                            className='btn-icon overlay-trigger'
                            onClick={() => deleteClient(client)}
                            style={{ color: 'gray', fontSize: '15px' }}
                        />
                    </span>
                </span>
            ),
            details: `
                <div class="details-row">
                    <p>Client Secret: ${client.client_secret}</p>
                    <p>Access Token Validity: ${
                        client.access_token_validity / (60 * 60 * 24)
                    } days (${client.access_token_validity} seconds)</p>
                    <p>Refresh Token Validity: ${
                        client.refresh_token_validity / (60 * 60 * 24)
                    } days (${client.refresh_token_validity} seconds)</p>
                </div>
            `,
        }))

        if (sortConfig.key !== null) {
            sortedData = sortTableData(sortedData, sortConfig.key, sortConfig.direction || 'ascending')
        }
        return sortedData
    }, [clients, sortConfig])

    return (
        <div className='table-container'>
            <table className='oauth-client-table'>
                <thead>
                    <tr>
                        <th>
                            <button
                                onClick={toggleAllRows}
                                className='toggle-button'
                                style={{ border: 'none', background: 'none', padding: '4px', cursor: 'pointer' }}
                            >
                                {allRowsExpanded ? (
                                    <FaCaretDown style={{ color: 'white', fontSize: '15px' }} />
                                ) : (
                                    <FaCaretRight style={{ color: 'white', fontSize: '15px' }} />
                                )}
                            </button>
                        </th>
                        <th onClick={() => handleSort('description')}>
                            <span className='sort-header'>
                                <span className='sort-content'>Description</span>
                                <span className='sort-indicator'>
                                    <span
                                        className={
                                            sortConfig.key === 'description' && sortConfig.direction === 'ascending'
                                                ? 'active-sort'
                                                : 'inactive-sort'
                                        }
                                    >
                                        ↑
                                    </span>
                                    <span
                                        className={
                                            sortConfig.key === 'description' && sortConfig.direction === 'descending'
                                                ? 'active-sort'
                                                : 'inactive-sort'
                                        }
                                    >
                                        ↓
                                    </span>
                                </span>
                            </span>
                        </th>
                        <th onClick={() => handleSort('clientId')}>
                            <span className='sort-header'>
                                <span className='sort-content'>Client ID</span>
                                <span className='sort-indicator'>
                                    <span
                                        className={
                                            sortConfig.key === 'clientId' && sortConfig.direction === 'ascending'
                                                ? 'active-sort'
                                                : 'inactive-sort'
                                        }
                                    >
                                        ↑
                                    </span>
                                    <span
                                        className={
                                            sortConfig.key === 'clientId' && sortConfig.direction === 'descending'
                                                ? 'active-sort'
                                                : 'inactive-sort'
                                        }
                                    >
                                        ↓
                                    </span>
                                </span>
                            </span>
                        </th>
                        <th onClick={() => handleSort('authorities')}>
                            <span className='sort-header'>
                                <span className='sort-content'>Authorities</span>
                                <span className='sort-indicator'>
                                    <span
                                        className={
                                            sortConfig.key === 'authorities' && sortConfig.direction === 'ascending'
                                                ? 'active-sort'
                                                : 'inactive-sort'
                                        }
                                    >
                                        ↑
                                    </span>
                                    <span
                                        className={
                                            sortConfig.key === 'authorities' && sortConfig.direction === 'descending'
                                                ? 'active-sort'
                                                : 'inactive-sort'
                                        }
                                    >
                                        ↓
                                    </span>
                                </span>
                            </span>
                        </th>
                        <th onClick={() => handleSort('scope')}>
                            <span className='sort-header'>
                                <span className='sort-content'>Scope</span>
                                <span className='sort-indicator'>
                                    <span
                                        className={
                                            sortConfig.key === 'scope' && sortConfig.direction === 'ascending'
                                                ? 'active-sort'
                                                : 'inactive-sort'
                                        }
                                    >
                                        ↑
                                    </span>
                                    <span
                                        className={
                                            sortConfig.key === 'scope' && sortConfig.direction === 'descending'
                                                ? 'active-sort'
                                                : 'inactive-sort'
                                        }
                                    >
                                        ↓
                                    </span>
                                </span>
                            </span>
                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row, index) => (
                        <React.Fragment key={index}>
                            <tr>
                                <td>
                                    <button
                                        onClick={() => toggleRow(row.clientId)}
                                        className='toggle-button'
                                        style={{
                                            border: 'none',
                                            background: 'none',
                                            padding: '4px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {expandedRows[row.clientId] ? (
                                            <FaCaretDown style={{ color: 'gray', fontSize: '15px' }} />
                                        ) : (
                                            <FaCaretRight style={{ color: 'gray', fontSize: '15px' }} />
                                        )}
                                    </button>
                                </td>
                                <td>{row.description}</td>
                                <td>{row.clientId}</td>
                                <td>{row.authorities}</td>
                                <td>{row.scope}</td>
                                <td>{row.actions}</td>
                            </tr>
                            {expandedRows[row.clientId] && (
                                <tr>
                                    <td
                                        colSpan={6}
                                        dangerouslySetInnerHTML={{ __html: row.details }}
                                    />
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
