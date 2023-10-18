// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'
import { signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useState } from 'react'

import ChangeLogDetail from '@/components/ChangeLog/ChangeLogDetail/ChangeLogDetail'
import ChangeLogList from '@/components/ChangeLog/ChangeLogList/ChangeLogList'
import { PageButtonHeader, SideBar } from '@/components/sw360'
import { HttpStatus, Session } from '@/object-types'
import { ChangeLog, EmbeddedChangeLogs } from '@/object-types/ChangeLogs'
import LicenseDetail from '@/object-types/LicenseDetail'
import LicenseTabIds from '@/object-types/enums/LicenseTabIds'
import { ApiUtils, CommonUtils } from '@/utils'
import Detail from './Detail'
import Text from './Text'

interface Props {
    session?: Session
    licenseId?: string
}

const tabList = [
    {
        id: LicenseTabIds.DETAILS,
        name: 'Details',
    },
    {
        id: LicenseTabIds.TEXT,
        name: 'Text',
    },
    {
        id: LicenseTabIds.OBLIGATIONS,
        name: 'Obligations',
    },
    {
        id: LicenseTabIds.CHANGE_LOG,
        name: 'Change Log',
    },
]

const LicenseDetailOverview = ({ session, licenseId }: Props) => {
    const t = useTranslations('default')
    const [selectedTab, setSelectedTab] = useState<string>(LicenseTabIds.DETAILS)
    const [changesLogTab, setChangesLogTab] = useState('list-change')
    const [changeLogIndex, setChangeLogIndex] = useState(-1)
    const [license, setLicenseDetail] = useState<LicenseDetail>(undefined)
    const [changeLogList, setChangeLogList] = useState<Array<ChangeLog>>([])

    const fetchData = useCallback(
        async (url: string) => {
            const response = await ApiUtils.GET(url, session.user.access_token)
            if (response.status == HttpStatus.OK) {
                const data = (await response.json()) as LicenseDetail & EmbeddedChangeLogs
                return data
            } else if (response.status == HttpStatus.UNAUTHORIZED) {
                await signOut()
                return undefined
            } else {
                return undefined
            }
        },
        [session.user.access_token]
    )
    console.log(licenseId)

    useEffect(() => {
        fetchData(`licenses/${licenseId}`)
            .then((license: LicenseDetail) => {
                setLicenseDetail(license)
            })
            .catch((err) => console.error(err))

        fetchData(`changelog/document/${licenseId}`)
            .then((changeLogs: EmbeddedChangeLogs) => {
                setChangeLogList(
                    CommonUtils.isNullOrUndefined(changeLogs['_embedded']['sw360:changeLogs'])
                        ? []
                        : changeLogs['_embedded']['sw360:changeLogs']
                )
            })
            .catch((err) => console.error(err))
    }, [licenseId, fetchData])

    const headerButtons = {
        'Edit License': { link: `/licenses/edit/${licenseId}`, type: 'primary' },
    }

    return (
        license && (
            <div className='container' style={{ maxWidth: '98vw', marginTop: '10px' }}>
                <div className='row'>
                    <div className='col-2 sidebar'>
                        <SideBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} tabList={tabList} />
                    </div>
                    <div className='col'>
                        <div className='row' style={{ marginBottom: '20px' }}>
                            <PageButtonHeader title={license.shortName} buttons={headerButtons}>
                                {selectedTab === LicenseTabIds.CHANGE_LOG && (
                                    <div
                                        className='nav nav-pills justify-content-center bg-light font-weight-bold'
                                        id='pills-tab'
                                        role='tablist'
                                    >
                                        <a
                                            className={`nav-item nav-link ${
                                                changesLogTab == 'list-change' ? 'active' : ''
                                            }`}
                                            onClick={() => setChangesLogTab('list-change')}
                                            style={{ color: '#F7941E', fontWeight: 'bold' }}
                                        >
                                            {t('Change Log')}
                                        </a>
                                        <a
                                            className={`nav-item nav-link ${
                                                changesLogTab == 'view-log' ? 'active' : ''
                                            }`}
                                            onClick={() => {
                                                changeLogIndex !== -1 && setChangesLogTab('view-log')
                                            }}
                                            style={{ color: '#F7941E', fontWeight: 'bold' }}
                                        >
                                            {t('Changes')}
                                        </a>
                                    </div>
                                )}
                            </PageButtonHeader>
                        </div>
                        <div className='row' hidden={selectedTab !== LicenseTabIds.DETAILS ? true : false}>
                            <Detail license={license} />
                        </div>
                        <div className='row' hidden={selectedTab !== LicenseTabIds.TEXT ? true : false}>
                            <Text license={license} />
                        </div>
                        <div className='row' hidden={selectedTab != LicenseTabIds.CHANGE_LOG ? true : false}>
                            <div className='col'>
                                <div className='row' hidden={changesLogTab != 'list-change' ? true : false}>
                                    <ChangeLogList
                                        setChangeLogIndex={setChangeLogIndex}
                                        documentId={licenseId}
                                        setChangesLogTab={setChangesLogTab}
                                        changeLogList={changeLogList}
                                    />
                                </div>
                                <div className='row' hidden={changesLogTab != 'view-log' ? true : false}>
                                    <ChangeLogDetail changeLogData={changeLogList[changeLogIndex]} />
                                    <div id='cardScreen' style={{ padding: '0px' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default LicenseDetailOverview
