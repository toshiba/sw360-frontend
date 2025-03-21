// Copyright (C) TOSHIBA CORPORATION, 2025. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2025. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'
import { Obligation } from '@/object-types'
import { useTranslations } from 'next-intl'
import { ReactNode, useEffect, useState } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import ImportElementDialog from './ImportElementDialog'

const ObligationLevels = {
    COMPONENT_OBLIGATION: 'Component Obligation',
    ORGANISATION_OBLIGATION: 'Organisation Obligation',
    PROJECT_OBLIGATION: 'Project Obligation',
    LICENSE_OBLIGATION: 'License Obligation',
}

const obligationTypes = ['Permission', 'Risk', 'Exception', 'Restriction', 'Obligation']

interface TreeNode {
    id: string
    type: string
    text: string
    children: TreeNode[]
    parentId?: string
}

const obligationLevelInfoArray = [
    'Organisation Obligation: Organisation Obligations are general rules or mandatory steps to made sure before conveying software. An example would be to add the OSS contact e-mail address in case of questions to the project, software or to the organisation at all instances of conveyed software.',
    'Component Obligation: Component obligations are obligations for a specific component or release only. For example, special measure or actions to be carried out could result from trade compliance or IP issues with the component.',
    'License Obligation: License obligation are task to be carried out or risks to be considered from the use of software under a particular license.',
    'Project Obligation: Project obligations are specific to the projects or products nature and are also requires steps or tasks to be made sure before conveying the software. An example could be tiny hardware with limited printed documentation. In this case open source license information would required special handling, for example print instructions how to obtain OSS license information on the packaging.',
]

interface Prop {
    obligation: Obligation
    setObligation: React.Dispatch<React.SetStateAction<Obligation>>
}

