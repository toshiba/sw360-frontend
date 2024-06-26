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
import { notFound, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import LinkedObligations from '@/components/LinkedObligations/LinkedObligations'
import LinkedObligationsDialog from '@/components/sw360/SearchObligations/LinkedObligationsDialog'
import { HttpStatus, LicensePayload, LicenseTabIds, Obligation } from '@/object-types'
import { ApiUtils, CommonUtils } from '@/utils'
import { PageButtonHeader, SideBar } from 'next-sw360'
import AddLicenseSummary from './AddLicenseSummary'
import MessageService from '@/services/message.service'

export default function AddLicense() {
    const t = useTranslations('default')
    const { data: session, status } = useSession()
    const [selectedTab, setSelectedTab] = useState<string>(LicenseTabIds.DETAILS)
    const [data, setData] = useState([])
    const [reRender, setReRender] = useState(false)
    const handleReRender = () => {
        setReRender(!reRender)
    }
    const [obligations, setObligations] = useState([])
    const [addObligationDiaglog, setAddObligationDiaglog] = useState(false)
    const handleClickAddObligations = useCallback(() => setAddObligationDiaglog(true), [])
    const params = useSearchParams()
    const router = useRouter()
    const [errorShortName, setErrorShortName] = useState(false)
    const [errorFullName, setErrorFullName] = useState(false)
    const [inputValid, setInputValid] = useState(false)
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

    useEffect(() => {
        MessageService.success(t('New License'))
        const controller = new AbortController()
        const signal = controller.signal

        ;(async () => {
            try {
                const response = await ApiUtils.GET(
                    `obligations?obligationLevel=LICENSE_OBLIGATION`,
                    session.user.access_token,
                    signal
                )
                if (response.status === HttpStatus.UNAUTHORIZED) {
                    return signOut()
                } else if (response.status !== HttpStatus.OK) {
                    return notFound()
                }

                const obligations = await response.json()
                if (!CommonUtils.isNullEmptyOrUndefinedString(obligations._embedded['sw360:obligations'])) {
                    const data = obligations._embedded['sw360:obligations'].map((item: Obligation) => [
                        item,
                        item,
                        item.title,
                        item.obligationType &&
                            item.obligationType.charAt(0) + item.obligationType.slice(1).toLowerCase(),
                        item.text,
                    ])
                    setObligations(data)
                }
            } catch (e) {
                console.error(e)
            }
        })()
        return () => controller.abort()
    }, [params, session])

    const validateLicenseShortName = (licensePayload: LicensePayload) => {
        if (CommonUtils.isNullEmptyOrUndefinedString(licensePayload.shortName)) {
            setErrorShortName(true)
            return true
        }
        return false
    }

    const validateLicenseFullname = (licensePayload: LicensePayload) => {
        if (CommonUtils.isNullEmptyOrUndefinedString(licensePayload.fullName)) {
            setErrorFullName(true)
            return true
        }
        return false
    }

    const submit = async () => {
        setInputValid(true)
        if (validateLicenseShortName(licensePayload) && validateLicenseFullname(licensePayload)) {
            setErrorShortName(true)
            setErrorFullName(true)
        }
        if (validateLicenseShortName(licensePayload) || validateLicenseFullname(licensePayload)) {
            MessageService.error(t('Fullname, shortname not null or Empty!'))
        } else if (!licensePayload.shortName.match(/^[A-Za-z0-9\-.+]*$/)) {
            MessageService.error(t('Shortname is invalid!'))
        } else {
            const response = await ApiUtils.POST('licenses', licensePayload, session.user.access_token)
            if (response.status == HttpStatus.CREATED) {
                MessageService.success(t('License added successfully!'))
                router.push('/licenses')
            } else if (response.status == HttpStatus.CONFLICT) {
                MessageService.error(t('License shortname is already taken!'))
            } else {
                MessageService.error(t('Create License Failed!'))
            }
        }
    }

    const headerButtons = {
        'Create License': { link: '', type: 'primary', onClick: submit, name: t('Create License') },
        Cancel: { link: '/licenses', type: 'light', name: t('Cancel') },
    }

    const headerButtonAddObligations = {
        'Create License': { link: '', type: 'primary', onClick: submit, name: t('Create License') },
        'Add Obligation': {
            link: '',
            type: 'secondary',
            onClick: handleClickAddObligations,
            name: t('Add Obligation'),
        },
        Cancel: { link: '/licenses', type: 'light', name: t('Cancel') },
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
                        <div className='row' hidden={selectedTab !== LicenseTabIds.DETAILS ? true : false}>
                            <AddLicenseSummary
                                errorShortName={errorShortName}
                                setErrorShortName={setErrorShortName}
                                errorFullName={errorFullName}
                                inputValid={inputValid}
                                setErrorFullName={setErrorFullName}
                                licensePayload={licensePayload}
                                setLicensePayload={setLicensePayload}
                            />
                        </div>
                        <div className='row' hidden={selectedTab != LicenseTabIds.OBLIGATIONS ? true : false}>
                            <LinkedObligationsDialog
                                show={addObligationDiaglog}
                                data={data}
                                setData={setData}
                                obligations={obligations}
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
