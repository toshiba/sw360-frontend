// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import TitleLinkedReleases from './TitleLinkedReleases/TitleLinkedReleases'
import styles from '../../Attachments/Attachment.module.css'
import TableLinkedReleases from './TableLinkedReleases/TableLinkedReleases'
import { useTranslations } from 'next-intl'
import { COMMON_NAMESPACE } from '@/object-types/Constants'
import { useCallback, useEffect, useState } from 'react'
import LinkedReleasesDiaglog from '@/components/sw360/SearchLinkedReleases/LinkedReleasesDiaglog'
import { Session } from '@/object-types/Session'
import LinkedRelease from '@/object-types/LinkedRelease'
import ReleasePayload from '@/object-types/ReleasePayload'
import CommonUtils from '@/utils/common.utils'

interface Props {
    session?: Session
    release?: any
    releasePayload?: ReleasePayload
    setReleasePayload?: React.Dispatch<React.SetStateAction<ReleasePayload>>
}

const LinkedReleases = ({ session, releasePayload, setReleasePayload, release }: Props) => {
    const t = useTranslations(COMMON_NAMESPACE)
    const [reRender, setReRender] = useState(false)
    const [releaseLinks, setReleaseLinks] = useState<LinkedRelease[]>([])
    const [data, setData] = useState([])
    const handleReRender = () => {
        setReRender(!reRender)
    }
    const [linkedReleasesDiaglog, setLinkedReleasesDiaglog] = useState(false)
    const handleClickSelectLinkedReleases = useCallback(() => setLinkedReleasesDiaglog(true), [])

    const selectLinkedReleases = (releaseLinks: LinkedRelease[]) => {
        const mapReleaseRelationship = new Map<string, string>()
        releaseLinks.forEach((item) => {
            mapReleaseRelationship.set(item.id, item.releaseRelationship)
        })
        setReleaseLinks(releaseLinks)
        setReleaseIdToRelationshipsToReleasePayLoad(mapReleaseRelationship)
    }

    const setReleaseIdToRelationshipsToReleasePayLoad = (releaseIdToRelationships: Map<string, string>) => {
        const obj = Object.fromEntries(releaseIdToRelationships)
        setReleasePayload({
            ...releasePayload,
            releaseIdToRelationship: obj,
        })
    }

    useEffect(() => {
        if (
            !CommonUtils.isNullOrUndefined(release['_embedded']) &&
            !CommonUtils.isNullOrUndefined(release['_embedded']['sw360:releaseLinks'])
        ) {
            const linkedReleases: LinkedRelease[] = []

            release['_embedded']['sw360:releaseLinks'].map((item: any) => [
                linkedReleases.push(item)
            ])
            setReleaseLinks(linkedReleases)
        }
      }, [])

    return (
        <>
            <div className='col' style={{ fontSize: '0.875rem' }}>
                <LinkedReleasesDiaglog
                    session={session}
                    show={linkedReleasesDiaglog}
                    setShow={setLinkedReleasesDiaglog}
                    selectLinkedReleases={selectLinkedReleases}
                    onReRender={handleReRender}
                />
                <div className={`row ${styles['attachment-table']}`} style={{ padding: '25px',fontSize: '0.875rem', paddingTop: '1px' }}>
                    <TitleLinkedReleases />
                    <TableLinkedReleases
                        releaseLinks={releaseLinks}
                        setReleaseLinks={setReleaseLinks}
                        setReleaseIdToRelationshipsToReleasePayLoad={setReleaseIdToRelationshipsToReleasePayLoad}
                    />
                </div>
                <div>
                    <button
                        type='button'
                        className={`fw-bold btn btn-light button-plain`}
                        onClick={handleClickSelectLinkedReleases}
                    >
                        {t('Click to add Releases')}
                    </button>
                </div>
            </div>
        </>
    )
}

export default LinkedReleases
