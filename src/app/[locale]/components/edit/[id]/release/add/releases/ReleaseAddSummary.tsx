// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'
import AddKeyValueComponent from '@/components/AddKeyValue'
import AddAdditionalRolesComponent from '@/components/AddAdditionalRoles'
import DocumentTypes from '@/object-types/enums/DocumentTypes'
import { useTranslations } from 'next-intl'
import { COMMON_NAMESPACE } from '@/object-types/Constants'
import ReleaseSummary from '@/components/ReleaseSummary/ReleaseSummary'
import ReleaseRepository from '@/components/ReleaseRepository/ReleaseRepository'
import ReleasePayload from '@/object-types/ReleasePayload'
import { Session } from '@/object-types/Session'
import Vendor from '@/object-types/Vendor'
import Licenses from '@/object-types/Licenses'
import Moderators from '@/object-types/Moderators'
import Repository from '@/object-types/Repository'
import { useState } from 'react'

interface Props {
    session?: Session
    releasePayload?: ReleasePayload
    setReleasePayload?: React.Dispatch<React.SetStateAction<ReleasePayload>>
    vendor?: Vendor
    setVendor?: React.Dispatch<React.SetStateAction<Vendor>>
    mainLicensesId?: Licenses
    setMainLicensesId?: React.Dispatch<React.SetStateAction<Licenses>>
    otherLicensesId?: Licenses
    setOtherLicensesId?: React.Dispatch<React.SetStateAction<Licenses>>
    contributor?: Moderators
    setContributor?: React.Dispatch<React.SetStateAction<Moderators>>
    moderator?: Moderators
    setModerator?: React.Dispatch<React.SetStateAction<Moderators>>
    releaseRepository?: Repository
    setReleaseRepository?: React.Dispatch<React.SetStateAction<Repository>>
}

export default function ReleaseAddSummary({
    session,
    releasePayload,
    setReleasePayload,
    vendor,
    setVendor,
    mainLicensesId,
    setMainLicensesId,
    otherLicensesId,
    setOtherLicensesId,
    contributor,
    setContributor,
    moderator,
    setModerator,
    releaseRepository,
    setReleaseRepository,
}: Props) {
    const t = useTranslations(COMMON_NAMESPACE)

    return (
        <>
            <form
                action=''
                id='form_submit'
                method='post'
                onSubmit={(e) => {
                    e.preventDefault()
                }}
            >
                <div className='col' style={{ fontSize: '0.875rem' }}>
                    <ReleaseSummary
                        session={session}
                        releasePayload={releasePayload}
                        setReleasePayload={setReleasePayload}
                        vendor={vendor}
                        setVendor={setVendor}
                        mainLicensesId={mainLicensesId}
                        setMainLicensesId={setMainLicensesId}
                        otherLicensesId={otherLicensesId}
                        setOtherLicensesId={setOtherLicensesId}
                        moderator={moderator}
                        setModerator={setModerator}
                    />
                    <div className='row mb-4'>
                        <AddAdditionalRolesComponent documentType={DocumentTypes.COMPONENT} />
                    </div>
                    <div className='row mb-4'>
                        <AddKeyValueComponent header={t('External ids')} keyName={'external id'} />
                    </div>
                    <div className='row mb-4'>
                        <AddKeyValueComponent header={t('Additional Data')} keyName={'additional data'} />
                    </div>
                    <ReleaseRepository />
                </div>
            </form>
        </>
    )
}
