// Copyright (C) Siemens AG, 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

import { InputKeyValue } from '@/object-types'
// import { useTranslations } from 'next-intl'
import { FaTrashAlt } from 'react-icons/fa'

interface Props {
    // setDataInputList?: RolesType
    setInputList?: React.Dispatch<React.SetStateAction<InputKeyValue[]>>
    inputList?: InputKeyValue[]
}

function CheckSums({ inputList, setInputList }: Props) {
    // const t = useTranslations('default')
    const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>, index: number) => {
        const { name, value } = e.target
        const list: InputKeyValue[] = [...inputList]
        list[index][name as keyof InputKeyValue] = value
        setInputList(list)
        // setDataInputList(list)
    }

    const handleRemoveClick = (index: number) => {
        const list = [...inputList]
        list.splice(index, 1)
        setInputList(list)
        // setDataInputList(list)
    }

    const handleAddClick = () => {
        setInputList([...inputList, { key: 'Committer', value: '' }])
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 7 }}>
            {inputList.map((elem, j) => {
                return (
                    <div key={j} style={{ display: 'flex', marginBottom: '0.75rem' }}>
                        <input
                            style={{ flex: 2, marginRight: '1rem' }}
                            type='text'
                            className='form-control checksum-algorithm'
                            placeholder='Enter algorithm'
                            onChange={(e) => handleInputChange(e, j)}
                        />
                        <input
                            style={{ flex: 6, marginRight: '2rem' }}
                            type='text'
                            className='form-control checksum-value'
                            placeholder='Enter value'
                            onChange={(e) => handleInputChange(e, j)}
                        />
                        <FaTrashAlt onClick={() => handleRemoveClick(j)} />
                    </div>
                )
            })}
            <button
                id='addNewAlgorithm'
                className='spdx-add-button-sub spdx-add-button-sub-checksum'
                onClick={() => handleAddClick()}
            >
                Add new algorithm
            </button>
        </div>
    )
}

export default CheckSums