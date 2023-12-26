// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'
import { useState } from 'react'
import ExternalReference from '../../../../../../../../object-types/spdx/ExternalReference'
import PackageInformation from '../../../../../../../../object-types/spdx/PackageInformation'
import styles from '../../detail.module.css'

interface Props {
    packageInformation?: PackageInformation
}

const PackageInformationDetail = ({ packageInformation }: Props) => {
    const [toggle, setToggle] = useState(false)

    return (
        <table className={`table label-value-table ${styles['summary-table']}`}>
            <thead
                title='Click to expand or collapse'
                onClick={() => {
                    setToggle(!toggle)
                }}
            >
                <tr>
                    <th colSpan={2}>7. Package Information</th>
                </tr>
            </thead>
            <tbody hidden={toggle}>
                <tr data-index={packageInformation?.index}>
                    <td>7.1 Package name</td>
                    <td>{packageInformation?.name}</td>
                </tr>
                <tr data-index={packageInformation?.index}>
                    <td>7.2 Package SPDX identifier</td>
                    <td>{packageInformation?.SPDXID}</td>
                </tr>
                <tr data-index={packageInformation?.index}>
                    <td>7.3 Package version</td>
                    <td>{packageInformation?.versionInfo}</td>
                </tr>
                <tr data-index={packageInformation?.index}>
                    <td>7.4 Package file name</td>
                    <td>{packageInformation?.packageFileName}</td>
                </tr>
                <tr className='spdx-full' data-index={packageInformation?.index}>
                    <td>7.5 Package supplier</td>
                    <td>{packageInformation?.supplier}</td>
                </tr>
                <tr className='spdx-full' data-index={packageInformation?.index}>
                    <td>7.6 Package originator</td>
                    <td>{packageInformation?.originator}</td>
                </tr>
                <tr data-index={packageInformation?.index}>
                    <td>7.7 Package download location</td>
                    <td className='spdx-flex-row'>
                        <div className='spdx-col-2'>{packageInformation?.downloadLocation}</div>
                    </td>
                </tr>
                <tr data-index={packageInformation?.index}>
                    <td>7.8 Files analyzed</td>
                    <td>{packageInformation?.filesAnalyzed}</td>
                </tr>
                <tr className='spdx-full' data-index={packageInformation?.index}>
                    <td>7.9 Package verification code</td>
                    <td className='spdx-flex-row'>
                        <div>
                            <div className='spdx-col-2 spdx-flex-col'>
                                <div className='spdx-flex-row'>
                                    <div className='spdx-col-1 spdx-key'>Value</div>
                                    <div className='spdx-col-3'>
                                        {packageInformation?.packageVerificationCode.value}
                                    </div>
                                </div>
                                <div className='spdx-flex-row'>
                                    <div className='spdx-col-1 spdx-key'>Excluded files</div>
                                    <p className='spdx-col-3 ' id='excludedFiles'>
                                        {packageInformation?.packageVerificationCode.excludedFiles &&
                                            packageInformation?.packageVerificationCode.excludedFiles.map((item) => {
                                                return (
                                                    <>
                                                        {item}
                                                        <br></br>
                                                    </>
                                                )
                                            })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr className='spdx-full' data-index={packageInformation?.index}>
                    <td>7.10 Package checksum</td>
                    <td>
                        {packageInformation?.checksums &&
                            packageInformation?.checksums.map((item) => {
                                return (
                                    <div key={item.index} className='spdx-flex-row checksum' data-index={item.index}>
                                        <div className='spdx-col-1 spdx-key'>{item.algorithm}</div>
                                        <div className='spdx-col-3'>{item.checksumValue}</div>
                                    </div>
                                )
                            })}
                    </td>
                </tr>
                <tr data-index={packageInformation?.index}>
                    <td>7.11 Package home page</td>
                    <td>{packageInformation?.homepage}</td>
                </tr>
                <tr className='spdx-full' data-index={packageInformation?.index}>
                    <td>7.12 Source information</td>
                    <td className='spdx-flex-row'>
                        <div className='spdx-col-2 ' id='sourceInfo'>
                            {packageInformation?.sourceInfo}
                        </div>
                    </td>
                </tr>
                <tr data-index={packageInformation?.index}>
                    <td>7.13 Concluded license</td>
                    <td className='spdx-flex-row'>
                        <div className='spdx-col-2'>{packageInformation?.licenseConcluded}</div>
                    </td>
                </tr>
                <tr className='spdx-full' data-index={packageInformation?.index}>
                    <td>7.14 All licenses information from files</td>
                    <td className='spdx-flex-row'>
                        <p className='spdx-col-2 ' id='licenseInfoFromFile'>
                            {packageInformation?.licenseInfoFromFiles &&
                                packageInformation?.licenseInfoFromFiles.map((item) => {
                                    return <>{item}</>
                                })}
                        </p>
                    </td>
                </tr>
                <tr data-index={packageInformation?.index}>
                    <td>7.15 Declared license</td>
                    <td className='spdx-flex-row'>
                        <div className='spdx-col-2'>{packageInformation?.licenseDeclared}</div>
                    </td>
                </tr>
                <tr data-index={packageInformation?.index}>
                    <td>7.16 Comments on license</td>
                    <td className='spdx-flex-row'>
                        <p className='spdx-col-2 ' id='licenseComments'>
                            {packageInformation?.licenseComments}
                        </p>
                    </td>
                </tr>
                <tr data-index={packageInformation?.index}>
                    <td>7.17 Copyright text</td>
                    <td className='spdx-flex-row'>
                        <p className='spdx-col-2 ' id='copyrightText'>
                            {packageInformation?.copyrightText}
                        </p>
                    </td>
                </tr>
                <tr className='spdx-full' data-index={packageInformation?.index}>
                    <td>7.18 Package summary description</td>
                    <td className='spdx-flex-row'>
                        <p className='spdx-col-2 ' id='summary'>
                            {packageInformation?.summary}
                        </p>
                    </td>
                </tr>
                <tr className='spdx-full' data-index={packageInformation?.index}>
                    <td>7.19 Package detailed description</td>
                    <td className='spdx-flex-row'>
                        <p className='spdx-col-2 ' id='description'>
                            {packageInformation?.description}
                        </p>
                    </td>
                </tr>
                <tr data-index={packageInformation?.index}>
                    <td>7.20 Package comment</td>
                    <td className='spdx-flex-row'>
                        <p className='spdx-col-2 ' id='packageComment'>
                            {packageInformation?.packageComment}
                        </p>
                    </td>
                </tr>
                <tr className='spdx-full' data-index={packageInformation?.index}>
                    <td>7.21 External references </td>
                    <td className='spdx-flex-row'>
                        {packageInformation?.externalRefs.length !== 0 && (
                            <div className='spdx-col-2 section' data-size='4'>
                                <div className='spdx-flex-row'>
                                    <div className='spdx-col-1 spdx-label-index'>Index</div>
                                    <select
                                        id='externalReferenceSelect${package.index}'
                                        className='spdx-col-3'
                                        // onchange='displayIndex(this)'
                                    ></select>
                                </div>
                                {packageInformation?.externalRefs.map((externalRefsData: ExternalReference) => {
                                    return (
                                        <>
                                            <div className='spdx-flex-row' data-index='${externalRefsData.index}'>
                                                <div className='spdx-col-1 spdx-key'>Category</div>
                                                <div className='spdx-col-3 spdx-uppercase'>
                                                    {externalRefsData.referenceCategory}
                                                </div>
                                            </div>
                                            <div className='spdx-flex-row' data-index='${externalRefsData.index}'>
                                                <div className='spdx-col-1 spdx-key'>Type</div>
                                                <div className='spdx-col-3'>{externalRefsData.referenceType}</div>
                                            </div>
                                            <div className='spdx-flex-row' data-index='${externalRefsData.index}'>
                                                <div className='spdx-col-1 spdx-key'>Locator</div>
                                                <div className='spdx-col-3'>${externalRefsData.referenceLocator}</div>
                                            </div>
                                            <div className='spdx-flex-row' data-index={externalRefsData.index}>
                                                <div className='spdx-col-1 spdx-key'>7.22 Comment</div>
                                                <p
                                                    className='spdx-col-3'
                                                    id='externalRefComment-${externalRefsData.index}'
                                                >
                                                    {externalRefsData.comment}
                                                </p>
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                        )}
                    </td>
                </tr>
                {/* <tr>
                    <td>7.22 Comment</td>
                    <td>{packageInformation?.packageComment}</td>
                </tr> */}
                <tr className='spdx-full' data-index={packageInformation?.index}>
                    <td>7.23 Package attribution text</td>
                    <td className='spdx-flex-row'>
                        <p className='spdx-col-2 ' id='attributionText'>
                            {packageInformation?.attributionText &&
                                packageInformation?.attributionText.map((item) => {
                                    return <>{item}</>
                                })}
                        </p>
                    </td>
                </tr>
                <tr className='spdx-full' data-index={packageInformation?.index}>
                    <td>7.24 Primary Package Purpose </td>
                    <td className='spdx-flex-row'>
                        <div className='spdx-col-2 ' id='primaryPackagePurpose'>
                            {packageInformation?.primaryPackagePurpose}
                        </div>
                    </td>
                </tr>
                <tr className='spdx-full' data-index={packageInformation?.index}>
                    <td>7.25 Release Date</td>
                    <td className='spdx-flex-row'>
                        <p className='spdx-col-2 ' id='release-date-${loop.count}'>
                            {packageInformation?.releaseDate}
                        </p>
                    </td>
                </tr>
                <tr className='spdx-full' data-index={packageInformation?.index}>
                    <td>7.26 Built Date</td>
                    <td className='spdx-flex-row'>
                        <p className='spdx-col-2 ' id='built-date-${loop.count}'>
                            {packageInformation?.builtDate}
                        </p>
                    </td>
                </tr>
                <tr className='spdx-full' data-index={packageInformation?.index}>
                    <td>7.27 Valid Until Date</td>
                    <td className='spdx-flex-row'>
                        <p className='spdx-col-2 ' id='validUntil-date-${loop.count}'>
                            {packageInformation?.validUntilDate}
                        </p>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default PackageInformationDetail
