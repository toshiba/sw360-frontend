// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'
import { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import styles from '../detail.module.css'

// import CommonUtils from '@/utils/common.utils'
// import PackageInformation from '../../../../../../../object-types/spdx/PackageInformation'
// import RelationshipsBetweenSPDXElements from '../../../../../../../object-types/spdx/RelationshipsBetweenSPDXElements'
// import SPDXDocument from '../../../../../../../object-types/spdx/SPDXDocument'

// interface Props {
//     spdxDocument?: SPDXDocument
//     packageInformation?: PackageInformation
//     relationshipsBetweenSPDXElements?: RelationshipsBetweenSPDXElements
//     setRelationshipsBetweenSPDXElements?: React.Dispatch<React.SetStateAction<RelationshipsBetweenSPDXElements>>
//     indexRelationShip?: Array<RelationshipsBetweenSPDXElements>
//     setIndexRelationShip?: React.Dispatch<React.SetStateAction<Array<RelationshipsBetweenSPDXElements>>>
// }

const RelationshipbetweenSPDXElementsInformation = () =>
    //     {
    //     spdxDocument,
    //     packageInformation,
    //     relationshipsBetweenSPDXElements,
    //     setRelationshipsBetweenSPDXElements,
    //     indexRelationShip,
    //     setIndexRelationShip,
    // }: Props
    {
        const [toggle, setToggle] = useState(false)
        // const [isSourceSPDXDocument, setIsSourceSPDXDocument] = useState<boolean>(true)
        // const [index, setIndex] = useState(0)

        // const changeRelationshipSource = (e: React.ChangeEvent<HTMLSelectElement>) => {
        //     const relationshipType: string = e.target.value
        //     if (relationshipType === 'spdxDoucument') {
        //         setIsSourceSPDXDocument(true)

        //         if (!CommonUtils.isNullEmptyOrUndefinedArray(spdxDocument.relationships)) {
        //             setIndexRelationShip(spdxDocument.relationships)
        //             setRelationshipsBetweenSPDXElements(spdxDocument.relationships[index])
        //         } else {
        //             setIndexRelationShip([])
        //             setRelationshipsBetweenSPDXElements(null)
        //         }
        //     } else if (relationshipType === 'package') {
        //         setIsSourceSPDXDocument(false)
        //         if (!CommonUtils.isNullEmptyOrUndefinedArray(packageInformation.relationships)) {
        //             setIndexRelationShip(packageInformation.relationships)
        //             setRelationshipsBetweenSPDXElements(packageInformation.relationships[index])
        //         } else {
        //             setIndexRelationShip([])
        //             setRelationshipsBetweenSPDXElements(null)
        //         }
        //     }
        // }

        // const displayIndex = (e: React.ChangeEvent<HTMLSelectElement>) => {
        //     const index: string = e.target.value
        //     setIndex(+index)
        //     isSourceSPDXDocument
        //         ? setRelationshipsBetweenSPDXElements(spdxDocument.relationships[+index])
        //         : setRelationshipsBetweenSPDXElements(packageInformation.relationships[+index])
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
                        <th colSpan={2}>11. Relationship between SPDX Elements Information</th>
                    </tr>
                </thead>
                <tbody hidden={toggle}>
                    <tr>
                        <td>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    marginBottom: '0.75rem',
                                    paddingLeft: '1rem',
                                }}
                            >
                                <label
                                    htmlFor='selectRelationshipSource'
                                    style={{ textDecoration: 'underline' }}
                                    className='sub-title lableSPDX'
                                >
                                    Select Source
                                </label>
                                <select
                                    id='selectRelationshipSource'
                                    className='form-control spdx-select always-enable'
                                    style={{ marginRight: '4rem' }}
                                >
                                    <option>SPDX Document</option>
                                    <option>Package</option>
                                </select>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '1rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '0.75rem' }}>
                                    <label
                                        htmlFor='selectRelationship'
                                        style={{ textDecoration: 'underline' }}
                                        className='sub-title lableSPDX'
                                    >
                                        Select Relationship
                                    </label>
                                    <select id='selectRelationship' className='form-control spdx-select'></select>
                                    {/* <svg
                                        className='disabled lexicon-icon spdx-delete-icon-main'
                                        name='delete-relationship'
                                        data-row-id=''
                                        viewBox='0 0 512 512'
                                    >
                                        <title>Delete</title>
                                        <use href='/o/org.eclipse.sw360.liferay-theme/images/clay/icons.svg#trash' />
                                    </svg> */}
                                    <FaTrashAlt />
                                </div>
                                <button className='spdx-add-button-main' name='add-relationship'>
                                    Add new Relationship
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className='form-group'>
                                <label htmlFor='spdxElement' className='lableSPDX'>
                                    11.1 Relationship
                                </label>
                                <div style={{ display: 'flex' }}>
                                    <input
                                        style={{ marginRight: '1rem' }}
                                        id='spdxElement'
                                        className='form-control'
                                        name='_sw360_portlet_components_LICENSE_ID'
                                        type='text'
                                        placeholder='Enter SPDX element'
                                    />
                                    <select
                                        className='form-control'
                                        id='relationshipType'
                                        style={{ marginRight: '1rem' }}
                                    >
                                        <option value=''></option>
                                        {/* <core_rt:forEach items="${setRelationshipType}" var="entry">
                                <option value="${entry}" className="textlabel stackedLabel">${entry}</option>
                            </core_rt:forEach> */}
                                    </select>
                                    <input
                                        id='relatedSPDXElement'
                                        className='form-control'
                                        name='_sw360_portlet_components_LICENSE_ID'
                                        type='text'
                                        placeholder='Enter related SPDX element'
                                    />
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className='form-group'>
                                <label htmlFor='relationshipComment' className='lableSPDX'>
                                    11.2 Relationship comment
                                </label>
                                <textarea
                                    className='form-control'
                                    id='relationshipComment'
                                    rows={5}
                                    name='_sw360_portlet_components_RELATIONSHIP_COMMENT'
                                    placeholder='Enter relationship comment'
                                ></textarea>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }

export default RelationshipbetweenSPDXElementsInformation
