// Copyright (C) Siemens AG, 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

import InputKeyValue from '../../../../../../../../object-types/InputKeyValue'

interface Props {
    setReleaseDate?: any
    dataReleaseDate?: InputKeyValue
    setDataReleaseDate?: React.Dispatch<React.SetStateAction<InputKeyValue>>
}

function ReleaseDate({ dataReleaseDate, setDataReleaseDate, setReleaseDate }: Props) {
    const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target
        const list: InputKeyValue = dataReleaseDate
        list[name as keyof InputKeyValue] = value
        setDataReleaseDate(list)
        setReleaseDate(list)
    }

    return (
        dataReleaseDate && (
            <td colSpan={3}>
                <div className='form-group'>
                    <label className='lableSPDX' htmlFor='createdDate'>
                        7.25 Release Date
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
                                name='key'
                                className='form-control spdx-date needs-validation'
                                placeholder='created.date.yyyy.mm.dd'
                                onChange={handleInputChange}
                                value={dataReleaseDate.key ?? ''}
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
                                value={dataReleaseDate.value ?? ''}
                            />
                        </div>
                    </div>
                </div>
            </td>
        )
    )
}

export default ReleaseDate
