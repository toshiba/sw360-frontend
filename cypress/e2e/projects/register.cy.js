import { viewSelectors } from './selectors'
import { registerProject, verifyCreatedProject, searchProjectByName } from './utils'
describe('Register a license', () => {

    // before(() => {
    //     deleteLicensesBeforeRegisterUpdate('licenses/register', false)
    // })

    beforeEach(() => {
        cy.login('admin')
    })

    it('TC01: Add a simple project with no relations and no releases', () => {
        cy.fixture('projects/register').then((project) => {
            const testData = project['TC01_REQUIRED_FIELDS']
            registerProject(testData)
            verifyCreatedProject(testData)

        })
    })

    it('TC02: Add a full project with relations, releases and send to clearing process', () => {
        cy.fixture('projects/register').then((project) => {
            const testData = project['TC02_ALL_FIELDS']
            registerProject(testData)
            verifyCreatedProject(testData)
            searchProjectByName(testData.summary_tab.name)
            // todo check Clearing Status by hovering mouse over the numbers -> The new frontend doesn't support this feature yet.
            // todo Click Create Clearing Request icon under Actions column -> The new frontend doesn't support this feature yet.
        })
    })

    it('TC03: Add a project with releases, no relations, remove a release', () => {
        cy.fixture('projects/register').then((project) => {
            const testData = project['TC03_DELETE_LINKED']
            goToRegisterProjectPage()
            if (testData.summary_tab)
                fillDataSummaryTab(testData.summary_tab, false)
            if (testData.administration_tab) {
                cy.get(addEditSelectors.tabAdministration).click()
                fillDataAdministrationTab(testData.administration_tab, false)
            }
            if (testData.linked_releases_and_projects_tab) {
                cy.get(addEditSelectors.tabLinkedReleasesAndProjects).click()
                fillDataLinkedReleasesAndProjectsTab(testData.linked_releases_and_projects_tab, false)
                // todo delete linked projects -> bug of the new front end
                // delete linked releases
            }
            
            // verifyCreatedProject(testData)
            // searchProjectByName(testData.summary_tab.name)
            // todo check Clearing Status by hovering mouse over the numbers -> The new frontend doesn't support this feature yet.
        })
    })

})