
describe('Login page', () => {
    it('TC01: Go to login page', () => {
        cy.visit(Cypress.env('sw360_base_url'))
        cy.contains('Welcome to SW360!')
        cy.get('.me-3').should('have.text', 'Sign In')
        cy.get('.btn-outline-primary').should('have.text', 'Create Account')
        cy.get('.me-3').click()
        cy.get('.modal-content').should('be.visible')
        cy.contains('Email Address')
        cy.get(':nth-child(1) > .form-control').should('have.value', '@sw360.org')
        cy.contains('Password')

    })
})