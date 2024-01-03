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
import CommonUtils from '@/utils/common.utils'
import Annotations from '../../../../../../../../object-types/spdx/Annotations'
import PackageInformation from '../../../../../../../../object-types/spdx/PackageInformation'
import SPDXDocument from '../../../../../../../../object-types/spdx/SPDXDocument'
import styles from '../../detail.module.css'

interface Props {
    spdxDocument?: SPDXDocument
    packageInformation?: PackageInformation
    annotations?: Annotations
    setAnnotations?: React.Dispatch<React.SetStateAction<Annotations>>
    indexAnnotations?: Array<Annotations>
    setIndexAnnotations?: React.Dispatch<React.SetStateAction<Array<Annotations>>>
}

const AnnotationInformation = ({
    spdxDocument,
    packageInformation,
    annotations,
    setAnnotations,
    indexAnnotations,
    setIndexAnnotations,
}: Props) => {
    const [toggle, setToggle] = useState(false)
    const [isSourceSPDXDocument, setIsSourceSPDXDocument] = useState<boolean>(true)
    const [index, setIndex] = useState(0)

    const changeAnnotationSource = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const relationshipType: string = e.target.value
        if (relationshipType === 'spdxDoucument') {
            setIsSourceSPDXDocument(true)
            if (!CommonUtils.isNullEmptyOrUndefinedArray(spdxDocument.annotations)) {
                setIndexAnnotations(spdxDocument.annotations)
                setAnnotations(spdxDocument.annotations[index])
            } else {
                setIndexAnnotations([])
                setAnnotations(null)
            }
        } else if (relationshipType === 'package') {
            setIsSourceSPDXDocument(false)
            if (!CommonUtils.isNullEmptyOrUndefinedArray(packageInformation.annotations)) {
                setIndexAnnotations(packageInformation.annotations)
                setAnnotations(packageInformation.annotations[index])
            } else {
                setIndexAnnotations([])
                setAnnotations(null)
            }
        }
    }

    const displayIndex = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const index: string = e.target.value
        setIndex(+index)
        isSourceSPDXDocument
            ? setAnnotations(spdxDocument.annotations[+index])
            : setAnnotations(packageInformation.annotations[+index])
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
                    <th colSpan={2}>12. Annotation Information</th>
                </tr>
            </thead>
            <tbody hidden={toggle}>
                <tr>
                    <td className='spdx-label-index'>Source</td>
                    <td className='spdx-flex-row' style={{ height: '50px' }}>
                        <select id='annotationSourceSelect' className='spdx-col-2' onChange={changeAnnotationSource}>
                            <option value='spdxDoucument'>SPDX Document</option>
                            <option value='package'>Package</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td className='spdx-label-index'>Index</td>
                    <td className='spdx-flex-row' style={{ height: '50px' }}>
                        <select id='annotationSelect' className='spdx-col-2' onChange={displayIndex}>
                            {indexAnnotations &&
                                indexAnnotations
                                    .toSorted((e1, e2) => e1.index - e2.index)
                                    .map((item) => (
                                        <option key={item.index} value={item.index}>
                                            {item.index + 1}
                                        </option>
                                    ))}
                        </select>
                    </td>
                </tr>
                {annotations && (
                    <>
                        <tr className='annotation-document' data-index={annotations.index}>
                            <td>12.1 Annotator</td>
                            <td>
                                <p className='spdx-col-2 '>{annotations.annotator}</p>
                            </td>
                        </tr>
                        <tr className='annotation-document' data-index={annotations.index}>
                            <td>12.2 Annotation date</td>
                            <td>
                                <p className='spdx-col-2 ' id='annotation-document-date-${loop.count}'>
                                    {annotations.annotationDate}
                                </p>
                            </td>
                        </tr>
                        <tr className='annotation-document' data-index={annotations.index}>
                            <td>12.3 Annotation type</td>
                            <td>
                                <div className='spdx-col-2'>
                                    <div className='spdx-flex-row'>
                                        <div className='spdx-col-3'>{annotations.annotationType}</div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr className='annotation-document' data-index={annotations.index}>
                            <td>12.4 SPDX identifier reference</td>
                            <td>{annotations.spdxIdRef}</td>
                        </tr>
                        <tr className='annotation-document' data-index={annotations.index}>
                            <td>12.5 Annotation comment</td>
                            <td>
                                <p className='spdx-col-2 ' id='documentAnnotationComment-${annotations.index}'>
                                    {annotations.annotationComment}
                                </p>
                            </td>
                        </tr>
                    </>
                )}
            </tbody>
        </table>
    )
}

export default AnnotationInformation
