// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import { signOut, useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { ToastContainer } from 'react-bootstrap'

import LinkedObligations from '@/components/LinkedObligations/LinkedObligations'
import LinkedObligationsDialog from '@/components/sw360/SearchObligations/LinkedObligationsDialog'
import { HttpStatus, LicenseDetail, LicensePayload, LicenseTabIds, ToastData } from '@/object-types'
import { ApiUtils, CommonUtils } from '@/utils'
import { PageButtonHeader, SideBar, ToastMessage } from 'next-sw360'
import AddLicenseSummary from './AddLicenseSummary'

export default function AddLicense() {
    const t = useTranslations('default')
    const { data: session, status } = useSession()
    const [selectedTab, setSelectedTab] = useState<string>(LicenseTabIds.DETAILS)
    const [data, setData] = useState([])
    const [reRender, setReRender] = useState(false)
    const handleReRender = () => {
        setReRender(!reRender)
    }
    const [addObligationDiaglog, setAddObligationDiaglog] = useState(false)
    const handleClickAddObligations = useCallback(() => setAddObligationDiaglog(true), [])

    const router = useRouter()
    const [licensePayload, setLicensePayload] = useState<LicensePayload>({
        shortName: '',
        fullName: '',
        note: '',
        OSIApproved: 'NA',
        FSFLibre: 'NA',
        obligationDatabaseIds: [],
        text: '',
        checked: true,
        licenseTypeDatabaseId: '',
    })

    const tabList = [
        {
            id: LicenseTabIds.DETAILS,
            name: 'License',
        },
        {
            id: LicenseTabIds.OBLIGATIONS,
            name: 'Linked Obligations',
        },
    ]

    const [toastData, setToastData] = useState<ToastData>({
        show: false,
        type: '',
        message: '',
        contextual: '',
    })

    const alert = (show_data: boolean, status_type: string, message: string, contextual: string) => {
        setToastData({
            show: show_data,
            type: status_type,
            message: message,
            contextual: contextual,
        })
    }

    const validateLicense = (licensePayload: LicensePayload) => {
        if (
            CommonUtils.isNullEmptyOrUndefinedString(licensePayload.fullName) ||
            CommonUtils.isNullEmptyOrUndefinedString(licensePayload.shortName)
        ) {
            return true
        }
        return false
    }

    const submit = async () => {
        if (validateLicense(licensePayload)) {
            alert(true, 'Require!', t('Fullname, shortname not null or Empty!'), 'danger')
        } else if (!licensePayload.shortName.match(/^[A-Za-z0-9\-.+]*$/)) {
            alert(true, 'True!', t('Fullnam!'), 'danger')
        } else {
            const response = await ApiUtils.POST('licenses', licensePayload, session.user.access_token)
            if (response.status == HttpStatus.CREATED) {
                const data = (await response.json()) as LicenseDetail
                alert(true, 'Success', t('License is created!'), 'success')
                router.push('/licenses/detail?id=' + data.shortName)
            } else {
                alert(true, 'Failed', t('Create License Failed!'), 'danger')
            }
        }
    }

    const headerButtons = {
        'Create License': { link: '', type: 'primary', onClick: submit, name: t('Create License') },
        Cancel: { link: '/licenses', type: 'secondary', name: t('Cancel') },
    }

    const headerButtonAddObligations = {
        'Create License': { link: '', type: 'primary', onClick: submit, name: t('Create License') },
        'Add Obligation': {
            link: '',
            type: 'secondary',
            onClick: handleClickAddObligations,
            name: t('Add Obligation'),
        },
        Cancel: { link: '/licenses', type: 'secondary', name: t('Cancel') },
    }

    if (status === 'unauthenticated') {
        signOut()
    } else {
        return (
            <div className='container' style={{ maxWidth: '98vw', marginTop: '10px' }}>
                <div className='row'>
                    <div className='col-2 sidebar'>
                        <SideBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} tabList={tabList} />
                    </div>
                    <div className='col'>
                        <div className='row' style={{ marginBottom: '20px' }}>
                            {selectedTab === LicenseTabIds.OBLIGATIONS ? (
                                <PageButtonHeader
                                    buttons={headerButtonAddObligations}
                                    title='()'
                                    checked={licensePayload.checked}
                                ></PageButtonHeader>
                            ) : (
                                <PageButtonHeader
                                    buttons={headerButtons}
                                    title='()'
                                    checked={licensePayload.checked}
                                ></PageButtonHeader>
                            )}
                        </div>
                        <ToastContainer position='top-start'>
                            <ToastMessage
                                show={toastData.show}
                                type={toastData.type}
                                message={toastData.message}
                                contextual={toastData.contextual}
                                onClose={() => setToastData({ ...toastData, show: false })}
                                setShowToast={setToastData}
                            />
                        </ToastContainer>
                        <div className='row' hidden={selectedTab !== LicenseTabIds.DETAILS ? true : false}>
                            <AddLicenseSummary licensePayload={licensePayload} setLicensePayload={setLicensePayload} />
                        </div>
                        <div className='row' hidden={selectedTab != LicenseTabIds.OBLIGATIONS ? true : false}>
                            <LinkedObligationsDialog
                                show={addObligationDiaglog}
                                data={data}
                                setData={setData}
                                setShow={setAddObligationDiaglog}
                                onReRender={handleReRender}
                                licensePayload={licensePayload}
                                setLicensePayload={setLicensePayload}
                            />
                            <LinkedObligations
                                data={data}
                                setData={setData}
                                licensePayload={licensePayload}
                                setLicensePayload={setLicensePayload}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
