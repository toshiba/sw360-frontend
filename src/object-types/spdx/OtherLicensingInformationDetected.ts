interface OtherLicensingInformationDetected {
    licenseId: string // 10.1
    extractedText: string // 10.2
    licenseName: string // 10.3
    licenseCrossRefs: Array<string> // 10.4
    licenseComment: string // 10.5
    index: number
}

export default OtherLicensingInformationDetected
