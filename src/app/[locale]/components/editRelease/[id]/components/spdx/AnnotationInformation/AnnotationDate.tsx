// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

import { InputKeyValue } from '@/object-types'
import CommonUtils from '@/utils/common.utils'

interface Props {
    setAnnotationDate?: (input: InputKeyValue) => void
    dataAnnotationDate?: InputKeyValue
    setDataAnnotationDate?: React.Dispatch<React.SetStateAction<InputKeyValue>>
    dataDate?: string
    setDataDate?: React.Dispatch<React.SetStateAction<string>>
    dataTime?: string
    setDataTime?: React.Dispatch<React.SetStateAction<string>>
}

function AnnotationDate({
    dataAnnotationDate,
    setDataAnnotationDate,
    setAnnotationDate,
    dataDate,
    dataTime,
    setDataDate,
    setDataTime,
}: Props) {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        e.target.name === 'key' ? setDataDate(e.target.value) : setDataTime(e.target.value)
        const list: InputKeyValue = dataAnnotationDate
        list[name as keyof InputKeyValue] = value
        setDataAnnotationDate(list)

        if (
            !CommonUtils.isNullEmptyOrUndefinedString(dataDate) &&
            CommonUtils.isNullEmptyOrUndefinedString(dataTime) &&
            e.target.name === 'value'
        ) {
            setAnnotationDate(list)
        }

        if (
            CommonUtils.isNullEmptyOrUndefinedString(dataDate) &&
            !CommonUtils.isNullEmptyOrUndefinedString(dataTime) &&
            e.target.name === 'value'
        ) {
            setAnnotationDate(list)
        }

        // Check Key
        if (
            CommonUtils.isNullEmptyOrUndefinedString(dataDate) &&
            !CommonUtils.isNullEmptyOrUndefinedString(dataTime) &&
            e.target.name === 'key'
        ) {
            setAnnotationDate(list)
        }

        if (
            !CommonUtils.isNullEmptyOrUndefinedString(dataDate) &&
            CommonUtils.isNullEmptyOrUndefinedString(dataTime) &&
            e.target.name === 'key'
        ) {
            setAnnotationDate(list)
        }

        if (
            !CommonUtils.isNullEmptyOrUndefinedString(dataDate) &&
            !CommonUtils.isNullEmptyOrUndefinedString(dataTime)
        ) {
            setAnnotationDate(list)
        }

        if (
            CommonUtils.isNullEmptyOrUndefinedString(dataDate) &&
            CommonUtils.isNullEmptyOrUndefinedString(dataTime) &&
            !CommonUtils.isNullEmptyOrUndefinedString(list.key) &&
            !CommonUtils.isNullEmptyOrUndefinedString(list.value)
        ) {
            setAnnotationDate(list)
        }
    }

    return (
        dataAnnotationDate && (
            <div className='form-group' style={{ flex: 1, marginLeft: '1.5rem' }}>
                <label className='lableSPDX' htmlFor='annotationCreatedDate'>
                    12.2 Annotation date{' '}
                </label>
                <div style={{ display: 'flex' }}>
                    <div>
                        <input
                            id='annotationCreatedDate'
                            style={{ width: '12rem', textAlign: 'center' }}
                            type='date'
                            name='key'
                            className='form-control needs-validation'
                            placeholder='creation.date.yyyy.mm.dd'
                            onChange={handleInputChange}
                            value={dataAnnotationDate?.key ?? ''}
                        />
                    </div>
                    <div>
                        <input
                            id='annotationCreatedTime'
                            style={{ width: '12rem', textAlign: 'center', marginLeft: '10px' }}
                            type='time'
                            step='1'
                            name='value'
                            className='form-control needs-validation'
                            placeholder='creation.time.hh.mm.ss'
                            onChange={handleInputChange}
                            value={dataAnnotationDate?.value ?? ''}
                        />
                    </div>
                </div>
            </div>
        )
    )
}

export default AnnotationDate
