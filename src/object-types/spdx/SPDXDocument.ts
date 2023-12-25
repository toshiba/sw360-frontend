import Annotations from './Annotations'
import DocumentState from './DocumentState'
import OtherLicensingInformationDetected from './OtherLicensingInformationDetected'
import RelationshipsBetweenSPDXElements from './RelationshipsBetweenSPDXElements'
import RequestedAction from './RequestedAction'
import SnippetInformation from './SnippetInformation'

interface SPDXDocument {
    id: string
    releaseId: string // Id of the parent release
    spdxDocumentCreationInfoId: string // Id of Document Creation Info
    spdxPackageInfoIds: Array<string> // Ids of Package Info
    spdxFileInfoIds: Array<string> // Ids of File Info
    snippets: Array<SnippetInformation> // 9. Snippet Information
    relationships: Array<RelationshipsBetweenSPDXElements> // 11. Relationships
    annotations: Array<Annotations> // 12. Annotations
    otherLicensingInformationDetecteds: Array<OtherLicensingInformationDetected> // 10. Other Licensing Information Detected
    // Information for ModerationRequests
    documentState: DocumentState
    permissions: Map<RequestedAction, boolean>
    createdBy: string
    moderators: Array<string> // people who can modify the data
}

export default SPDXDocument
