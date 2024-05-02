// Copyright (C) TOSHIBA CORPORATION, 2024. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2024. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import { ApiUtils } from '@/utils'
import { getSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { Table, _ } from 'next-sw360'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Spinner, Tooltip, OverlayTrigger, ButtonGroup, Dropdown } from 'react-bootstrap'
import Link from 'next/link'
import { FaPencilAlt } from 'react-icons/fa'
import { GoSingleSelect } from "react-icons/go"
import DropdownButton from 'react-bootstrap/DropdownButton'
import Form from 'react-bootstrap/Form'
import styles from '../detail.module.css'
import {
    releaseTypes, projectTypes,
    releaseRelations, projectRelations,
    releaseClearingStates, projectClearingState
} from './LicenseClearingFilters'

interface ListViewData {
    isAccessible: boolean
    clearingState: string
    mainLicenses: string
    type: string
    projectMainlineState: string
    relation: string
    isRelease: boolean | string
    releaseMainlineState: string
    projectOrigin: string
    name: string
    releaseOrigin: string
    comment: string
    id: string
    projectState?: string
}

const filterOptions: { [k: string]: Array<string> } = {
    'types': [...Object.values(releaseTypes), ...Object.values(projectTypes)],
    'relations': [...Object.values(releaseRelations), ...Object.values(projectRelations)],
    'states': [...Object.values(releaseClearingStates), ...Object.values(projectClearingState)],
}

