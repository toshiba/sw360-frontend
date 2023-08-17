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
import ReleaseAddSummary from '@/components/releases/ReleaseAddSummary'
import LinkedReleases from '@/components/releases/LinkedReleases/LinkedReleases'
import ReleasePayload from '@/object-types/ReleasePayload'
import { notFound, useRouter } from 'next/navigation'
import ApiUtils from '@/utils/api/api.util'
import HttpStatus from '@/object-types/enums/HttpStatus'
import Vendor from '@/object-types/Vendor'
import Moderators from '@/object-types/Moderators'
import Licenses from '@/object-types/Licenses'
import Repository from '@/object-types/Repository'
import { signOut } from 'next-auth/react'

interface Props {
    session?: Session
    componentId?: string
}

const tabList = [
    {
        id: CommonTabIds.SUMMARY,
        name: 'Summary',
    },
    {
        id: ReleaseTabIds.LINKED_RELEASES,
        name: 'Linked Releases',
    },
]

const AddRelease = ({ session, componentId }: Props) => {
    const router = useRouter()
    const [selectedTab, setSelectedTab] = useState<string>(CommonTabIds.SUMMARY)
    const [releasePayload, setReleasePayload] = useState<ReleasePayload>({
        name: '',
        cpeid: '',
        version: '',
        componentId: componentId,
        releaseDate: '',
        externalIds: null,
        additionalData: null,
        mainlineState: '',
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

    const fetchData: any = useCallback(
      async (url: string) => {
          const response = await ApiUtils.GET(url, session.user.access_token)
          if (response.status == HttpStatus.OK) {
              const data = await response.json()
              return data
          } else if (response.status == HttpStatus.UNAUTHORIZED) {
              signOut()
          } else {
              notFound()
          }
      },
      [session.user.access_token]
    )

    useEffect(() => {
        fetchData(`components/${componentId}`).then((component: any) => {
            setReleasePayload({
                ...releasePayload,
                name: component.name,
            })
        })
    }, [componentId, fetchData])

    const submit = async () => {
        console.log(releasePayload)
    }

    const headerButtons = {
        'Create Release': { link: '', type: 'primary', onClick: submit },
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
                            <LinkedReleases />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddRelease
