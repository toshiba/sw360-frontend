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
    indexRelation?: number
    setIndexRelation?: any
    relationshipsBetweenSPDXElementSPDXs: RelationshipsBetweenSPDXElements[]
    setRelationshipsBetweenSPDXElementSPDXs: React.Dispatch<React.SetStateAction<RelationshipsBetweenSPDXElements[]>>
    relationshipsBetweenSPDXElementPackages: RelationshipsBetweenSPDXElements[]
    setRelationshipsBetweenSPDXElementPackages: React.Dispatch<React.SetStateAction<RelationshipsBetweenSPDXElements[]>>
}

const EditRelationshipbetweenSPDXElementsInformation = ({
    indexRelation,
    setIndexRelation,
    relationshipsBetweenSPDXElementSPDXs,
    setRelationshipsBetweenSPDXElementSPDXs,
    relationshipsBetweenSPDXElementPackages,
    setRelationshipsBetweenSPDXElementPackages,
}: Props) => {
    const [toggle, setToggle] = useState(false)
    const [isSourceSPDXDocument, setIsSourceSPDXDocument] = useState<boolean>(true)

    const relationTypes: Array<string> = [
        'DESCRIBES',
        'DESCRIBED_BY',
        'CONTAINS',
        'CONTAINED_BY',
        'DEPENDS_ON',
        'DEPENDENCY_OF',
        'BUILD_DEPENDENCY_OF',
        'DEV_DEPENDENCY_OF',
        'OPTIONAL_DEPENDENCY_OF',
        'PROVIDED_DEPENDENCY_OF',
        'TEST_DEPENDENCY_OF',
        'RUNTIME_DEPENDENCY_OF',
        'EXAMPLE_OF',
        'GENERATES',
        'GENERATED_FROM',
        'ANCESTOR_OF',
        'DESCENDANT_OF',
        'VARIANT_OF',
        'DISTRIBUTION_ARTIFACT',
        'PATCH_FOR',
        'PATCH_APPLIED',
        'COPY_OF',
        'FILE_ADDED',
        'FILE_DELETED',
        'FILE_MODIFIED',
        'EXPANDED_FROM_ARCHIVE',
        'DYNAMIC_LINK',
        'STATIC_LINK',
        'DATA_FILE_OF',
        'TEST_CASE_OF',
        'BUILD_TOOL_OF',
        'DEV_TOOL_OF',
        'TEST_OF',
        'TEST_TOOL_OF',
        'DOCUMENTATION_OF',
        'OPTIONAL_COMPONENT_OF',
        'METAFILE_OF',
        'PACKAGE_OF',
        'AMENDS',
        'PREREQUISITE_FOR',
        'HAS_PREREQUISITE',
        'REQUIREMENT_DESCRIPTION_FOR',
        'SPECIFICATION_FOR',
        'OTHER',
    ]

    const changeRelationshipSource = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const relationshipType: string = e.target.value
        if (relationshipType === 'spdxDoucument') {
            setIsSourceSPDXDocument(true)
            if (!CommonUtils.isNullEmptyOrUndefinedArray(relationshipsBetweenSPDXElementSPDXs)) {
                setRelationshipsBetweenSPDXElementSPDXs(relationshipsBetweenSPDXElementSPDXs)
            } else {
                setRelationshipsBetweenSPDXElementSPDXs([])
            }
        } else if (relationshipType === 'package') {
            setIsSourceSPDXDocument(false)
            if (!CommonUtils.isNullEmptyOrUndefinedArray(relationshipsBetweenSPDXElementPackages)) {
                setRelationshipsBetweenSPDXElementPackages(relationshipsBetweenSPDXElementPackages)
            } else {
                setRelationshipsBetweenSPDXElementPackages([])
            }
        }
    }

    const displayIndex = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const index: string = e.target.value
        setIndexRelation(+index)
    }

    const addRelationshipsBetweenSPDXElementsSPDX = () => {
        const arrayExternals: RelationshipsBetweenSPDXElements[] = [...relationshipsBetweenSPDXElementSPDXs]
        const relationshipsBetweenSPDXElements: RelationshipsBetweenSPDXElements = {
            spdxElementId: '', // 11.1
            relationshipType: '', // 11.1
            relatedSpdxElement: '', // 11.1
            relationshipComment: '', // 11.2
            index: relationshipsBetweenSPDXElementSPDXs.length,
        }
        arrayExternals.push(relationshipsBetweenSPDXElements)
        setRelationshipsBetweenSPDXElementSPDXs(arrayExternals)
    }

    const addRelationshipsBetweenSPDXElementsPackage = () => {
        const arrayExternals: RelationshipsBetweenSPDXElements[] = [...relationshipsBetweenSPDXElementPackages]
        const relationshipsBetweenSPDXElements: RelationshipsBetweenSPDXElements = {
            spdxElementId: '', // 11.1
            relationshipType: '', // 11.1
            relatedSpdxElement: '', // 11.1
            relationshipComment: '', // 11.2
            index: relationshipsBetweenSPDXElementPackages.length,
        }
        arrayExternals.push(relationshipsBetweenSPDXElements)
        setRelationshipsBetweenSPDXElementPackages(arrayExternals)
    }

    const addRelations = () => {
        isSourceSPDXDocument ? addRelationshipsBetweenSPDXElementsSPDX() : addRelationshipsBetweenSPDXElementsPackage()
    }

    const updateField = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        isSourceSPDXDocument
            ? setRelationshipsBetweenSPDXElementSPDXs((currents) =>
                  currents.map((relation, index) => {
                      if (index === indexRelation) {
                          return {
                              ...relation,
                              [e.target.name]: e.target.value,
                          }
                      }
                      return relation
                  })
              )
            : setRelationshipsBetweenSPDXElementPackages((currents) =>
                  currents.map((relation, index) => {
                      if (index === indexRelation) {
                          return {
                              ...relation,
                              [e.target.name]: e.target.value,
                          }
                      }
                      return relation
                  })
              )
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
                {(isSourceSPDXDocument
                    ? relationshipsBetweenSPDXElementSPDXs
                    : relationshipsBetweenSPDXElementPackages) && (
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
                                            name='spdxElementId'
                                            type='text'
                                            placeholder='Enter SPDX element'
                                            onChange={updateField}
                                            value={
                                                isSourceSPDXDocument
                                                    ? relationshipsBetweenSPDXElementSPDXs[indexRelation]?.spdxElementId
                                                    : relationshipsBetweenSPDXElementPackages[indexRelation]
                                                          ?.spdxElementId ?? ''
                                            }
                                        />
                                        <select
                                            className='form-control'
                                            id='relationshipType'
                                            name='relationshipType'
                                            style={{ marginRight: '1rem' }}
                                            onChange={updateField}
                                            value={
                                                isSourceSPDXDocument
                                                    ? relationshipsBetweenSPDXElementSPDXs[indexRelation]
                                                          ?.relationshipType
                                                    : relationshipsBetweenSPDXElementPackages[indexRelation]
                                                          ?.relationshipType ?? ''
                                            }
                                        >
                                            <option value=''></option>
                                            {relationTypes.map((type) => (
                                                <option key={type} value={type}>
                                                    {type}
                                                </option>
                                            ))}
                                        </select>
                                        <input
                                            id='relatedSPDXElement'
                                            className='form-control'
                                            name='relatedSpdxElement'
                                            onChange={updateField}
                                            type='text'
                                            placeholder='Enter related SPDX element'
                                            value={
                                                isSourceSPDXDocument
                                                    ? relationshipsBetweenSPDXElementSPDXs[indexRelation]
                                                          ?.relatedSpdxElement
                                                    : relationshipsBetweenSPDXElementPackages[indexRelation]
                                                          ?.relatedSpdxElement ?? ''
                                            }
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
                                        onChange={updateField}
                                        rows={5}
                                        name='relationshipComment'
                                        placeholder='Enter relationship comment'
                                        value={
                                            isSourceSPDXDocument
                                                ? relationshipsBetweenSPDXElementSPDXs[indexRelation]
                                                      ?.relationshipComment
                                                : relationshipsBetweenSPDXElementPackages[indexRelation]
                                                      ?.relationshipComment ?? ''
                                        }
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
