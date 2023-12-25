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

import OtherLicensingInformationDetected from '../../../../../../../../object-types/spdx/OtherLicensingInformationDetected'
import SPDXDocument from '../../../../../../../../object-types/spdx/SPDXDocument'

interface Props {
    spdxDocument?: SPDXDocument
    otherLicensingInformationDetected?: OtherLicensingInformationDetected
    setOtherLicensingInformationDetected?: React.Dispatch<React.SetStateAction<OtherLicensingInformationDetected>>
    isModeFull?: boolean
}

const OtherLicensingInformationDetectedDetail = ({
    spdxDocument,
    otherLicensingInformationDetected,
    setOtherLicensingInformationDetected,
    isModeFull,
}: Props) => {
    const [toggle, setToggle] = useState(false)

    const displayIndex = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const index: string = e.target.value
        setOtherLicensingInformationDetected(spdxDocument.otherLicensingInformationDetecteds[+index])
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
                    <th colSpan={2}>10. Other Licensing Information Detected</th>
                </tr>
            </thead>
            <tbody hidden={toggle}>
                <tr>
                    <td className='spdx-label-index'>Index</td>
                    <td className='spdx-flex-row' style={{ height: '50px' }}>
                        <select id='otherLicensingSelect' className='spdx-col-2' onChange={displayIndex}>
                            {' '}
                            {spdxDocument?.otherLicensingInformationDetecteds
                                .toSorted((e1, e2) => e1.index - e2.index)
                                .map((item) => (
                                    <option key={item.index} value={item.index}>
                                        {item.index + 1}
                                    </option>
                                ))}
                        </select>
                    </td>
                </tr>
                {otherLicensingInformationDetected && (
                    <>
                        <tr data-index={otherLicensingInformationDetected.index}>
                            <td>10.1 License identifier</td>
                            <td>
                                <div className='spdx-col-2'>{otherLicensingInformationDetected.licenseId}</div>
                            </td>
                        </tr>
                        <tr data-index={otherLicensingInformationDetected.index}>
                            <td>10.2 Extracted text</td>
                            <td>
                                <p
                                    className='spdx-col-2 '
                                    id={`extractedText-${otherLicensingInformationDetected.index}`}
                                    style={{ whiteSpace: 'pre-wrap' }}
                                >
                                    {otherLicensingInformationDetected.extractedText}
                                </p>
                            </td>
                        </tr>
                        <tr data-index={otherLicensingInformationDetected.index}>
                            <td>10.3 License name</td>
                            <td>
                                <div className='spdx-col-2'>{otherLicensingInformationDetected.licenseName}</div>
                            </td>
                        </tr>
                        {isModeFull && (
                            <tr className='spdx-full' data-index={otherLicensingInformationDetected.index}>
                                <td>10.4 License cross reference</td>
                                <td>
                                    <p
                                        className='spdx-col-2 '
                                        id={`licenseCrossRefs-${otherLicensingInformationDetected.index}`}
                                    >
                                        {otherLicensingInformationDetected?.licenseCrossRefs &&
                                            otherLicensingInformationDetected.licenseCrossRefs.map(
                                                (licenseCrossRefsData) => {
                                                    return <>{licenseCrossRefsData}</>
                                                }
                                            )}
                                    </p>
                                </td>
                            </tr>
                        )}
                        <tr data-index={otherLicensingInformationDetected.index}>
                            <td>10.5 License comment</td>
                            <td>
                                <p
                                    className='spdx-col-2 '
                                    id={`otherLicenseComment-${otherLicensingInformationDetected.index}`}
                                >
                                    {otherLicensingInformationDetected.licenseComment}
                                </p>
                            </td>
                        </tr>
                    </>
                )}
            </tbody>
        </table>
    )
}

export default OtherLicensingInformationDetectedDetail
