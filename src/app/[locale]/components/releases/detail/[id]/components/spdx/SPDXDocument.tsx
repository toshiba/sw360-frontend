// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import CommonUtils from '@/utils/common.utils'
import { ApiUtils } from '@/utils/index'
import { signOut, useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useState } from 'react'
import ReleaseDetail from '../../../../../../../../object-types/ReleaseDetail'
import HttpStatus from '../../../../../../../../object-types/enums/HttpStatus'
import Annotations from '../../../../../../../../object-types/spdx/Annotations'
import DocumentCreationInformation from '../../../../../../../../object-types/spdx/DocumentCreationInformation'
import ExternalDocumentReferences from '../../../../../../../../object-types/spdx/ExternalDocumentReferences'
import ExternalReference from '../../../../../../../../object-types/spdx/ExternalReference'
import OtherLicensingInformationDetected from '../../../../../../../../object-types/spdx/OtherLicensingInformationDetected'
import PackageInformation from '../../../../../../../../object-types/spdx/PackageInformation'
import RelationshipsBetweenSPDXElements from '../../../../../../../../object-types/spdx/RelationshipsBetweenSPDXElements'
import SPDXDocument from '../../../../../../../../object-types/spdx/SPDXDocument'
import SnippetInformation from '../../../../../../../../object-types/spdx/SnippetInformation'
import SnippetInformationDetail from './ SnippetInformation'
import AnnotationInformation from './AnnotationInformation'
import styles from './CssButton.module.css'
import DocumentCreationInformationDetail from './DocumentCreationInformation'
import OtherLicensingInformationDetectedDetail from './OtherLicensingInformationDetectedDetail'
import PackageInformationDetail from './PackageInformationDetail'
import RelationshipbetweenSPDXElementsInformation from './RelationshipbetweenSPDXElementsInformation'

interface Props {
    releaseId: string
}

const SPDXDocument = ({ releaseId }: Props) => {
    const t = useTranslations('default')
    const [spdxDocument, setSPDXDocument] = useState<SPDXDocument>()
    const [documentCreationInformation, setDocumentCreationInformation] = useState<DocumentCreationInformation>()
    const [packageInformation, setPackageInformation] = useState<PackageInformation>()
    // const [snippetInformations, setSnippetInformations] = useState<SnippetInformation>()
    // const [otherLicensingInformationDetecteds, setOtherLicensingInformationDetected] = useState<OtherLicensingInformationDetected>()
    // const [relationshipsBetweenSPDXElements, setRelationshipsBetweenSPDXElements] = useState<RelationshipsBetweenSPDXElements>()
    // const [annotations, setAnnotations] = useState<Annotations>()
    const [externalDocumentRef, setExternalDocumentRef] = useState<ExternalDocumentReferences>()
    const [externalRefsData, setExternalRefsData] = useState<ExternalReference>()
    const [snippetInformation, setSnippetInformation] = useState<SnippetInformation>()
    const [otherLicensingInformationDetected, setOtherLicensingInformationDetected] =
        useState<OtherLicensingInformationDetected>()

    const [relationshipsBetweenSPDXElements, setRelationshipsBetweenSPDXElements] =
        useState<RelationshipsBetweenSPDXElements>()
    const [indexRelationShip, setIndexRelationShip] = useState<Array<RelationshipsBetweenSPDXElements>>()

    const [annotations, setAnnotations] = useState<Annotations>()
    const [indexAnnotations, setIndexAnnotations] = useState<Array<Annotations>>()

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

    useEffect(() => {
        fetchData(`releases/${releaseId}`)
            .then((release: ReleaseDetail) => {
                //SPDX Document
                if (
                    !CommonUtils.isNullOrUndefined(release._embedded) &&
                    !CommonUtils.isNullOrUndefined(release._embedded['sw360:spdxDocument'])
                ) {
                    setSPDXDocument(release._embedded['sw360:spdxDocument'])
                    //SnippetInformation
                    if (!CommonUtils.isNullEmptyOrUndefinedArray(release._embedded['sw360:spdxDocument'].snippets)) {
                        setSnippetInformation(release._embedded['sw360:spdxDocument'].snippets[0])
                    }
                    //OtherLicensingInformationDetected
                    if (
                        !CommonUtils.isNullEmptyOrUndefinedArray(
                            release._embedded['sw360:spdxDocument'].otherLicensingInformationDetecteds
                        )
                    ) {
                        setOtherLicensingInformationDetected(
                            release._embedded['sw360:spdxDocument'].otherLicensingInformationDetecteds[0]
                        )
                    }
                    //RelationshipsBetweenSPDXElements
                    if (
                        !CommonUtils.isNullEmptyOrUndefinedArray(release._embedded['sw360:spdxDocument'].relationships)
                    ) {
                        setRelationshipsBetweenSPDXElements(release._embedded['sw360:spdxDocument'].relationships[0])
                        setIndexRelationShip(release._embedded['sw360:spdxDocument'].relationships)
                    }
                    //Annotations
                    if (!CommonUtils.isNullEmptyOrUndefinedArray(release._embedded['sw360:spdxDocument'].annotations)) {
                        setAnnotations(release._embedded['sw360:spdxDocument'].annotations[0])
                        setIndexAnnotations(release._embedded['sw360:spdxDocument'].annotations)
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
                        setExternalDocumentRef(
                            release._embedded['sw360:documentCreationInformation'].externalDocumentRefs[0]
                        )
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
                            release._embedded['sw360:packageInformation'].externalRefs
                        )
                    ) {
                        setExternalRefsData(release._embedded['sw360:packageInformation'].externalRefs[0])
                    }
                }
            })
            .catch((err) => console.error(err))
    }, [fetchData, releaseId])

    return (
        <>
            <div className='list-group-companion' data-belong-to='tab-Attachments'>
                <div className='btn-group'>
                    <button className={`${styles['btn-info']}`}>{t('SPDX FULL')}</button>
                    <button className='btn btn-secondary'>{t('SPDX LITE')}</button>
                </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <div className='col'>
                <DocumentCreationInformationDetail
                    documentCreationInformation={documentCreationInformation}
                    externalDocumentRef={externalDocumentRef}
                    setExternalDocumentRef={setExternalDocumentRef}
                />
                <PackageInformationDetail
                    packageInformation={packageInformation}
                    externalRefsData={externalRefsData}
                    setExternalRefsData={setExternalRefsData}
                />
                <SnippetInformationDetail
                    spdxDocument={spdxDocument}
                    snippetInformation={snippetInformation}
                    setSnippetInformation={setSnippetInformation}
                />
                <OtherLicensingInformationDetectedDetail
                    spdxDocument={spdxDocument}
                    otherLicensingInformationDetected={otherLicensingInformationDetected}
                    setOtherLicensingInformationDetected={setOtherLicensingInformationDetected}
                />
                <RelationshipbetweenSPDXElementsInformation
                    spdxDocument={spdxDocument}
                    packageInformation={packageInformation}
                    relationshipsBetweenSPDXElements={relationshipsBetweenSPDXElements}
                    setRelationshipsBetweenSPDXElements={setRelationshipsBetweenSPDXElements}
                    indexRelationShip={indexRelationShip}
                    setIndexRelationShip={setIndexRelationShip}
                />
                <AnnotationInformation
                    spdxDocument={spdxDocument}
                    packageInformation={packageInformation}
                    annotations={annotations}
                    setAnnotations={setAnnotations}
                    indexAnnotations={indexAnnotations}
                    setIndexAnnotations={setIndexAnnotations}
                />
            </div>
        </>
    )
}

export default SPDXDocument
