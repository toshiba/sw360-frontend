// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import { signOut, useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { notFound, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-bootstrap'

import EditAttachments from '@/components/Attachments/EditAttachments'
import AddCommercialDetails from '@/components/CommercialDetails/AddCommercialDetails'
import LinkedReleases from '@/components/LinkedReleases/LinkedReleases'
import {
    ActionType,
    COTSDetails,
    ClearingInformation,
    CommonTabIds,
    ComponentOwner,
    Creator,
    DocumentCreationInformation,
    DocumentTypes,
    ECCInformation,
    HttpStatus,
    Licenses,
    Moderators,
    Release,
    ReleaseDetail,
    ReleaseTabIds,
    ToastData,
    Vendor,
} from '@/object-types'
import { ApiUtils, CommonUtils } from '@/utils'
import { SPDX_ENABLE } from '@/utils/env'
import { PageButtonHeader, SideBar, ToastMessage } from 'next-sw360'
import SPDX from '../../../../../../object-types/spdx/SPDX'
import DeleteReleaseModal from '../../../detail/[id]/components/DeleteReleaseModal'
import EditClearingDetails from './EditClearingDetails'
import EditECCDetails from './EditECCDetails'
import EditSPDXDocument from './EditSPDXDocument'
import ReleaseEditSummary from './ReleaseEditSummary'
import ReleaseEditTabs from './ReleaseEditTabs'

interface Props {
    releaseId?: string
}

