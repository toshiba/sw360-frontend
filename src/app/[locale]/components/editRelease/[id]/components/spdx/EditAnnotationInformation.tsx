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
import SPDX from '../../../../../../../object-types/spdx/SPDX'
import styles from '../detail.module.css'
import AnnotationDate from './AnnotationInformation/AnnotationDate'
import Annotator from './AnnotationInformation/Annotator'

interface Props {
    indexAnnotations?: number
    setIndexAnnotations?: React.Dispatch<React.SetStateAction<number>>
    annotationsSPDXs?: Annotations[]
    setAnnotationsSPDXs?: React.Dispatch<React.SetStateAction<Annotations[]>>
    annotationsPackages?: Annotations[]
    setAnnotationsPackages?: React.Dispatch<React.SetStateAction<Annotations[]>>
    SPDXPayload?: SPDX
    setSPDXPayload?: React.Dispatch<React.SetStateAction<SPDX>>
}

const EditAnnotationInformation = ({
    indexAnnotations,
    setIndexAnnotations,
    annotationsSPDXs,
    setAnnotationsSPDXs,
    annotationsPackages,
    setAnnotationsPackages,
    SPDXPayload,
    setSPDXPayload,
}: Props) => {
    const [toggle, setToggle] = useState(false)
    const [isSourceSPDXDocument, setIsSourceSPDXDocument] = useState<boolean>(true)

    const [dataAnnotator, setDataAnnotator] = useState<InputKeyValue>()
    const handleInputKeyToAnnotator = (data: InputKeyValue) => {
        return data.key + ':' + data.value
    }

    const setAnnotatorToAnnotation = (input: InputKeyValue) => {
        if (isSourceSPDXDocument) {
            const annotationUpdates: Annotations[] = annotationsSPDXs.map((annotation, index) => {
                if (index === indexAnnotations) {
                    return {
                        ...annotation,
                        annotator: handleInputKeyToAnnotator(input),
                    }
                }
                return annotation
            })
            setAnnotationsSPDXs(annotationUpdates)
            setSPDXPayload({
                ...SPDXPayload,
                spdxDocument: {
                    ...SPDXPayload.spdxDocument,
                    annotations: annotationUpdates,
                },
            })
        } else {
            const annotationUpdates: Annotations[] = annotationsPackages.map((annotation, index) => {
                if (index === indexAnnotations) {
                    return {
                        ...annotation,
                        annotator: handleInputKeyToAnnotator(input),
                    }
                }
                return annotation
            })
            setAnnotationsPackages(annotationUpdates)
            setSPDXPayload({
                ...SPDXPayload,
                packageInformation: {
                    ...SPDXPayload.packageInformation,
                    annotations: annotationUpdates,
                },
            })
        }
    }

    const handleDataAnnotator = (data: string) => {
        if (CommonUtils.isNullEmptyOrUndefinedString(data)) {
            const input: InputKeyValue = {
                key: '',
                value: '',
            }
            return input
        }
        const input: InputKeyValue = {
            key: data.split(':')[0],
            value: data.split(':')[1],
        }
        return input
    }

    useEffect(() => {
        if (
            typeof annotationsSPDXs[indexAnnotations]?.annotator !== 'undefined' ||
            typeof annotationsPackages[indexAnnotations]?.annotator !== 'undefined'
        ) {
            isSourceSPDXDocument
                ? setDataAnnotator(handleDataAnnotator(annotationsSPDXs[indexAnnotations]?.annotator))
                : setDataAnnotator(handleDataAnnotator(annotationsPackages[indexAnnotations]?.annotator))
        }

        if (
            typeof annotationsSPDXs[indexAnnotations]?.annotationDate !== 'undefined' ||
            typeof annotationsPackages[indexAnnotations]?.annotationDate !== 'undefined'
        ) {
            isSourceSPDXDocument
                ? setDataAnnotationDate(handleAnnotationDate(annotationsSPDXs[indexAnnotations]?.annotationDate))
                : setDataAnnotationDate(handleAnnotationDate(annotationsPackages[indexAnnotations]?.annotationDate))
        }
    }, [isSourceSPDXDocument, indexAnnotations, annotationsSPDXs, annotationsPackages])

    const changeAnnotationSource = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const relationshipType: string = e.target.value
        if (relationshipType === 'spdxDocument') {
            setIsSourceSPDXDocument(true)
            if (!CommonUtils.isNullEmptyOrUndefinedArray(annotationsSPDXs)) {
                setAnnotationsSPDXs(annotationsSPDXs)
                setSPDXPayload({
                    ...SPDXPayload,
                    spdxDocument: {
                        ...SPDXPayload.spdxDocument,
                        annotations: annotationsSPDXs,
                    },
                })
            } else {
                setAnnotationsSPDXs([])
                setSPDXPayload({
                    ...SPDXPayload,
                    spdxDocument: {
                        ...SPDXPayload.spdxDocument,
                        annotations: [],
                    },
                })
            }
        } else if (relationshipType === 'package') {
            setIsSourceSPDXDocument(false)
            console.log('0000')
            console.log(annotationsPackages)
            if (!CommonUtils.isNullEmptyOrUndefinedArray(annotationsPackages)) {
                console.log('1111')
                setAnnotationsPackages(annotationsPackages)
                setSPDXPayload({
                    ...SPDXPayload,
                    packageInformation: {
                        ...SPDXPayload.packageInformation,
                        annotations: annotationsPackages,
                    },
                })
            } else {
                console.log('2222')
                setAnnotationsPackages([])
                setSPDXPayload({
                    ...SPDXPayload,
                    packageInformation: {
                        ...SPDXPayload.packageInformation,
                        annotations: [],
                    },
                })
            }
        }
    }

    const displayIndex = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const index: string = e.target.value
        if (isSourceSPDXDocument) {
            setIndexAnnotations(+index)
            setNumberIndexSPDX(+index)
            if (CommonUtils.isNullEmptyOrUndefinedString(annotationsSPDXs[+index].annotationDate)) {
                setDataDate('')
                setDataTime('')
            }
        } else {
            setIndexAnnotations(+index)
            setNumberIndexPackage(+index)
            if (CommonUtils.isNullEmptyOrUndefinedString(annotationsPackages[+index].annotationDate)) {
                setDataDate('')
                setDataTime('')
            }
        }
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
        setSPDXPayload({
            ...SPDXPayload,
            spdxDocument: {
                ...SPDXPayload.spdxDocument,
                annotations: arrayExternals,
            },
        })
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
        setSPDXPayload({
            ...SPDXPayload,
            packageInformation: {
                ...SPDXPayload.packageInformation,
                annotations: arrayExternals,
            },
        })
    }

    const addAnnotation = () => {
        isSourceSPDXDocument ? addAnnotationsSPDXsSPDX() : addAnnotationsSPDXsPackage()
    }

    const updateField = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        if (isSourceSPDXDocument) {
            const annotationUpdates: Annotations[] = annotationsSPDXs.map((annotation, index) => {
                if (index === indexAnnotations) {
                    return {
                        ...annotation,
                        [e.target.name]: e.target.value,
                    }
                }
                return annotation
            })
            setAnnotationsSPDXs(annotationUpdates)
            setSPDXPayload({
                ...SPDXPayload,
                spdxDocument: {
                    ...SPDXPayload.spdxDocument,
                    annotations: annotationUpdates,
                },
            })
        } else {
            const annotationUpdates: Annotations[] = annotationsPackages.map((annotation, index) => {
                if (index === indexAnnotations) {
                    return {
                        ...annotation,
                        [e.target.name]: e.target.value,
                    }
                }
                return annotation
            })
            setAnnotationsPackages(annotationUpdates)
            setSPDXPayload({
                ...SPDXPayload,
                packageInformation: {
                    ...SPDXPayload.packageInformation,
                    annotations: annotationUpdates,
                },
            })
        }
    }

    const [dataAnnotationDate, setDataAnnotationDate] = useState<InputKeyValue>()
    const handleAnnotationDate = (data: string) => {
        const input: InputKeyValue = {
            key: CommonUtils.fillDate(data),
            value: CommonUtils.fillTime(data),
        }
        return input
    }

    const convertInputToAnnotationDate = (data: InputKeyValue) => {
        if (data.key == '' || data.value == '') {
            return ''
        }
        const localDate = new Date(data.key + ' ' + data.value)
        return localDate.toISOString().slice(0, -5) + 'Z'
    }

    const [dataDate, setDataDate] = useState('')
    const [dataTime, setDataTime] = useState('')

    const setAnnotationDate = (input: InputKeyValue) => {
        if (isSourceSPDXDocument) {
            const annotationUpdates: Annotations[] = annotationsSPDXs.map((annotation, index) => {
                if (index === indexAnnotations) {
                    return {
                        ...annotation,
                        annotationDate: convertInputToAnnotationDate(input),
                    }
                }
                return annotation
            })
            setAnnotationsSPDXs(annotationUpdates)
            setSPDXPayload({
                ...SPDXPayload,
                spdxDocument: {
                    ...SPDXPayload.spdxDocument,
                    annotations: annotationUpdates,
                },
            })
        } else {
            const annotationUpdates: Annotations[] = annotationsPackages.map((annotation, index) => {
                if (index === indexAnnotations) {
                    return {
                        ...annotation,
                        annotationDate: convertInputToAnnotationDate(input),
                    }
                }
                return annotation
            })
            setAnnotationsPackages(annotationUpdates)
            setSPDXPayload({
                ...SPDXPayload,
                packageInformation: {
                    ...SPDXPayload.packageInformation,
                    annotations: annotationUpdates,
                },
            })
        }
    }

    const [numberIndexSPDX, setNumberIndexSPDX] = useState<number>(0)
    const [numberIndexPackage, setNumberIndexPackage] = useState<number>(0)

    const deleteAnnotation = () => {
        if (isSourceSPDXDocument) {
            if (annotationsSPDXs.length == 1) {
                setAnnotationsSPDXs([])
            } else {
                let annotations: Annotations[] = []
                annotations = annotationsSPDXs.filter((annotations) => numberIndexSPDX != annotations.index)
                setAnnotationsSPDXs(annotations)
                if (!CommonUtils.isNullEmptyOrUndefinedArray(annotations)) {
                    setNumberIndexSPDX(annotations[0].index)
                }
            }
        } else {
            if (annotationsPackages.length == 1) {
                setAnnotationsPackages([])
            } else {
                let annotations: Annotations[] = []
                annotations = annotationsPackages.filter((annotations) => numberIndexPackage != annotations.index)
                setAnnotationsPackages(annotations)
                if (!CommonUtils.isNullEmptyOrUndefinedArray(annotations)) {
                    setNumberIndexPackage(annotations[0].index)
                }
            }
        }
    }

    return (
        annotationsPackages && (
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
                                    <option value='spdxDocument'>SPDX Document</option>
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
                                    <FaTrashAlt onClick={deleteAnnotation} />
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
                                    <AnnotationDate
                                        dataDate={dataDate}
                                        setDataDate={setDataDate}
                                        dataTime={dataTime}
                                        setDataTime={setDataTime}
                                        dataAnnotationDate={dataAnnotationDate}
                                        setDataAnnotationDate={setDataAnnotationDate}
                                        setAnnotationDate={setAnnotationDate}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td style={{ display: 'flex' }}>
                                    <div className='form-group' style={{ flex: 1 }}>
                                        <label htmlFor='annotationType' className='lableSPDX'>
                                            12.3 Annotation type
                                        </label>
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
                                        <label htmlFor='spdxIdRef' className='lableSPDX'>
                                            12.4 SPDX identifier reference
                                        </label>
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
                                        <label htmlFor='annotationComment' className='lableSPDX'>
                                            12.5 Annotation comment
                                        </label>
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
    )
}

export default EditAnnotationInformation
