// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'
import CommonUtils from '@/utils/common.utils'
import { useEffect, useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import InputKeyValue from '../../../../../../../object-types/InputKeyValue'
import Annotations from '../../../../../../../object-types/spdx/Annotations'
import styles from '../detail.module.css'
import Annotator from './AnnotationInformation/Annotator'

interface Props {
    indexAnnotations?: number
    setIndexAnnotations?: React.Dispatch<React.SetStateAction<number>>
    annotationsSPDXs: Annotations[]
    setAnnotationsSPDXs: React.Dispatch<React.SetStateAction<Annotations[]>>
    annotationsPackages: Annotations[]
    setAnnotationsPackages: React.Dispatch<React.SetStateAction<Annotations[]>>
}

const EditAnnotationInformation = ({
    indexAnnotations,
    setIndexAnnotations,
    annotationsSPDXs,
    setAnnotationsSPDXs,
    annotationsPackages,
    setAnnotationsPackages,
}: Props) => {
    const [toggle, setToggle] = useState(false)
    const [isSourceSPDXDocument, setIsSourceSPDXDocument] = useState<boolean>(true)

    const [dataAnnotator, setDataAnnotator] = useState<InputKeyValue>()
    const handleInputKeyToAnnotator = (data: InputKeyValue) => {
        return data.key + ':' + data.value
    }

    const setAnnotatorToAnnotation = (input: InputKeyValue) => {
        isSourceSPDXDocument
            ? setAnnotationsSPDXs((currents) =>
                  currents.map((annotation, index) => {
                      if (index === indexAnnotations) {
                          return {
                              ...annotation,
                              annotator: handleInputKeyToAnnotator(input),
                          }
                      }
                      return annotation
                  })
              )
            : setAnnotationsPackages((currents) =>
                  currents.map((annotation, index) => {
                      if (index === indexAnnotations) {
                          return {
                              ...annotation,
                              annotator: handleInputKeyToAnnotator(input),
                          }
                      }
                      return annotation
                  })
              )
    }

    const handleDataAnnotator = (data: string) => {
        console.log('------data-----')
        console.log(data)
        const input: InputKeyValue = {
            key: data.split(':')[0],
            value: data.split(':')[1],
        }
        return input
    }

    useEffect(() => {
        if (
            typeof annotationsSPDXs[indexAnnotations]?.annotator !== 'undefined' &&
            typeof annotationsPackages[indexAnnotations]?.annotator !== 'undefined'
        ) {
            isSourceSPDXDocument
                ? setDataAnnotator(handleDataAnnotator(annotationsSPDXs[indexAnnotations]?.annotator))
                : setDataAnnotator(handleDataAnnotator(annotationsPackages[indexAnnotations]?.annotator))
        }
    }, [isSourceSPDXDocument, indexAnnotations, annotationsSPDXs, annotationsPackages])

    const changeAnnotationSource = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const relationshipType: string = e.target.value
        if (relationshipType === 'spdxDoucument') {
            setIsSourceSPDXDocument(true)
            if (!CommonUtils.isNullEmptyOrUndefinedArray(annotationsSPDXs)) {
                setAnnotationsSPDXs(annotationsSPDXs)
            } else {
                setAnnotationsSPDXs([])
            }
        } else if (relationshipType === 'package') {
            setIsSourceSPDXDocument(false)
            if (!CommonUtils.isNullEmptyOrUndefinedArray(annotationsPackages)) {
                setAnnotationsPackages(annotationsPackages)
            } else {
                setAnnotationsPackages([])
            }
        }
    }

    const displayIndex = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const index: string = e.target.value
        setIndexAnnotations(+index)
        // isSourceSPDXDocument ? setAnnotations(annotationsSPDXs[+index]) : setAnnotations(annotationsPackages[+index])
    }

    const addAnnotationsSPDXsSPDX = () => {
        const arrayExternals: Annotations[] = [...annotationsSPDXs]
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
        // setAnnotations(relationshipsBetweenSPDXElements)
    }

    const addAnnotationsSPDXsPackage = () => {
        const arrayExternals: Annotations[] = [...annotationsPackages]
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
        // setAnnotations(relationshipsBetweenSPDXElements)
    }

    const addAnnotation = () => {
        isSourceSPDXDocument ? addAnnotationsSPDXsSPDX() : addAnnotationsSPDXsPackage()
    }

    const updateField = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        isSourceSPDXDocument
            ? setAnnotationsSPDXs((currents) =>
                  currents.map((annotation, index) => {
                      if (index === indexAnnotations) {
                          return {
                              ...annotation,
                              [e.target.name]: e.target.value,
                          }
                      }
                      return annotation
                  })
              )
            : setAnnotationsPackages((currents) =>
                  currents.map((annotation, index) => {
                      if (index === indexAnnotations) {
                          return {
                              ...annotation,
                              [e.target.name]: e.target.value,
                          }
                      }
                      return annotation
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
                {(isSourceSPDXDocument ? annotationsSPDXs : annotationsPackages) && (
                    <>
                        <tr>
                            <td>
                                <Annotator
                                    dataAnnotator={dataAnnotator}
                                    setDataAnnotator={setDataAnnotator}
                                    setAnnotatorToAnnotation={setAnnotatorToAnnotation}
                                />
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
                                                value={
                                                    isSourceSPDXDocument
                                                        ? CommonUtils.fillDate(
                                                              annotationsSPDXs[indexAnnotations]?.annotationDate
                                                          )
                                                        : CommonUtils.fillDate(
                                                              annotationsPackages[indexAnnotations]?.annotationDate
                                                          ) ?? ''
                                                }
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
                                                value={
                                                    isSourceSPDXDocument
                                                        ? CommonUtils.fillTime(
                                                              annotationsSPDXs[indexAnnotations]?.annotationDate
                                                          )
                                                        : CommonUtils.fillTime(
                                                              annotationsPackages[indexAnnotations]?.annotationDate
                                                          ) ?? ''
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ display: 'flex' }}>
                                <div className='form-group' style={{ flex: 1 }}>
                                    ;<label htmlFor='annotationType'>12.3 Annotation type</label>
                                    <input
                                        id='annotationType'
                                        className='form-control'
                                        type='text'
                                        placeholder='Enter annotation type'
                                        name='annotationType'
                                        onChange={updateField}
                                        value={
                                            isSourceSPDXDocument
                                                ? annotationsSPDXs[indexAnnotations]?.annotationType
                                                : annotationsPackages[indexAnnotations]?.annotationType ?? ''
                                        }
                                    />
                                </div>
                                <div className='form-group' style={{ flex: 1 }}>
                                    <label htmlFor='spdxIdRef'>12.4 SPDX identifier reference</label>
                                    <input
                                        id='spdxIdRef'
                                        className='form-control'
                                        name='spdxIdRef'
                                        type='text'
                                        placeholder='Enter SPDX identifier reference'
                                        onChange={updateField}
                                        value={
                                            isSourceSPDXDocument
                                                ? annotationsSPDXs[indexAnnotations]?.spdxIdRef
                                                : annotationsPackages[indexAnnotations]?.spdxIdRef ?? ''
                                        }
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
                                        name='annotationComment'
                                        onChange={updateField}
                                        value={
                                            isSourceSPDXDocument
                                                ? annotationsSPDXs[indexAnnotations]?.annotationComment
                                                : annotationsPackages[indexAnnotations]?.annotationComment ?? ''
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

export default EditAnnotationInformation
