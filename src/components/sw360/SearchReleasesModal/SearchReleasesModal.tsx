// Copyright (C) TOSHIBA CORPORATION, 2024. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2024. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import { getSession, signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import React, { useState, useRef } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

import { HttpStatus, Embedded, ReleaseDetail } from '@/object-types'
import { ApiUtils, CommonUtils } from '@/utils'
import ReleasesTable from './ReleasesTable'
import { FaInfoCircle } from 'react-icons/fa'

interface Props {
    show: boolean
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    setSelectedReleases: React.Dispatch<React.SetStateAction<Array<string>>>
}

const SearchReleasesModal = ({ show, setShow, setSelectedReleases }: Props) => {
    const t = useTranslations('default')
    const [tableData, setTableData] = useState([])
    const searchText = useRef<string>('')
    const isExactMatchSearch = useRef<boolean>(false)
    const [selectingReleaseOnTable, setSelectingReleaseOnTable] = useState<Array<string>>([])

    const searchReleases = async () => {
        const session = await getSession()
        const params: {[k: string]: string} = {
            allDetails: 'true',
            name: searchText.current,
            luceneSearch: (!isExactMatchSearch.current).toString()
        }

        const queryUrl = CommonUtils.createUrlWithParams(`releases`, params)
        const response = await ApiUtils.GET(queryUrl, session.user.access_token)
        if (response.status === HttpStatus.UNAUTHORIZED) {
            return signOut()
        }
        if (response.status === HttpStatus.NO_CONTENT) {
            setTableData([])
            return
        }

        const releases: Embedded<ReleaseDetail, 'sw360:releases'> = await response.json()
        if (
            !CommonUtils.isNullOrUndefined(releases['_embedded']) &&
            !CommonUtils.isNullOrUndefined(releases['_embedded']['sw360:releases'])
        ) {
            const data = releases['_embedded']['sw360:releases'].map((release: ReleaseDetail) => [
                release.id,
                release._embedded['sw360:vendors'] ? release._embedded['sw360:vendors'][0].fullName : '',
                release.name,
                release.version,
                release.clearingState,
                release.mainlineState,
            ])
            setTableData(data)
        }
    }

    const handleClickSelectReleases = () => {
        setSelectedReleases(selectingReleaseOnTable)
        resetStatesAndClose()
    }

    const resetStatesAndClose = () => {
        searchText.current = ''
        setTableData([])
        setSelectingReleaseOnTable([])
        setShow(!show)
    }

    return (
        <Modal show={show} onHide={resetStatesAndClose} backdrop='static' centered size='lg' scrollable={true}>
            <Modal.Header closeButton>
                <Modal.Title>Search Releases</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{overflowY: 'scroll', maxHeight: 'calc(100% - 3.5rem)'}}>
                <div className='row'>
                    <div className='col-lg-6'>
                        <input
                            type='text'
                            className='form-control'
                            placeholder={t('Enter search text')}
                            aria-describedby='Search Users'
                            onChange={(event) => {searchText.current = event.target.value }}
                        />
                    </div>
                    <div className='col-lg-6'>
                        <button type='button' className='btn btn-secondary me-2' onClick={searchReleases}>
                            {t('Search')}
                        </button>
                        <button type='button' className='btn btn-secondary me-2'>
                            Releases of linked projects
                        </button>
                    </div>
                </div>
                <div className='mt-3'>
                    <Form.Check
                        id='exact-match'
                        name='exact-match'
                        className='exact-match'
                        type='checkbox'
                        label={<>Exact Match <FaInfoCircle size={12}/></>}
                        defaultChecked={false}
                        onChange={(e) => {
                            console.log(e.target.checked)
                            isExactMatchSearch.current = e.target.checked
                        }}
                    />
                    <ReleasesTable tableData={tableData} selectingReleaseOnTable={selectingReleaseOnTable} setSelectingReleaseOnTable={setSelectingReleaseOnTable}/>
                </div>
            </Modal.Body>
            <Modal.Footer className='justify-content-end'>
                <Button
                    type='button'
                    data-bs-dismiss='modal'
                    variant='secondary'
                    className='me-2'
                    onClick={resetStatesAndClose}
                >
                    {t('Close')}
                </Button>
                <Button type='button' className='btn btn-primary' onClick={handleClickSelectReleases} disabled={selectingReleaseOnTable.length === 0}>
                    Select Releases
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default SearchReleasesModal
