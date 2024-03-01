// Copyright (C) TOSHIBA CORPORATION, 2024. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2024. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

import { gotoUpdateComponentPage, gotoViewComponentPage } from './utils.js';
import { registerAndVerifyRelease, updateAndVerifyReleaseAfterUpdate } from '../releases/utils.js';

function deleteComponent(conponentName) {
    // go to component page
    cy.visit(`${Cypress.env('sw360_base_url')}/components`)
    cy.contains('Add Component')
    cy.get('a:contains(' + conponentName + ')').closest('tr').find('td').last().find('svg').last().click()
    cy.get('.modal-content').should('be.visible')
    cy.get('.login-btn').click()
    cy.get('.alert-success').should('be.visible')
    cy.get('.delete-btn').click()
}

function deleteAllReleaseOfComponent(numberOfReleases) {
    for (let i = 0; i < numberOfReleases; i++) {
        cy.get('#tab-Releases').click()
        cy.get('[data-column-id="action"] > div > span').should('have.length', numberOfReleases - i)
        cy.get('[data-column-id="action"] > div > span').first().find('svg').last().click()
        cy.get('.login-btn').click()
        cy.get('.alert-success').should('be.visible')
        cy.get('.delete-btn').click()
    }
}

const createComponent = (name, componentType, categories) => {
    return cy.createComponent(name, componentType, categories).then((component) => component.id)
}

const createRelease = (componentId, version) => {
    cy.createRelease(componentId, version)
}

describe('Update components', () => {
    before(() => {
        createComponent('TC03-04: Comp03', 'COTS', ['libaries']).then((componentId) => {
            createRelease(componentId, 'v1')
        })

        cy.fixture("components/delete").then(data => {
            const componentData = data['TC06_DELETE_COMP'].component
            createComponent(componentData.name, componentData.type, [componentData.categories]).then((componentId) => {
                for (const release of data['TC06_DELETE_COMP'].releases) {
                    createRelease(componentId, release)
                }
            })
        })
    })

    beforeEach(() => {
        cy.login('admin')
    })

    it('TC03 + TC04: Modify a component and release with vendor present and verify', () => {
        gotoUpdateComponentPage('TC03-04: Comp03')
        registerAndVerifyRelease('TC03_RELEASE_WITH_CPEID')
        updateAndVerifyReleaseAfterUpdate('TC03_ADD_VENDOR_AND_ATTACHMENT')
    })

    it('TC06: Delete a component that is first linked to a project and then not, and a project', () => {
        cy.fixture("components/delete").then(data => {
            const componentData = data['TC06_DELETE_COMP'].component
            gotoViewComponentPage(componentData.name)
            deleteAllReleaseOfComponent(data['TC06_DELETE_COMP'].releases.length)
            deleteComponent(componentData.name)
        })
    })

    after(() => {
        cy.deleteAllReleases()
        cy.deleteAllComponents()
    })

})
