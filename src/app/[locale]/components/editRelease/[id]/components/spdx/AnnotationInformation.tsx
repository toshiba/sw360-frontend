// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'
import { useState } from 'react'
// import Annotations from '../../../../../../../../object-types/spdx/Annotations'
import { FaTrashAlt } from 'react-icons/fa'
import styles from '../detail.module.css'

// interface Props {
//     spdxDocument?: SPDXDocument
//     packageInformation?: PackageInformation
//     annotations?: Annotations
//     setAnnotations?: React.Dispatch<React.SetStateAction<Annotations>>
//     indexAnnotations?: Array<Annotations>
//     setIndexAnnotations?: React.Dispatch<React.SetStateAction<Array<Annotations>>>
// }

const AnnotationInformation = () =>
    //     {
    //     spdxDocument,
    //     packageInformation,
    //     annotations,
    //     setAnnotations,
    //     indexAnnotations,
    //     setIndexAnnotations,
    // }: Props
    {
        const [toggle, setToggle] = useState(false)
        // const [isSourceSPDXDocument, setIsSourceSPDXDocument] = useState<boolean>(true)
        // const [index, setIndex] = useState(0)

        // const changeAnnotationSource = (e: React.ChangeEvent<HTMLSelectElement>) => {
        //     const relationshipType: string = e.target.value
        //     if (relationshipType === 'spdxDoucument') {
        //         setIsSourceSPDXDocument(true)
        //         if (!CommonUtils.isNullEmptyOrUndefinedArray(spdxDocument.annotations)) {
        //             setIndexAnnotations(spdxDocument.annotations)
        //             setAnnotations(spdxDocument.annotations[index])
        //         } else {
        //             setIndexAnnotations([])
        //             setAnnotations(null)
        //         }
        //     } else if (relationshipType === 'package') {
        //         setIsSourceSPDXDocument(false)
        //         if (!CommonUtils.isNullEmptyOrUndefinedArray(packageInformation.annotations)) {
        //             setIndexAnnotations(packageInformation.annotations)
        //             setAnnotations(packageInformation.annotations[index])
        //         } else {
        //             setIndexAnnotations([])
        //             setAnnotations(null)
        //         }
        //     }
        // }

        // const displayIndex = (e: React.ChangeEvent<HTMLSelectElement>) => {
        //     const index: string = e.target.value
        //     setIndex(+index)
        //     isSourceSPDXDocument
        //         ? setAnnotations(spdxDocument.annotations[+index])
        //         : setAnnotations(packageInformation.annotations[+index])
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
                        <th colSpan={3}>12. Annotation Information</th>
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
                                    htmlFor='selectAnnotationSource'
                                    style={{ textDecoration: 'underline' }}
                                    className='sub-title lableSPDX'
                                >
                                    Select Source
                                </label>
                                <select
                                    id='selectAnnotationSource'
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
                                        htmlFor='selectAnnotation'
                                        style={{ textDecoration: 'underline' }}
                                        className='sub-title lableSPDX'
                                    >
                                        Select Annotation
                                    </label>
                                    <select id='selectAnnotation' className='form-control spdx-select'></select>
                                    <FaTrashAlt />
                                </div>
                                <button className='spdx-add-button-main' name='add-annotation'>
                                    Add new Annotation
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className='form-group' style={{ flex: 3 }}>
                                <label htmlFor='annotator'>12.1 Annotator</label>
                                <div style={{ display: 'flex' }}>
                                    <select
                                        id='annotatorType'
                                        style={{ flex: 2, marginRight: '1rem' }}
                                        className='form-control'
                                        aria-placeholder='Enter type'
                                    >
                                        <option value='Organization'>Organization</option>
                                        <option value='Person'>Person</option>
                                        <option value='Tool'>Tool</option>
                                    </select>
                                    <input
                                        style={{ flex: 6, marginRight: '1rem' }}
                                        id='annotatorValue'
                                        type='text'
                                        className='form-control'
                                        placeholder='Enter annotator'
                                    />
                                </div>
                            </div>
                            <div className='form-group' style={{ flex: 1 }}>
                                <label htmlFor='annotationCreatedDate'>12.2 Annotation date </label>
                                <div style={{ display: 'flex' }}>
                                    <div>
                                        <input
                                            id='annotationCreatedDate'
                                            style={{ width: '12rem', textAlign: 'center' }}
                                            type='date'
                                            className='form-control needs-validation'
                                            placeholder='creation.date.yyyy.mm.dd'
                                        />
                                    </div>
                                    <div>
                                        <input
                                            id='annotationCreatedTime'
                                            style={{ width: '12rem', textAlign: 'center', marginLeft: '10px' }}
                                            type='time'
                                            step='1'
                                            className='form-control needs-validation'
                                            placeholder='creation.time.hh.mm.ss'
                                        />
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ display: 'flex' }}>
                            <div className='form-group' style={{ flex: 1 }}>
                                <label htmlFor='annotationType'>12.3 Annotation type</label>
                                <input
                                    id='annotationType'
                                    className='form-control'
                                    type='text'
                                    placeholder='Enter annotation type'
                                />
                            </div>
                            <div className='form-group' style={{ flex: 1 }}>
                                <label htmlFor='spdxIdRef'>12.4 SPDX identifier reference</label>
                                <input
                                    id='spdxIdRef'
                                    className='form-control'
                                    type='text'
                                    placeholder='Enter SPDX identifier reference'
                                />
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <div className='form-group'>
                                <label htmlFor='annotationComment'>12.5 Annotation comment</label>
                                <textarea
                                    className='form-control'
                                    id='annotationComment'
                                    rows={5}
                                    placeholder='Enter annotation comment'
                                ></textarea>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }

export default AnnotationInformation
