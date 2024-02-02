// Copyright (C) Siemens AG, 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

// import PackageSupplierData from '../../../../../../../../object-types/spdx/PackageSupplierData'
import InputKeyValue from '../../../../../../../../object-types/InputKeyValue'

interface Props {
    dataPackageSupplier?: InputKeyValue
    setDataPackageSupplier?: React.Dispatch<React.SetStateAction<InputKeyValue>>
    setPackageSupplierToPackage?: any
    isPackageSupplier?: boolean
    setIsPackageSupplier?: React.Dispatch<React.SetStateAction<boolean>>
}

function PackageSupplier({
    dataPackageSupplier,
    setDataPackageSupplier,
    setPackageSupplierToPackage,
    isPackageSupplier,
    setIsPackageSupplier,
}: Props) {
    const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target
        const list: InputKeyValue = dataPackageSupplier
        list[name as keyof InputKeyValue] = value
        setDataPackageSupplier(list)
        setPackageSupplierToPackage(list)
    }

    // const [packageSupplier, setPackageSupplier] = useState(true)

    return (
        dataPackageSupplier && (
            <td colSpan={3}>
                <div className='form-group'>
                    <label className='lableSPDX'>7.5 Package supplier</label>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ display: 'inline-flex', flex: 3, marginRight: '1rem' }}>
                            <input
                                className='spdx-radio'
                                type='radio'
                                name='_sw360_portlet_components_SUPPLIER'
                                value='EXIST'
                                onClick={() => setIsPackageSupplier(true)}
                                checked={isPackageSupplier}
                            />
                            <select
                                id='supplierType'
                                style={{ flex: 2, marginRight: '1rem' }}
                                className='form-control'
                                disabled={!isPackageSupplier}
                                value={dataPackageSupplier.key}
                                name='key'
                                onChange={(e) => handleInputChange(e)}
                            >
                                <option value='Organization'>Organization</option>
                                <option value='Person'>Person</option>
                            </select>
                            <input
                                disabled={!isPackageSupplier}
                                style={{ flex: 6, marginRight: '1rem' }}
                                id='supplierValue'
                                className='form-control'
                                type='text'
                                name='value'
                                placeholder='Enter package supplier'
                                onChange={(e) => handleInputChange(e)}
                                value={dataPackageSupplier.value}
                            />
                        </div>
                        <div style={{ flex: 2 }}>
                            <input
                                className='spdx-radio lableSPDX'
                                id='supplierNoAssertion'
                                type='radio'
                                onClick={() => setIsPackageSupplier(false)}
                                checked={!isPackageSupplier}
                                name='_sw360_portlet_components_SUPPLIER'
                                value='NOASSERTION'
                            />
                            <label className='form-check-label radio-label lableSPDX' htmlFor='supplierNoAssertion'>
                                NOASSERTION
                            </label>
                        </div>
                    </div>
                </div>
            </td>
        )
    )
}

export default PackageSupplier
