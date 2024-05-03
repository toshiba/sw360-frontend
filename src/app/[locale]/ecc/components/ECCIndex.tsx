// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import type { Embedded, ECC } from '@/object-types'
import { SW360_API_URL } from '@/utils/env'
import { signOut, useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { PageButtonHeader, QuickFilter, Table, _ } from 'next-sw360'
import { Spinner } from 'react-bootstrap'

import { useState } from 'react'

type EmbeddedECC = Embedded<ECC, 'sw360:releases'>

const Capitalize = (text: string) =>
    text.split('_').reduce((s, c) => s + ' ' + (c.charAt(0) + c.substring(1).toLocaleLowerCase()), '')

export default function ECCIndex() {
    const t = useTranslations('default')
    //setNumberOfECC maybe used
    const [numberOfECC, setNumberOfECC] = useState(0)
    const { data: session, status } = useSession()
    const [search, setSearch] = useState({})

    const headerButtons = {
        'Add ECC': { link: '/ECC/add', type: 'primary', name: 'Add ECC' },
    }

    const columns = [
        {
            id: 'ecc.status',
            name: t('Status'),
            sort: true,
        },
        {
            id: 'ecc.releaseName',
            name: t('Release name'),
            formatter: ({ name, version }: { id: string; name: string; version: string }) =>
            _(
                <div>
                        {`${name} (${version})`}
                </div>
            ),
            sort: true,
        },
        {
            id: 'ecc.releaseVersion',
            name: t('Release version'),
            sort: true,
        },
        {
            id: 'ecc.creatorGroup',
            name: t('Creator Group'),
            sort: true,
        },
        {
            id: 'ecc.eccAssessor',
            name: t('ECC Assessor'),
            sort: true,
        },
        {
            id: 'ecc.eccAssessorGroup',
            name: t('ECC Assessor Group'),
            sort: true,
        },
        {
            id: 'ecc.eccAssessmentDate',
            name: t('ECC Assessment Date'),
            sort: true,
        },
    ]

    // const advancedSearch = [
    //     {
    //         fieldName: 'Ecc Name',
    //         value: '',
    //         paramName: 'EccName',
    //     },
    //     {
    //         fieldName: t('Status'),
    //         value: '',
    //         paramName: 'status',
    //     },
    //     {
    //         fieldName: 'Release Name',
    //         value: '',
    //         paraName: 'releaseName',
    //     },
    //     {
    //         fieldName: 'Release Version',
    //         value: '',
    //         paraName: 'releaseVersion',
    //     },
    //     {
    //         fieldName: 'Creator Group',
    //         value: '',
    //         paraName: 'creatorGroup',
    //     },
    //     {
    //         fieldName: 'ECC Assessor',
    //         value: '',
    //         paraName: 'eccAssessor',
    //     },
    //     {
    //         fieldName: 'ECC Assessor Group',
    //         value: '',
    //         paraName: 'eccAssessorGroup',
    //     },
    //     {
    //         fieldName: 'ECC Assessment Date',
    //         value: '',
    //         paraName: 'eccAssessmentDate',
    //     },
    // ]

    const server = {
        url: `${SW360_API_URL}/resource/api/ecc`,
        then: (data: EmbeddedECC) => {
            setNumberOfECC(data.page.totalElements)
            return data._embedded['sw360:releases'].map((elem: ECC) => [
                Capitalize(elem.eccInformation.eccStatus ?? ''),
                {
                    version: elem.version ?? '',
                    name: elem.name ?? '',
                },
                elem.version ?? '',
                elem.eccInformation.creatorGroup ?? '',
                elem.eccInformation.assessorContactPerson ?? '',
                elem.eccInformation.assessorDepartment ?? '',
                elem.eccInformation.assessmentDate ?? '',
                elem.eccInformation.eccn ?? '',
            ])
        },
        total: (data: EmbeddedECC) => data.page.totalElements,
        headers: { Authorization: `Bearer ${status === 'authenticated' ? session.user.access_token : ''}` },
    }
    const doSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
        setSearch({ keyword: event.currentTarget.value })
    }
    if (status === 'unauthenticated') {
        signOut()
    } else {
        return (
            <div className='container' style={{ maxWidth: '98vw', marginTop: '10px' }}>
                <div className='row'>
                    <div className='col-2 sidebar'>
                        <QuickFilter id='eccfilter' title={t('Quick Filter')} searchFunction={doSearch} />
                    </div>
                    <div className='col col-sm-9'>
                        <div className='col'>
                            <div className='row'>
                                <PageButtonHeader
                                    buttons={headerButtons}
                                    title={`${t('ECC')} (${numberOfECC})`}
                                />
                                <Table server={server} columns={columns} search={search} selector={true} />

                                <div className='row mt-2'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
