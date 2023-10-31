// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'

import { Obligation } from '@/object-types'
import styles from './TableLinkedObligations.module.css'

interface Props {
    obligationLinks?: Obligation[]
    setObligationLinks?: React.Dispatch<React.SetStateAction<Obligation[]>>
    setObligationIdToLicensePayLoad?: (releaseIdToRelationships: Array<string>) => void
}

export default function TableLinkedObligations({
    obligationLinks,
    setObligationLinks,
    setObligationIdToLicensePayLoad,
}: Props) {
    const handleClickDelete = (index: number) => {
        const list: Obligation[] = [...obligationLinks]
        list.splice(index, 1)
        const obligationIds: string[] = []
        list.forEach((item) => {
            obligationIds.push(item.id)
        })
        setObligationLinks(list)
        setObligationIdToLicensePayLoad(obligationIds)
    }

    return (
        <>
            <div className='row'>
                {obligationLinks.map((item: Obligation, index: number) => {
                    return (
                        <div key={item.id}>
                            <div className={`${styles['div-row']}`}>
                                <label className={`${styles['idObligations']}`}></label>
                                <label className={`${styles['input-field']}`}>{item.title ?? ''}</label>
                                <label className={`${styles['input-field']}`}>{item.obligationType ?? ''}</label>
                                <label className={`${styles['input-field']}`}>{item.text ?? ''}</label>
                                <button
                                    type='button'
                                    onClick={() => handleClickDelete(index)}
                                    style={{ border: 'none' }}
                                    className={`fw-bold btn btn-secondary`}
                                >
                                    <FaTrashAlt className='bi bi-trash3-fill' />
                                </button>
                            </div>
                            <hr className={`${styles['hr']}`} />
                        </div>
                    )
                })}
            </div>
        </>
    )
}
