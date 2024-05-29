// Copyright (C) TOSHIBA CORPORATION, 2024. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2024. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

import { viewSelectors } from './selectors'
import { registerLicense, verifyDetailsLicense, deleteLicensesBeforeRegisterUpdate } from './utils'

function gotoLicenseDetailPage(licenseShortName) {
    cy.contains('a', licenseShortName).click()
}

function verifyAddedLicenseInLicenseList(licenseShortName) {
    cy.contains('a', licenseShortName).should('be.visible')
}

function updateExternalLink(testData) {
    cy.get(viewSelectors.externalLink).clear()
        .type(testData)
    cy.get(viewSelectors.btnSave).click()
    cy.get(viewSelectors.alertMessage).contains(' Success: Update External Link Success!')
    cy.get(viewSelectors.externalLink).should('have.value', testData)
}

function selectWhiteList(testData) {
    for (let i = 0; i < testData.length; i++) {
        if (testData[i] == false)
            cy.get(viewSelectors.cbWhiteList).eq(i).uncheck()
        else if (testData[i] == true)
            cy.get(viewSelectors.cbWhiteList).eq(i).check()
    }
}

function updateWhiteList(testData) {
    cy.get(viewSelectors.tabObligations).click()
    cy.get(viewSelectors.btnEditWhiteList).click()
    cy.get(viewSelectors.tblUpdateWhiteList).should('be.visible')
    selectWhiteList(testData)
    cy.get(viewSelectors.btnUpdateWhiteList).click()
    // todo verify ' Success: License updated successfully!')
    cy.contains('button', 'Edit License').should('exist')
}

function updateWhiteListAndVerify(testData) {
    let obligationsOutput = 0
    cy.get(viewSelectors.tabObligations).click()
    cy.get(viewSelectors.btnEditWhiteList).click()
    cy.get(viewSelectors.tblUpdateWhiteList).should('be.visible')
    selectWhiteList(testData)
    cy.get('td input[type="checkbox"]').each(($checkbox) => {
        if ($checkbox.is(':checked')) {
            obligationsOutput++
        }
    }).then(() => {
        cy.get(viewSelectors.btnUpdateWhiteList).click()
        // todo verify ' Success: License updated successfully!')
        cy.contains('button', 'Edit License').should('exist')
        cy.get(viewSelectors.tabObligations).click()
        cy.get(viewSelectors.tblLinkedObligations).find('tr').should('have.length', obligationsOutput)
    })
}

describe('Register a license', () => {

    before(() => {
        deleteLicensesBeforeRegisterUpdate('licenses/register', false)
    })

    beforeEach(() => {
        cy.login('admin')
    })

    it('TC01: Create a license with mandatory fields then edit External link', () => {
        cy.fixture('licenses/register').then((license) => {
            const testData = license['TC01_REQUIRED_FIELDS']
            const licenseShortName = testData.license_tab.short_name
            const externalLink = testData.external_link
            registerLicense(testData)
            verifyAddedLicenseInLicenseList(licenseShortName)
            gotoLicenseDetailPage(licenseShortName)
            updateExternalLink(externalLink)
            verifyDetailsLicense(testData)
        })
    })

    it('TC02: Create a license with all fields', () => {
        cy.fixture('licenses/register').then((license) => {
            const testData = license['TC02_ALL_FIELDS']
            const licenseShortName = testData.license_tab.short_name
            registerLicense(testData)
            verifyAddedLicenseInLicenseList(licenseShortName)
            gotoLicenseDetailPage(licenseShortName)
            verifyDetailsLicense(testData)
        })
    })

    it('TC03: Create a license with linked obligations then edit whitelist', () => {
        cy.fixture('licenses/register').then((license) => {
            const testData = license['TC03_LINKED_OBLIGATION']
            const licenseShortName = testData.license_tab.short_name
            registerLicense(testData)
            // todo search a license by quick filter
            verifyAddedLicenseInLicenseList(licenseShortName)
            gotoLicenseDetailPage(licenseShortName)
            updateWhiteListAndVerify(testData.update_white_list)
        })
    })
})