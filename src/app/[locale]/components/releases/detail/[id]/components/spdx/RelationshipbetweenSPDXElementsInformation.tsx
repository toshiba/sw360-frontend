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

import CommonUtils from '@/utils/common.utils'
import PackageInformation from '../../../../../../../../object-types/spdx/PackageInformation'
import RelationshipsBetweenSPDXElements from '../../../../../../../../object-types/spdx/RelationshipsBetweenSPDXElements'
import SPDXDocument from '../../../../../../../../object-types/spdx/SPDXDocument'

interface Props {
    spdxDocument?: SPDXDocument
    packageInformation?: PackageInformation
    relationshipsBetweenSPDXElements?: RelationshipsBetweenSPDXElements
    setRelationshipsBetweenSPDXElements?: React.Dispatch<React.SetStateAction<RelationshipsBetweenSPDXElements>>
    indexRelationShip?: Array<RelationshipsBetweenSPDXElements>
    setIndexRelationShip?: React.Dispatch<React.SetStateAction<Array<RelationshipsBetweenSPDXElements>>>
}

const RelationshipbetweenSPDXElementsInformation = ({
    spdxDocument,
    packageInformation,
    relationshipsBetweenSPDXElements,
    setRelationshipsBetweenSPDXElements,
    indexRelationShip,
    setIndexRelationShip,
}: Props) => {
    const [toggle, setToggle] = useState(false)
    const [isSourceSPDXDocument, setIsSourceSPDXDocument] = useState<boolean>(true)
    const [index, setIndex] = useState(0)

    const changeRelationshipSource = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const relationshipType: string = e.target.value
        if (relationshipType === 'spdxDoucument') {
            setIsSourceSPDXDocument(true)

            if (!CommonUtils.isNullEmptyOrUndefinedArray(spdxDocument.relationships)) {
                setIndexRelationShip(spdxDocument.relationships)
                setRelationshipsBetweenSPDXElements(spdxDocument.relationships[index])
            } else {
                setIndexRelationShip([])
                setRelationshipsBetweenSPDXElements(null)
            }
        } else if (relationshipType === 'package') {
            setIsSourceSPDXDocument(false)
            if (!CommonUtils.isNullEmptyOrUndefinedArray(packageInformation.relationships)) {
                setIndexRelationShip(packageInformation.relationships)
                setRelationshipsBetweenSPDXElements(packageInformation.relationships[index])
            } else {
                setIndexRelationShip([])
                setRelationshipsBetweenSPDXElements(null)
            }
        }
    }

    const displayIndex = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const index: string = e.target.value
        setIndex(+index)
        isSourceSPDXDocument
            ? setRelationshipsBetweenSPDXElements(spdxDocument.relationships[+index])
            : setRelationshipsBetweenSPDXElements(packageInformation.relationships[+index])
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
                    <th colSpan={2}>11. Relationship between SPDX Elements Information</th>
                </tr>
            </thead>
            <tbody hidden={toggle}>
                <tr>
                    <td className='spdx-label-index'>Source</td>
                    <td className='spdx-flex-row' style={{ height: '50.5px' }}>
                        <select
                            id='relationshipSourceSelect'
                            className='spdx-col-2'
                            onChange={changeRelationshipSource}
                        >
                            <option value='spdxDoucument'>SPDX Document</option>
                            <option value='package'>Package</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td className='spdx-label-index'>Index</td>
                    <td className='spdx-flex-row' style={{ height: '50.5px' }}>
                        <select id='relationshipSelect' className='spdx-col-2' onChange={displayIndex}>
                            {indexRelationShip &&
                                indexRelationShip
                                    .toSorted((e1, e2) => e1.index - e2.index)
                                    .map((item) => (
                                        <option key={item.index} value={item.index}>
                                            {item.index + 1}
                                        </option>
                                    ))}
                        </select>
                    </td>
                </tr>
                {relationshipsBetweenSPDXElements && (
                    <>
                        <tr className='relationship-document' data-index={relationshipsBetweenSPDXElements.index}>
                            <td>11.1 Relationship</td>
                            <td>
                                <div className='spdx-col-2 spdx-flex-col'>
                                    <div className='spdx-flex-row'>
                                        <div className='spdx-col-1 '>
                                            {relationshipsBetweenSPDXElements.spdxElementId}
                                        </div>
                                        <div className='spdx-col-1 spdx-flex-row'>
                                            {relationshipsBetweenSPDXElements.relationshipType.replace(
                                                'relationshipType_',
                                                ''
                                            )}
                                        </div>
                                        <div className='spdx-col-3'>
                                            {relationshipsBetweenSPDXElements.relatedSpdxElement}
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr className='relationship-document' data-index={relationshipsBetweenSPDXElements.index}>
                            <td>11.2 Relationship comment</td>
                            <td>
                                <p
                                    className='spdx-col-2 '
                                    id='relationshipComment-${relationshipsBetweenSPDXElements.index}'
                                >
                                    {relationshipsBetweenSPDXElements.relationshipComment}
                                </p>
                            </td>
                        </tr>
                    </>
                )}
            </tbody>
        </table>
    )
}

export default RelationshipbetweenSPDXElementsInformation
