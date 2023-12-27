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

import PackageInformation from '../../../../../../../../object-types/spdx/PackageInformation'
// import RelationshipsBetweenSPDXElements from '../../../../../../../../object-types/spdx/RelationshipsBetweenSPDXElements'
import SPDXDocument from '../../../../../../../../object-types/spdx/SPDXDocument'

interface Props {
    // relationshipsBetweenSPDXElements?: Array<RelationshipsBetweenSPDXElements>
    spdxDocument?: SPDXDocument
    packageInformation?: PackageInformation
}

const RelationshipbetweenSPDXElementsInformation = ({ spdxDocument, packageInformation }: Props) => {
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
                    <th colSpan={2}>11. Relationship between SPDX Elements Information</th>
                </tr>
            </thead>
            <tbody hidden={toggle}>
                <tr>
                    <td>Source</td>
                    <td className='spdx-flex-row' style={{ height: '50.5px' }}>
                        <select
                            id='relationshipSourceSelect'
                            className='spdx-col-2'
                            // onchange='changeRelationshipSource(this)'
                        >
                            <option>SPDX Document</option>
                            <option>Package</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Index</td>
                    <td className='spdx-flex-row' style={{ height: '50.5px' }}>
                        <select
                            id='relationshipSelect'
                            className='spdx-col-2'
                            // onchange='displayRelationshipIndex(this)'
                        ></select>
                    </td>
                </tr>
                {spdxDocument?.relationships?.length !== 0 &&
                    spdxDocument?.relationships?.map((relationshipsData) => {
                        return (
                            <>
                                <tr className='relationship-document' data-index={relationshipsData.index}>
                                    <td>11.1 Relationship</td>
                                    <td>
                                        <div className='spdx-col-2 spdx-flex-col'>
                                            <div className='spdx-flex-row'>
                                                <div>{relationshipsData.spdxElementId}</div>
                                                <div className='spdx-col-1 spdx-flex-row'>
                                                    {relationshipsData.relationshipType.replace(
                                                        'relationshipType_',
                                                        ''
                                                    )}
                                                </div>
                                                <div className='spdx-col-3'>{relationshipsData.relatedSpdxElement}</div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='relationship-document' data-index={relationshipsData.index}>
                                    <td>11.2 Relationship comment</td>
                                    <td>
                                        <p className='spdx-col-2 ' id='relationshipComment-${relationshipsData.index}'>
                                            {relationshipsData.relationshipComment}
                                        </p>
                                    </td>
                                </tr>
                            </>
                        )
                    })}
                {packageInformation?.relationships &&
                    packageInformation?.relationships.map((relationshipsData) => {
                        return (
                            <>
                                <tr className='relationship-package' data-index={relationshipsData.index}>
                                    <td>11.1 Relationship</td>
                                    <td>
                                        <div className='spdx-col-2 spdx-flex-col'>
                                            <div>
                                                <div>{relationshipsData.spdxElementId}</div>
                                                <div className='spdx-col-1 spdx-flex-row'>
                                                    {relationshipsData.relationshipType.replace(
                                                        'relationshipType_',
                                                        ''
                                                    )}
                                                </div>
                                                <div className='spdx-col-3'>{relationshipsData.relatedSpdxElement}</div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='relationship-package' data-index={relationshipsData.index}>
                                    <td>11.2 Relationship comment</td>
                                    <td>
                                        <p className='spdx-col-2 ' id='relationshipComment-${relationshipsData.index}'>
                                            {relationshipsData.relationshipComment}
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

export default RelationshipbetweenSPDXElementsInformation
