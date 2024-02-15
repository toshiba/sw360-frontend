// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import { Form, OverlayTrigger, Tooltip as BootstrapTooltip, Spinner, Button, Alert } from 'react-bootstrap'
import { ImSpinner11 } from 'react-icons/im'
import LinkedReleasesTable from './LinkedReleasesTable'
import { FaInfoCircle, FaRegTrashAlt } from 'react-icons/fa'
import { FaPlus } from 'react-icons/fa6'
import { useState, ReactNode, useEffect, useCallback, useRef } from 'react'
import { getSession } from 'next-auth/react'
import { ApiUtils } from '@/utils/index'
import React from 'react'
import SearchReleasesModal from '../sw360/SearchReleasesModal/SearchReleasesModal'
import { ReleaseDetail } from '@/object-types'
import styles from './component.module.css'

interface ReleaseNode {
    releaseId: string
    releaseName?: string
    releaseVersion?: string
    mainlineState: string
    releaseRelationship: string
    comment: string
    releaseLink: Array<ReleaseNode>
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

const EditDependencyNetwork = ({ projectId }: { projectId: string }) => {
    const addReleaseMode = useRef<number | undefined>(undefined)
    const nodeToAddChildren = useRef<ReleaseNode | undefined>(undefined)
    const [selectedReleases, setSelectedReleases] = useState<Array<string>>([])
    const [network, setNetwork] = useState<Array<ReleaseNode>>(undefined)
    const [showReleaseModal, setShowReleaseModal] = useState<boolean>(false)
    const [showWarning, setShowWarning] = useState<boolean>(false)
    const duplicatedReleases = useRef([])

    const renderLinkedReleases = (releases: Array<ReleaseNode>, parentNode: ReleaseNode = undefined, level: number = 0, releaseIndexPath: Array<number> = [], releaseIdPath: Array<string> = []) => {
        return Object.keys(releases).map((index: string): ReactNode => {
            const parseIndex = parseInt(index)
            const pathIdToNode = [...releaseIdPath, releases[parseIndex].releaseId]
            const pathIndexToNode = [...releaseIndexPath, parseIndex]

            return <>
                <tr key={releases[parseIndex].releaseId + level}
                    data-id-path={Object.values(pathIndexToNode).join(',')}
                    data-index-path={Object.values(pathIndexToNode).join(',')}
                >
                    <td className={`align-middle`} style={{ paddingLeft: `${0.5 + level * 1}rem` }}>
                        {releases[parseIndex].releaseName}
                        <Tooltip text='Add child releases' className='float-end'>
                            <FaPlus className='float-end cursor-pointer' size={20} onClick={() => addChildrenNode(releases[parseIndex])} />
                        </Tooltip>
                    </td>
                    <td>
                        <Form.Select>
                            <option value={releases[parseIndex].releaseId} className='textlabel stackedLabel'>
                                {releases[parseIndex].releaseVersion}
                            </option>
                        </Form.Select>
                    </td>
                    <td style={{ width: '5%' }} className='align-middle text-center'>
                        <Tooltip text='Load default child releases'>
                            <ImSpinner11 size={19} className='cursor-pointer' onClick={() => loadDefaultNetwork(releases[parseIndex])} />
                        </Tooltip>
                    </td>
                    <td>
                        <Form.Select defaultValue={releases[parseIndex].releaseRelationship} onChange={() => console.log(1)} name='releaseRelationship'>
                            {
                                Object.entries(releaseRelationship).map(([key, value]: Array<string>) =>
                                    <option key={key} value={key} className='textlabel stackedLabel'>{value}</option>
                                )
                            }
                        </Form.Select>
                    </td>
                    <td>
                        <Form.Select defaultValue={releases[parseIndex].mainlineState} onChange={() => console.log(1)} name='mainlineState'>
                            {
                                Object.entries(mainlineStates).map(([key, value]: Array<string>) =>
                                    <option key={key} value={key} className='textlabel stackedLabel'>{value}</option>
                                )
                            }
                        </Form.Select>
                    </td>
                    <td>
                        <Form.Control type='text' placeholder='Enter comment' defaultValue={releases[parseIndex].comment} />
                    </td>
                    <td className='align-middle text-center'>
                        <Tooltip text='Delete'>
                            <FaRegTrashAlt size={19} className='cursor-pointer' onClick={() => removeNode(parentNode, releases[parseIndex].releaseId)} />
                        </Tooltip>
                    </td>
                </tr>
                {renderLinkedReleases(releases[parseIndex].releaseLink, releases[parseIndex], level + 1, pathIndexToNode, pathIdToNode)}
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

    const removeNode = (parentNode: ReleaseNode, removedReleaseId: string) => {
        if (parentNode === undefined) {
            const newNetwork = [...network].filter(rel => rel.releaseId !== removedReleaseId)
            setNetwork([...newNetwork])
            return
        }
        parentNode.releaseLink = parentNode.releaseLink.filter(rel => rel.releaseId !== removedReleaseId)
        setNetwork([...network])
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

    const createReleaseNodeFromReleaseIds = async (releaseIds: Array<string>, releasesInSameLevel: Array<string>) => {
        duplicatedReleases.current = []
        const session = await getSession()
        const releaseNodes: Array<ReleaseNode> = []
        for (const relId of releaseIds) {
            const response = await ApiUtils.GET(`releases/${relId}`, session.user.access_token)
            const releaseById = await response.json() as ReleaseDetail
            if (!releasesInSameLevel.includes(relId)) {
                const newNode: ReleaseNode = {
                    releaseId: relId,
                    releaseRelationship: "CONTAINED",
                    mainlineState: "OPEN",
                    comment: "",
                    releaseLink: [],
                    releaseName: releaseById.name,
                    releaseVersion: releaseById.version
                }
                releaseNodes.push(newNode)
            } else {
                duplicatedReleases.current.push(`${releaseById.name} (${releaseById.version})`)
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
        }, 5000);
    }

    useEffect(() => {
        if (selectedReleases.length === 0)
            return
        if (addReleaseMode.current === ADD_RELEASE_MODES.ROOT) {
            createReleaseNodeFromReleaseIds(selectedReleases, network.map(rel => rel.releaseId))
                .then((newReleaseNodes) => {
                    setNetwork([...network, ...newReleaseNodes])
                    addReleaseMode.current = undefined
                })
        } else {
            createReleaseNodeFromReleaseIds(selectedReleases, nodeToAddChildren.current.releaseLink.map(rel => rel.releaseId))
                .then((newReleaseNodes) => {
                    nodeToAddChildren.current.releaseLink = [...nodeToAddChildren.current.releaseLink, ...newReleaseNodes]
                    setNetwork([...network])
                    nodeToAddChildren.current = undefined
                    addReleaseMode.current = undefined
                    setSelectedReleases([])
                })
        }
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
                            <Button variant='secondary' onClick={() => addRootNode()}>Add Releases</Button>
                        </>
                        :
                        <div className='col-12 text-center'>
                            <Spinner className='spinner' />
                        </div>
                }
                <SearchReleasesModal show={showReleaseModal} setShow={setShowReleaseModal} setSelectedReleases={setSelectedReleases} />
            </div>
        </div>
    )
}

const compare = (prevState: { projectId: string }, nextState: { projectId: string }) => {
    return prevState.projectId === nextState.projectId
}

export default React.memo(EditDependencyNetwork, compare)