function ObligationForm({ obligation, setObligation }: Prop): ReactNode {
    const t = useTranslations('default')
    const [title, setTitle] = useState(obligation.title ?? '')
    const [obligationType, setObligationType] = useState(obligation.obligationType ?? '')
    const [obligationLevel, setObligationLevel] = useState(obligation.obligationLevel ?? '')
    const [tree, setTree] = useState<TreeNode[]>([])
    const [treeText, setTreeText] = useState(obligation.text ?? '')
    const [openImportElementDialog, setOpenImportElementDialog] = useState(false)

    useEffect(() => {
        setObligation({
            title: title,
            text: treeText,
            obligationType: obligationType,
            obligationLevel:
                Object.keys(ObligationLevels).find(
                    (key) => ObligationLevels[key as keyof typeof ObligationLevels] === obligationLevel,
                ) ?? '',
            ...obligation,
        })
    }, [title, treeText, obligationType, obligationLevel])

    const generateId = () => Math.random().toString(36).substring(2, 11)

    const getTreeAsText = (nodes: TreeNode[], level = 0): string => {
        let result = ''

        nodes.forEach((node, index) => {
            const indent = level > 0 ? '\t'.repeat(level) : ''
            const nodeText = `${node.type} ${node.text}`.trim()

            if (index === 0 && level === 0) {
                result += nodeText
            } else {
                result += `\n${indent}${nodeText}`
            }

            if (node.children.length > 0) {
                result += getTreeAsText(node.children, level + 1)
            }
        })

        return result
    }

    const addChild = (parentId?: string) => {
        const newNode: TreeNode = {
            id: generateId(),
            type: '',
            text: '',
            children: [],
            parentId,
        }

        let updatedTree: TreeNode[]
        if (parentId == null) {
            updatedTree = [...tree, newNode]
        } else {
            updatedTree = [...tree]
            const addChildToNode = (nodes: TreeNode[]): TreeNode[] => {
                return nodes.map((node) => {
                    if (node.id === parentId) {
                        return { ...node, children: [...node.children, newNode] }
                    }
                    return { ...node, children: addChildToNode(node.children) }
                })
            }
            updatedTree = addChildToNode(updatedTree)
        }

        const newText = getTreeAsText(updatedTree)
        setTree(updatedTree)
        setTreeText(newText)
    }

    const addSibling = (nodeId: string, parentId?: string) => {
        const newNode: TreeNode = {
            id: generateId(),
            type: '',
            text: '',
            children: [],
            parentId,
        }

        let updatedTree: TreeNode[]
        if (parentId == null) {
            updatedTree = [...tree, newNode]
        } else {
            updatedTree = [...tree]
            const addSiblingToNode = (nodes: TreeNode[]): TreeNode[] => {
                return nodes.map((node) => {
                    if (node.id === parentId) {
                        return { ...node, children: [...node.children, newNode] }
                    }
                    return { ...node, children: addSiblingToNode(node.children) }
                })
            }
            updatedTree = addSiblingToNode(updatedTree)
        }

        const newText = getTreeAsText(updatedTree)
        setTree(updatedTree)
        setTreeText(newText)
    }

    const deleteNode = (nodeId: string, parentId?: string) => {
        let updatedTree: TreeNode[]
        if (parentId == null) {
            updatedTree = tree.filter((node) => node.id !== nodeId)
        } else {
            updatedTree = [...tree]
            const deleteFromNode = (nodes: TreeNode[]): TreeNode[] => {
                return nodes.map((node) => {
                    if (node.id === parentId) {
                        return { ...node, children: node.children.filter((child) => child.id !== nodeId) }
                    }
                    return { ...node, children: deleteFromNode(node.children) }
                })
            }
            updatedTree = deleteFromNode(updatedTree)
        }

        const newText = getTreeAsText(updatedTree)
        setTree(updatedTree)
        setTreeText(newText)
    }

    const updateNode = (nodeId: string, field: 'type' | 'text', value: string) => {
        const updatedTree = [...tree]
        const updateNodeInTree = (nodes: TreeNode[]): TreeNode[] => {
            return nodes.map((node) => {
                if (node.id === nodeId) {
                    return { ...node, [field]: value }
                }
                return { ...node, children: updateNodeInTree(node.children) }
            })
        }
        const newTree = updateNodeInTree(updatedTree)
        const newText = getTreeAsText(newTree)
        setTree(newTree)
        setTreeText(newText)
    }

    const renderTree = (nodes: TreeNode[], parentId?: string, level = 1) => {
        return nodes.map((node) => (
            <div
                key={node.id}
                style={{ marginLeft: `${level * 20}px` }}
                className='tree-row'
            >
                <div className='row mb-2 align-items-center position-relative'>
                    <div className='col-md-3'>
                        <input
                            type='text'
                            className='form-control'
                            placeholder={t('Type')}
                            value={node.type}
                            onChange={(e) => updateNode(node.id, 'type', e.target.value)}
                        />
                    </div>
                    <div className='col-md-3'>
                        <input
                            type='text'
                            className='form-control'
                            placeholder={t('Text')}
                            value={node.text}
                            onChange={(e) => updateNode(node.id, 'text', e.target.value)}
                        />
                    </div>
                    <div className='col-md-2'>
                        <div className='d-flex align-items-center action-buttons opacity-0 hover-visible'>
                            <span>»</span>
                            <a
                                href='#'
                                className='mx-2'
                                style={{ color: 'blue', textDecoration: 'none' }}
                                onClick={(e) => {
                                    e.preventDefault()
                                    addChild(node.id)
                                }}
                            >
                                +Child
                            </a>
                            <span>|</span>
                            <a
                                href='#'
                                className='mx-2'
                                style={{ color: 'blue', textDecoration: 'none' }}
                                onClick={(e) => {
                                    e.preventDefault()
                                    addSibling(node.id, node.parentId)
                                }}
                            >
                                +Sibling
                            </a>
                            <span>|</span>
                            <a
                                href='#'
                                className='mx-2'
                                style={{ color: 'blue', textDecoration: 'none' }}
                                onClick={(e) => {
                                    e.preventDefault()
                                    deleteNode(node.id, node.parentId)
                                }}
                            >
                                Delete
                            </a>
                            <span>|</span>
                            <a
                                href='#'
                                className='mx-2'
                                style={{ color: 'blue', textDecoration: 'none' }}
                                onClick={(e) => {
                                    e.preventDefault()
                                    setOpenImportElementDialog(true)
                                }}
                            >
                                Import
                            </a>
                        </div>
                    </div>
                </div>
                {node.children.length > 0 && renderTree(node.children, node.id, level + 1)}
            </div>
        ))
    }

    return (
        <div className='obligation-container'>
            <ImportElementDialog show={openImportElementDialog} setShow={setOpenImportElementDialog} />
            <div className='p-3'>
                <div className='row mb-2 align-items-center'>
                    <div className='col-md-4'>
                        <label
                            htmlFor='title'
                            className='form-label'
                            style={{ fontWeight: 'bold' }}
                        >
                            {t('Title')}
                        </label>
                        <input
                            type='text'
                            className='form-control'
                            id='title'
                            placeholder={'Enter title...'}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className='col-md-4'>
                        <label
                            htmlFor='obligationType'
                            className='form-label'
                            style={{ fontWeight: 'bold' }}
                        >
                            {t('Obligation Type')}
                        </label>
                        <select
                            className='form-select'
                            id='obligationType'
                            value={obligationType}
                            onChange={(e) => setObligationType(e.target.value)}
                        >
                            {obligationTypes.map((option) => (
                                <option
                                    key={option}
                                    value={option}
                                >
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='col-md-4'>
                        <label
                            htmlFor='obligationLevel'
                            className='form-label'
                            style={{ fontWeight: 'bold' }}
                        >
                            {'Obligation Level'}
                        </label>
                        <select
                            className='form-select'
                            id='obligationLevel'
                            value={obligationLevel}
                            onChange={(e) => setObligationLevel(e.target.value)}
                        >
                            {Object.values(ObligationLevels).map((option) => (
                                <option
                                    key={option}
                                    value={option}
                                >
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='row mb-2'>
                    <div className='col-md-4 offset-md-8'>
                        <OverlayTrigger
                            overlay={
                                <Tooltip id='obligation-level-info'>
                                    {obligationLevelInfoArray.map((line, index) => (
                                        <div key={index}>{line}</div>
                                    ))}
                                </Tooltip>
                            }
                            placement='bottom'
                        >
                            <span className='d-inline-block btn-overlay cursor-pointer'>
                                <small>ⓘ Learn more about obligation level</small>
                            </span>
                        </OverlayTrigger>
                    </div>
                </div>

                <div className='row mb-3'>
                    <div className='col-12'>
                        <label
                            className='form-label'
                            style={{ fontWeight: 'bold' }}
                        >
                            {t('Text')}
                        </label>
                        <div className='row mb-2 align-items-center'>
                            <div className='col-md-4'>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='textTitle'
                                    placeholder={t('Title')}
                                    disabled
                                    value={title}
                                />
                            </div>
                            <div className='col-md-2'>
                                <span>» </span>
                                <a
                                    href='#'
                                    onClick={(e) => {
                                        e.preventDefault()
                                        addChild()
                                    }}
                                    style={{ color: 'blue', textDecoration: 'none' }}
                                >
                                    +Child
                                </a>
                            </div>
                        </div>
                        {tree.length > 0 && renderTree(tree)}
                    </div>
                </div>

                <div
                    className='row'
                    style={{ marginBottom: '10px' }}
                >
                    <div className='col-md-4'>
                        <label
                            className='form-label'
                            style={{ fontWeight: 'bold' }}
                        >
                            {'Preview'}
                        </label>
                        <div
                            className='border p-3'
                            style={{
                                minHeight: '100px',
                                backgroundColor: '#f8f9fa',
                                whiteSpace: 'pre-wrap',
                            }}
                        >
                            {' '}
                            {title}
                            <br />
                            {treeText}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ObligationForm
