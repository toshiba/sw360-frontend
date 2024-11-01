// Copyright (C) TOSHIBA CORPORATION, 2024. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2024. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

import { selectors } from './selectors'

function navigateToAddPackagePage() {
    cy.get(selectors.packagesLink).click()
    cy.contains(selectors.primaryButton, selectors.addPackageButtonName).click()
}

function fillData(testData) {
    Object.keys(testData).forEach((key) => {
        if (selectors.checkValidField(key)) {
            const value = testData[key]
            const selector = selectors.fillData(key)

            if (selectors.selectableFields.includes(key)) {
                cy.get(selector).select(value)
            } else {
                cy.get(selector).clear().type(value)
            }

            // Todo: select Main licenses, select a release
        }
    })
}

function submitPackageForm() {
    cy.contains('button', selectors.createPackageButtonName).click()
}

function verifySuccessAndRedirect() {
    cy.contains(selectors.successCreateMessage).should('be.visible')
    cy.url().should('match', selectors.packagesUrl)
}

function updateSomeFields(testData, updateData) {
    cy.get(selectors.packagesLink).click()

    cy.get('table tbody tr')
        .contains('a', testData[selectors.packageNameField])
        .should('be.visible')
        .closest('tr')
        .find(selectors.icon)
        .eq(selectors.editIconPosition)
        .click()

    cy.get(selectors.nameInputId).should('have.value', testData[selectors.packageNameField], { timeout: 10000 })

    fillData(updateData)

    cy.contains('button', selectors.updatePackageButtonName).should('be.visible').click()
    cy.contains(selectors.successUpdateMessage).should('be.visible')
}

function validateRowData(key, data) {
    if (selectors.checkValidField(key)) {
        cy.get('tr').then((rows) => {
            const rowArray = Array.from(rows)
            const matchingRow = rowArray.find((row) => {
                const firstCellText = Cypress.$(row).find('td').first().text()
                return firstCellText.includes(selectors.getFieldName(key))
            })

            if (matchingRow) {
                cy.wrap(matchingRow).find('td').not(':first').contains(data[key]).should('be.visible')
            }
        })
    }
}

function validateTableData(testData) {
    Object.keys(testData).forEach((key) => {
        validateRowData(key, testData)
    })
}

function validatePackageAfterUpdated(testData, updateData) {
    cy.get('table tbody tr')
        .contains('a', updateData[selectors.packageNameField] || testData[selectors.packageNameField])
        .click()

    const dataAfterUpdated = { ...testData, ...updateData }

    validateTableData(dataAfterUpdated)
}

export function registerPackage(testCase) {
    navigateToAddPackagePage()
    cy.fixture('packages/register').then((pkg) => {
        const testData = pkg[testCase]
        fillData(testData)
        submitPackageForm()
        verifySuccessAndRedirect()
        cy.get('table tbody tr').contains('a', testData[selectors.packageNameField]).should('be.visible').click()
        validateTableData(testData)
    })
}

export function updatePackageAndValidate(initData, updatedData) {
    navigateToAddPackagePage()
    cy.fixture('packages/update').then((pkg) => {
        const testData = pkg[initData]
        fillData(testData)
        submitPackageForm()
        verifySuccessAndRedirect()

        const updateData = pkg[updatedData]
        updateSomeFields(testData, updateData)
        cy.get(selectors.packagesLink).click()
        validatePackageAfterUpdated(testData, updateData)
    })
}
