import CheckSum from './CheckSum'

interface ExternalDocumentReferences {
    externalDocumentId: string
    checksum: CheckSum
    spdxDocument: string
    index: number
}

export default ExternalDocumentReferences
