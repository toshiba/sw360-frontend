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

import CommonUtils from '@/utils/common.utils'
import RelationshipsBetweenSPDXElements from '../../../../../../../object-types/spdx/RelationshipsBetweenSPDXElements'

interface Props {
    relationshipsBetweenSPDXElements?: RelationshipsBetweenSPDXElements
    setRelationshipsBetweenSPDXElements?: React.Dispatch<React.SetStateAction<RelationshipsBetweenSPDXElements>>
    relationshipsBetweenSPDXElementSPDXs: RelationshipsBetweenSPDXElements[]
    setRelationshipsBetweenSPDXElementSPDXs: React.Dispatch<React.SetStateAction<RelationshipsBetweenSPDXElements[]>>
    relationshipsBetweenSPDXElementPackages: RelationshipsBetweenSPDXElements[]
    setRelationshipsBetweenSPDXElementPackages: React.Dispatch<React.SetStateAction<RelationshipsBetweenSPDXElements[]>>
}

const EditRelationshipbetweenSPDXElementsInformation = ({
    relationshipsBetweenSPDXElements,
    setRelationshipsBetweenSPDXElements,
    relationshipsBetweenSPDXElementSPDXs,
    setRelationshipsBetweenSPDXElementSPDXs,
    relationshipsBetweenSPDXElementPackages,
    setRelationshipsBetweenSPDXElementPackages,
}: Props) => {
    const [toggle, setToggle] = useState(false)
    const [isSourceSPDXDocument, setIsSourceSPDXDocument] = useState<boolean>(true)
    const [index, setIndex] = useState(0)

    const changeRelationshipSource = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const relationshipType: string = e.target.value
        if (relationshipType === 'spdxDoucument') {
            setIsSourceSPDXDocument(true)
            if (!CommonUtils.isNullEmptyOrUndefinedArray(relationshipsBetweenSPDXElementSPDXs)) {
                setRelationshipsBetweenSPDXElementSPDXs(relationshipsBetweenSPDXElementSPDXs)
                if (!CommonUtils.isNullOrUndefined(relationshipsBetweenSPDXElementSPDXs[index])) {
                    setRelationshipsBetweenSPDXElements(relationshipsBetweenSPDXElementSPDXs[index])
                } else {
                    setRelationshipsBetweenSPDXElements(relationshipsBetweenSPDXElementSPDXs[0])
                }
            } else {
                setRelationshipsBetweenSPDXElementSPDXs([])
                setRelationshipsBetweenSPDXElements(null)
            }
        } else if (relationshipType === 'package') {
            setIsSourceSPDXDocument(false)
            if (!CommonUtils.isNullEmptyOrUndefinedArray(relationshipsBetweenSPDXElementPackages)) {
                setRelationshipsBetweenSPDXElementPackages(relationshipsBetweenSPDXElementPackages)
                if (!CommonUtils.isNullOrUndefined(relationshipsBetweenSPDXElementPackages[index])) {
                    setRelationshipsBetweenSPDXElements(relationshipsBetweenSPDXElementPackages[index])
                } else {
                    setRelationshipsBetweenSPDXElements(relationshipsBetweenSPDXElementPackages[0])
                }
            } else {
                setRelationshipsBetweenSPDXElementPackages([])
                setRelationshipsBetweenSPDXElements(null)
            }
        }
    }

    const displayIndex = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const index: string = e.target.value
        setIndex(+index)
        isSourceSPDXDocument
            ? setRelationshipsBetweenSPDXElements(relationshipsBetweenSPDXElementSPDXs[+index])
            : setRelationshipsBetweenSPDXElements(relationshipsBetweenSPDXElementPackages[+index])
    }

    const addRelationshipsBetweenSPDXElementsSPDX = () => {
        const arrayExternals: RelationshipsBetweenSPDXElements[] = relationshipsBetweenSPDXElementSPDXs
        const relationshipsBetweenSPDXElements: RelationshipsBetweenSPDXElements = {
            spdxElementId: '', // 11.1
            relationshipType: '', // 11.1
            relatedSpdxElement: '', // 11.1
            relationshipComment: '', // 11.2
            index: relationshipsBetweenSPDXElementSPDXs.length,
        }
        arrayExternals.push(relationshipsBetweenSPDXElements)
        setRelationshipsBetweenSPDXElementSPDXs(arrayExternals)
        setRelationshipsBetweenSPDXElements(relationshipsBetweenSPDXElements)
    }

    const addRelationshipsBetweenSPDXElementsPackage = () => {
        const arrayExternals: RelationshipsBetweenSPDXElements[] = relationshipsBetweenSPDXElementPackages
        const relationshipsBetweenSPDXElements: RelationshipsBetweenSPDXElements = {
            spdxElementId: '', // 11.1
            relationshipType: '', // 11.1
            relatedSpdxElement: '', // 11.1
            relationshipComment: '', // 11.2
            index: relationshipsBetweenSPDXElementPackages.length,
        }
        arrayExternals.push(relationshipsBetweenSPDXElements)
        setRelationshipsBetweenSPDXElementPackages(arrayExternals)
        setRelationshipsBetweenSPDXElements(relationshipsBetweenSPDXElements)
    }

    const addRelations = () => {
        isSourceSPDXDocument ? addRelationshipsBetweenSPDXElementsSPDX() : addRelationshipsBetweenSPDXElementsPackage()
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
                                onChange={changeRelationshipSource}
                            >
                                <option value='spdxDoucument'>SPDX Document</option>
                                <option value='package'>Package</option>
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
                                <select
                                    id='selectRelationship'
                                    className='form-control spdx-select'
                                    onChange={displayIndex}
                                >
                                    {isSourceSPDXDocument
                                        ? relationshipsBetweenSPDXElementSPDXs.map((item) => (
                                              <option key={item.index} value={item.index}>
                                                  {item.index + 1}
                                              </option>
                                          ))
                                        : relationshipsBetweenSPDXElementPackages.map((item) => (
                                              <option key={item.index} value={item.index}>
                                                  {item.index + 1}
                                              </option>
                                          ))}
                                </select>
                                <FaTrashAlt />
                            </div>
                            <button className='spdx-add-button-main' name='add-relationship' onClick={addRelations}>
                                Add new Relationship
                            </button>
                        </div>
                    </td>
                </tr>
                {relationshipsBetweenSPDXElements && (
                    <>
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
                                            value={relationshipsBetweenSPDXElements.spdxElementId ?? ''}
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
                                            value={relationshipsBetweenSPDXElements.relatedSpdxElement}
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
                                        value={relationshipsBetweenSPDXElements.relationshipComment ?? ''}
                                    ></textarea>
                                </div>
                            </td>
                        </tr>
                    </>
                )}
            </tbody>
        </table>
    )
}

export default EditRelationshipbetweenSPDXElementsInformation
