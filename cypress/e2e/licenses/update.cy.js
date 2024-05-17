// Copyright (C) TOSHIBA CORPORATION, 2024. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2024. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

import { addEditSelectors, viewSelectors } from './selectors'
import { registerLicense, fillDataLicense, addObligations, verifyDetailsLicense } from './utils'

function gotoUpdateLicensePage(licenseShortName) {
    cy.get(viewSelectors.navLicense).click()
    cy.contains('Add License')
    cy.contains('a', licenseShortName).click()
    cy.get('a > .btn').click()
    cy.contains('Update License')
}

function deleteObligationAndVerify() {
    cy.get(addEditSelectors.rowsLinkedObligation).eq(0).as('deletedObligationRow')
    cy.get('@deletedObligationRow').should('exist');
    cy.get('@deletedObligationRow').find('td').eq(1).invoke('text').as('deletedObligationText')
    cy.get('@deletedObligationRow').find('td').last().find('svg').click();
    cy.get(addEditSelectors.dlgDeleteLinkedObligation.dialog).should('be.visible')
    cy.get(addEditSelectors.dlgDeleteLinkedObligation.btnDeleteObligation).click()
    cy.get(addEditSelectors.rowsLinkedObligation).contains('td', '@deletedObligationText').should('not.exist')
}

function updateLicense(updatedData) {
    cy.get(addEditSelectors.txtFullName).should('not.have.value', '')
    cy.get(addEditSelectors.txtShortName).should('not.have.value', '')
    if (updatedData.license_tab)
        fillDataLicense(updatedData.license_tab, true)
    if (updatedData.linked_obligations_tab) {
        cy.get(addEditSelectors.tabLinkedObligations).click()
        if (updatedData.linked_obligations_tab.delete_obligation == true)
            deleteObligationAndVerify()
        addObligations(updatedData.linked_obligations_tab)
    }
    cy.get(addEditSelectors.btnUpdateLicense).click()
    cy.get(viewSelectors.alertMessage).contains('Success: License updated successfully!')
    cy.contains('button', 'Edit License')
}

function deleteLicense() {
    cy.get(addEditSelectors.btnDeleteLicense).click()
    cy.get(addEditSelectors.dlgDeleteLicense.dialog).should('be.visible')
        .then(() => {
            cy.get(addEditSelectors.dlgDeleteLicense.btnDeleteLicense).click()
        })
    cy.get(addEditSelectors.dlgDeleteLicense.dialog).should('not.exist')
    cy.get(viewSelectors.alertMessage).contains('Success: License removed successfully!')
}

function verifyDeletedLicense(licenseShortName) {
    cy.get(viewSelectors.tblLicenseList).then(() => {
        cy.contains('a', licenseShortName).should('not.exist')
    })
}

describe('Update a license', () => {

    before(() => {
        cy.deleteAllLicenses()
    })

    beforeEach(() => {
        cy.login('admin')
    })

    it('TC04: Edit License and remove/ add Obligations', () => {
        cy.fixture('licenses/update').then((license) => {
            const initialData = license['TC04_EDIT_SOME_FIELDS'].initial_data
            const initialLicenseShortName = initialData.license_tab.short_name
            const updatedData = license['TC04_EDIT_SOME_FIELDS'].updated_data
            registerLicense(initialData)
            gotoUpdateLicensePage(initialLicenseShortName)
            updateLicense(updatedData)
            verifyDetailsLicense(updatedData)
        })
    })

    it('TC05: Delete an existing license', () => {
        cy.fixture('licenses/delete').then((license) => {
            const fullName = license['TC05_DELETE_LICENSE'].full_name
            const shortName = license['TC05_DELETE_LICENSE'].short_name
            cy.createLicenseByAPI(fullName, shortName)
            gotoUpdateLicensePage(shortName)
            deleteLicense()
            verifyDeletedLicense(shortName)
        })
    })
})