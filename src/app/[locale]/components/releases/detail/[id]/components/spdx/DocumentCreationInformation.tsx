// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'
import { useState } from 'react'
import DocumentCreationInformation from '../../../../../../../../object-types/spdx/DocumentCreationInformation'
import ExternalDocumentReferences from '../../../../../../../../object-types/spdx/ExternalDocumentReferences'
import styles from '../../detail.module.css'

interface Props {
    documentCreationInformation?: DocumentCreationInformation
}

const DocumentCreationInformationDetail = ({ documentCreationInformation }: Props) => {
    const [toggle, setToggle] = useState(false)
    // const displayIndex = () => {
    //     console.log("index");
    // }

    return (
        <table className={`table label-value-table ${styles['summary-table']}`}>
            <thead
                title='Click to expand or collapse'
                onClick={() => {
                    setToggle(!toggle)
                }}
            >
                <tr>
                    <th colSpan={2}>6. Document Creation Information</th>
                </tr>
            </thead>
            <tbody hidden={toggle}>
                <tr>
                    <td>6.1 SPDX version</td>
                    <td>{documentCreationInformation?.spdxVersion}</td>
                </tr>
                <tr>
                    <td>6.2 Data licens</td>
                    <td>{documentCreationInformation?.dataLicense}</td>
                </tr>
                <tr>
                    <td>6.3 SPDX identifier</td>
                    <td>{documentCreationInformation?.SPDXID}</td>
                </tr>
                <tr>
                    <td>6.4 Document name</td>
                    <td>{documentCreationInformation?.name}</td>
                </tr>
                <tr>
                    <td>6.5 SPDX document namespace</td>
                    <td>{documentCreationInformation?.documentNamespace}</td>
                </tr>
                <tr className='spdx-full'>
                    <td>6.6 External document references</td>
                    <td className='spdx-flex-row'>
                        <div className='spdx-col-2 section' data-size='3'>
                            <div className='spdx-flex-row'>
                                <div className='spdx-col-1 spdx-label-index'>Index</div>
                                <select
                                    className='spdx-col-3'
                                    id='externalDocumentRefs'
                                    // onChange={displayIndex()}
                                ></select>
                            </div>
                            {documentCreationInformation?.externalDocumentRefs &&
                                documentCreationInformation?.externalDocumentRefs.map(
                                    (item: ExternalDocumentReferences) => {
                                        return (
                                            <>
                                                <div className='spdx-flex-row' data-index={item.index}>
                                                    <div className='spdx-col-1 spdx-key'>External document ID</div>
                                                    <div className='spdx-col-3'>{item.externalDocumentId}</div>
                                                </div>
                                                <div className='spdx-flex-row' data-index={item.index}>
                                                    <div className='spdx-col-1 spdx-key'>External document</div>
                                                    <div className='spdx-col-3'>{item.spdxDocument}</div>
                                                </div>
                                                <div className='spdx-flex-row' data-index={item.index}>
                                                    <div className='spdx-col-2 spdx-key'>Checksum</div>
                                                    <div className='spdx-col-3'>
                                                        {item.checksum.algorithm}:{item.checksum.checksumValue}
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }
                                )}
                        </div>
                    </td>
                </tr>
                <tr className='spdx-full'>
                    <td>6.7 License list version</td>
                    <td>{documentCreationInformation?.licenseListVersion}</td>
                </tr>
                <tr>
                    <td>6.8 Creators</td>
                    <td className='spdx-flex-row'>
                        <div className='spdx-col-2' id='creators'>
                            {documentCreationInformation?.creator &&
                                documentCreationInformation.creator.map((creatorData) => {
                                    return (
                                        <div
                                            key={creatorData.index}
                                            className='spdx-flex-row creator'
                                            data-index={creatorData.index}
                                        >
                                            <div className='spdx-col-1 spdx-key'>{creatorData.type}</div>
                                            <div className='spdx-col-3'>{creatorData.value}</div>
                                        </div>
                                    )
                                })}
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>6.9 Created</td>
                    <td>{documentCreationInformation?.created}</td>
                </tr>
                <tr className='spdx-full'>
                    <td>6.10 Creator comment</td>
                    <td>{documentCreationInformation?.creatorComment}</td>
                </tr>
                <tr className='spdx-full'>
                    <td>6.11 Document comment</td>
                    <td>{documentCreationInformation?.documentComment}</td>
                </tr>
            </tbody>
        </table>
    )
}

export default DocumentCreationInformationDetail
