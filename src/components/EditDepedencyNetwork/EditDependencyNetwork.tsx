// Copyright (C) TOSHIBA CORPORATION, 2024. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2024. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import { Form, OverlayTrigger, Tooltip as BootstrapTooltip, Spinner, Button, Alert, Modal } from 'react-bootstrap'
import { ImSpinner11 } from 'react-icons/im'
import LinkedReleasesTable from './LinkedReleasesTable'
import { FaInfoCircle, FaRegTrashAlt, FaRegQuestionCircle } from 'react-icons/fa'
import { FaPlus } from 'react-icons/fa6'
import { useState, ReactNode, useEffect, useCallback, useRef } from 'react'
import { getSession } from 'next-auth/react'
import { ApiUtils } from '@/utils/index'
import React from 'react'
import SearchReleasesModal from '../sw360/SearchReleasesModal/SearchReleasesModal'
import { Embedded, ReleaseDetail, ReleaseLink } from '@/object-types'
import styles from './component.module.css'
import { useTranslations } from 'next-intl'

interface ReleaseNode {
    releaseId: string
    releaseName?: string
    releaseVersion?: string
    componentId?: string
    mainlineState: string
    releaseRelationship: string
    comment: string
    releaseLink: Array<ReleaseNode>,
    otherReleaseVersions?: Array<any>
}

const releaseRelationship = {
    UNKNOWN: 'Unknown',
    CONTAINED: 'Contained',
    REFERRED: 'Related',
    DYNAMICALLY_LINKED: 'Dynamically linked',
    STATICALLY_LINKED: 'Statically linked',
    SIDE_BY_SIDE: 'Side by side',
    STANDALONE: 'Standalone',
    INTERNAL_USE: 'Internal use',
    OPTIONAL: 'Optional',
    TO_BE_REPLACED: 'To be replaced',
    CODE_SNIPPET: 'Code Snippet',
}

const mainlineStates = {
    OPEN: 'Open',
    MAINLINE: 'Mainline',
    SPECIFIC: 'Specific',
    PHASEOUT: 'Phaseout',
    DENIED: 'Denied',
}

const Tooltip = ({ text, children, className }: { text: string, children: ReactNode, className?: string }) => {
    return (
        <OverlayTrigger
            placement='bottom'
            overlay={<BootstrapTooltip>{text}</BootstrapTooltip>
            }
        >
            <span className={className}>
                {children}
            </span>
        </OverlayTrigger>
    )
}

const ADD_RELEASE_MODES = {
    ROOT: 0,
    CHILDREN: 1,
}

