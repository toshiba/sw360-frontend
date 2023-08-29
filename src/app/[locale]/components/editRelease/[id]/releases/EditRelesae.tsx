// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'
import { useCallback, useEffect, useState } from 'react'

import CommonTabIds from '@/object-types/enums/CommonTabsIds'
import { Session } from '@/object-types/Session'
import { SideBar, PageButtonHeader } from '@/components/sw360'
import ReleaseTabIds from '@/object-types/enums/ReleaseTabIds'
import LinkedReleases from '@/components/releases/LinkedReleases/LinkedReleases'
import ReleaseEditTabs from './ReleaseEditTab'
import EditAttachments from '@/components/Attachments/EditAttachments'
import EditClearingDetails from './ClearingDetail/EditClearingDetails'
import EditECCDetails from './ECCDetail/EditECCDetails'
import EditCommercialDetails from './CommercialDetails/EditCommercialDetails'
import ReleasePayload from '@/object-types/ReleasePayload'
import { notFound, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { COMMON_NAMESPACE } from '@/object-types/Constants'
import Vendor from '@/object-types/Vendor'
import Licenses from '@/object-types/Licenses'
import Moderators from '@/object-types/Moderators'
import Repository from '@/object-types/Repository'
import ApiUtils from '@/utils/api/api.util'
import HttpStatus from '@/object-types/enums/HttpStatus'
import ReleaseEditSummary from './ReleaseEditSummary'
import { signOut } from 'next-auth/react'
import ActionType from '@/object-types/enums/ActionType'
import CommonUtils from '@/utils/common.utils'

interface Props {
    session?: Session
    releaseId?: string
}

const EditRelease = ({ session, releaseId }: Props) => {
    const router = useRouter()
    const t = useTranslations(COMMON_NAMESPACE)
    const [tabList, setTabList] = useState(ReleaseEditTabs.WITH_COMMERCIAL_DETAILS)
    const [selectedTab, setSelectedTab] = useState<string>(CommonTabIds.SUMMARY)
    const [release, setRelease] = useState<any>(undefined)


    const fetchData: any = useCallback(
        async (url: string) => {
            const response = await ApiUtils.GET(url, session.user.access_token)
            if (response.status == HttpStatus.OK) {
                const data = await response.json()
                return data
            } else if (response.status == HttpStatus.UNAUTHORIZED) {
                signOut()
            } else {
                return null
            }
        },
        [session.user.access_token]
    )

    useEffect(() => {
        fetchData(`releases/${releaseId}`)
            .then((release: any) => {
                setRelease(release)
            })
    }, [releaseId])

    const [releasePayload, setReleasePayload] = useState<ReleasePayload>({
        name: '',
        cpeid: '',
        version: '',
        componentId: '',
        releaseDate: '',
        externalIds: null,
        additionalData: null,
        mainlineState: 'OPEN',
        contributors: null,
        createdOn: '',
        createBy: '',
        modifiedBy: '', 
        modifiedOn: '',
        moderators: null,
        roles: null,
        mainLicenseIds: null,
        otherLicenseIds: null,
        vendorId: '',
        languages: null,
        operatingSystems: null,
        softwarePlatforms: null,
        sourceCodeDownloadurl: '',
        binaryDownloadurl: '',
        repository: null,
        releaseIdToRelationship: null,
    })

    const [vendor, setVendor] = useState<Vendor>({
        id: '',
        fullName: '',
    })

    const [mainLicensesId, setMainLicensesId] = useState<Licenses>({
        id: null,
        fullName: '',
    })

    const [otherLicensesId, setOtherLicensesId] = useState<Licenses>({
        id: null,
        fullName: '',
    })

    const [contributor, setContributor] = useState<Moderators>({
        emails: null,
        fullName: '',
    })

    const [moderator, setModerator] = useState<Moderators>({
        emails: null,
        fullName: '',
    })

    const [releaseRepository, setReleaseRepository] = useState<Repository>({
        repositorytype: 'UNKNOWN',
        url: '',
    })
    const submit = async () => {
        console.log("---------------------------------")
        console.log(releaseId)
        console.log(releasePayload)
        // const response = await ApiUtils.POST('releases', releasePayload, session.user.access_token)
        // if (response.status == HttpStatus.CREATED) {
        //     const data = await response.json()
        //     notify(t('Component is created'), 'success')
        //     const releaseId: string = handleId(data._links.self.href)
        //     router.push('/components/releases/detail/' + releaseId)
        // } else if (response.status == HttpStatus.CONFLICT){
        //     notify(t('Component is Duplicate'), 'warning')
        // } else {
        //     notify(t('Create Component failed'), 'error')
        // }
    }
    const headerButtons = {
        'Update Release': { link:  '', type: 'primary', onClick: submit },
        'Delete Release': {
            link: '/releases/detail/' + releaseId,
            type: 'danger',
        },
        Cancel: { link: '/releases/detail/' + releaseId, type: 'secondary' },
    }

    return (
        release && (
            <div className='container' style={{ maxWidth: '98vw', marginTop: '10px' }}>
                <div className='row'>
                    <div className='col-2 sidebar'>
                        <SideBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} tabList={tabList} />
                    </div>
                    <div className='col'>
                        <div className='row' style={{ marginBottom: '20px' }}>
                            <PageButtonHeader buttons={headerButtons} title={release.name}></PageButtonHeader>
                        </div>
                        <div className='row' hidden={selectedTab !== CommonTabIds.SUMMARY ? true : false}>
                            <ReleaseEditSummary
                                session={session}
                                release={release}
                                releaseId={releaseId}
                                actionType={ActionType.EDIT}
                                releasePayload={releasePayload}
                                setReleasePayload={setReleasePayload}
                                vendor={vendor}
                                setVendor={setVendor}
                                mainLicensesId={mainLicensesId}
                                setMainLicensesId={setMainLicensesId}
                                otherLicensesId={otherLicensesId}
                                setOtherLicensesId={setOtherLicensesId}
                                contributor={contributor}
                                setContributor={setContributor}
                                moderator={moderator}
                                setModerator={setModerator}
                                releaseRepository={releaseRepository}
                                setReleaseRepository={setReleaseRepository}
                            />
                        </div>
                        <div className='row' hidden={selectedTab !== ReleaseTabIds.LINKED_RELEASES ? true : false}>
                            <LinkedReleases
                                session={session}
                                release={release}
                                releasePayload={releasePayload}
                                setReleasePayload={setReleasePayload}
                            />
                        </div>
                        <div className='row' hidden={selectedTab !== ReleaseTabIds.CLEARING_DETAILS ? true : false}>
                            <EditClearingDetails />
                        </div>
                        <div className='row' hidden={selectedTab !== ReleaseTabIds.ECC_DETAILS ? true : false}>
                            <EditECCDetails />
                        </div>
                        {/* <div className='row' hidden={selectedTab != CommonTabIds.ATTACHMENTS ? true : false}>
                            <EditAttachments session={session} />
                        </div> */}
                        <div className='row' hidden={selectedTab != ReleaseTabIds.COMMERCIAL_DETAILS ? true : false}>
                            <EditCommercialDetails session={session}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default EditRelease
