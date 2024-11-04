import {
    registerPackageWithAllFields,
    registerPackageWithRequiredFields,
    updatePackageAndValidate,
} from './util'

describe('Create a package test cases', () => {
    beforeEach(() => {
        cy.login('admin')
    })

    it('TC01: Create package with required fields', () => {
        registerPackageWithRequiredFields()
    })

    it('TC02: Create package with all editable fields', () => {
        registerPackageWithAllFields()
    })

    it('TC03: Update some fields for package', () => {
        registerPackageWithAllFields()
        updatePackageAndValidate()
    })

    afterEach(() => {
        cy.deleteAllPackages()
    })
})
