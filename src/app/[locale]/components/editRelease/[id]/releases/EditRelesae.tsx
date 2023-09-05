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
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { COMMON_NAMESPACE } from '@/object-types/Constants'
import Vendor from '@/object-types/Vendor'
import Licenses from '@/object-types/Licenses'
import Moderators from '@/object-types/Moderators'
import ApiUtils from '@/utils/api/api.util'
import HttpStatus from '@/object-types/enums/HttpStatus'
import ReleaseEditSummary from './ReleaseEditSummary'
import { signOut } from 'next-auth/react'
import ActionType from '@/object-types/enums/ActionType'
import ECCInformation from '@/object-types/ECCInformation'
import ClearingInformation from '@/object-types/ClearingInformation'
import { clear } from 'console'
import COTSDetails from '@/object-types/COTSDetails'
import ComponentOwner from '@/object-types/ComponentOwner'
import DocumentTypes from '@/object-types/enums/DocumentTypes'
import AttachmentDetail from '@/object-types/AttachmentDetail'
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
    const [attachmentData, setAttachmentData] = useState<AttachmentDetail[]>([])

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
        fetchData(`releases/${releaseId}`).then((release: any) => {
            setRelease(release)
            if (typeof release.eccInformation !== 'undefined') {
                const eccInformation: ECCInformation = {
                    eccStatus: release.eccInformation.eccStatus,
                    al: release.eccInformation.al,
                    eccn: release.eccInformation.eccn,
                    assessorContactPerson: release.eccInformation.assessorContactPerson,
                    assessorDepartment: release.eccInformation.assessorDepartment,
                    eccComment: release.eccInformation.eccComment,
                    materialIndexNumber: release.eccInformation.materialIndexNumber,
                    assessmentDate: release.eccInformation.assessmentDate,
                }
                setEccInformation(eccInformation)
            }

            if (typeof release.clearingInformation !== 'undefined') {
                const clearingInformation: ClearingInformation = {
                    externalSupplierID: release.clearingInformation.externalSupplierID,
                    additionalRequestInfo: release.clearingInformation.additionalRequestInfo,
                    evaluated: release.clearingInformation.evaluated,
                    procStart: release.clearingInformation.procStart,
                    requestID: release.clearingInformation.requestID,
                    binariesOriginalFromCommunity: release.clearingInformation.binariesOriginalFromCommunity,
                    binariesSelfMade: release.clearingInformation.binariesSelfMade,
                    componentLicenseInformation: release.clearingInformation.componentLicenseInformation,
                    sourceCodeDelivery: release.clearingInformation.sourceCodeDelivery,
                    sourceCodeOriginalFromCommunity: release.clearingInformation.sourceCodeOriginalFromCommunity,
                    sourceCodeToolMade: release.clearingInformation.sourceCodeToolMade,
                    sourceCodeSelfMade: release.clearingInformation.sourceCodeSelfMade,
                    sourceCodeCotsAvailable: release.clearingInformation.sourceCodeCotsAvailable,
                    screenshotOfWebSite: release.clearingInformation.screenshotOfWebSite,
                    finalizedLicenseScanReport: release.clearingInformation.finalizedLicenseScanReport,
                    licenseScanReportResult: release.clearingInformation.licenseScanReportResult,
                    legalEvaluation: release.clearingInformation.legalEvaluation,
                    licenseAgreement: release.clearingInformation.licenseAgreement,
                    scanned: release.clearingInformation.scanned,
                    componentClearingReport: release.clearingInformation.componentClearingReport,
                    clearingStandard: release.clearingInformation.clearingStandard,
                    readmeOssAvailable: release.clearingInformation.readmeOssAvailable,
                    comment: release.clearingInformation.comment,
                    countOfSecurityVn: release.clearingInformation.countOfSecurityVn,
                    externalUrl: release.clearingInformation.externalUrl,
                }
                setClearingInformation(clearingInformation)
            }

            if (typeof release['_embedded']['sw360:cotsDetails'] !== 'undefined') {
                const cotsDetails: COTSDetails = {
                    usedLicense: release['_embedded']['sw360:cotsDetails'][0].usedLicense,
                    licenseClearingReportURL: release['_embedded']['sw360:cotsDetails'][0].licenseClearingReportURL,
                    containsOSS: release['_embedded']['sw360:cotsDetails'][0].containsOSS,
                    ossContractSigned: release['_embedded']['sw360:cotsDetails'][0].ossContractSigned,
                    ossInformationURL: release['_embedded']['sw360:cotsDetails'][0].ossInformationURL,
                    usageRightAvailable: release['_embedded']['sw360:cotsDetails'][0].usageRightAvailable,
                    cotsResponsible: release['_embedded']['sw360:cotsDetails'][0].cotsResponsible,
                    clearingDeadline: release['_embedded']['sw360:cotsDetails'][0].clearingDeadline,
                    sourceCodeAvailable: release['_embedded']['sw360:cotsDetails'][0].sourceCodeAvailable,
                }
                const cotsResponsible: ComponentOwner = {
                    email: release['_embedded']['sw360:cotsDetails'][0]._embedded['sw360:cotsResponsible'].email,
                    fullName: release['_embedded']['sw360:cotsDetails'][0]._embedded['sw360:cotsResponsible'].fullName,
                }
                setCotsResponsible(cotsResponsible)
                setCotsDetails(cotsDetails)
            }
        })
        fetchData(`releases/${releaseId}/attachments`).then((attachments: any) => {
            if (attachments != null) {
                if (
                    !CommonUtils.isNullOrUndefined(attachments['_embedded']) &&
                    !CommonUtils.isNullOrUndefined(attachments['_embedded']['sw360:attachmentDTOes'])
                ) {
                    const attachmentDetails: AttachmentDetail[] = []
                    attachments['_embedded']['sw360:attachmentDTOes'].map((item: any) => {
                        attachmentDetails.push(item)
                    })
                    setAttachmentData(attachmentDetails)
                }
            }
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
        eccInformation: null,
        clearingInformation: null,
        cotsDetails: null,
        attachmentDTOs: null,
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

    const [cotsResponsible, setCotsResponsible] = useState<ComponentOwner>({
        email: '',
        fullName: '',
    })
    const [eccInformation, setEccInformation] = useState<ECCInformation>({
        eccStatus: '',
        al: '',
        eccn: '',
        assessorContactPerson: '',
        assessorDepartment: '',
        eccComment: '',
        materialIndexNumber: '',
        assessmentDate: '',
    })

    const [clearingInformation, setClearingInformation] = useState<ClearingInformation>({
        externalSupplierID: '',
        additionalRequestInfo: '',
        evaluated: '',
        procStart: '',
        requestID: '',
        binariesOriginalFromCommunity: false,
        binariesSelfMade: false,
        componentLicenseInformation: false,
        sourceCodeDelivery: false,
        sourceCodeOriginalFromCommunity: false,
        sourceCodeToolMade: false,
        sourceCodeSelfMade: false,
        sourceCodeCotsAvailable: false,
        screenshotOfWebSite: false,
        finalizedLicenseScanReport: false,
        licenseScanReportResult: false,
        legalEvaluation: false,
        licenseAgreement: false,
        scanned: '',
        componentClearingReport: false,
        clearingStandard: '',
        readmeOssAvailable: false,
        comment: '',
        countOfSecurityVn: 0,
        externalUrl: '',
    })

    const [cotsDetails, setCotsDetails] = useState<COTSDetails>({
        usedLicense: '',
        licenseClearingReportURL: '',
        containsOSS: false,
        ossContractSigned: false,
        ossInformationURL: '',
        usageRightAvailable: false,
        cotsResponsible: '',
        clearingDeadline: '',
        sourceCodeAvailable: false,
    })

    const submit = async () => {
        console.log('---------------------------------')
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
        'Update Release': { link: '', type: 'primary', onClick: submit },
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
                                eccInformation={eccInformation}
                                clearingInformation={clearingInformation}
                                cotsDetails={cotsDetails}
                                attachmentData={attachmentData}
                            />
                        </div>
                        <div className='row' hidden={selectedTab !== ReleaseTabIds.LINKED_RELEASES ? true : false}>
                            <LinkedReleases
                                actionType={ActionType.EDIT}
                                session={session}
                                release={release}
                                releasePayload={releasePayload}
                                setReleasePayload={setReleasePayload}
                            />
                        </div>
                        <div className='row' hidden={selectedTab !== ReleaseTabIds.CLEARING_DETAILS ? true : false}>
                            <EditClearingDetails
                                releasePayload={releasePayload}
                                setReleasePayload={setReleasePayload}
                            />
                        </div>
                        <div className='row' hidden={selectedTab !== ReleaseTabIds.ECC_DETAILS ? true : false}>
                            <EditECCDetails releasePayload={releasePayload} setReleasePayload={setReleasePayload} />
                        </div>
                        <div className='row' hidden={selectedTab != CommonTabIds.ATTACHMENTS ? true : false}>
                            <EditAttachments
                                session={session}
                                documentId={releaseId}
                                documentType={DocumentTypes.RELEASE}
                                releasePayload={releasePayload}
                                setReleasePayload={setReleasePayload}
                            />
                        </div>
                        <div className='row' hidden={selectedTab != ReleaseTabIds.COMMERCIAL_DETAILS ? true : false}>
                            <EditCommercialDetails
                                session={session}
                                releasePayload={releasePayload}
                                setReleasePayload={setReleasePayload}
                                cotsResponsible={cotsResponsible}
                                setCotsResponsible={setCotsResponsible}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default EditRelease
