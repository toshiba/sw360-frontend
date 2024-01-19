// Copyright (C) Siemens AG, 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

// import { useTranslations } from 'next-intl'
import { FaTrashAlt } from 'react-icons/fa'
import SnippetRange from '../../../../../../../object-types/spdx/SnippetRange'

interface Props {
    // setDataInputList?: RolesType
    setInputList?: React.Dispatch<React.SetStateAction<SnippetRange[]>>
    inputList?: SnippetRange[]
}

function SnippetRanges({ inputList, setInputList }: Props) {
    // const t = useTranslations('default')
    // const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>, index: number) => {
    //     // const { name, value } = e.target
    //     // const list: SnippetRange[] = [...inputList]
    //     // list[index][name as keyof SnippetRange] = value
    //     // setInputList(list)
    //     // setDataInputList(list)
    // }

    const handleRemoveClick = (index: number) => {
        const list = [...inputList]
        list.splice(index, 1)
        setInputList(list)
        // setDataInputList(list)
    }

    const handleAddClick = () => {
        setInputList([...inputList, { rangeType: '', startPointer: '', endPointer: '', reference: '', index: 0 }])
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '1rem' }}>
            {inputList.map((elem, j) => {
                return (
                    <div key={j} style={{ display: 'flex', marginBottom: '0.75rem' }}>
                        <select
                            style={{ flex: 1, marginRight: '1rem' }}
                            className='form-control range-type'
                            value={elem.rangeType}
                        >
                            <option value='BYTE' selected>
                                BYTE
                            </option>
                            <option value='LINE'>LINE</option>
                        </select>
                        <input
                            style={{ flex: 2, marginRight: '1rem' }}
                            type='text'
                            className='form-control start-pointer'
                            placeholder='Enter start pointer'
                            value={elem.startPointer}
                            // onChange={(e) => handleInputChange(e, j)}
                        />
                        <input
                            style={{ flex: 2, marginRight: '1rem' }}
                            type='text'
                            className='form-control end-pointer'
                            placeholder='Enter end pointer'
                            value={elem.endPointer}
                            // onChange={(e) => handleInputChange(e, j)}
                        />
                        <input
                            style={{ flex: 4, marginRight: '2rem' }}
                            type='text'
                            className='form-control reference'
                            placeholder='Enter reference'
                            value={elem.reference}
                            // onChange={(e) => handleInputChange(e, j)}
                        />
                        <FaTrashAlt onClick={() => handleRemoveClick(j)} />
                    </div>
                )
            })}
            <button id='addNewRange' className='spdx-add-button-sub' onClick={() => handleAddClick()}>
                Add new Range
            </button>
        </div>
    )
}

export default SnippetRanges