const EditDependencyNetwork = ({ projectId }: { projectId?: string }) => {
    const t = useTranslations('default')

    const addReleaseMode = useRef<number | undefined>(undefined)
    const nodeToAddChildren = useRef<ReleaseNode | undefined>(undefined)
    const duplicatedReleases = useRef([])
    const nodeRefToRemove = useRef<{
        removedNode: ReleaseNode,
        parentNode: ReleaseNode
    }>(undefined)

    const [selectedReleases, setSelectedReleases] = useState<Array<ReleaseDetail>>([])
    const [network, setNetwork] = useState<Array<ReleaseNode>>(undefined)

    const [showWarning, setShowWarning] = useState<boolean>(false)
    const [showReleaseModal, setShowReleaseModal] = useState<boolean>(false)
    const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false)

    const renderLinkedReleases = (releases: Array<ReleaseNode>, parentNode: ReleaseNode = undefined, level: number = 0, releaseIdPath: Array<string> = []) => {
        return Object.values(releases).map((release: ReleaseNode): ReactNode => {
            const pathIdToNode = [...releaseIdPath, release.releaseId]

            return <>
                <tr key={release.releaseId + level}
                    data-id-path={Object.values(pathIdToNode).join(',')}
                >
                    <td className={`align-middle`} style={{ paddingLeft: `${0.5 + level * 1}rem` }}>
                        {release.releaseName}
                        <Tooltip text='Add child releases' className='float-end'>
                            <FaPlus className='float-end cursor-pointer' size={20} onClick={() => addChildrenNode(release)} />
                        </Tooltip>
                    </td>
                    <td>
                        <Form.Select
                            onFocus={() => fetchOtherVersionsOfRelease(release)}
                            onChange={(event) => updateReleaseOfNode(release, event)}
                            defaultValue={release.releaseId}
                            >
                            {
                                release.otherReleaseVersions
                                ?
                                    release.otherReleaseVersions.map(rel =>
                                        <option key={rel.id} value={rel.id}
                                            selected={(rel.id === release.releaseId)}
                                            className='textlabel stackedLabel'
                                        >
                                            {rel.version}
                                        </option>
                                    )
                                :
                                    <option value={release.releaseId} className='textlabel stackedLabel' selected>
                                        {release.releaseVersion}
                                    </option>
                            }
                        </Form.Select>
                    </td>
                    <td style={{ width: '5%' }} className='align-middle text-center'>
                        <Tooltip text='Load default child releases'>
                            <ImSpinner11 size={19} className='cursor-pointer' onClick={() => loadDefaultNetwork(release)} />
                        </Tooltip>
                    </td>
                    <td>
                        <Form.Select defaultValue={release.releaseRelationship} onChange={(event) => changeReleaseRelationship(release, event)} name='releaseRelationship'>
                            {
                                Object.entries(releaseRelationship).map(([key, value]: Array<string>) =>
                                    <option key={key} value={key} className='textlabel stackedLabel'>{value}</option>
                                )
                            }
                        </Form.Select>
                    </td>
                    <td>
                        <Form.Select defaultValue={release.mainlineState} onChange={(event) => changeMainlineState(release, event)} name='mainlineState'>
                            {
                                Object.entries(mainlineStates).map(([key, value]: Array<string>) =>
                                    <option key={key} value={key} className='textlabel stackedLabel'>{value}</option>
                                )
                            }
                        </Form.Select>
                    </td>
                    <td>
                        <input type='text'
                            className='form-control'
                            placeholder='Enter comment'
                            defaultValue={release.comment}
                            onChange={(event) => changeComment(release, event)}
                        />
                    </td>
                    <td className='align-middle text-center'>
                        <Tooltip text='Delete'>
                            <FaRegTrashAlt size={19} className='cursor-pointer' onClick={() => removeNode(parentNode, release)} />
                        </Tooltip>
                    </td>
                </tr>
                {renderLinkedReleases(release.releaseLink, release, level + 1, pathIdToNode)}
            </>
        })
    }

    const addChildrenNode = (release: ReleaseNode) => {
        setShowReleaseModal(true)
        nodeToAddChildren.current = release
        addReleaseMode.current = ADD_RELEASE_MODES.CHILDREN
    }

    const addRootNode = () => {
        setShowReleaseModal(true)
        addReleaseMode.current = ADD_RELEASE_MODES.ROOT
    }

    const removeNode = (parentNode: ReleaseNode, removedRelease: ReleaseNode) => {
        nodeRefToRemove.current = {
            removedNode: removedRelease,
            parentNode: parentNode,
        }
        setShowConfirmDelete(true)
    }

    const loadDefaultNetwork = (releaseNode: ReleaseNode) => {
        const nodeTest: ReleaseNode = {
            releaseId: "d65793d80fb84438b60b57ed8fa63226",
            releaseRelationship: "CONTAINED",
            mainlineState: "OPEN",
            comment: "",
            releaseLink: [],
            releaseName: "Release2",
            releaseVersion: "v1"
        }
        releaseNode.releaseLink = [nodeTest]
        setNetwork([...network])
    }

    const fetchNetwork = useCallback(async () => {
        const session = await getSession()
        const response = await ApiUtils.GET(`projects/network/${projectId}/releases`, session.user.access_token)
        const data = await response.json()
        setNetwork(data)
    }, [projectId])

    const createReleaseNodeFromReleaseIds = (releasesInSameLevel: Array<string>) => {
        duplicatedReleases.current = []
        const releaseNodes: Array<ReleaseNode> = []
        for (const rel of selectedReleases) {
            if (!releasesInSameLevel.includes(rel.id)) {
                const newNode: ReleaseNode = {
                    releaseId: rel.id,
                    releaseRelationship: "CONTAINED",
                    mainlineState: "OPEN",
                    comment: "",
                    releaseLink: [],
                    releaseName: rel.name,
                    releaseVersion: rel.version,
                    componentId: rel._links['sw360:component'].href.split('/').at(-1),
                }
                releaseNodes.push(newNode)
            } else {
                duplicatedReleases.current.push(`${rel.name} (${rel.version})`)
            }
        }
        if (duplicatedReleases.current.length > 0) {
            showWarningMessage()
        }
        return releaseNodes
    }

    const showWarningMessage = () => {
        setShowWarning(true)
        setTimeout(() => {
            setShowWarning(false)
        }, 7000);
    }

    const closeConfirmDeleteModal = () => {
        setShowConfirmDelete(false)
        nodeRefToRemove.current = undefined
    }

    const confirmToDelete = () => {
        if (nodeRefToRemove.current === undefined) {
            closeConfirmDeleteModal()
            return
        }

        const parentNode = nodeRefToRemove.current.parentNode
        const removedNode = nodeRefToRemove.current.removedNode

        if (parentNode === undefined) {
            const newNetwork = [...network].filter(rel => rel.releaseId !== removedNode.releaseId)
            setNetwork([...newNetwork])
            closeConfirmDeleteModal()
            return
        }

        parentNode.releaseLink = parentNode.releaseLink.filter((rel: ReleaseNode) => rel.releaseId !== removedNode.releaseId)
        setNetwork([...network])
        closeConfirmDeleteModal()
    }

    const changeMainlineState = (release: ReleaseNode, event: React.ChangeEvent<HTMLSelectElement>) => {
        release.mainlineState = event.target.value
        setNetwork([...network])
    }

    const changeReleaseRelationship = (release: ReleaseNode, event: React.ChangeEvent<HTMLSelectElement>) => {
        release.releaseRelationship = event.target.value
        setNetwork([...network])
    }

    const changeComment = (release: ReleaseNode, event: React.ChangeEvent<HTMLInputElement>) => {
        release.comment = event.target.value
        setNetwork([...network])
    }

    const updateReleaseOfNode = (release: ReleaseNode, event: React.ChangeEvent<HTMLSelectElement>) => {
        release.releaseId = event.target.value
        setNetwork([...network])
    }

    const fetchOtherVersionsOfRelease = async (release: ReleaseNode) => {
        if (!release.otherReleaseVersions === undefined) return

        const session = await getSession()
        const response = await ApiUtils.GET(`components/${release.componentId}/releases`, session.user.access_token)
        const releases = await response.json() as Embedded<ReleaseLink, 'sw360:releaseLinks'> 

        const otherVersions = Object.values(releases._embedded['sw360:releaseLinks']).map(rel => {
            return {
                version: rel.version,
                id: rel.id,
            }
        })

        release.otherReleaseVersions = otherVersions

        setNetwork([...network])
    }

    useEffect(() => {
        if (selectedReleases.length === 0)
            return
        if (addReleaseMode.current === ADD_RELEASE_MODES.ROOT) {
            const newReleaseNodes = createReleaseNodeFromReleaseIds(network.map(rel => rel.releaseId))
            setNetwork([...network, ...newReleaseNodes])
            addReleaseMode.current = undefined
        } else {
            const newReleaseNodes = createReleaseNodeFromReleaseIds(nodeToAddChildren.current.releaseLink.map(rel => rel.releaseId))
            nodeToAddChildren.current.releaseLink = [...nodeToAddChildren.current.releaseLink, ...newReleaseNodes]
            setNetwork([...network])
            nodeToAddChildren.current = undefined
            addReleaseMode.current = undefined
        }
        setSelectedReleases([])
    }, [selectedReleases])

    useEffect(() => {
        if (projectId === undefined) {
            setNetwork([])
            return
        }
        fetchNetwork()
    }, [projectId])

    return (
        <div className='row mb-4'>
            <div className={`${styles.title} mb-2`}>
                <h6 className='fw-bold'>
                    LINKED RELEASES
                    <hr className='my-2 mb-2'/>
                </h6>
                <Button variant='outline-success' className='float-start'>Compare with default network</Button>
            </div>
            <div className='px-0'>
                {
                    network
                        ?
                        <>
                            <Alert show={showWarning}
                                onClose={() => setShowWarning(false)}
                                variant='danger'
                                dismissible
                                className={`${styles['warning-message']}`}
                            >
                                <b><FaInfoCircle size={13} /> Warning:</b>
                                <p>
                                    Duplicated releases: <b>{duplicatedReleases.current.join(', ')}</b>
                                </p>
                            </Alert>
                            <LinkedReleasesTable>
                                <tbody style={{ fontSize: '1rem' }}>
                                    {
                                        renderLinkedReleases(network)
                                    }
                                </tbody>
                            </LinkedReleasesTable>
                            <Button variant='secondary' className='mt-2' onClick={() => addRootNode()}>Add Releases</Button>
                        </>
                        :
                        <div className='col-12 text-center'>
                            <Spinner className='spinner' />
                        </div>
                }
                <SearchReleasesModal show={showReleaseModal} setShow={setShowReleaseModal} setSelectedReleases={setSelectedReleases} />
                <Modal className='modal-danger' show={showConfirmDelete} setShow={setShowConfirmDelete} backdrop='static' centered size='lg'>
                    <Modal.Header closeButton>
                        <Modal.Title><FaRegQuestionCircle /> Delete link to release?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            nodeRefToRemove.current &&
                            <p>
                                Do you really want to remove the link to release
                                {' '}
                                <b>
                                    {`${nodeRefToRemove.current?.removedNode.releaseName} (${nodeRefToRemove.current?.removedNode.releaseVersion})`}
                                </b> ?
                            </p>
                        }
                    </Modal.Body>
                    <Modal.Footer className='justify-content-end'>
                        <Button
                            type='button'
                            data-bs-dismiss='modal'
                            variant='secondary'
                            className='me-2'
                            onClick={closeConfirmDeleteModal}
                        >
                            {t('Close')}
                        </Button>
                        <Button type='button' variant='danger' onClick={confirmToDelete}>
                            Delete Link
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

const compare = (prevState: { projectId?: string }, nextState: { projectId?: string }) => {
    return prevState.projectId === nextState.projectId
}

export default React.memo(EditDependencyNetwork, compare)
