// Copyright (C) TOSHIBA CORPORATION, 2025. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2025. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { UserGroupType, UserPayload } from '@/object-types'
import { FaTrashAlt } from 'react-icons/fa'

interface SecondaryDepartmentAndRole {
    department: string,
    role: string
}

interface Props {
    userPayload: UserPayload
    setUserPayload: React.Dispatch<React.SetStateAction<UserPayload>>
}

const SecondaryDepartmentsAndRoles = ({ userPayload, setUserPayload }: Props): JSX.Element => {
    const t = useTranslations('default')
    const [secondaryDepartmentsAndRoles, setSecondaryDepartmentsAndRoles] = useState<SecondaryDepartmentAndRole[]>([])

    const onChangeDepartmentAndRole = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number) => {
        const newSecondaryDepartmentsAndRoles = [...secondaryDepartmentsAndRoles]
        newSecondaryDepartmentsAndRoles[index][e.target.name as keyof SecondaryDepartmentAndRole] = e.target.value
        setSecondaryDepartmentsAndRoles(newSecondaryDepartmentsAndRoles)
        updateUserPayload(newSecondaryDepartmentsAndRoles)
    }

    const onDeleteRow = (index: number) => {
        const newSecondaryDepartmentsAndRoles = [...secondaryDepartmentsAndRoles]
        newSecondaryDepartmentsAndRoles.splice(index, 1)
        setSecondaryDepartmentsAndRoles(newSecondaryDepartmentsAndRoles)
        updateUserPayload(newSecondaryDepartmentsAndRoles)
    }

    /* useEffect to set the secondaryDepartmentsAndRoles from the userPayload
     *   E.g:
     *   - SecondaryDepartmentsAndRoles: { 'department1': [ADMIN,CLEARING_ADMIN] }
     *   - Converted result will be: 
     *   [
     *      { department: 'department1', role: 'ADMIN' },
     *      { department: 'department1', role: 'CLEARING_ADMIN' }
     *   ]
    */
    useEffect(() => {
        if (userPayload.secondaryDepartmentsAndRoles === undefined) return

        const secondaryDepartmentsAndRolesFromPayload = Object.entries(userPayload.secondaryDepartmentsAndRoles)
            .flatMap(([department, roles]) => Array.from(roles).map((role: string) => ({ department, role })))
        setSecondaryDepartmentsAndRoles(secondaryDepartmentsAndRolesFromPayload)
    }, [])

    const updateUserPayload = (newSecondaryDepartmentsAndRoles: Array<SecondaryDepartmentAndRole>) => {
        const secondaryDepartmentsAndRolesMap = newSecondaryDepartmentsAndRoles.reduce((current, { department, role }) => {
            if (!(department in current)) {
                current[department] = []
            }
            if (!current[department].includes(role)) {
                current[department].push(role)
            }
            return current
        }, {} as { [key: string]: Array<string> })

        setUserPayload((prev) => ({ ...prev, secondaryDepartmentsAndRoles: secondaryDepartmentsAndRolesMap }))
    }

    return (
        <>
            <div className='row header mb-2 pb-2 px-2'>
                <h6>{t('Secondary Departments and Roles')}</h6>
            </div>
            {
                secondaryDepartmentsAndRoles.map((secondaryDepartmentAndRole, index) => (
                    <div className='row mb-3 px-0' key={index}>
                        <div className='col-lg-6'>
                            <input
                                type='text'
                                name='department'
                                value={secondaryDepartmentAndRole.department}
                                onChange={(e) => onChangeDepartmentAndRole(e, index)}
                                className='form-control'
                                id={`secondaryDepartmentAndRole.department${index}`}
                                placeholder={t('Enter Secondary Department')}
                                required
                            />
                        </div>
                        <div className='col-lg-5'>
                            <select className='form-control' name='role'
                                defaultValue={secondaryDepartmentAndRole.role} required
                                onChange={(e) => onChangeDepartmentAndRole(e, index)}
                            >
                                <option value=''>{t('Select secondary department role')}</option>
                                {
                                    Object.entries(UserGroupType).map(([key, value]) =>
                                        <option key={key} value={key}>{t(value as never)}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div className='col-sm-1 cursor-pointer'>
                            <FaTrashAlt className='icon' onClick={() => onDeleteRow(index)}
                            />
                        </div>
                    </div>

                ))
            }
            <button className='btn btn-secondary col-auto row mb-2 pb-2 px-2' type='button' onClick={() => setSecondaryDepartmentsAndRoles([...secondaryDepartmentsAndRoles, { department: '', role: '' }])}>
                {t('Click to add Secondary Department and Roles')}
            </button>
        </>
    )
}

export default SecondaryDepartmentsAndRoles