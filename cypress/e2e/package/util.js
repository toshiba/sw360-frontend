function navigateToAddPackagePage() {
    cy.get('[href="/packages"]').click()
    cy.contains('button.btn.btn-primary.col-auto', 'Add Package').click()
}

function fillData(fillAllFields) {
    cy.fixture('packages/register').then((pkg) => {
        cy.get('#createOrEditPackage\\.name').type(pkg['name'])
        cy.get('#createOrEditPackage\\.version').type(pkg['version'])
        cy.get('#createOrEditPackage\\.packageType').select(pkg['package-type'])
        cy.get('#createOrEditPackage\\.purl').type(pkg['PURL'])

        if (fillAllFields) {
            //Main license and Release to be added
            cy.get('#createOrEditPackage\\.vcs').type(pkg['vcs'])
            cy.get('#createOrEditPackage\\.homepageUrl').type(pkg['homepageUrl'])
            cy.get('#createOrEditPackage\\.description').type(pkg['description'])
        }
    })
}

function submitPackageForm() {
    cy.contains('button', 'Create Package').click()
}

function verifySuccessAndRedirect() {
    cy.contains('Success: Package created successfully').should('be.visible')
    cy.url().should('match', /\/packages$/)
}

function updateSomeFields() {
    cy.get('[href="/packages"]').click()

    cy.fixture('packages/register').then((pkg) => {
        cy.get('table tbody tr')
            .contains('td', pkg['name'])
            .should('exist')
            .closest('tr')
            .find('td')
            .last()
            .find('svg')
            .first()
            .click()
    })

    cy.fixture('packages/update').then((pkg) => {
        cy.get('#createOrEditPackage\\.version').clear().type(pkg['version'])
        cy.get('#createOrEditPackage\\.homepageUrl').clear().type(pkg['homepageUrl'])
        //Other fields are waiting for Front-end to be finish
    })

    cy.contains('button', 'Update Package').should('exist').click()
}

function validatePackageInTable(checkAllFields) {
    cy.fixture('packages/register').then((pkg) => {
        cy.get('table tbody tr').contains('td', pkg['name']).should('exist').click()

        cy.get('table').within(() => {
            cy.contains('td', pkg['name']).should('exist')
            cy.contains('td', pkg['version']).should('exist')
            cy.contains('td', pkg['package-type']).should('exist')
            cy.contains('td', pkg['PURL']).should('exist')

            if (checkAllFields) {
                cy.contains('td', pkg['vcs'])
                cy.contains('td', pkg['homepageUrl'])
                cy.contains('td', pkg['description'])
            }
        })
    })
}

function validatePackageAfterUpdated() {
    cy.fixture('packages/register').then((pkg) => {
        cy.fixture('packages/update').then((update) => {
            cy.get('table tbody tr').contains('td', pkg['name']).should('exist').click()

            cy.get('table').within(() => {
                cy.contains('td', pkg['name']).should('exist')
                cy.contains('td', update['version']).should('exist')
                cy.contains('td', pkg['package-type']).should('exist')
                cy.contains('td', pkg['PURL']).should('exist')
                cy.contains('td', pkg['vcs'])
                cy.contains('td', update['homepageUrl'])
                cy.contains('td', pkg['description'])
            })
        })
    })
}

export function registerPackageWithRequiredFields() {
    navigateToAddPackagePage()
    fillData(false)
    submitPackageForm()
    verifySuccessAndRedirect()
    validatePackageInTable(false)
}

export function registerPackageWithAllFields() {
    navigateToAddPackagePage()
    fillData(true)
    submitPackageForm()
    verifySuccessAndRedirect()
    validatePackageInTable(true)
}

export function updatePackageAndValidate() {
    updateSomeFields()
    validatePackageAfterUpdated()
}