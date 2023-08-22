// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'
import { useState } from 'react'

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
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { COMMON_NAMESPACE } from '@/object-types/Constants'
import Vendor from '@/object-types/Vendor'
import Licenses from '@/object-types/Licenses'
import Moderators from '@/object-types/Moderators'
import Repository from '@/object-types/Repository'
import ReleaseAddSummary from '../../edit/[id]/release/add/releases/ReleaseAddSummary'

interface Props {
    session?: Session
    componentId?: string
}

const EditRelease = ({ session, componentId }: Props) => {
    const router = useRouter()
    const t = useTranslations(COMMON_NAMESPACE)
    const [tabList, setTabList] = useState(ReleaseEditTabs.WITH_COMMERCIAL_DETAILS)
    const [selectedTab, setSelectedTab] = useState<string>(CommonTabIds.SUMMARY)
    const [releasePayload, setReleasePayload] = useState<ReleasePayload>({
        name: '',
        cpeid: '',
        version: '',
        componentId: componentId,
        releaseDate: '',
        externalIds: null,
        additionalData: null,
        mainlineState: 'OPEN',
        contributors: null,
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

    // const fetchData: any = useCallback(
    //     async (url: string) => {
    //         const response = await ApiUtils.GET(url, session.user.access_token)
    //         if (response.status == HttpStatus.OK) {
    //             const data = await response.json()
    //             return data
    //         } else if (response.status == HttpStatus.UNAUTHORIZED) {
    //             signOut()
    //         } else {
    //             notFound()
    //         }
    //     },
    //     [session.user.access_token]
    // )

    // useEffect(() => {
    //     fetchData(`components/${componentId}`).then((component: any) => {
    //         setReleasePayload({
    //             ...releasePayload,
    //             name: component.name,
    //         })
    //     })
    // }, [componentId, fetchData])

    // const notify = (text: string, type: TypeOptions) =>
    // toast(text, {
    //     type,
    //     position: toast.POSITION.TOP_LEFT,
    //     theme: 'colored',
    // })

    // const handleId = (id: string): string => {
    //     return id.split('/').at(-1)
    // }

    // const submit = async () => {
    //     const response = await ApiUtils.POST('releases', releasePayload, session.user.access_token)
    //     if (response.status == HttpStatus.CREATED) {
    //         const data = await response.json()
    //         notify(t('Component is created'), 'success')
    //         const releaseId: string = handleId(data._links.self.href)
    //         router.push('/components/releases/detail/' + releaseId)
    //     } else if (response.status == HttpStatus.CONFLICT){
    //         notify(t('Component is Duplicate'), 'warning')
    //     } else {
    //         notify(t('Create Component failed'), 'error')
    //     }
    // }
    const headerButtons = {
        'Update Release': { link: '', type: 'primary' },
        'Delete Release': {
            link: '/components/edit/' + componentId,
            type: 'danger',
        },
        Cancel: { link: '/components/detail/' + componentId, type: 'secondary' },
    }

    return (
        <>
            <div className='container' style={{ maxWidth: '98vw', marginTop: '10px' }}>
                <div className='row'>
                    <div className='col-2 sidebar'>
                        <SideBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} tabList={tabList} />
                    </div>
                    <div className='col'>
                        <div className='row' style={{ marginBottom: '20px' }}>
                            <PageButtonHeader buttons={headerButtons}></PageButtonHeader>
                        </div>
                        <div className='row' hidden={selectedTab !== CommonTabIds.SUMMARY ? true : false}>
                            <ReleaseAddSummary
                                session={session}
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
                        <div className='row' hidden={selectedTab != ReleaseTabIds.LINKED_RELEASES ? true : false}>
                            <LinkedReleases
                                session={session}
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
                        <div className='row' hidden={selectedTab != CommonTabIds.ATTACHMENTS ? true : false}>
                            {/* <EditAttachments session={session} /> */}
                        </div>
                        <div className='row' hidden={selectedTab != ReleaseTabIds.COMMERCIAL_DETAILS ? true : false}>
                            <EditCommercialDetails />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditRelease
