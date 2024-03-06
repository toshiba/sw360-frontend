// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'
// import { HttpStatus, Release, ReleaseDetail } from '@/object-types'
import { HttpStatus, ReleaseDetail } from '@/object-types'
import CommonUtils from '@/utils/common.utils'
import { ApiUtils } from '@/utils/index'
import { signOut, useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useState } from 'react'
import Annotations from '../../../../../../object-types/spdx/Annotations'
import DocumentCreationInformation from '../../../../../../object-types/spdx/DocumentCreationInformation'
import ExternalDocumentReferences from '../../../../../../object-types/spdx/ExternalDocumentReferences'
import ExternalReference from '../../../../../../object-types/spdx/ExternalReference'
import OtherLicensingInformationDetected from '../../../../../../object-types/spdx/OtherLicensingInformationDetected'
import PackageInformation from '../../../../../../object-types/spdx/PackageInformation'
import RelationshipsBetweenSPDXElements from '../../../../../../object-types/spdx/RelationshipsBetweenSPDXElements'
import SPDX from '../../../../../../object-types/spdx/SPDX'
import SnippetInformation from '../../../../../../object-types/spdx/SnippetInformation'
import styles from './spdx/CssButton.module.css'
import EditAnnotationInformation from './spdx/EditAnnotationInformation'
import EditDocumentCreationInformation from './spdx/EditDocumentCreationInformation'
import EditOtherLicensingInformationDetected from './spdx/EditOtherLicensingInformationDetected'
import EditPackageInformation from './spdx/EditPackageInformation'
import EditRelationshipbetweenSPDXElementsInformation from './spdx/EditRelationshipbetweenSPDXElementsInformation'
import EditSnippetInformation from './spdx/EditSnippetInformation'

interface Props {
    releaseId: string
    SPDXPayload?: SPDX
    setSPDXPayload?: React.Dispatch<React.SetStateAction<SPDX>>
}

const EditSPDXDocument = ({ releaseId, SPDXPayload, setSPDXPayload }: Props) => {
    const t = useTranslations('default')
    const [documentCreationInformation, setDocumentCreationInformation] = useState<DocumentCreationInformation>()
    const [packageInformation, setPackageInformation] = useState<PackageInformation>()
    const [externalDocumentRefs, setExternalDocumentRefs] = useState<ExternalDocumentReferences[]>([])
    const [indexExternalRefsData, setIndexExternalRefsData] = useState(0)
    const [externalRefsDatas, setExternalRefsDatas] = useState<ExternalReference[]>([])
    const [indexSnippetInformation, setIndexSnippetInformation] = useState(0)
    const [indexExternalDocumentRef, setIndexExternalDocumentRef] = useState(0)
    const [snippetInformations, setSnippetInformations] = useState<SnippetInformation[]>([])
    const [indexOtherLicense, setIndexOtherLicense] = useState(0)
    const [otherLicensingInformationDetecteds, setOtherLicensingInformationDetecteds] = useState<
        OtherLicensingInformationDetected[]
    >([])

    const [indexRelation, setIndexRelation] = useState(0)
    const [relationshipsBetweenSPDXElementSPDXs, setRelationshipsBetweenSPDXElementSPDXs] = useState<
        RelationshipsBetweenSPDXElements[]
    >([])
    const [relationshipsBetweenSPDXElementPackages, setRelationshipsBetweenSPDXElementPackages] = useState<
        RelationshipsBetweenSPDXElements[]
    >([])

    const [indexAnnotations, setIndexAnnotations] = useState(0)
    const [annotationsSPDXs, setAnnotationsSPDXs] = useState<Annotations[]>([])
    const [annotationsPackages, setAnnotationsPackages] = useState<Annotations[]>([])

    const [isModeFull, setIsModeFull] = useState(true)

    const { data: session } = useSession()

    const fetchData = useCallback(
        async (url: string) => {
            const response = await ApiUtils.GET(url, session.user.access_token)
            if (response.status == HttpStatus.OK) {
                const data = (await response.json()) as ReleaseDetail
                return data
            } else if (response.status == HttpStatus.UNAUTHORIZED) {
                return signOut()
            } else {
                return null
            }
        },
        [session]
    )
    const [typeCategory, setTypeCategory] = useState<Array<string>>()
    const [isTypeCateGoryEmpty, setIsTypeCateGoryEmpty] = useState(true)
    useEffect(() => {
        fetchData(`releases/${releaseId}`)
            .then((release: ReleaseDetail) => {
                //SPDX Document
                if (
                    !CommonUtils.isNullOrUndefined(release._embedded) &&
                    !CommonUtils.isNullOrUndefined(release._embedded['sw360:spdxDocument'])
                ) {
                    //SnippetInformation
                    if (!CommonUtils.isNullEmptyOrUndefinedArray(release._embedded['sw360:spdxDocument'].snippets)) {
                        setSnippetInformations(
                            release._embedded['sw360:spdxDocument'].snippets.toSorted((e1, e2) => e1.index - e2.index)
                        )
                        setIndexSnippetInformation(0)
                    }
                    //OtherLicensingInformationDetected
                    if (
                        !CommonUtils.isNullEmptyOrUndefinedArray(
                            release._embedded['sw360:spdxDocument'].otherLicensingInformationDetecteds
                        )
                    ) {
                        setOtherLicensingInformationDetecteds(
                            release._embedded['sw360:spdxDocument'].otherLicensingInformationDetecteds.toSorted(
                                (e1, e2) => e1.index - e2.index
                            )
                        )
                        setIndexOtherLicense(0)
                    }
                    // RelationshipsBetweenSPDXElements
                    if (
                        !CommonUtils.isNullEmptyOrUndefinedArray(release._embedded['sw360:spdxDocument'].relationships)
                    ) {
                        setRelationshipsBetweenSPDXElementSPDXs(
                            release._embedded['sw360:spdxDocument'].relationships.toSorted(
                                (e1, e2) => e1.index - e2.index
                            )
                        )
                        setIndexRelation(0)
                    }
                    //Annotations
                    if (!CommonUtils.isNullEmptyOrUndefinedArray(release._embedded['sw360:spdxDocument'].annotations)) {
                        setIndexAnnotations(0)
                        setAnnotationsSPDXs(
                            release._embedded['sw360:spdxDocument'].annotations.toSorted(
                                (e1, e2) => e1.index - e2.index
                            )
                        )
                    }
                }

                // DocumentCreationInformation
                if (
                    !CommonUtils.isNullOrUndefined(release._embedded) &&
                    !CommonUtils.isNullOrUndefined(release._embedded['sw360:documentCreationInformation'])
                ) {
                    setDocumentCreationInformation(release._embedded['sw360:documentCreationInformation'])
                    // ExternalDocumentRefs
                    if (
                        !CommonUtils.isNullEmptyOrUndefinedArray(
                            release._embedded['sw360:documentCreationInformation'].externalDocumentRefs
                        )
                    ) {
                        setExternalDocumentRefs(
                            release._embedded['sw360:documentCreationInformation'].externalDocumentRefs.toSorted(
                                (e1, e2) => e1.index - e2.index
                            )
                        )
                        setIndexExternalDocumentRef(0)
                    }
                }

                // PackageInformation
                if (
                    !CommonUtils.isNullOrUndefined(release._embedded) &&
                    !CommonUtils.isNullOrUndefined(release._embedded['sw360:packageInformation'])
                ) {
                    setPackageInformation(release._embedded['sw360:packageInformation'])
                    if (
                        !CommonUtils.isNullEmptyOrUndefinedArray(
                            release._embedded['sw360:packageInformation'].relationships
                        )
                    ) {
                        setIndexRelation(0)
                        setRelationshipsBetweenSPDXElementPackages(
                            release._embedded['sw360:packageInformation'].relationships.toSorted(
                                (e1, e2) => e1.index - e2.index
                            )
                        )
                    }
                    if (
                        !CommonUtils.isNullEmptyOrUndefinedArray(
                            release._embedded['sw360:packageInformation'].annotations
                        )
                    ) {
                        setIndexAnnotations(0)
                        setAnnotationsPackages(
                            release._embedded['sw360:packageInformation'].annotations.toSorted(
                                (e1, e2) => e1.index - e2.index
                            )
                        )
                    }
                    if (
                        !CommonUtils.isNullEmptyOrUndefinedArray(
                            release._embedded['sw360:packageInformation'].externalRefs
                        )
                    ) {
                        setExternalRefsDatas(
                            release._embedded['sw360:packageInformation'].externalRefs.toSorted(
                                (e1, e2) => e1.index - e2.index
                            )
                        )
                        if (externalRefsDatas[0].referenceCategory === 'SECURITY') {
                            setTypeCategory(['cpe22Type', 'cpe23Type', 'advisory', 'fix', 'url', 'swid'])
                            setIsTypeCateGoryEmpty(false)
                        } else if (externalRefsDatas[0].referenceCategory === 'PACKAGE-MANAGER') {
                            setTypeCategory(['maven-central', 'npm', 'nuget', 'bower', 'purl'])
                            setIsTypeCateGoryEmpty(false)
                        } else {
                            setTypeCategory([])
                            setIsTypeCateGoryEmpty(true)
                        }
                        setIndexExternalRefsData(0)
                    }
                }
            })
            .catch((err) => console.error(err))
    }, [fetchData, releaseId, setSPDXPayload])

    const changeModeFull = () => {
        setIsModeFull(true)
    }

    const changeModeLite = () => {
        setIsModeFull(false)
    }

    return (
        <>
            <div className='list-group-companion' data-belong-to='tab-Attachments'>
                <div className='btn-group'>
                    <button
                        className={`btn ${isModeFull ? styles['btn-full'] : styles['btn-lite']}`}
                        onClick={changeModeFull}
                    >
                        {t('SPDX FULL')}
                    </button>
                    <button
                        className={`btn ${isModeFull ? styles['btn-lite'] : styles['btn-full']}`}
                        onClick={changeModeLite}
                    >
                        {t('SPDX LITE')}
                    </button>
                </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            {isModeFull ? (
                <div className='col'>
                    <EditDocumentCreationInformation
                        isModeFull={isModeFull}
                        documentCreationInformation={documentCreationInformation}
                        setDocumentCreationInformation={setDocumentCreationInformation}
                        setIndexExternalDocumentRef={setIndexExternalDocumentRef}
                        indexExternalDocumentRef={indexExternalDocumentRef}
                        externalDocumentRefs={externalDocumentRefs}
                        setExternalDocumentRefs={setExternalDocumentRefs}
                        SPDXPayload={SPDXPayload}
                        setSPDXPayload={setSPDXPayload}
                    />
                    <EditPackageInformation
                        isModeFull={isModeFull}
                        packageInformation={packageInformation}
                        setPackageInformation={setPackageInformation}
                        setIndexExternalRefsData={setIndexExternalRefsData}
                        indexExternalRefsData={indexExternalRefsData}
                        externalRefsDatas={externalRefsDatas}
                        setExternalRefsDatas={setExternalRefsDatas}
                        setTypeCategory={setTypeCategory}
                        typeCategory={typeCategory}
                        isTypeCateGoryEmpty={isTypeCateGoryEmpty}
                        setIsTypeCateGoryEmpty={setIsTypeCateGoryEmpty}
                        SPDXPayload={SPDXPayload}
                        setSPDXPayload={setSPDXPayload}
                    />
                    <EditSnippetInformation
                        snippetInformations={snippetInformations}
                        setSnippetInformations={setSnippetInformations}
                        indexSnippetInformation={indexSnippetInformation}
                        setIndexSnippetInformation={setIndexSnippetInformation}
                        SPDXPayload={SPDXPayload}
                        setSPDXPayload={setSPDXPayload}
                    />
                    <EditOtherLicensingInformationDetected
                        isModeFull={isModeFull}
                        indexOtherLicense={indexOtherLicense}
                        setIndexOtherLicense={setIndexOtherLicense}
                        otherLicensingInformationDetecteds={otherLicensingInformationDetecteds}
                        setOtherLicensingInformationDetecteds={setOtherLicensingInformationDetecteds}
                        SPDXPayload={SPDXPayload}
                        setSPDXPayload={setSPDXPayload}
                    />
                    <EditRelationshipbetweenSPDXElementsInformation
                        indexRelation={indexRelation}
                        setIndexRelation={setIndexRelation}
                        relationshipsBetweenSPDXElementSPDXs={relationshipsBetweenSPDXElementSPDXs}
                        setRelationshipsBetweenSPDXElementSPDXs={setRelationshipsBetweenSPDXElementSPDXs}
                        relationshipsBetweenSPDXElementPackages={relationshipsBetweenSPDXElementPackages}
                        setRelationshipsBetweenSPDXElementPackages={setRelationshipsBetweenSPDXElementPackages}
                        SPDXPayload={SPDXPayload}
                        setSPDXPayload={setSPDXPayload}
                    />
                    <EditAnnotationInformation
                        indexAnnotations={indexAnnotations}
                        setIndexAnnotations={setIndexAnnotations}
                        annotationsSPDXs={annotationsSPDXs}
                        setAnnotationsSPDXs={setAnnotationsSPDXs}
                        annotationsPackages={annotationsPackages}
                        setAnnotationsPackages={setAnnotationsPackages}
                        SPDXPayload={SPDXPayload}
                        setSPDXPayload={setSPDXPayload}
                    />
                </div>
            ) : (
                <div className='col'>
                    <EditDocumentCreationInformation
                        isModeFull={isModeFull}
                        documentCreationInformation={documentCreationInformation}
                        setDocumentCreationInformation={setDocumentCreationInformation}
                        setIndexExternalDocumentRef={setIndexExternalDocumentRef}
                        indexExternalDocumentRef={indexExternalDocumentRef}
                        externalDocumentRefs={externalDocumentRefs}
                        setExternalDocumentRefs={setExternalDocumentRefs}
                        SPDXPayload={SPDXPayload}
                        setSPDXPayload={setSPDXPayload}
                    />
                    <EditPackageInformation
                        isModeFull={isModeFull}
                        packageInformation={packageInformation}
                        setPackageInformation={setPackageInformation}
                        setIndexExternalRefsData={setIndexExternalRefsData}
                        indexExternalRefsData={indexExternalRefsData}
                        externalRefsDatas={externalRefsDatas}
                        setExternalRefsDatas={setExternalRefsDatas}
                        setTypeCategory={setTypeCategory}
                        typeCategory={typeCategory}
                        isTypeCateGoryEmpty={isTypeCateGoryEmpty}
                        setIsTypeCateGoryEmpty={setIsTypeCateGoryEmpty}
                        SPDXPayload={SPDXPayload}
                        setSPDXPayload={setSPDXPayload}
                    />
                    <EditOtherLicensingInformationDetected
                        isModeFull={isModeFull}
                        indexOtherLicense={indexOtherLicense}
                        setIndexOtherLicense={setIndexOtherLicense}
                        otherLicensingInformationDetecteds={otherLicensingInformationDetecteds}
                        setOtherLicensingInformationDetecteds={setOtherLicensingInformationDetecteds}
                        SPDXPayload={SPDXPayload}
                        setSPDXPayload={setSPDXPayload}
                    />
                </div>
            )}
        </>
    )
}

export default EditSPDXDocument
