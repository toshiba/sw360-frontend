// Copyright (C) Siemens AG, 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

import CommonUtils from '@/utils/common.utils'
import { useState } from 'react'
import InputKeyValue from '../../../../../../../../object-types/InputKeyValue'

interface Props {
    setValidUntilDate?: any
    dataValidUntilDate?: InputKeyValue
    setDataValidUntilDate?: React.Dispatch<React.SetStateAction<InputKeyValue>>
}

function ValidUntilDate({ dataValidUntilDate, setDataValidUntilDate, setValidUntilDate }: Props) {
    const [dataDateValid, setDataDateValid] = useState('')
    const [dataTimeValid, setDataTimeValid] = useState('')
    const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target
        e.target.name === 'key' ? setDataDateValid(e.target.value) : setDataTimeValid(e.target.value)
        const list: InputKeyValue = dataValidUntilDate
        list[name as keyof InputKeyValue] = value
        setDataValidUntilDate(list)
        if (
            !CommonUtils.isNullEmptyOrUndefinedString(dataDateValid) &&
            CommonUtils.isNullEmptyOrUndefinedString(dataTimeValid) &&
            e.target.name === 'value'
        ) {
            setValidUntilDate({ key: dataDateValid, value: e.target.value })
        }
        if (
            CommonUtils.isNullEmptyOrUndefinedString(dataDateValid) &&
            !CommonUtils.isNullEmptyOrUndefinedString(dataTimeValid) &&
            e.target.name === 'key'
        ) {
            setValidUntilDate({ key: e.target.value, value: dataTimeValid })
        }
        if (
            !CommonUtils.isNullEmptyOrUndefinedString(dataDateValid) &&
            !CommonUtils.isNullEmptyOrUndefinedString(dataTimeValid)
        ) {
            if (e.target.name === 'key') {
                setValidUntilDate({ key: e.target.value, value: dataTimeValid })
            } else {
                setValidUntilDate({ key: dataDateValid, value: e.target.value })
            }
        }
    }

    return (
        dataValidUntilDate && (
            <td colSpan={3}>
                <div className='form-group'>
                    <label className='lableSPDX' htmlFor='createdDate'>
                        7.27 Valid Until Date
                    </label>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            marginBottom: '0.75rem',
                        }}
                    >
                        <div>
                            <input
                                id='createValidUntilDate'
                                type='date'
                                className='form-control spdx-date needs-validation'
                                placeholder='created.date.yyyy.mm.dd'
                                name='key'
                                onChange={handleInputChange}
                                value={dataValidUntilDate.key ?? ''}
                            />
                        </div>
                        <div>
                            <input
                                id='createdValidUntilTime'
                                type='time'
                                step='1'
                                className='form-control spdx-time needs-validation'
                                placeholder='created.time.hh.mm.ss'
                                name='value'
                                onChange={handleInputChange}
                                value={dataValidUntilDate.value ?? ''}
                            />
                        </div>
                    </div>
                </div>
            </td>
        )
    )
}

export default ValidUntilDate
