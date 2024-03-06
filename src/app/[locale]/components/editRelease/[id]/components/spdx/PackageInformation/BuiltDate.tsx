// Copyright (C) Siemens AG, 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

import CommonUtils from '@/utils/common.utils'
import InputKeyValue from '../../../../../../../../object-types/InputKeyValue'

interface Props {
    setBuiltDate?: any
    dataBuiltDate?: InputKeyValue
    setDataBuiltDate?: React.Dispatch<React.SetStateAction<InputKeyValue>>
    dataDateBuilt?: string
    setDataDateBuilt?: React.Dispatch<React.SetStateAction<string>>
    dataTimeBuilt?: string
    setDataTimeBuilt?: React.Dispatch<React.SetStateAction<string>>
}

function BuiltDate({
    dataBuiltDate,
    setDataBuiltDate,
    setBuiltDate,
    dataDateBuilt,
    setDataDateBuilt,
    dataTimeBuilt,
    setDataTimeBuilt,
}: Props) {
    const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target
        e.target.name === 'key' ? setDataDateBuilt(e.target.value) : setDataTimeBuilt(e.target.value)
        const list: InputKeyValue = dataBuiltDate
        list[name as keyof InputKeyValue] = value
        setDataBuiltDate(list)
        if (
            !CommonUtils.isNullEmptyOrUndefinedString(dataDateBuilt) &&
            !CommonUtils.isNullEmptyOrUndefinedString(dataTimeBuilt)
        ) {
            setBuiltDate(list)
        }
    }

    return (
        dataBuiltDate && (
            <td colSpan={3}>
                <div className='form-group'>
                    <label className='lableSPDX' htmlFor='createdDate'>
                        7.26 Built Date
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
                                id='createdReleaseDate'
                                type='date'
                                className='form-control spdx-date needs-validation'
                                placeholder='created.date.yyyy.mm.dd'
                                onChange={handleInputChange}
                                name='key'
                                value={dataBuiltDate.key ?? ''}
                            />
                        </div>
                        <div>
                            <input
                                id='createdReleaseTime'
                                type='time'
                                step='1'
                                name='value'
                                className='form-control spdx-time needs-validation'
                                placeholder='created.time.hh.mm.ss'
                                onChange={handleInputChange}
                                value={dataBuiltDate.value ?? ''}
                            />
                        </div>
                    </div>
                </div>
            </td>
        )
    )
}

export default BuiltDate
