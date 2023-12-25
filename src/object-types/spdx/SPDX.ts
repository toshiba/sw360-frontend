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

import DocumentCreationInformation from './DocumentCreationInformation'
import PackageInformation from './PackageInformation'
import SPDXDocument from './SPDXDocument'

interface SPDX {
    spdxDocument?: SPDXDocument
    documentCreationInformation?: DocumentCreationInformation
    packageInformation?: PackageInformation
}

export default SPDX
