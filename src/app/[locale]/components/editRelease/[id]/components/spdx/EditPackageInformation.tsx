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
    externalRefsData?: ExternalReference
    setExternalRefsData?: React.Dispatch<React.SetStateAction<ExternalReference>>
    isModeFull?: boolean
    externalRefsDatas?: ExternalReference[]
    setExternalRefsDatas?: React.Dispatch<React.SetStateAction<ExternalReference[]>>
}

const EditPackageInformation = ({
    packageInformation,
    externalRefsData,
    setExternalRefsData,
    isModeFull,
    externalRefsDatas,
    setExternalRefsDatas,
    setPackageInformation,
}: Props) => {
    const [toggle, setToggle] = useState(false)
    const [dataPackageSupplier, setDataPackageSupplier] = useState<InputKeyValue>()

    const handlePackageSupplier = (data: string) => {
        const input: InputKeyValue = {
            key: data.split(':')[0],
            value: data.split(':')[1],
        }
        return input
    }

    const handleInputKeyToPackageSupplier = (data: InputKeyValue) => {
        return data.key + ':' + data.value
    }

    const setPackageSupplierToPackage = (input: InputKeyValue) => {
        setPackageInformation({
            ...packageInformation,
            supplier: handleInputKeyToPackageSupplier(input),
        })
    }

    const [dataPackageOriginator, setDataPackageOriginator] = useState<InputKeyValue>()

    const handlePackageOriginator = (data: string) => {
        const input: InputKeyValue = {
            key: data.split(':')[0],
            value: data.split(':')[1],
        }
        return input
    }

    const handleInputKeyToPackageOriginator = (data: InputKeyValue) => {
        return data.key + ':' + data.value
    }

    const setPackageOriginatorToPackage = (input: InputKeyValue) => {
        setPackageInformation({
            ...packageInformation,
            originator: handleInputKeyToPackageOriginator(input),
        })
    }

    const [filesAnalyzed, setFilesAnalyzed] = useState(true)

    const [checkSums, setCheckSums] = useState<InputKeyValue[]>([])

    const setDataCheckSums = (inputs: InputKeyValue[]) => {
        setPackageInformation({
            ...packageInformation,
            checksums: convertInputToChecksums(inputs),
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
        setExternalRefsData(externalRefsDatas[+index])
    }

    const addReferences = () => {
        const arrayExternals: ExternalReference[] = externalRefsDatas
        const externalReference: ExternalReference = {
            referenceCategory: '',
            referenceLocator: '',
            referenceType: '',
            comment: '',
            index: externalRefsDatas.length,
        }
        arrayExternals.push(externalReference)
        setExternalRefsDatas(arrayExternals)
        setExternalRefsData(externalReference)
    }

    useEffect(() => {
        if (typeof packageInformation?.checksums !== 'undefined') {
            setCheckSums(convertChecksums(packageInformation.checksums))
        }

        if (typeof packageInformation?.supplier !== 'undefined') {
            setDataPackageSupplier(handlePackageSupplier(packageInformation.supplier))
        }

        if (typeof packageInformation?.originator !== 'undefined') {
            setDataPackageOriginator(handlePackageOriginator(packageInformation.originator))
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
            [e.target.name]: e.target.value,
        })
    }

    const updateFieldPackageVerificationCode = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPackageInformation({
            ...packageInformation,
            packageVerificationCode: {
                ...packageInformation.packageVerificationCode,
                [e.target.name]: e.target.value,
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
    }

    const setValidUntilDate = (inputs: InputKeyValue) => {
        setPackageInformation({
            ...packageInformation,
            validUntilDate: convertInputToDate(inputs),
        })
    }

    const setReleaseDate = (inputs: InputKeyValue) => {
        setPackageInformation({
            ...packageInformation,
            releaseDate: convertInputToDate(inputs),
        })
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
                                    />
                                </tr>
                                <tr className='spdx-full'>
                                    <PackageOriginator
                                        dataPackageOriginator={dataPackageOriginator}
                                        setDataPackageOriginator={setDataPackageOriginator}
                                        setPackageOriginatorToPackage={setPackageOriginatorToPackage}
                                    />
                                </tr>
                            </>
                        )}
                        <tr>
                            <PackageDownloadLocation
                                packageInformation={packageInformation}
                                updateField={updateField}
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
                                                name='_sw360_portlet_components_FILES_ANALYZED'
                                                onClick={() => setFilesAnalyzed(true)}
                                                checked={filesAnalyzed}
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
                                                onClick={() => setFilesAnalyzed(false)}
                                                checked={!filesAnalyzed}
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
                                                    disabled={!filesAnalyzed}
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
                                                    disabled={!filesAnalyzed}
                                                    onChange={updateFieldPackageVerificationCode}
                                                    value={packageInformation.packageVerificationCode.value ?? ''}
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
                            <PackageHomePage packageInformation={packageInformation} updateField={updateField} />
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
                                packageInformation={packageInformation}
                                updateField={updateField}
                            />
                        </tr>
                        {isModeFull && (
                            <tr>
                                <PackageAllLicensesInformation
                                    packageInformation={packageInformation}
                                    updateField={updateField}
                                />
                            </tr>
                        )}
                        <tr>
                            <PackageDeclaredLicense packageInformation={packageInformation} updateField={updateField} />
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
                            <PackageCopyrightText packageInformation={packageInformation} updateField={updateField} />
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
                                {externalRefsData && (
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
                                                            <FaTrashAlt />
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
                                                                name='_sw360_portlet_components_REFERENCE_CATEGORY'
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
                                                            <select
                                                                style={{ width: 'auto', flex: 'auto' }}
                                                                id='referenceType-1'
                                                                className='form-control'
                                                                name='_sw360_portlet_components_REFERENCE_TYPE-1'
                                                            >
                                                                <option>cpe22Type</option>
                                                                <option>cpe23Type</option>
                                                            </select>
                                                            <input
                                                                style={{ width: 'auto', flex: 'auto', display: 'none' }}
                                                                id='referenceType-2'
                                                                type='text'
                                                                className='form-control'
                                                                placeholder='Enter type'
                                                                name='_sw360_portlet_components_REFERENCE_TYPE-2'
                                                            />
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
                                                                name='_sw360_portlet_components_REFERENCE_LOCATOR'
                                                                value={externalRefsData.referenceLocator ?? ''}
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
                                                                name='_sw360_portlet_components_REFERENCE_COMMENT'
                                                                value={externalRefsData.comment ?? ''}
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