const DependencyNetworkListView = ({
    projectId,
}: {
    projectId: string
}) => {
    const t = useTranslations('default')
    const [data, setData] = useState(undefined)
    const [displayedData, setDisplayedData] = useState(undefined)
    const [search, setSearch] = useState({ keyword: '' })

    const [filters, setFilters] = useState<{ [k: string]: Array<string> }>(filterOptions)
    const language = { noRecordsFound: t('No linked releases or projects') }

    const updateFilters = (event: React.ChangeEvent<HTMLInputElement>) => {
        const filterName = event.target.name
        if (event.target.checked == true) {
            if (filters[filterName].length === filterOptions[filterName].length) {
                setFilters({
                    ...filters,
                    [filterName]: [event.target.value]
                })
            } else {
                setFilters({
                    ...filters,
                    [filterName]: [...filters[filterName], event.target.value]
                })
            }
        } else {
            if (filters[filterName].length === 1) {
                setFilters({
                    ...filters,
                    [filterName]: [...filterOptions[filterName]]
                })
            } else {
                setFilters({
                    ...filters,
                    [filterName]: [...filters[filterName].filter(el => el != event.target.value)]
                })
            }
        }
    }

    const columns = [
        {
            id: 'licenseClearing.name',
            name: t('Name'),
            width: '12%',
            formatter: (data: ListViewData) => _(<Link key={data.id} href={`/components/releases/detail/${data.id}`} style={{wordBreak: 'break-all'}}>{data.name}</Link>),
            sort: {
                compare: (data1: ListViewData, data2: ListViewData) => data1.name.localeCompare(data2.name)
            }
        },
        {
            id: 'licenseClearing.type',
            name: _(
                <>
                    <span>{t('Type')} {' '}</span>
                        <DropdownButton
                            as={ButtonGroup}
                            drop='down'
                            title={<GoSingleSelect />}
                            id='types-filter-dropdown-btn'
                            className={`${styles['dropdown-btn']}`}
                        >
                            <span className='px-3'>{t('Component Type')}</span>
                            <Dropdown.Divider />
                            {
                                Object.values(releaseTypes).map((releaseType: string) =>
                                    <span key={releaseType}>
                                        <Form.Check
                                            className={`${styles.selection}`}
                                            type='checkbox'
                                            id={`type-${releaseType}`}
                                            value={releaseType}
                                            name='types'
                                            label={releaseType}
                                            defaultChecked={(filters.types.length !== filterOptions.types.length) && filters.types.includes(releaseType)}
                                            onChange={updateFilters}
                                        />
                                    </span>
                                )
                            }
                        </DropdownButton>
                </>
            ),
            width: '7%',
            sort: true,
        },
        {
            id: 'licenseClearing.projectPath',
            name: t('Project Path'),
            width: '11%',
            sort: true,
        },
        {
            id: 'licenseClearing.releasePath',
            name: t('Release Path'),
            width: '14%',
            sort: true,
        },
        {
            id: 'licenseClearing.relation',
            name: _(
                <>
                    <span>{t('Relation')} {' '}</span>
                        <DropdownButton
                            as={ButtonGroup}
                            drop='down'
                            title={<GoSingleSelect />}
                            id='relations-filter-dropdown-btn'
                            className={`${styles['dropdown-btn']}`}
                        >
                            <span className='px-3'>{t('Release Relation')}</span>
                            <Dropdown.Divider />
                            {
                                Object.values(releaseRelations).map((relation: string) =>
                                    <span key={relation}>
                                        <Form.Check
                                            className={`${styles.selection}`}
                                            type='checkbox'
                                            id={`relation-${relation}`}
                                            value={relation}
                                            name='relations'
                                            label={relation}
                                            defaultChecked={(filters.relations.length !== filterOptions.relations.length) && filters.relations.includes(relation)}
                                            onChange={updateFilters}
                                        />
                                    </span>
                                )
                            }
                        </DropdownButton>
                </>
            ),
            width: '8%',
            sort: true,
        },
        {
            id: 'licenseClearing.mainLicenses',
            name: t('Main licenses'),
            width: '10%',
            sort: true,
            formatter: (mainLicenses: string) =>
            _(
                <>
                    {
                        mainLicenses && mainLicenses.split(',').map((license): React.ReactNode  => (
                            <li key={license} style={{ display: 'inline' }}>
                                <Link href={`/licenses/detail${license}`} className='text-link'>
                                    {license}
                                </Link>
                            </li>
                        ))
                        .reduce((prev, curr): React.ReactNode[] => [prev, ', ', curr])
                    }
                </>
            ),
        },
        {
            id: 'licenseClearing.state',
            name: _(
                <>
                    <span>{t('State')} {' '}</span>
                        <DropdownButton
                            as={ButtonGroup}
                            drop='down'
                            title={<GoSingleSelect />}
                            id='states-filter-dropdown-btn'
                            className={`${styles['dropdown-btn']}`}
                        >
                            <span className='px-3'>{t('Release Clearing State')}</span>
                            <Dropdown.Divider />
                            {
                                Object.values(releaseClearingStates).map((state: string) =>
                                    <span key={state}>
                                        <Form.Check
                                            className={`${styles.selection}`}
                                            type='checkbox'
                                            id={`state-${state}`}
                                            value={state}
                                            name='states'
                                            defaultChecked={(filters.states.length !== filterOptions.states.length) && filters.states.includes(state)}
                                            label={state}
                                            onChange={updateFilters}
                                        />
                                    </span>
                                )
                            }
                        </DropdownButton>
                </>
            ),
            width: '7%',
            formatter: (data: ListViewData) => 
            _(
                <div className='text-center'>
                    {
                    (data.isRelease === 'true')
                        ?
                            <OverlayTrigger
                                overlay={
                                    <Tooltip>{`${t('Release Clearing State')}: ${data.clearingState}`}</Tooltip>
                                }
                            >
                                {(data.clearingState === 'New') ? (
                                    <span className='state-box clearingStateOpen capsule-left capsule-right'>{'CS'}</span>
                                ) : (data.clearingState === 'Report available') ? (
                                    <span className='state-box clearingStateReportAvailable capsule-left capsule-right'>{'CS'}</span>
                                ) : (
                                    <span className='state-box clearingStateApproved capsule-left capsule-right'>{'CS'}</span>
                                )}
                            </OverlayTrigger>
                        :
                        <>
                            <OverlayTrigger
                                overlay={
                                    <Tooltip>{`${t('Project State')}: ${data.projectState}`}</Tooltip>
                                }
                            >
                                {data.projectState === 'Active' ? (
                                    <span className='state-box projectStateActive capsule-left'>{'PS'}</span>
                                ) : (
                                    <span className='state-box projectStateInactive capsule-left'>{'PS'}</span>
                                )}
                            </OverlayTrigger>
                            <OverlayTrigger
                                overlay={
                                    <Tooltip>{`${t('Project Clearing State')}: ${data.clearingState}`}</Tooltip>
                                }
                            >
                                {data.clearingState === 'Open' ? (
                                    <span className='state-box clearingStateOpen capsule-right'>{'CS'}</span>
                                ) : data.clearingState === 'In Progress' ? (
                                    <span className='state-box clearingStateInProgress capsule-right'>{'CS'}</span>
                                ) : (
                                    <span className='state-box clearingStateApproved capsule-right'>{'CS'}</span>
                                )}
                            </OverlayTrigger>
                        </>
                     }
                </div>
            ),
            sort: {
                compare: (data1: ListViewData, data2: ListViewData) => data1.clearingState.localeCompare(data2.clearingState)
            }
        },
        {
            id: 'licenseClearing.releaseMainlineState',
            name: t('Release Mainline State'),
            width: '8%',
            sort: true,
        },
        {
            id: 'licenseClearing.projectMainlineState',
            name: t('Project Mainline State'),
            width: '8%',
            sort: true,
        },
        {
            id: 'licenseClearing.comment',
            name: t('Comment'),
            width: '10%',
            sort: true,
        },
        {
            id: 'licenseClearing.actions',
            name: t('Actions'),
            sort: false,
            width: '5%',
        },
    ]

    useEffect(() => {
        ;(async () => {
            const session = await getSession()
            try {
                const listViewResponse = await ApiUtils.GET(
                    `projects/network/${projectId}/listView`,
                    session.user.access_token
                )

                const listViewData = await listViewResponse.json() as Array<ListViewData>
                const tableData = listViewData.map((data: ListViewData) => [
                    data,
                    data.type,
                    data.projectOrigin,
                    data.releaseOrigin,
                    data.relation,
                    data.mainLicenses,
                    data,
                    data.releaseMainlineState,
                    data.projectMainlineState,
                    data.comment,
                    _(
                        <div style={{textAlign:'center'}}>
                            <OverlayTrigger overlay={<Tooltip>{t('Edit')}</Tooltip>}>
                                <Link
                                    href={
                                        data.isRelease === 'true'
                                            ? `/components/editRelease/${data.id}`
                                            : `/projects/edit/${data.id}`
                                    }
                                    className='overlay-trigger'
                                >
                                    <FaPencilAlt className='btn-icon' />
                                </Link>
                            </OverlayTrigger>
                        </div>
                    ),
                ])
                setData(tableData)
                filterData(tableData)
            } catch (e) {
                console.error(e)
            }
        })()
    }, [])

    const filterData = (data: Array<Array<any>>) => {
        const filteredData = data.filter((item: Array<any>) =>
            filters.types.includes(item[1])
                && filters.relations.includes(item[4])
                && filters.states.includes(item[6].clearingState)
        )
        setDisplayedData(filteredData)
    }

    useEffect(() => {
        if (data === undefined) return
        filterData(data)
    }, [filters])

    const doSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value === '' ? undefined : { keyword: event.target.value })
    }

    return (
        <>
            {displayedData ? (
                <div className='position-relative'>
                    <div className={`position-absolute ${styles['table-search-box']}`}>
                        <label className='d-inline-block'>Search:</label>
                        <Form.Control
                            className='d-inline-block list-view-search-input'
                            size='sm'
                            type='search'
                            onChange={doSearch}
                        />
                    </div>
                    <Table columns={columns} data={displayedData} selector={true} sort={false} language={language} search={search} />
                </div>
            ) : (
                <div className='col-12 text-center'>
                    <Spinner className='spinner' />
                </div>
            )}
        </>
    )
}

export default DependencyNetworkListView
