// Copyright (C) TOSHIBA CORPORATION, 2024. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2024. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

import {
    registerPackage,
} from './util'

describe('Create a package test cases', () => {
    beforeEach(() => {
        cy.login('admin')
    })

    it('TC01: Create package with required fields', () => {
        registerPackage('TC01_REQUIRED_FIELDS')
    })

    it('TC02: Create package with all editable fields', () => {
        registerPackage('TC02_ALL_FIELDS')
    })

    afterEach(() => {
        cy.deleteAllPackages()
    })
})
