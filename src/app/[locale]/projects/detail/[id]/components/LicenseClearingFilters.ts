// Copyright (C) TOSHIBA CORPORATION, 2024. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2024. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

export const releaseClearingStates: {[k: string]: string} = {
    'NEW_CLEARING': 'New',
    'APPROVED': 'Report approved',
    'REPORT_AVAILABLE': 'Report available',
    'SCAN_AVAILABLE': 'Scan available',
    'SENT_TO_CLEARING_TOOL': 'Sent to clearing tool',
    'UNDER_CLEARING': 'Under clearing'
}

export const releaseRelations: {[k: string]: string}  = {
    'UNKNOWN': 'Unknown',
    'CONTAINED': 'Contained',
    'REFERRED': 'Related',
    'DYNAMICALLY_LINKED': 'Dynamically linked',
    'STATICALLY_LINKED': 'Statically linked',
    'SIDE_BY_SIDE': 'Side by side',
    'STANDALONE': 'Standalone',
    'INTERNAL_USE': 'Internal use',
    'OPTIONAL': 'Optional',
    'TO_BE_REPLACED': 'To be replaced',
    'CODE_SNIPPET': 'Code Snippet',
}

export const releaseTypes: {[k: string]: string}  = {
    'OSS': 'OSS',
    'CONTAINED': 'Contained',
    'COTS': 'COTS',
    'INTERNAL': 'Internal',
    'INNER_SOURCE': 'Inner Source',
    'SERVICE': 'Service',
    'FREEWARE': 'Freeware',
    'CODE_SNIPPET': 'Code Snippet',
}

export const projectTypes: {[k: string]: string}  = {
    'PRODUCT': 'Product',
    'CUSTOMER_PROJECT': 'Customer Project',
    'INTERNAL_PROJECT': 'Internal Project',
    'SERVICE': 'Service',
    'INNER_SOURCE': 'Inner Source',
    'CLOUND_BACKEND': 'Cloud Backend',
}

export const projectRelations: {[k: string]: string}  = {
    'UNKNOWN': 'Unknown',
    'DUPLICATE': 'Duplicate',
    'CONTAINED': 'Is a subproject',
    'REFERRED': 'Related',
}

export const projectClearingState: {[k: string]: string}  = {
    'OPEN': 'Open',
    'INPROGRESS': 'In Progress',
    'CLOSED': 'Closed',
}
