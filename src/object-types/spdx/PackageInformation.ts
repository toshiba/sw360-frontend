import Annotations from './Annotations'
import CheckSum from './CheckSum'
import DocumentState from './DocumentState'
import ExternalReference from './ExternalReference'
import PackageVerificationCode from './PackageVerificationCode'
import RelationshipsBetweenSPDXElements from './RelationshipsBetweenSPDXElements'
import RequestedAction from './RequestedAction'

interface PackageInformation {
    id: string
    spdxDocumentId: string // Id of the parent SPDX Document
    name: string // 7.1
    SPDXID: string // 7.2
    versionInfo: string // 7.3
    packageFileName: string // 7.4
    supplier: string // 7.5
    originator: string // 7.6
    downloadLocation: string // 7.7
    filesAnalyzed: boolean // 7.8
    packageVerificationCode: PackageVerificationCode // 7.9
    checksums: Array<CheckSum> // 7.10
    homepage: string // 7.11
    sourceInfo: string // 7.12
    licenseConcluded: string // 7.13
    licenseInfoFromFiles: Array<string> // 7.14
    licenseDeclared: string // 7.15
    licenseComments: string // 7.16
    copyrightText: string // 7.17
    summary: string // 7.18
    description: string // 7.19
    packageComment: string // 7.20
    externalRefs: Array<ExternalReference> //7.21
    attributionText: Array<string> // 7.22
    annotations: Array<Annotations> // 7.23
    primaryPackagePurpose: string // 7.24
    releaseDate: string // 7.25
    builtDate: string // 7.26
    validUntilDate: string // 7.27
    // Information for ModerationRequests
    documentState: DocumentState
    permissions: Map<RequestedAction, boolean>
    createdBy: string
    index: number
    relationships: Array<RelationshipsBetweenSPDXElements> // 11. Relationships
    moderators: Array<string> // people who can modify the data
}

export default PackageInformation
