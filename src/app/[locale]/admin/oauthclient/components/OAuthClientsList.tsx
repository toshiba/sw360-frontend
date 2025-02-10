// Copyright (c) Helio Chissini de Castro, 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import { OAuthClient } from '@/object-types'
import MessageService from '@/services/message.service'
import { ApiUtils, CommonUtils } from '@/utils'
import { SW360_API_URL } from '@/utils/env'
import { signOut, useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { PageButtonHeader, _ } from 'next-sw360'
import { useSearchParams } from 'next/navigation'
import React, { ReactNode, useState, useMemo, memo } from 'react'
import AddClientDialog from './AddClientDialog'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'
import Table from '@/components/sw360/Table/Table'

// Memoize the AddClientDialog component
const MemoizedAddClientDialog = memo(AddClientDialog)

function OAuthClientsList() : ReactNode {
    const t = useTranslations('default')
    const [numberClient, setNumberClient] = useState(0)
    const { data: session, status } = useSession()
    const [openAddClientDialog, setOpenAddClientDialog] = useState(false)
    const [selectedClient, setSelectedClient] = useState<OAuthClient | null>(null)

    // useEffect(() => {
    //     if (!CommonUtils.isNullEmptyOrUndefinedString(deleteLicense)) {
    //         MessageService.success(t('License removed successfully!'))
    //     }
    // }, [params])

    const handleAddClient = () => {
        setSelectedClient(null)
        setOpenAddClientDialog(true)
    }

    const headerButtons = { 
        'Add Client': { link: '/admin/oauthclient', type: 'primary', name: ('Add or edit client'), onClick: handleAddClient },
    }

    const columns = useMemo(() => [
        { name: t('Description'), width: '30%', sort: true},
        { name: ('Client Id'), width: '30%', sort: true },
        { name: t('Authorities'), width: '15%', sort: true },
        { name: ('Scope'), width: '15%', sort: true },
        { name: t('Actions'), width: '10%', 
        formatter: (client: OAuthClient) =>
            _(
                <>
                    <OverlayTrigger overlay={<Tooltip>{t('Delete')}</Tooltip>}>
                        <span className='d-inline-block'>
                            <FaTrashAlt
                                className='btn-icon'
                                onClick={() => {}}
                                style={{ color: 'gray', fontSize: '15px' }}
                            />
                        </span>
                    </OverlayTrigger>
                    
                    <OverlayTrigger overlay={<Tooltip>{t('Edit')}</Tooltip>}>
                        <span className='d-inline-block'>
                            <FaPencilAlt
                                className='btn-icon'
                                onClick={() => {
                                    setSelectedClient(client)
                                    setOpenAddClientDialog(true)
                                }}
                                style={{ color: 'gray', fontSize: '15px' }}
                            />
                        </span>
                    </OverlayTrigger>
                </>
            )
        },
    ], [t])

    const MemoTable = useMemo(() => {
        const tableProps = {
            server: {
                url: `http://10.116.43.147:8080/authorization/client-management`,
                then: (data: Array<OAuthClient>) => {
                    setNumberClient(0)
                    return data.map((client: OAuthClient) => [
                        client.description,
                        client.client_id,
                        client.authorities.join(" "),
                        client.scope.join(", "),
                        client
                    ])
                },
                total: 0,
                headers: { Authorization: `${status === 'authenticated' ? session.user.access_token : ''}` },
            },
            columns: columns,
            selector: true,
        }
        
        return <Table {...tableProps} />
    }, [status, session?.user.access_token, columns])

    if (status === 'unauthenticated') {
        return signOut()
    } else {
        return (
            <div className='container page-content'>
                <MemoizedAddClientDialog 
                    show={openAddClientDialog} 
                    setShow={setOpenAddClientDialog} 
                    client={selectedClient}
                />
                <div className='row'>
                    <div className='col col-12'>
                        <div className='col'>
                            <div className='row'>
                                <PageButtonHeader
                                    buttons={headerButtons}
                                    title={`${t('OAuth Client')} (${numberClient})`}
                                />

                                {MemoTable}

                                <div className='row mt-2'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default OAuthClientsList
