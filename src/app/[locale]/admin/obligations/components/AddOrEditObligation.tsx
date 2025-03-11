'use client'
import { useTranslations } from 'next-intl'
import { PageButtonHeader } from 'next-sw360'
import { ReactNode, useState } from 'react'

// Define obligation levels and types
const ObligationLevels = {
    COMPONENT_OBLIGATION: 'Component Obligation',
    ORGANISATION_OBLIGATION: 'Organisation Obligation',
    PROJECT_OBLIGATION: 'Project Obligation',
    LICENSE_OBLIGATION: 'License Obligation',
}

const obligationTypes = ['Permission', 'Risk', 'Exception', 'Restriction', 'Obligation']

// Define a type for the tree structure
interface TreeNode {
    id: string
    type: string
    text: string
    children: TreeNode[]
    parentId?: string
}

function AddOrEditObligation(): ReactNode {
    const t = useTranslations('default')
    const [title, setTitle] = useState('')
    const [obligationType, setObligationType] = useState('')
    const [obligationLevel, setObligationLevel] = useState('')
    const [tree, setTree] = useState<TreeNode[]>([])
    const [treeText, setTreeText] = useState('')

    const generateId = () => Math.random().toString(36).substring(2, 11)

    const getTreeAsText = (nodes: TreeNode[], level = 0): string => {
        let result = ''

        nodes.forEach((node, index) => {
            // Add tabs based on level (except for root level)
            const indent = level > 0 ? '\t'.repeat(level) : ''

            // Combine type and text with a space
            const nodeText = `${node.type} ${node.text}`.trim()

            // Add the node text with proper indentation
            if (index === 0 && level === 0) {
                result += nodeText
            } else {
                result += `\n${indent}${nodeText}`
            }

            // Recursively process children
            if (node.children.length > 0) {
                result += getTreeAsText(node.children, level + 1)
            }
        })

        return result
    }

    const updateTreeText = () => {
        const text = getTreeAsText(tree)
        setTreeText(text)
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
        // Start with level 1 for the first child to have padding compared to root
        return nodes.map((node) => (
            <div
                key={node.id}
                style={{ marginLeft: `${level * 20}px` }}
                className='tree-row'
            >
                <div className='row mb-2 align-items-center'>
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
                        <div className='d-flex align-items-center action-buttons'>
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

    const headerButtons = {
        'Create Obligation': {
            type: 'primary',
            link: '/admin/obligations/add',
            name: t('Add Obligation'),
            onClick: () => {
                updateTreeText()
                setTimeout(() => {
                    console.log(treeText)
                }, 0)
            },
        },
        Cancel: {
            type: 'secondary',
            link: '/admin/obligations',
            name: t('Cancel'),
        },
    }

    return (
        <div className='container page-content'>
            <div className='row'>
                <div className='col-12'>
                    <div className='row mb-3'>
                        <PageButtonHeader buttons={headerButtons} />
                    </div>

                    <div className='obligation-container'>
                        <div className='p-3'>
                            <div className='row mb-3 align-items-center'>
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
                                        placeholder={('Enter title...')}
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
                                        {('Obligation Level')}
                                    </label>
                                    <div className='d-flex align-items-center'>
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

                            <div className='row'>
                                <div className='col-12'>
                                    <label
                                        className='form-label'
                                        style={{ fontWeight: 'bold' }}
                                    >
                                        {('Preview')}
                                    </label>
                                    <div
                                        className='border p-3'
                                        style={{
                                            minHeight: '100px',
                                            backgroundColor: '#f8f9fa',
                                            whiteSpace: 'pre-wrap',
                                        }}
                                    >
                                        {treeText}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddOrEditObligation
