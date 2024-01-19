// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'
import CommonUtils from '@/utils/common.utils'
import { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import Annotations from '../../../../../../../object-types/spdx/Annotations'
import styles from '../detail.module.css'

interface Props {
    annotations?: Annotations
    setAnnotations?: React.Dispatch<React.SetStateAction<Annotations>>
    annotationsSPDXs: Annotations[]
    setAnnotationsSPDXs: React.Dispatch<React.SetStateAction<Annotations[]>>
    annotationsPackages: Annotations[]
    setAnnotationsPackages: React.Dispatch<React.SetStateAction<Annotations[]>>
}

const EditAnnotationInformation = ({
    annotations,
    setAnnotations,
    annotationsSPDXs,
    setAnnotationsSPDXs,
    annotationsPackages,
    setAnnotationsPackages,
}: Props) => {
    const [toggle, setToggle] = useState(false)
    const [isSourceSPDXDocument, setIsSourceSPDXDocument] = useState<boolean>(true)
    const [index, setIndex] = useState(0)

    const changeAnnotationSource = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const relationshipType: string = e.target.value
        if (relationshipType === 'spdxDoucument') {
            setIsSourceSPDXDocument(true)
            if (!CommonUtils.isNullEmptyOrUndefinedArray(annotationsSPDXs)) {
                setAnnotationsSPDXs(annotationsSPDXs)
                if (!CommonUtils.isNullOrUndefined(annotationsSPDXs[index])) {
                    setAnnotations(annotationsSPDXs[index])
                } else {
                    setAnnotations(annotationsSPDXs[0])
                }
            } else {
                setAnnotationsSPDXs([])
                setAnnotations(null)
            }
        } else if (relationshipType === 'package') {
            setIsSourceSPDXDocument(false)
            if (!CommonUtils.isNullEmptyOrUndefinedArray(annotationsPackages)) {
                setAnnotationsPackages(annotationsPackages)
                if (!CommonUtils.isNullOrUndefined(annotationsPackages[index])) {
                    setAnnotations(annotationsPackages[index])
                } else {
                    setAnnotations(annotationsPackages[0])
                }
            } else {
                setAnnotationsPackages([])
                setAnnotations(null)
            }
        }
    }

    const displayIndex = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const index: string = e.target.value
        setIndex(+index)
        isSourceSPDXDocument ? setAnnotations(annotationsSPDXs[+index]) : setAnnotations(annotationsPackages[+index])
    }

    const addAnnotationsSPDXsSPDX = () => {
        const arrayExternals: Annotations[] = annotationsSPDXs
        const relationshipsBetweenSPDXElements: Annotations = {
            annotator: '', // 12.1
            annotationDate: '', // 12.2
            annotationType: '', // 12.3
            spdxIdRef: '', // 12.4
            annotationComment: '', // 12.5
            index: annotationsSPDXs.length,
        }
        arrayExternals.push(relationshipsBetweenSPDXElements)
        setAnnotationsSPDXs(arrayExternals)
        setAnnotations(relationshipsBetweenSPDXElements)
    }

    const addAnnotationsSPDXsPackage = () => {
        const arrayExternals: Annotations[] = annotationsPackages
        const relationshipsBetweenSPDXElements: Annotations = {
            annotator: '', // 12.1
            annotationDate: '', // 12.2
            annotationType: '', // 12.3
            spdxIdRef: '', // 12.4
            annotationComment: '', // 12.5
            index: annotationsPackages.length,
        }
        arrayExternals.push(relationshipsBetweenSPDXElements)
        setAnnotationsPackages(arrayExternals)
        setAnnotations(relationshipsBetweenSPDXElements)
    }

    const addAnnotation = () => {
        isSourceSPDXDocument ? addAnnotationsSPDXsSPDX() : addAnnotationsSPDXsPackage()
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
                                onChange={changeAnnotationSource}
                            >
                                <option value='spdxDoucument'>SPDX Document</option>
                                <option value='package'>Package</option>
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
                                <select
                                    id='selectAnnotation'
                                    className='form-control spdx-select'
                                    onChange={displayIndex}
                                >
                                    {isSourceSPDXDocument
                                        ? annotationsSPDXs.map((item) => (
                                              <option key={item.index} value={item.index}>
                                                  {item.index + 1}
                                              </option>
                                          ))
                                        : annotationsPackages.map((item) => (
                                              <option key={item.index} value={item.index}>
                                                  {item.index + 1}
                                              </option>
                                          ))}
                                </select>
                                <FaTrashAlt />
                            </div>
                            <button className='spdx-add-button-main' name='add-annotation' onClick={addAnnotation}>
                                Add new Annotation
                            </button>
                        </div>
                    </td>
                </tr>
                {annotations && (
                    <>
                        <tr>
                            <td>
                                <div className='form-group' style={{ flex: 3 }}>
                                    <label htmlFor='annotator'>12.1 Annotator</label>
                                    <div style={{ display: 'flex' }}>
                                        <select
                                            id='annotatorType'
                                            style={{ flex: 2, marginRight: '1rem' }}
                                            className='form-control'
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
                                            value={annotations.annotator.substring(13) ?? ''}
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
                                                value={CommonUtils.fillDate(annotations.annotationDate) ?? ''}
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
                                                value={CommonUtils.fillTime(annotations.annotationDate) ?? ''}
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
                                        value={annotations.annotationType ?? ''}
                                    />
                                </div>
                                <div className='form-group' style={{ flex: 1 }}>
                                    <label htmlFor='spdxIdRef'>12.4 SPDX identifier reference</label>
                                    <input
                                        id='spdxIdRef'
                                        className='form-control'
                                        type='text'
                                        placeholder='Enter SPDX identifier reference'
                                        value={annotations.spdxIdRef ?? ''}
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
                                        value={annotations.annotationComment ?? ''}
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

export default EditAnnotationInformation
