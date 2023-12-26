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
import PackageInformation from '../../../../../../../../object-types/spdx/PackageInformation'
import SPDXDocument from '../../../../../../../../object-types/spdx/SPDXDocument'
import styles from '../../detail.module.css'

interface Props {
    // annotations: Array<Annotations>
    spdxDocument?: SPDXDocument
    packageInformation?: PackageInformation
}

const AnnotationInformation = ({ spdxDocument, packageInformation }: Props) => {
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
                    <th colSpan={2}>12. Annotation Information</th>
                </tr>
            </thead>
            <tbody hidden={toggle}>
                <tr>
                    <td>Source</td>
                    <td className='spdx-flex-row'>
                        <select
                            id='annotationSourceSelect'
                            className='spdx-col-2'
                            // onchange='changeAnnotationSource(this)'
                        >
                            <option>SPDX Document</option>
                            <option>Package</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Index</td>
                    <td className='spdx-flex-row'>
                        <select
                            id='annotationSelect'
                            className='spdx-col-2'
                            // onchange='displayAnnotationIndex(this)'
                        ></select>
                    </td>
                </tr>
                {spdxDocument?.annotations?.length !== 0 &&
                    spdxDocument?.annotations?.map((annotationsData) => {
                        return (
                            <>
                                <tr className='annotation-document' data-index={annotationsData.index}>
                                    <td>12.1 Annotator</td>
                                    <td className='spdx-flex-row'>
                                        <p className='spdx-col-2 '>{annotationsData.annotator}</p>
                                    </td>
                                </tr>
                                <tr className='annotation-document' data-index={annotationsData.index}>
                                    <td>12.2 Annotation date</td>
                                    <td className='spdx-flex-row'>
                                        <p className='spdx-col-2 ' id='annotation-document-date-${loop.count}'>
                                            {annotationsData.annotationDate}
                                        </p>
                                    </td>
                                </tr>
                                <tr className='annotation-document' data-index={annotationsData.index}>
                                    <td>12.3 Annotation type</td>
                                    <td className='spdx-flex-row'>
                                        <div className='spdx-col-2'>
                                            <div className='spdx-flex-row'>
                                                <div className='spdx-col-3'>{annotationsData.annotationType}</div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='annotation-document' data-index={annotationsData.index}>
                                    <td>12.4 SPDX identifier reference</td>
                                    <td className='spdx-flex-row'>
                                        <div className='spdx-col-2'>{annotationsData.spdxIdRef}</div>
                                    </td>
                                </tr>
                                <tr className='annotation-document' data-index={annotationsData.index}>
                                    <td>12.5 Annotation comment</td>
                                    <td className='spdx-flex-row'>
                                        <p
                                            className='spdx-col-2 '
                                            id='documentAnnotationComment-${annotationsData.index}'
                                        >
                                            {annotationsData.annotationComment}
                                        </p>
                                    </td>
                                </tr>
                            </>
                        )
                    })}
                {packageInformation?.annotations &&
                    packageInformation?.annotations.map((annotationsData) => {
                        return (
                            <>
                                <tr className='annotation-package' data-index={annotationsData.index}>
                                    <td>12.1 Annotator</td>
                                    <td className='spdx-flex-row'>
                                        <p className='spdx-col-2 '>{annotationsData.annotator}</p>
                                    </td>
                                </tr>
                                <tr className='annotation-package' data-index={annotationsData.index}>
                                    <td>12.2 Annotation date</td>
                                    <td className='spdx-flex-row'>
                                        <p className='spdx-col-2 ' id='annotation-package-date-${loop.count}'>
                                            {annotationsData.annotationDate}
                                        </p>
                                    </td>
                                </tr>
                                <tr className='annotation-package' data-index={annotationsData.index}>
                                    <td>12.3 Annotation type</td>
                                    <td className='spdx-flex-row'>
                                        <div className='spdx-col-2'>
                                            <div className='spdx-flex-row'>
                                                <div className='spdx-col-3'>{annotationsData.annotationType}</div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='annotation-package' data-index={annotationsData.index}>
                                    <td>12.4 SPDX identifier reference</td>
                                    <td className='spdx-flex-row'>
                                        <div className='spdx-col-2'>{annotationsData.spdxIdRef}</div>
                                    </td>
                                </tr>
                                <tr className='annotation-package' data-index={annotationsData.index}>
                                    <td>12.5 Annotation comment</td>
                                    <td className='spdx-flex-row'>
                                        <p
                                            className='spdx-col-2 '
                                            id='packageAnnotationComment-${annotationsData.index}'
                                        >
                                            {annotationsData.annotationComment}
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

export default AnnotationInformation