const EditRelease = ({ releaseId }: Props) => {
    const router = useRouter()
    const t = useTranslations('default')
    const { data: session } = useSession()
    const params = useSearchParams()
    const [selectedTab, setSelectedTab] = useState<string>(CommonTabIds.SUMMARY)
    const [tabList, setTabList] = useState(ReleaseEditTabs.WITHOUT_COMMERCIAL_DETAILS_AND_SPDX)
    const [release, setRelease] = useState<ReleaseDetail>()
    const [componentId, setComponentId] = useState('')
    const [deletingRelease, setDeletingRelease] = useState('')
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [SPDXPayload, setSPDXPayload] = useState<SPDX>({
        spdxDocument: null,
        documentCreationInformation: null,
        packageInformation: null,
    })

    const handleCreators = (data: string) => {
        if (CommonUtils.isNullEmptyOrUndefinedString(data)) {
            return []
        }
        const creators: Array<Creator> = []
        const creator: Creator = {
            type: 'Person',
            value: data,
            index: 0,
        }
        creators.push(creator)
        return creators
    }

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        ;(async () => {
            try {
                const queryUrl = CommonUtils.createUrlWithParams(`releases/${releaseId}`, Object.fromEntries(params))
                const response = await ApiUtils.GET(queryUrl, session.user.access_token, signal)
                if (response.status === HttpStatus.UNAUTHORIZED) {
                    return signOut()
                } else if (response.status !== HttpStatus.OK) {
                    return notFound()
                }
                const release: ReleaseDetail = await response.json()
                let createdDate = release._embedded['sw360:documentCreationInformation'].created
                if (CommonUtils.isNullEmptyOrUndefinedString(createdDate)) {
                    createdDate = new Date().toISOString()
                }
                let creators: Creator[] = release._embedded['sw360:documentCreationInformation'].creator
                if (CommonUtils.isNullEmptyOrUndefinedArray(creators)) {
                    creators = handleCreators(release._embedded['sw360:documentCreationInformation'].createdBy)
                }
                const documentCreationInfomation: DocumentCreationInformation = {
                    id: release._embedded['sw360:documentCreationInformation'].id,
                    spdxDocumentId: release._embedded['sw360:documentCreationInformation'].spdxDocumentId, // Id of the parent SPDX Document
                    spdxVersion: release._embedded['sw360:documentCreationInformation'].spdxVersion, // 6.1
                    dataLicense: release._embedded['sw360:documentCreationInformation'].dataLicense, // 6.2
                    SPDXID: release._embedded['sw360:documentCreationInformation'].SPDXID, // 6.3
                    name: release._embedded['sw360:documentCreationInformation'].name, // 6.4
                    documentNamespace: release._embedded['sw360:documentCreationInformation'].documentNamespace, // 6.5
                    externalDocumentRefs: release._embedded['sw360:documentCreationInformation'].externalDocumentRefs, // 6.6
                    licenseListVersion: release._embedded['sw360:documentCreationInformation'].licenseListVersion, // 6.7
                    creator: creators, // 6.8
                    created: createdDate, // 6.9
                    creatorComment: release._embedded['sw360:documentCreationInformation'].creatorComment, // 6.10
                    documentComment: release._embedded['sw360:documentCreationInformation'].documentComment, // 6.11
                    // Information for ModerationRequests
                    documentState: release._embedded['sw360:documentCreationInformation'].documentState,
                    permissions: release._embedded['sw360:documentCreationInformation'].permissions,
                    createdBy: release._embedded['sw360:documentCreationInformation'].createdBy,
                    moderators: release._embedded['sw360:documentCreationInformation'].moderators, // people who can modify the data
                }

                const SPDXPayload: SPDX = {
                    spdxDocument: release._embedded['sw360:spdxDocument'],
                    documentCreationInformation: documentCreationInfomation,
                    packageInformation: release._embedded['sw360:packageInformation'],
                }
                setSPDXPayload(SPDXPayload)
                setRelease(release)
                setDeletingRelease(releaseId)
                setComponentId(CommonUtils.getIdFromUrl(release['_links']['sw360:component']['href']))

                if (release.componentType === 'COTS' && SPDX_ENABLE !== 'true') {
                    setTabList(ReleaseEditTabs.WITH_COMMERCIAL_DETAILS)
                }

                if (release.componentType === 'COTS' && SPDX_ENABLE === 'true') {
                    setTabList(ReleaseEditTabs.WITH_COMMERCIAL_DETAILS_AND_SPDX)
                }

                if (release.componentType !== 'COTS' && SPDX_ENABLE === 'true') {
                    setTabList(ReleaseEditTabs.WITH_SPDX)
                }

                if (typeof release.eccInformation !== 'undefined') {
                    const eccInformation: ECCInformation = release.eccInformation
                    setEccInformation(eccInformation)
                }

                if (typeof release['_embedded']['sw360:cotsDetail'] !== 'undefined') {
                    const cotsDetails: COTSDetails = release['_embedded']['sw360:cotsDetail']
                    const cotsResponsible: ComponentOwner = {
                        email: cotsDetails._embedded['sw360:cotsResponsible'].email,
                        fullName: cotsDetails._embedded['sw360:cotsResponsible'].fullName,
                    }
                    setCotsResponsible(cotsResponsible)
                    setCotsDetails(cotsDetails)
                }

                if (typeof release.clearingInformation !== 'undefined') {
                    const clearingInformation: ClearingInformation = release.clearingInformation
                    setClearingInformation(clearingInformation)
                }
            } catch (e) {
                console.error(e)
            }
        })()

        return () => controller.abort()
    }, [params, session, releaseId])

    const [releasePayload, setReleasePayload] = useState<Release>({
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
        cotsDetails: null,
        attachmentDTOs: null,
        spdxId: '',
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

    const [toastData, setToastData] = useState<ToastData>({
        show: false,
        type: '',
        message: '',
        contextual: '',
    })

    const alert = (show_data: boolean, status_type: string, message: string, contextual: string) => {
        setToastData({
            show: show_data,
            type: status_type,
            message: message,
            contextual: contextual,
        })
    }

    const [errorLicenseIdentifier, setErrorLicenseIdentifier] = useState(false)
    const [errorExtractedText, setErrorExtractedText] = useState(false)
    const [errorCreator, setErrorCreator] = useState(false)
    const [inputValid, setInputValid] = useState(false)

    const validateCreator = (SPDXPayload: SPDX): boolean => {
        if (CommonUtils.isNullEmptyOrUndefinedArray(SPDXPayload.documentCreationInformation.creator)) {
            setErrorCreator(true)
            return true
        }
        return false
    }

    const validateLicenseIdentifier = (SPDXPayload: SPDX): boolean => {
        if (CommonUtils.isNullEmptyOrUndefinedArray(SPDXPayload.spdxDocument.otherLicensingInformationDetecteds)) {
            return false
        }
        let validate: boolean = false

        SPDXPayload.spdxDocument.otherLicensingInformationDetecteds?.map((item) => {
            if (CommonUtils.isNullEmptyOrUndefinedString(item.licenseId) || item.licenseId === 'LicenseRef-') {
                setErrorLicenseIdentifier(true)
                validate = true
            }
        })
        return validate
    }

    const validateExtractedText = (SPDXPayload: SPDX): boolean => {
        if (CommonUtils.isNullEmptyOrUndefinedArray(SPDXPayload.spdxDocument.otherLicensingInformationDetecteds)) {
            return false
        }
        let validate: boolean = false
        SPDXPayload.spdxDocument.otherLicensingInformationDetecteds?.map((item) => {
            if (CommonUtils.isNullEmptyOrUndefinedString(item.extractedText)) {
                setErrorExtractedText(true)
                validate = true
            }
        })
        return validate
    }

    const submit = async () => {
        if (SPDX_ENABLE === 'true') {
            setInputValid(true)
            if (validateLicenseIdentifier(SPDXPayload) && validateExtractedText(SPDXPayload)) {
                setErrorLicenseIdentifier(true)
                setErrorExtractedText(true)
            }
            if (
                validateLicenseIdentifier(SPDXPayload) ||
                validateExtractedText(SPDXPayload) ||
                validateCreator(SPDXPayload)
            ) {
                return
            } else {
                const responseUpdateSPDX = await ApiUtils.PATCH(
                    `releases/${releaseId}/spdx`,
                    SPDXPayload,
                    session.user.access_token
                )
                if (responseUpdateSPDX.status == HttpStatus.OK) {
                    alert(true, 'Success', `Success: SPDX updated successfully!`, 'success')
                }
            }
        }

        if (
            !validateLicenseIdentifier(SPDXPayload) &&
            !validateExtractedText(SPDXPayload) &&
            !validateCreator(SPDXPayload)
        ) {
            const response = await ApiUtils.PATCH(`releases/${releaseId}`, releasePayload, session.user.access_token)
            if (response.status == HttpStatus.OK) {
                const release = (await response.json()) as ReleaseDetail
                alert(
                    true,
                    'Success',
                    `Success: Release ${release.name} (${release.version})  updated successfully!`,
                    'success'
                )
                const releaseId: string = CommonUtils.getIdFromUrl(release._links.self.href)
                router.push('/components/releases/detail/' + releaseId)
            } else {
                alert(true, 'Error', t('Release Create failed'), 'danger')
            }
        }
    }

    const handleDeleteRelease = () => {
        setDeleteModalOpen(true)
    }

    const headerButtons = {
        'Update Release': { link: '', type: 'primary', onClick: submit, name: t('Update Release') },
        'Delete Release': {
            link: '',
            type: 'danger',
            onClick: handleDeleteRelease,
            name: t('Delete Release'),
        },
        Cancel: { link: '/components/releases/detail/' + releaseId, type: 'secondary', name: t('Cancel') },
    }

    return (
        release && (
            <div className='container page-content'>
                <div className='row'>
                    <div className='col-2 sidebar'>
                        <SideBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} tabList={tabList} />
                    </div>
                    <div className='col'>
                        <div className='row' style={{ marginBottom: '20px' }}>
                            <PageButtonHeader buttons={headerButtons} title={release.name}></PageButtonHeader>
                        </div>
                        <DeleteReleaseModal
                            actionType={ActionType.EDIT}
                            componentId={componentId}
                            releaseId={deletingRelease}
                            show={deleteModalOpen}
                            setShow={setDeleteModalOpen}
                        />
                        <ToastContainer position='top-start'>
                            <ToastMessage
                                show={toastData.show}
                                type={toastData.type}
                                message={toastData.message}
                                contextual={toastData.contextual}
                                onClose={() => setToastData({ ...toastData, show: false })}
                                setShowToast={setToastData}
                            />
                        </ToastContainer>
                        <div className='row' hidden={selectedTab !== CommonTabIds.SUMMARY ? true : false}>
                            <ReleaseEditSummary
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
                                cotsDetails={cotsDetails}
                                eccInformation={eccInformation}
                                clearingInformation={clearingInformation}
                            />
                        </div>
                        {SPDX_ENABLE === 'true' && (
                            <div className='row' hidden={selectedTab !== ReleaseTabIds.SPDX_DOCUMENT ? true : false}>
                                <EditSPDXDocument
                                    releaseId={releaseId}
                                    SPDXPayload={SPDXPayload}
                                    setSPDXPayload={setSPDXPayload}
                                    errorLicenseIdentifier={errorLicenseIdentifier}
                                    setErrorLicenseIdentifier={setErrorLicenseIdentifier}
                                    errorExtractedText={errorExtractedText}
                                    setErrorExtractedText={setErrorExtractedText}
                                    errorCreator={errorCreator}
                                    setErrorCreator={setErrorCreator}
                                    inputValid={inputValid}
                                />
                            </div>
                        )}
                        <div className='row' hidden={selectedTab !== ReleaseTabIds.LINKED_RELEASES ? true : false}>
                            <LinkedReleases
                                actionType={ActionType.EDIT}
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
                                documentId={releaseId}
                                documentType={DocumentTypes.RELEASE}
                                releasePayload={releasePayload}
                                setReleasePayload={setReleasePayload}
                            />
                        </div>
                        <div className='row' hidden={selectedTab != ReleaseTabIds.COMMERCIAL_DETAILS ? true : false}>
                            <AddCommercialDetails
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
