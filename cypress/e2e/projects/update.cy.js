import { createComponent, createRelease } from '../components/utils.js'
import { addEditSelectors, viewSelectors } from './selectors'
import { registerProject, updateProject, gotoUpdateProjectPage, verifyCreatedOrUpdatedProject, searchProjectByName } from './utils'

describe('Update a project', () => {

    before(() => {
        createComponent('Comp01', 'COTS', ['libaries']).then((componentId) => {
            createRelease(componentId, 'v1')
            createRelease(componentId, 'v2')
            createRelease(componentId, 'v3')
        })
        cy.createProject('Project 1', '1.0.0')
        cy.createProject('Project 2', '1.0.0')
        cy.createProject('Project 3', '1.0.0')

    })

    beforeEach(() => {
        cy.login('admin')
    })

    it('TC05: Modify an existing project with relations, releases and send to clearing process', () => {
        cy.fixture('projects/update').then((project) => {
            const initialData = project['TC05_UPDATE_PJ_SOME_FIELDS'].initial_data
            const initialProjectName = initialData.summary_tab.name
            const updatedData = project['TC05_UPDATE_PJ_SOME_FIELDS'].updated_data
            const changedProjectName = updatedData.summary_tab.name
            registerProject(initialData)
            gotoUpdateProjectPage(initialProjectName)
            updateProject(updatedData)
            verifyCreatedOrUpdatedProject(updatedData)
            searchProjectByName(changedProjectName)
            // todo Click Create Clearing Request icon under Actions column -> The new frontend doesn't support this feature yet.
        })
    })

    it('TC06: Add and modify a project with all project fields filled in', () => {
        cy.fixture('projects/update').then((project) => {
            const initialData = project['TC06_UPDATE_PJ_ALL_FIELDS'].initial_data
            const updatedData = project['TC06_UPDATE_PJ_ALL_FIELDS'].updated_data
            cy.createProject('test api', '0.0.1')
            registerProject(initialData)
            cy.get('.btn-close').click()
            cy.contains('Edit Projects')
            cy.get(viewSelectors.btnEditProject).click()
            cy.get(addEditSelectors.alertMessageEditPage).contains('Success: You are editing the original document.')
            updateProject(updatedData)
            verifyCreatedOrUpdatedProject(updatedData)
        })
    })

    after(() => {
        cy.deleteAllProjects()
        cy.deleteAllReleases()
        cy.deleteAllComponents()
    })
})