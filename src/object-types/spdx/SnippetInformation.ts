/*
 * Copyright TOSHIBA CORPORATION, 2021. Part of the SW360 Portal Project.
 * Copyright Toshiba Software Development (Vietnam) Co., Ltd., 2021. Part of the SW360 Portal Project.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 */

import SnippetRange from './SnippetRange'

interface SnippetInformation {
    SPDXID: string // 9.1
    snippetFromFile: string // 9.2
    snippetRanges: Array<SnippetRange> // 9.3, 9.4
    licenseConcluded: string // 9.5
    licenseInfoInSnippets: Array<string> // 9.6
    licenseComments: string // 9.7
    copyrightText: string // 9.8
    comment: string // 9.9
    name: string // 9.10
    snippetAttributionText: string // 9.11
    index: number
}

export default SnippetInformation
