import { viewSelectors } from "./selectors"
import { registerLicense, verifyDetailsLicense} from "./utils"


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
    // todo verify success message alert
    cy.get(viewSelectors.externalLink).should('have.value', testData)

}

function updateWhiteList(testData) {
    cy.get(viewSelectors.tabObligations).click()
    cy.get(viewSelectors.btnEditWhiteList).click()
    cy.get(viewSelectors.tblUpdateWhiteList).should('be.visible')
    for (let i = 0; i < testData.length; i++) {
        if (testData[i] == false)
            cy.get(viewSelectors.cbWhiteList).eq(i).uncheck()
        else if (testData[i] == true)
            cy.get(viewSelectors.cbWhiteList).eq(i).check()
    }
    cy.get(viewSelectors.btnUpdateWhiteList).click()
    //todo - check success message "Success: License updated successfully!"
}

function verifyUpdatingWhiteList(defaultWhiteListNum, testData) {
    //todo - wait fix bug in new front to check detail of the obligation is unchecked.
    let updatedwhiteListNum = defaultWhiteListNum
    for (let i = 0; i < testData.length; i++) {
        if (testData[i] == false)
            updatedwhiteListNum = updatedwhiteListNum - 1
    }
    cy.get(viewSelectors.tabObligations).click()
    cy.get(viewSelectors.tblWhiteList).find('tr').should('have.length', updatedwhiteListNum)
}

describe('Register a license', () => {

    // Cypress.on('uncaught:exception', (err, runnable) => {
    //     return false
    //   })

    before(() => {
        cy.deleteAllLicenses()
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
            verifyAddedLicenseInLicenseList(licenseShortName)
            gotoLicenseDetailPage(licenseShortName)
            updateWhiteList(testData.update_white_list)
            verifyUpdatingWhiteList(testData.linked_obligations_tab.added_obligation_quantity, testData.update_white_list)
        })
    })
})