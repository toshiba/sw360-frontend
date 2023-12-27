// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'
import { useState } from 'react'
import styles from '../../detail.module.css'

// import OtherLicensingInformationDetected from '../../../../../../../../object-types/spdx/OtherLicensingInformationDetected'
import SPDXDocument from '../../../../../../../../object-types/spdx/SPDXDocument'

interface Props {
    // otherLicensingInformationDetecteds?: Array<OtherLicensingInformationDetected>
    spdxDocument?: SPDXDocument
}

const OtherLicensingInformationDetectedDetail = ({ spdxDocument }: Props) => {
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
                    <th colSpan={2}>10. Other Licensing Information Detected</th>
                </tr>
            </thead>
            <tbody hidden={toggle}>
                <tr>
                    <td>Index</td>
                    <td className='spdx-flex-row' style={{ height: '50px' }}>
                        <select
                            id='otherLicensingSelect'
                            className='spdx-col-2'
                            // onchange='displayIndex(this)'
                        ></select>
                    </td>
                </tr>
                {spdxDocument?.otherLicensingInformationDetecteds?.length !== 0 &&
                    spdxDocument?.otherLicensingInformationDetecteds?.map((otherLicensingData) => {
                        return (
                            <>
                                <tr data-index={otherLicensingData.index}>
                                    <td>10.1 License identifier</td>
                                    <td>
                                        <div className='spdx-col-2'>{otherLicensingData.licenseId}</div>
                                    </td>
                                </tr>
                                <tr data-index={otherLicensingData.index}>
                                    <td>10.2 Extracted text</td>
                                    <td>
                                        <p className='spdx-col-2 ' id='extractedText-${otherLicensingData.index}'>
                                            {otherLicensingData.extractedText}
                                        </p>
                                    </td>
                                </tr>
                                <tr data-index={otherLicensingData.index}>
                                    <td>10.3 License name</td>
                                    <td>
                                        <div className='spdx-col-2'>{otherLicensingData.licenseName}</div>
                                    </td>
                                </tr>
                                <tr className='spdx-full' data-index={otherLicensingData.index}>
                                    <td>10.4 License cross reference</td>
                                    <td>
                                        <p className='spdx-col-2 ' id='licenseCrossRefs-${otherLicensingData.index}'>
                                            {otherLicensingData?.licenseCrossRefs &&
                                                otherLicensingData.licenseCrossRefs.map((licenseCrossRefsData) => {
                                                    return <>{licenseCrossRefsData}</>
                                                })}
                                        </p>
                                    </td>
                                </tr>
                                <tr data-index={otherLicensingData.index}>
                                    <td>10.5 License comment</td>
                                    <td>
                                        <p className='spdx-col-2 ' id='otherLicenseComment-${otherLicensingData.index}'>
                                            {otherLicensingData.licenseComment}
                                        </p>
                                    </td>
                                </tr>
                            </>
                        )
                    })}
            </tbody>
        </table>
    )
}

export default OtherLicensingInformationDetectedDetail
