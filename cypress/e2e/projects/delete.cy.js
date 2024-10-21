// Copyright (C) TOSHIBA CORPORATION, 2024. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2024. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

describe('Delete a project', () => {
    
    beforeEach(() => {
        cy.login('admin')
    })

    it('TC04: Delete a project that is first linked to another project and then not linked', () => {
        // todo wait fix bug linked project and delete linked projects/ releases
    })
})