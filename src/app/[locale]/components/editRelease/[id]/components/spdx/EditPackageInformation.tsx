// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'
import CommonUtils from '@/utils/common.utils'
import { useEffect, useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import InputKeyValue from '../../../../../../../object-types/InputKeyValue'
import CheckSum from '../../../../../../../object-types/spdx/CheckSum'
import ExternalReference from '../../../../../../../object-types/spdx/ExternalReference'
import PackageInformation from '../../../../../../../object-types/spdx/PackageInformation'
import SPDX from '../../../../../../../object-types/spdx/SPDX'
import styles from '../detail.module.css'
import CheckSums from './CheckSums'
import BuiltDate from './PackageInformation/BuiltDate'
import PackageAllLicensesInformation from './PackageInformation/PackageAllLicensesInformation'
import PackageConcludedLicense from './PackageInformation/PackageConcludedLicense'
import PackageCopyrightText from './PackageInformation/PackageCopyrightText'
import PackageDeclaredLicense from './PackageInformation/PackageDeclaredLicense'
import PackageDownloadLocation from './PackageInformation/PackageDownloadLocation'
import PackageHomePage from './PackageInformation/PackageHomePage'
import PackageOriginator from './PackageInformation/PackageOriginator'
import PackageSupplier from './PackageInformation/PackageSupplier'
import ReleaseDate from './PackageInformation/ReleaseDate'
import ValidUntilDate from './PackageInformation/ValidUntilDate'

interface Props {
    packageInformation?: PackageInformation
    setPackageInformation?: React.Dispatch<React.SetStateAction<PackageInformation>>
    isModeFull?: boolean
    externalRefsDatas?: ExternalReference[]
    setExternalRefsDatas?: React.Dispatch<React.SetStateAction<ExternalReference[]>>
    setIndexExternalRefsData?: React.Dispatch<React.SetStateAction<number>>
    indexExternalRefsData?: number
    setTypeCategory?: React.Dispatch<React.SetStateAction<Array<string>>>
    typeCategory?: Array<string>
    isTypeCateGoryEmpty?: boolean
    setIsTypeCateGoryEmpty?: React.Dispatch<React.SetStateAction<boolean>>
    SPDXPayload?: SPDX
    setSPDXPayload?: React.Dispatch<React.SetStateAction<SPDX>>
}

const EditPackageInformation = ({
    packageInformation,
    isModeFull,
    externalRefsDatas,
    setExternalRefsDatas,
    setPackageInformation,
    indexExternalRefsData,
    setIndexExternalRefsData,
    typeCategory,
    setTypeCategory,
    isTypeCateGoryEmpty,
    setIsTypeCateGoryEmpty,
    SPDXPayload,
    setSPDXPayload,
}: Props) => {
    const [toggle, setToggle] = useState(false)
    const [dataPackageSupplier, setDataPackageSupplier] = useState<InputKeyValue>()
    const [isPackageSupplier, setIsPackageSupplier] = useState(true)
    const handlePackageSupplier = (data: string) => {
        if (data == null) {
            const input: InputKeyValue = {
                key: '',
                value: '',
            }
            return input
        }
        if (data === 'NOASSERTION') {
            const input: InputKeyValue = {
                key: dataPackageSupplier.key,
                value: dataPackageSupplier.value,
            }
            return input
        }
        const input: InputKeyValue = {
            key: data.split(':')[0],
            value: data.split(':')[1],
        }
        return input
    }

    const handleInputKeyToPackageSupplier = (data: InputKeyValue) => {
        return data.value === 'NOASSERTION' ? 'NOASSERTION' : data.key + ':' + data.value
    }

    const setPackageSupplierToPackage = (input: InputKeyValue) => {
        setPackageInformation({
            ...packageInformation,
            supplier: handleInputKeyToPackageSupplier(input),
        })

        setSPDXPayload({
            ...SPDXPayload,
            packageInformation: {
                ...SPDXPayload.packageInformation,
                supplier: handleInputKeyToPackageSupplier(input),
            },
        })
    }

    const [dataPackageOriginator, setDataPackageOriginator] = useState<InputKeyValue>()
    const [isPackageOriginator, setIsPackageOriginator] = useState(true)

    const handlePackageOriginator = (data: string) => {
        if (data == null) {
            const input: InputKeyValue = {
                key: '',
                value: '',
            }
            return input
        }
        if (data === 'NOASSERTION') {
            const input: InputKeyValue = {
                key: dataPackageOriginator.key,
                value: dataPackageOriginator.value,
            }
            return input
        }
        const input: InputKeyValue = {
            key: data.split(':')[0],
            value: data.split(':')[1],
        }
        return input
    }

    const handleInputKeyToPackageOriginator = (data: InputKeyValue) => {
        return data.value === 'NOASSERTION' ? 'NOASSERTION' : data.key + ':' + data.value
    }

    const setPackageOriginatorToPackage = (input: InputKeyValue) => {
        setPackageInformation({
            ...packageInformation,
            originator: handleInputKeyToPackageOriginator(input),
        })
        setSPDXPayload({
            ...SPDXPayload,
            packageInformation: {
                ...SPDXPayload.packageInformation,
                originator: handleInputKeyToPackageOriginator(input),
            },
        })
    }

    const [checkSums, setCheckSums] = useState<InputKeyValue[]>([])

    const setDataCheckSums = (inputs: InputKeyValue[]) => {
        setPackageInformation({
            ...packageInformation,
            checksums: convertInputToChecksums(inputs),
        })

        setSPDXPayload({
            ...SPDXPayload,
            packageInformation: {
                ...SPDXPayload.packageInformation,
                checksums: convertInputToChecksums(inputs),
            },
        })
    }

    const convertInputToChecksums = (datas: InputKeyValue[]) => {
        if (datas === null) {
            return null
        }
        const checksums: CheckSum[] = []
        // const index: number = 0
        datas.forEach((data: InputKeyValue, index: number) => {
            const checksum: CheckSum = {
                algorithm: data.key,
                checksumValue: data.value,
                index: index,
            }
            checksums.push(checksum)
        })

        return checksums
    }
    const displayIndex = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const index: string = e.target.value
        setIndexExternalRefsData(+index)
        setNumberIndex(+index)
    }

    const handleChangeReferenceCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const referenceCategory: string = e.target.value
        const externalRefs: ExternalReference[] = externalRefsDatas.map((externalRefData, index) => {
            if (index === indexExternalRefsData) {
                return {
                    ...externalRefData,
                    [e.target.name]: e.target.value,
                }
            }
            return externalRefData
        })
        setExternalRefsDatas(externalRefs)

        if (referenceCategory === 'SECURITY') {
            setTypeCategory(['cpe22Type', 'cpe23Type', 'advisory', 'fix', 'url', 'swid'])
            setIsTypeCateGoryEmpty(false)
        } else if (referenceCategory === 'PACKAGE-MANAGER') {
            setTypeCategory(['maven-central', 'npm', 'nuget', 'bower', 'purl'])
            setIsTypeCateGoryEmpty(false)
        } else {
            setTypeCategory([])
            setIsTypeCateGoryEmpty(true)
        }
        setSPDXPayload({
            ...SPDXPayload,
            packageInformation: {
                ...SPDXPayload.packageInformation,
                externalRefs: externalRefs,
            },
        })
    }

    const handleChangeExternalRefData = (
        e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const externalRefs: ExternalReference[] = externalRefsDatas.map((externalRefData, index) => {
            if (index === indexExternalRefsData) {
                return {
                    ...externalRefData,
                    [e.target.name]: e.target.value,
                }
            }
            return externalRefData
        })
        setExternalRefsDatas(externalRefs)
        setSPDXPayload({
            ...SPDXPayload,
            packageInformation: {
                ...SPDXPayload.packageInformation,
                externalRefs: externalRefs,
            },
        })
    }

    const addReferences = () => {
        const arrayExternals: ExternalReference[] = [...externalRefsDatas]
        const externalReference: ExternalReference = {
            referenceCategory: 'OTHER',
            referenceLocator: '',
            referenceType: '',
            comment: '',
            index: externalRefsDatas.length,
        }
        arrayExternals.push(externalReference)
        setExternalRefsDatas(arrayExternals)
        setSPDXPayload({
            ...SPDXPayload,
            packageInformation: {
                ...SPDXPayload.packageInformation,
                externalRefs: arrayExternals,
            },
        })
    }

    const [packageDownloadLocation, setPackageDownloadLocation] = useState('')
    const [packageDownloadLocationExist, setPackageDownloadLocationExist] = useState(true)
    const [packageDownloadLocationNone, setPackageDownloadLocationNone] = useState(false)
    const [packageDownloadLocationNoasserttion, setPackageDownloadLocationNoasserttion] = useState(false)

    const setPackageDownloadLocationToPackage = (data: string) => {
        setPackageInformation({
            ...packageInformation,
            downloadLocation: data,
        })
        setSPDXPayload({
            ...SPDXPayload,
            packageInformation: {
                ...SPDXPayload.packageInformation,
                downloadLocation: data,
            },
        })
    }

    const [packageHomePage, setPackageHomePage] = useState('')
    const [packageHomePageExist, setPackageHomePageExist] = useState(true)
    const [packageHomePageNone, setPackageHomePageNone] = useState(false)
    const [packageHomePageNoasserttion, setPackageHomePageNoasserttion] = useState(false)

    const setPackageHomePageToPackage = (data: string) => {
        setPackageInformation({
            ...packageInformation,
            homepage: data,
        })
        setSPDXPayload({
            ...SPDXPayload,
            packageInformation: {
                ...SPDXPayload.packageInformation,
                homepage: data,
            },
        })
    }

    const [concludedLicense, setConcludedLicense] = useState('')
    const [concludedLicenseExist, setConcludedLicenseExist] = useState(true)
    const [concludedLicenseNone, setConcludedLicenseNone] = useState(false)
    const [concludedLicenseNoasserttion, setConcludedLicenseNoasserttion] = useState(false)

    const setConcludedLicenseToPackage = (data: string) => {
        setPackageInformation({
            ...packageInformation,
            licenseConcluded: data,
        })
        setSPDXPayload({
            ...SPDXPayload,
            packageInformation: {
                ...SPDXPayload.packageInformation,
                licenseConcluded: data,
            },
        })
    }

    const [allLicensesInformation, setAllLicensesInformation] = useState<Array<string>>()
    const [allLicensesInformationExist, setAllLicensesInformationExist] = useState(true)
    const [allLicensesInformationNone, setAllLicensesInformationNone] = useState(false)
    const [allLicensesInformationNoasserttion, setAllLicensesInformationNoasserttion] = useState(false)

    const setAllLicensesInformationToPackage = (data: string[]) => {
        setPackageInformation({
            ...packageInformation,
            licenseInfoFromFiles: data,
        })
        setSPDXPayload({
            ...SPDXPayload,
            packageInformation: {
                ...SPDXPayload.packageInformation,
                licenseInfoFromFiles: data,
            },
        })
    }

    const [declaredLicense, setDeclaredLicense] = useState('')
    const [declaredLicenseExist, setDeclaredLicenseExist] = useState(true)
    const [declaredLicenseNone, setDeclaredLicenseNone] = useState(false)
    const [declaredLicenseNoasserttion, setDeclaredLicenseNoasserttion] = useState(false)

    const setDeclaredLicenseToPackage = (data: string) => {
        setPackageInformation({
            ...packageInformation,
            licenseDeclared: data,
        })
        setSPDXPayload({
            ...SPDXPayload,
            packageInformation: {
                ...SPDXPayload.packageInformation,
                licenseDeclared: data,
            },
        })
    }

    const [copyrightText, setCopyrightText] = useState('')
    const [copyrightTextExist, setCopyrightTextExist] = useState(true)
    const [copyrightTextNone, setCopyrightTextNone] = useState(false)
    const [copyrightTextNoasserttion, setCopyrightTextNoasserttion] = useState(false)

    const setCopyrightTextToPackage = (data: string) => {
        setPackageInformation({
            ...packageInformation,
            copyrightText: data,
        })
        setSPDXPayload({
            ...SPDXPayload,
            packageInformation: {
                ...SPDXPayload.packageInformation,
                copyrightText: data,
            },
        })
    }

    useEffect(() => {
        if (typeof packageInformation?.checksums !== 'undefined') {
            setCheckSums(convertChecksums(packageInformation.checksums))
        }

        if (typeof packageInformation?.supplier !== 'undefined') {
            packageInformation?.supplier == 'NOASSERTION' && setIsPackageSupplier(false)
            setDataPackageSupplier(handlePackageSupplier(packageInformation.supplier))
        }

        if (typeof packageInformation?.originator !== 'undefined') {
            packageInformation?.originator == 'NOASSERTION' && setIsPackageOriginator(false)
            setDataPackageOriginator(handlePackageOriginator(packageInformation.originator))
        }

        if (typeof packageInformation?.downloadLocation !== 'undefined') {
            if (
                packageInformation.downloadLocation === 'NONE' ||
                packageInformation.downloadLocation === 'NOASSERTION'
            ) {
                const data: string = packageDownloadLocation
                setPackageDownloadLocation(data)
            } else {
                setPackageDownloadLocation(packageInformation.downloadLocation)
            }
        }

        if (typeof packageInformation?.homepage !== 'undefined') {
            if (packageInformation.homepage === 'NONE' || packageInformation.homepage === 'NOASSERTION') {
                const data: string = packageHomePage
                setPackageHomePage(data)
            } else {
                setPackageHomePage(packageInformation.homepage)
            }
        }

        if (typeof packageInformation?.licenseConcluded !== 'undefined') {
            if (
                packageInformation.licenseConcluded === 'NONE' ||
                packageInformation.licenseConcluded === 'NOASSERTION'
            ) {
                const data: string = concludedLicense
                setConcludedLicense(data)
            } else {
                setConcludedLicense(packageInformation.licenseConcluded)
            }
        }

        if (typeof packageInformation?.licenseDeclared !== 'undefined') {
            if (packageInformation.licenseDeclared === 'NONE' || packageInformation.licenseDeclared === 'NOASSERTION') {
                const data: string = declaredLicense
                setDeclaredLicense(data)
            } else {
                setDeclaredLicense(packageInformation.licenseDeclared)
            }
        }

        if (typeof packageInformation?.copyrightText !== 'undefined') {
            if (packageInformation.copyrightText === 'NONE' || packageInformation.copyrightText === 'NOASSERTION') {
                const data: string = copyrightText
                setCopyrightText(data)
            } else {
                setCopyrightText(packageInformation.copyrightText)
            }
        }

        if (typeof packageInformation?.licenseInfoFromFiles !== 'undefined') {
            if (
                packageInformation.licenseInfoFromFiles.toString() === 'NONE' ||
                packageInformation.licenseInfoFromFiles.toString() === 'NOASSERTION'
            ) {
                const data: string[] = allLicensesInformation
                setAllLicensesInformation(data)
            } else {
                setAllLicensesInformation(packageInformation.licenseInfoFromFiles)
            }
        }

        if (typeof packageInformation?.releaseDate !== 'undefined') {
            setDataReleaseDate(handleDate(packageInformation.releaseDate))
        }
        if (typeof packageInformation?.builtDate !== 'undefined') {
            setDataBuiltDate(handleDate(packageInformation.builtDate))
        }
        if (typeof packageInformation?.validUntilDate !== 'undefined') {
            setDataValidUntilDate(handleDate(packageInformation.validUntilDate))
        }
    }, [packageInformation])

    const updateField = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        setPackageInformation({
            ...packageInformation,
            [e.target.name]: e.target.name === 'attributionText' ? e.target.value.split('\n') : e.target.value,
        })
        setSPDXPayload({
            ...SPDXPayload,
            packageInformation: {
                ...SPDXPayload.packageInformation,
                [e.target.name]: e.target.name === 'attributionText' ? e.target.value.split('\n') : e.target.value,
            },
        })
    }

    const updateFieldPackageVerificationCode = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // if (!packageInformation?.filesAnalyzed) {
        //     setPackageInformation({
        //         ...packageInformation,
        //         packageVerificationCode: null,
        //     })
        // } else {

        // }
        setPackageInformation({
            ...packageInformation,
            packageVerificationCode: {
                ...packageInformation.packageVerificationCode,
                [e.target.name]: e.target.value,
            },
        })
        setSPDXPayload({
            ...SPDXPayload,
            packageInformation: {
                ...SPDXPayload.packageInformation,
                packageVerificationCode: {
                    ...packageInformation.packageVerificationCode,
                    [e.target.name]: e.target.value,
                },
            },
        })
    }

    const convertChecksums = (checksums: CheckSum[]) => {
        const inputs: InputKeyValue[] = []
        checksums.forEach((checksum: CheckSum) => {
            const input: InputKeyValue = {
                key: checksum.algorithm,
                value: checksum.checksumValue,
            }
            inputs.push(input)
        })
        return inputs
    }

    const [dataReleaseDate, setDataReleaseDate] = useState<InputKeyValue>()
    const [dataBuiltDate, setDataBuiltDate] = useState<InputKeyValue>()
    const [dataValidUntilDate, setDataValidUntilDate] = useState<InputKeyValue>()
    const handleDate = (data: string) => {
        const input: InputKeyValue = {
            key: CommonUtils.fillDate(data),
            value: CommonUtils.fillTime(data),
        }
        return input
    }

    const convertInputToDate = (data: InputKeyValue) => {
        if (data.key == '' || data.value == '') {
            return ''
        }
        const localDate = new Date(data.key + ' ' + data.value)
        return localDate.toISOString().slice(0, -5) + 'Z'
    }

    const setBuiltDate = (inputs: InputKeyValue) => {
        setPackageInformation({
            ...packageInformation,
            builtDate: convertInputToDate(inputs),
        })
        setSPDXPayload({
            ...SPDXPayload,
            packageInformation: {
                ...SPDXPayload.packageInformation,
                builtDate: convertInputToDate(inputs),
            },
        })
    }

    const setValidUntilDate = (inputs: InputKeyValue) => {
        setPackageInformation({
            ...packageInformation,
            validUntilDate: convertInputToDate(inputs),
        })
        setSPDXPayload({
            ...SPDXPayload,
            packageInformation: {
                ...SPDXPayload.packageInformation,
                validUntilDate: convertInputToDate(inputs),
            },
        })
    }

    const setReleaseDate = (inputs: InputKeyValue) => {
        setPackageInformation({
            ...packageInformation,
            releaseDate: convertInputToDate(inputs),
        })
        setSPDXPayload({
            ...SPDXPayload,
            packageInformation: {
                ...SPDXPayload.packageInformation,
                releaseDate: convertInputToDate(inputs),
            },
        })
    }

    const changeFilesAnalyzed = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPackageInformation({
            ...packageInformation,
            filesAnalyzed: !packageInformation.filesAnalyzed,
        })
        setSPDXPayload({
            ...SPDXPayload,
            packageInformation: {
                ...SPDXPayload.packageInformation,
                filesAnalyzed: !packageInformation.filesAnalyzed,
            },
        })
        if (e.target.value === 'false') {
            setSPDXPayload({
                ...SPDXPayload,
                packageInformation: {
                    ...SPDXPayload.packageInformation,
                    versionInfo: '1111',
                },
            })
            setSPDXPayload({
                ...SPDXPayload,
                packageInformation: {
                    ...SPDXPayload.packageInformation,
                    licenseInfoFromFiles: [],
                    packageVerificationCode: null,
                },
            })
        } else {
            setSPDXPayload({
                ...SPDXPayload,
                packageInformation: {
                    ...SPDXPayload.packageInformation,
                    licenseInfoFromFiles: allLicensesInformation,
                    packageVerificationCode: packageInformation.packageVerificationCode,
                },
            })
        }
    }

    const [numberIndex, setNumberIndex] = useState<number>(0)

    const deleteExternalRefsDatas = () => {
        if (externalRefsDatas.length == 1) {
            setExternalRefsDatas([])
        } else {
            let externalRefs: ExternalReference[] = []
            externalRefs = externalRefsDatas.filter((externalRefsData) => numberIndex != externalRefsData.index)
            setExternalRefsDatas(externalRefs)
            setIndexExternalRefsData(0)
            setSPDXPayload({
                ...SPDXPayload,
                packageInformation: {
                    ...SPDXPayload.packageInformation,
                    externalRefs: externalRefs,
                },
            })
            if (!CommonUtils.isNullEmptyOrUndefinedArray(externalRefs)) {
                setNumberIndex(externalRefs[0].index)
            }
        }
    }

    return (
        <table className={`table label-value-table ${styles['summary-table']}`}>
            <thead
                title='Click to expand or collapse'
                onClick={() => {
                    setToggle(!toggle)
                }}
            >
                <tr>
                    <th colSpan={3}>7. Package Information</th>
                </tr>
            </thead>
            <tbody hidden={toggle}>
                {packageInformation && (
                    <>
                        <tr>
                            <td>
                                <div className='form-group'>
                                    <label className='lableSPDX' htmlFor='packageName'>
                                        7.1 Package name
                                    </label>
                                    <div style={{ display: 'flex' }}>
                                        <input
                                            id='packageName'
                                            className='form-control needs-validation'
                                            name='name'
                                            type='text'
                                            placeholder='Enter package name'
                                            onChange={updateField}
                                            value={packageInformation.name ?? ''}
                                        />
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className='form-group'>
                                    <label className='lableSPDX' htmlFor='packageSPDXId'>
                                        7.2 Package SPDX identifier
                                    </label>
                                    <div style={{ display: 'flex' }}>
                                        <label className='sub-label'>SPDXRef-</label>
                                        <input
                                            id='packageSPDXId'
                                            className='form-control needs-validation'
                                            type='text'
                                            placeholder='Enter package SPDX identifier'
                                            name='SPDXID'
                                            onChange={updateField}
                                            value={
                                                packageInformation.SPDXID?.startsWith('SPDXRef-')
                                                    ? packageInformation.SPDXID.substring(8)
                                                    : packageInformation.SPDXID
                                            }
                                        />
                                    </div>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <div className='form-group'>
                                    <label className='lableSPDX' htmlFor='packageName'>
                                        7.3 Package version
                                    </label>
                                    <div style={{ display: 'flex' }}>
                                        <input
                                            id='versionInfo'
                                            className='form-control'
                                            type='text'
                                            placeholder='Enter package version'
                                            name='versionInfo'
                                            onChange={updateField}
                                            value={packageInformation.versionInfo ?? ''}
                                        />
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className='form-group'>
                                    <label className='lableSPDX' htmlFor='packageSPDXId'>
                                        7.4 Package file name
                                    </label>
                                    <div style={{ display: 'flex' }}>
                                        <input
                                            id='packageFileName'
                                            className='form-control'
                                            type='text'
                                            placeholder='Enter package file name'
                                            name='packageFileName'
                                            onChange={updateField}
                                            value={packageInformation.packageFileName ?? ''}
                                        />
                                    </div>
                                </div>
                            </td>
                        </tr>

                        {isModeFull && (
                            <>
                                <tr className='spdx-full'>
                                    <PackageSupplier
                                        dataPackageSupplier={dataPackageSupplier}
                                        setDataPackageSupplier={setDataPackageSupplier}
                                        setPackageSupplierToPackage={setPackageSupplierToPackage}
                                        isPackageSupplier={isPackageSupplier}
                                        setIsPackageSupplier={setIsPackageSupplier}
                                    />
                                </tr>
                                <tr className='spdx-full'>
                                    <PackageOriginator
                                        dataPackageOriginator={dataPackageOriginator}
                                        setDataPackageOriginator={setDataPackageOriginator}
                                        setPackageOriginatorToPackage={setPackageOriginatorToPackage}
                                        isPackageOriginator={isPackageOriginator}
                                        setIsPackageOriginator={setIsPackageOriginator}
                                    />
                                </tr>
                            </>
                        )}
                        <tr>
                            <PackageDownloadLocation
                                setPackageDownloadLocationToPackage={setPackageDownloadLocationToPackage}
                                packageDownloadLocationExist={packageDownloadLocationExist}
                                setPackageDownloadLocationExist={setPackageDownloadLocationExist}
                                packageDownloadLocationNone={packageDownloadLocationNone}
                                setPackageDownloadLocationNone={setPackageDownloadLocationNone}
                                packageDownloadLocationNoasserttion={packageDownloadLocationNoasserttion}
                                setPackageDownloadLocationNoasserttion={setPackageDownloadLocationNoasserttion}
                                packageDownloadLocation={packageDownloadLocation}
                            />
                        </tr>
                        <tr>
                            <td colSpan={3}>
                                <div className='form-group'>
                                    <label className='lableSPDX'>7.8 Files analyzed</label>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <div>
                                            <input
                                                className='spdx-radio'
                                                id='FilesAnalyzedTrue'
                                                type='radio'
                                                value='true'
                                                name='_sw360_portlet_components_FILES_ANALYZED'
                                                onChange={changeFilesAnalyzed}
                                                checked={packageInformation?.filesAnalyzed}
                                            />
                                            <label
                                                style={{ marginRight: '2rem' }}
                                                className='form-check-label radio-label lableSPDX'
                                                htmlFor='FilesAnalyzedTrue'
                                            >
                                                TRUE
                                            </label>
                                            <input
                                                className='spdx-radio'
                                                id='FilesAnalyzedFalse'
                                                type='radio'
                                                name='_sw360_portlet_components_FILES_ANALYZED'
                                                value='false'
                                                onChange={changeFilesAnalyzed}
                                                checked={!packageInformation?.filesAnalyzed}
                                            />
                                            <label
                                                className='form-check-label radio-label lableSPDX'
                                                htmlFor='FilesAnalyzedFalse'
                                            >
                                                FALSE
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        {isModeFull && (
                            <>
                                <tr className='spdx-full'>
                                    <td colSpan={3}>
                                        <div className='form-group'>
                                            <label className='lableSPDX' htmlFor='verificationCodeValue'>
                                                7.9 Package verification code
                                            </label>
                                            <div>
                                                <input
                                                    style={{ marginBottom: '0.75rem' }}
                                                    className='form-control'
                                                    id='verificationCodeValue'
                                                    name='excludedFiles'
                                                    placeholder='Enter verification code value'
                                                    disabled={!packageInformation?.filesAnalyzed}
                                                    onChange={updateFieldPackageVerificationCode}
                                                    value={
                                                        packageInformation.packageVerificationCode?.excludedFiles ?? ''
                                                    }
                                                ></input>
                                                <textarea
                                                    className='form-control'
                                                    id='excludedFiles'
                                                    rows={5}
                                                    name='value'
                                                    placeholder='Enter excluded files'
                                                    disabled={!packageInformation?.filesAnalyzed}
                                                    onChange={updateFieldPackageVerificationCode}
                                                    value={packageInformation.packageVerificationCode?.value ?? ''}
                                                ></textarea>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='spdx-full'>
                                    <td colSpan={3}>
                                        <div className='form-group'>
                                            <label className='lableSPDX'>7.10 Package checksum</label>
                                            <div style={{ display: 'flex' }}>
                                                <label className='sub-title lableSPDX'>Checksum</label>
                                                <CheckSums
                                                    inputList={checkSums}
                                                    setInputList={setCheckSums}
                                                    setDataCheckSums={setDataCheckSums}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </>
                        )}
                        <tr>
                            <PackageHomePage
                                setPackageHomePageToPackage={setPackageHomePageToPackage}
                                packageHomePageExist={packageHomePageExist}
                                setPackageHomePageExist={setPackageHomePageExist}
                                packageHomePageNone={packageHomePageNone}
                                setPackageHomePageNone={setPackageHomePageNone}
                                packageHomePageNoasserttion={packageHomePageNoasserttion}
                                setPackageHomePageNoasserttion={setPackageHomePageNoasserttion}
                                packageHomePage={packageHomePage}
                            />
                        </tr>
                        {isModeFull && (
                            <tr className='spdx-full'>
                                <td colSpan={3}>
                                    <div className='form-group'>
                                        <label className='lableSPDX' htmlFor='verificationCodeValue'>
                                            7.12 Source information
                                        </label>
                                        <div>
                                            <textarea
                                                className='form-control'
                                                id='excludedFiles'
                                                rows={5}
                                                name='sourceInfo'
                                                onChange={updateField}
                                                placeholder='Enter excluded files'
                                                value={packageInformation.sourceInfo ?? ''}
                                            ></textarea>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )}
                        <tr>
                            <PackageConcludedLicense
                                setConcludedLicenseToPackage={setConcludedLicenseToPackage}
                                concludedLicenseExist={concludedLicenseExist}
                                setConcludedLicenseExist={setConcludedLicenseExist}
                                concludedLicenseNone={concludedLicenseNone}
                                setConcludedLicenseNone={setConcludedLicenseNone}
                                concludedLicenseNoasserttion={concludedLicenseNoasserttion}
                                setConcludedLicenseNoasserttion={setConcludedLicenseNoasserttion}
                                concludedLicense={concludedLicense}
                            />
                        </tr>
                        {isModeFull && (
                            <tr>
                                <PackageAllLicensesInformation
                                    packageInformation={packageInformation}
                                    allLicensesInformation={allLicensesInformation}
                                    setAllLicensesInformationToPackage={setAllLicensesInformationToPackage}
                                    allLicensesInformationExist={allLicensesInformationExist}
                                    setAllLicensesInformationExist={setAllLicensesInformationExist}
                                    allLicensesInformationNone={allLicensesInformationNone}
                                    setAllLicensesInformationNone={setAllLicensesInformationNone}
                                    allLicensesInformationNoasserttion={allLicensesInformationNoasserttion}
                                    setAllLicensesInformationNoasserttion={setAllLicensesInformationNoasserttion}
                                />
                            </tr>
                        )}
                        <tr>
                            <PackageDeclaredLicense
                                setDeclaredLicenseToPackage={setDeclaredLicenseToPackage}
                                declaredLicenseExist={declaredLicenseExist}
                                setDeclaredLicenseExist={setDeclaredLicenseExist}
                                declaredLicenseNone={declaredLicenseNone}
                                setDeclaredLicenseNone={setDeclaredLicenseNone}
                                declaredLicenseNoasserttion={declaredLicenseNoasserttion}
                                setDeclaredLicenseNoasserttion={setDeclaredLicenseNoasserttion}
                                declaredLicense={declaredLicense}
                            />
                        </tr>
                        <tr className='spdx-full'>
                            <td colSpan={3}>
                                <div className='form-group'>
                                    <label className='lableSPDX' htmlFor='verificationCodeValue'>
                                        7.16 Comments on license
                                    </label>
                                    <div>
                                        <textarea
                                            className='form-control'
                                            id='excludedFiles'
                                            rows={5}
                                            placeholder='Enter excluded files'
                                            name='licenseComments'
                                            onChange={updateField}
                                            value={packageInformation.licenseComments ?? ''}
                                        ></textarea>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <PackageCopyrightText
                                copyrightText={copyrightText}
                                setCopyrightTextToPackage={setCopyrightTextToPackage}
                                copyrightTextExist={copyrightTextExist}
                                setCopyrightTextExist={setCopyrightTextExist}
                                copyrightTextNone={copyrightTextNone}
                                setCopyrightTextNone={setCopyrightTextNone}
                                copyrightTextNoasserttion={copyrightTextNoasserttion}
                                setCopyrightTextNoasserttion={setCopyrightTextNoasserttion}
                            />
                        </tr>
                        {isModeFull && (
                            <>
                                {' '}
                                <tr className='spdx-full'>
                                    <td colSpan={3}>
                                        <div className='form-group'>
                                            <label className='lableSPDX' htmlFor='verificationCodeValue'>
                                                7.18 Package summary description
                                            </label>
                                            <div>
                                                <textarea
                                                    className='form-control'
                                                    id='excludedFiles'
                                                    rows={5}
                                                    name='summary'
                                                    onChange={updateField}
                                                    placeholder='Enter excluded files'
                                                    value={packageInformation.summary ?? ''}
                                                ></textarea>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='spdx-full'>
                                    <td colSpan={3}>
                                        <div className='form-group'>
                                            <label className='lableSPDX' htmlFor='verificationCodeValue'>
                                                7.19 Package detailed description
                                            </label>
                                            <div>
                                                <textarea
                                                    className='form-control'
                                                    id='excludedFiles'
                                                    rows={5}
                                                    name='description'
                                                    onChange={updateField}
                                                    placeholder='Enter excluded files'
                                                    value={packageInformation.description ?? ''}
                                                ></textarea>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </>
                        )}
                        <tr className='spdx-full'>
                            <td colSpan={3}>
                                <div className='form-group'>
                                    <label className='lableSPDX' htmlFor='verificationCodeValue'>
                                        7.20 Package comment
                                    </label>
                                    <div>
                                        <textarea
                                            className='form-control'
                                            id='excludedFiles'
                                            rows={5}
                                            name='packageComment'
                                            onChange={updateField}
                                            placeholder='Enter excluded files'
                                            value={packageInformation.packageComment ?? ''}
                                        ></textarea>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        {isModeFull && (
                            <>
                                {externalRefsDatas[indexExternalRefsData] && (
                                    <tr className='spdx-full'>
                                        <td colSpan={3}>
                                            <div className='form-group section section-external-ref'>
                                                <label className='lableSPDX'>7.21 External references</label>
                                                {packageInformation?.externalRefs.length !== 0 && (
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            paddingLeft: '1rem',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                marginBottom: '0.75rem',
                                                            }}
                                                        >
                                                            <label
                                                                style={{ textDecoration: 'underline' }}
                                                                className='sub-title lableSPDX'
                                                            >
                                                                Select Reference
                                                            </label>
                                                            <select
                                                                className='form-control spdx-select'
                                                                id='externalReferences'
                                                                onChange={displayIndex}
                                                            >
                                                                {externalRefsDatas.map((item) => (
                                                                    <option key={item.index} value={item.index}>
                                                                        {item.index + 1}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            <FaTrashAlt onClick={deleteExternalRefsDatas} />
                                                        </div>
                                                        <button
                                                            className='spdx-add-button-main'
                                                            name='add-externalRef'
                                                            onClick={addReferences}
                                                        >
                                                            Add new Reference
                                                        </button>
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                marginBottom: '0.75rem',
                                                            }}
                                                        >
                                                            <label className='sub-title lableSPDX'>Category</label>
                                                            <select
                                                                style={{ width: 'auto', flex: 'auto' }}
                                                                id='referenceCategory'
                                                                className='form-control'
                                                                name='referenceCategory'
                                                                onChange={handleChangeReferenceCategory}
                                                                value={
                                                                    externalRefsDatas[indexExternalRefsData]
                                                                        .referenceCategory ?? ''
                                                                }
                                                            >
                                                                <option value='SECURITY'>SECURITY</option>
                                                                <option value='PACKAGE-MANAGER'>PACKAGE-MANAGER</option>
                                                                <option value='PERSISTENT-ID'>PERSISTENT-ID</option>
                                                                <option value='OTHER'>OTHER</option>
                                                            </select>
                                                        </div>
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                marginBottom: '0.75rem',
                                                            }}
                                                        >
                                                            <label className='sub-title lableSPDX'>Type</label>
                                                            {isTypeCateGoryEmpty ? (
                                                                <input
                                                                    style={{
                                                                        width: 'auto',
                                                                        flex: 'auto',
                                                                    }}
                                                                    id='referenceType-2'
                                                                    type='text'
                                                                    className='form-control'
                                                                    placeholder='Enter type'
                                                                    name='referenceType'
                                                                    onChange={handleChangeExternalRefData}
                                                                    value={
                                                                        externalRefsDatas[indexExternalRefsData]
                                                                            .referenceType ?? ''
                                                                    }
                                                                />
                                                            ) : (
                                                                <select
                                                                    style={{ width: 'auto', flex: 'auto' }}
                                                                    id='referenceType-1'
                                                                    className='form-control'
                                                                    name='referenceType'
                                                                    onChange={handleChangeExternalRefData}
                                                                    value={
                                                                        externalRefsDatas[indexExternalRefsData]
                                                                            .referenceType ?? ''
                                                                    }
                                                                >
                                                                    {typeCategory?.map((item, index) => (
                                                                        <option key={index} value={item}>
                                                                            {item}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            )}
                                                        </div>
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                marginBottom: '0.75rem',
                                                            }}
                                                        >
                                                            <label className='sub-title lableSPDX'>Locator</label>
                                                            <input
                                                                style={{ width: 'auto', flex: 'auto' }}
                                                                type='text'
                                                                className='form-control'
                                                                id='externalReferencesLocator'
                                                                placeholder='Enter locator'
                                                                name='referenceLocator'
                                                                onChange={handleChangeExternalRefData}
                                                                value={
                                                                    externalRefsDatas[indexExternalRefsData]
                                                                        .referenceLocator ?? ''
                                                                }
                                                            />
                                                        </div>
                                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                            <label className='sub-title lableSPDX'>7.22 Comment</label>
                                                            <textarea
                                                                style={{ width: 'auto', flex: 'auto' }}
                                                                rows={5}
                                                                className='form-control'
                                                                id='externalReferencesComment'
                                                                placeholder='Enter comment'
                                                                name='comment'
                                                                onChange={handleChangeExternalRefData}
                                                                value={
                                                                    externalRefsDatas[indexExternalRefsData].comment ??
                                                                    ''
                                                                }
                                                            ></textarea>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </>
                        )}

                        {isModeFull && (
                            <>
                                <tr className='spdx-full'>
                                    <td colSpan={3}>
                                        <div className='form-group'>
                                            <label className='lableSPDX' htmlFor='verificationCodeValue'>
                                                7.23 Package attribution text
                                            </label>
                                            <div>
                                                <textarea
                                                    className='form-control'
                                                    id='excludedFiles'
                                                    rows={5}
                                                    name='attributionText'
                                                    onChange={updateField}
                                                    placeholder='Enter excluded files'
                                                    value={packageInformation.attributionText ?? ''}
                                                ></textarea>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='spdx-full'>
                                    <td colSpan={3}>
                                        <div className='form-group'>
                                            <label className='lableSPDX' htmlFor='verificationCodeValue'>
                                                7.24 Primary Package Purpose
                                            </label>
                                            <div>
                                                <textarea
                                                    className='form-control'
                                                    id='excludedFiles'
                                                    rows={5}
                                                    name='primaryPackagePurpose'
                                                    onChange={updateField}
                                                    placeholder='Enter excluded files'
                                                    value={packageInformation.primaryPackagePurpose ?? ''}
                                                ></textarea>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='spdx-full'>
                                    <ReleaseDate
                                        dataReleaseDate={dataReleaseDate}
                                        setDataReleaseDate={setDataReleaseDate}
                                        setReleaseDate={setReleaseDate}
                                    />
                                </tr>
                                <tr className='spdx-full'>
                                    <BuiltDate
                                        setBuiltDate={setBuiltDate}
                                        dataBuiltDate={dataBuiltDate}
                                        setDataBuiltDate={setDataBuiltDate}
                                    />
                                </tr>
                                <tr className='spdx-full'>
                                    <ValidUntilDate
                                        setValidUntilDate={setValidUntilDate}
                                        dataValidUntilDate={dataValidUntilDate}
                                        setDataValidUntilDate={setDataValidUntilDate}
                                    />
                                </tr>
                            </>
                        )}
                    </>
                )}
            </tbody>
        </table>
    )
}

export default EditPackageInformation
