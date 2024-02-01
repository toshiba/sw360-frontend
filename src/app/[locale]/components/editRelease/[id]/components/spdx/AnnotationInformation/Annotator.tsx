// Copyright (C) Siemens AG, 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

import InputKeyValue from '../../../../../../../../object-types/InputKeyValue'

interface Props {
    dataAnnotator?: InputKeyValue
    setDataAnnotator?: React.Dispatch<React.SetStateAction<InputKeyValue>>
    setAnnotatorToAnnotation?: any
}

function Annotator({ dataAnnotator, setDataAnnotator, setAnnotatorToAnnotation }: Props) {
    const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target
        const list: InputKeyValue = dataAnnotator
        list[name as keyof InputKeyValue] = value
        setDataAnnotator(list)
        setAnnotatorToAnnotation(list)
    }

    return (
        dataAnnotator && (
            <div className='form-group' style={{ flex: 3 }}>
                <label className='lableSPDX' htmlFor='annotator'>
                    12.1 Annotator
                </label>
                <div style={{ display: 'flex' }}>
                    <select
                        id='annotatorType'
                        style={{ flex: 2, marginRight: '1rem' }}
                        className='form-control'
                        name='key'
                        onChange={handleInputChange}
                        value={dataAnnotator.key}
                    >
                        <option value='Organization'>Organization</option>
                        <option value='Person'>Person</option>
                        <option value='Tool'>Tool</option>
                    </select>
                    <input
                        style={{ flex: 6, marginRight: '1rem' }}
                        id='annotatorValue'
                        name='value'
                        type='text'
                        className='form-control'
                        placeholder='Enter annotator'
                        onChange={handleInputChange}
                        value={dataAnnotator.value}
                    />
                </div>
            </div>
        )
    )
}

export default Annotator
