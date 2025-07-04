// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import { useTranslations } from 'next-intl'
import { ReactNode, useState } from 'react'

import ReleaseRepository from '@/components/ReleaseRepository/ReleaseRepository'
import ReleaseSummary from '@/components/ReleaseSummary/ReleaseSummary'
import { DocumentTypes, InputKeyValue, Release, Vendor } from '@/object-types'
import CommonUtils from '@/utils/common.utils'
import { AddAdditionalRoles, AddKeyValue } from 'next-sw360'

interface Props {
    releasePayload: Release
    setReleasePayload: React.Dispatch<React.SetStateAction<Release>>
    vendor: Vendor
    setVendor: React.Dispatch<React.SetStateAction<Vendor>>
    mainLicenses: { [k: string]: string }
    setMainLicenses: React.Dispatch<React.SetStateAction<{ [k: string]: string }>>
    otherLicenses: { [k: string]: string }
    setOtherLicenses: React.Dispatch<React.SetStateAction<{ [k: string]: string }>>
}

function ReleaseAddSummary({
    releasePayload,
    setReleasePayload,
    vendor,
    setVendor,
    mainLicenses,
    setMainLicenses,
    otherLicenses,
    setOtherLicenses,
}: Props): ReactNode {
    const t = useTranslations('default')
    const [externalIds, setExternalIds] = useState<InputKeyValue[]>([])
    const [addtionalData, setAddtionalData] = useState<InputKeyValue[]>([])
    const [roles, setRoles] = useState<InputKeyValue[]>([])

    // Store users data in format {'email': 'fullName'}
    const [contributors, setContributors] = useState<{ [k: string]: string }>({})
    const [moderators, setModerators] = useState<{ [k: string]: string }>({})

    const setDataRoles = (roles: InputKeyValue[]) => {
        const roleDatas = CommonUtils.convertRoles(roles)
        setReleasePayload({
            ...releasePayload,
            roles: roleDatas,
        })
    }

    const setDataAddtionalData = (additionalDatas: Map<string, string>) => {
        const obj = Object.fromEntries(additionalDatas)
        setReleasePayload({
            ...releasePayload,
            additionalData: obj,
        })
    }

    const setDataExternalIds = (externalIds: Map<string, string>) => {
        const obj = Object.fromEntries(externalIds)
        setReleasePayload({
            ...releasePayload,
            externalIds: obj,
        })
    }
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
                <div
                    className='col'
                    style={{ fontSize: '0.875rem' }}
                >
                    <ReleaseSummary
                        releasePayload={releasePayload}
                        setReleasePayload={setReleasePayload}
                        vendor={vendor}
                        setVendor={setVendor}
                        mainLicenses={mainLicenses}
                        setMainLicenses={setMainLicenses}
                        otherLicenses={otherLicenses}
                        setOtherLicenses={setOtherLicenses}
                        moderators={moderators}
                        setModerators={setModerators}
                        contributors={contributors}
                        setContributors={setContributors}
                    />
                    <div className='row mb-4'>
                        <AddAdditionalRoles
                            documentType={DocumentTypes.COMPONENT}
                            inputList={roles}
                            setInputList={setRoles}
                            setDataInputList={setDataRoles}
                        />
                    </div>
                    <div className='row mb-4'>
                        <AddKeyValue
                            header={t('External ids')}
                            keyName={'external id'}
                            setData={setExternalIds}
                            data={externalIds}
                            setObject={setDataExternalIds}
                        />
                    </div>
                    <div className='row mb-4'>
                        <AddKeyValue
                            header={t('Additional Data')}
                            keyName={'additional data'}
                            setData={setAddtionalData}
                            data={addtionalData}
                            setObject={setDataAddtionalData}
                        />
                    </div>
                    <ReleaseRepository
                        releasePayload={releasePayload}
                        setReleasePayload={setReleasePayload}
                    />
                </div>
            </form>
        </>
    )
}

export default ReleaseAddSummary
