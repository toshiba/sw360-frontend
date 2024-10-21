import { viewSelectors } from './selectors'
import { registerProject } from './utils'
describe('Register a license', () => {

    // before(() => {
    //     deleteLicensesBeforeRegisterUpdate('licenses/register', false)
    // })

    beforeEach(() => {
        cy.login('admin')
    })

    it('TC01: Create a license with mandatory fields then edit External link', () => {
        cy.get('[href="/projects"]').click()
        cy.get('.btn-group > .btn-primary').click()
        cy.get('.row > .me-2').should('be.visible')
        //cy.get('#addProjects\\.name').type('projectName')
        cy.fixture('projects/register').then((project) => {
            const testData = project['TC01_REQUIRED_FIELDS']
            const projectName = testData.summary_tab.name
            cy.get('#addProjects\\.name').type(projectName)
        
        })
    })

    it.only('TC02: Add a full project with relations, releases and send to clearing process', () => {
        cy.fixture('projects/register').then((project) => {
            const testData = project['TC02_ALL_FIELDS']
            registerProject(testData)
        })
    })
})