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
import { useCallback, useEffect, useState } from 'react'
import ReleaseDetail from '../../../../../../../../object-types/ReleaseDetail'
import HttpStatus from '../../../../../../../../object-types/enums/HttpStatus'
import DocumentCreationInformation from '../../../../../../../../object-types/spdx/DocumentCreationInformation'
import PackageInformation from '../../../../../../../../object-types/spdx/PackageInformation'
import SPDXDocument from '../../../../../../../../object-types/spdx/SPDXDocument'
import SnippetInformationDetail from './ SnippetInformation'
import AnnotationInformation from './AnnotationInformation'
import DocumentCreationInformationDetail from './DocumentCreationInformation'
import OtherLicensingInformationDetectedDetail from './OtherLicensingInformationDetectedDetail'
import PackageInformationDetail from './PackageInformationDetail'
import RelationshipbetweenSPDXElementsInformation from './RelationshipbetweenSPDXElementsInformation'

interface Props {
    releaseId: string
}

const SPDXDocument = ({ releaseId }: Props) => {
    const [spdxDocument, setSPDXDocument] = useState<SPDXDocument>()
    const [documentCreationInformation, setDocumentCreationInformation] = useState<DocumentCreationInformation>()
    const [packageInformation, setPackageInformation] = useState<PackageInformation>()
    // const [snippetInformations, setSnippetInformations] = useState<SnippetInformation>()
    // const [otherLicensingInformationDetecteds, setOtherLicensingInformationDetected] = useState<OtherLicensingInformationDetected>()
    // const [relationshipsBetweenSPDXElements, setRelationshipsBetweenSPDXElements] = useState<RelationshipsBetweenSPDXElements>()
    // const [annotations, setAnnotations] = useState<Annotations>()

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
                }

                // DocumentCreationInformation
                if (
                    !CommonUtils.isNullOrUndefined(release._embedded) &&
                    !CommonUtils.isNullOrUndefined(release._embedded['sw360:documentCreationInformation'])
                ) {
                    setDocumentCreationInformation(release._embedded['sw360:documentCreationInformation'])
                }

                // PackageInformation
                if (
                    !CommonUtils.isNullOrUndefined(release._embedded) &&
                    !CommonUtils.isNullOrUndefined(release._embedded['sw360:packageInformation'])
                ) {
                    setPackageInformation(release._embedded['sw360:packageInformation'])
                }
            })
            .catch((err) => console.error(err))
    }, [fetchData, releaseId])

    return (
        <div className='col'>
            <DocumentCreationInformationDetail documentCreationInformation={documentCreationInformation} />
            <PackageInformationDetail packageInformation={packageInformation} />
            <SnippetInformationDetail spdxDocument={spdxDocument} />
            <OtherLicensingInformationDetectedDetail spdxDocument={spdxDocument} />
            <RelationshipbetweenSPDXElementsInformation
                spdxDocument={spdxDocument}
                packageInformation={packageInformation}
            />
            <AnnotationInformation spdxDocument={spdxDocument} packageInformation={packageInformation} />
        </div>
    )
}

export default SPDXDocument
