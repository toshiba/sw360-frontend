// Copyright (C) TOSHIBA CORPORATION, 2024. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2024. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

import { createComponent, createRelease } from '../components/utils.js'
import { addEditSelectors } from './selectors'
import { registerProject, verifyCreatedOrUpdatedProject, searchProjectByName, goToRegisterProjectPage, fillDataSummaryTab, fillDataAdministrationTab, fillDataLinkedReleasesAndProjectsTab, registerDuplicateProject } from './utils'

describe('Register a project', () => {

    before(() => {
        createComponent('Comp01', 'COTS', ['libaries']).then((componentId) => {
            createRelease(componentId, 'v1')
            createRelease(componentId, 'v2')
        })
        cy.createProject('Project 1', '1.0.0')
        cy.createProject('Project 2', '1.0.0')
        cy.createProject('Project 3', '1.0.0')

    })

    beforeEach(() => {
        cy.login('admin')
    })

    it('TC01: Add a simple project with no relations and no releases', () => {
        cy.fixture('projects/register').then((project) => {
            const testData = project['TC01_REQUIRED_FIELDS']
            registerProject(testData)
            verifyCreatedOrUpdatedProject(testData)

        })
    })

    it('TC02: Add a full project with relations, releases and send to clearing process', () => {
        cy.fixture('projects/register').then((project) => {
            const testData = project['TC02_ALL_FIELDS']
            const projectName = testData.summary_tab.name
            const projectVersion = testData.summary_tab.version
            registerProject(testData)
            verifyCreatedOrUpdatedProject(testData)
            searchProjectByName(projectName)
            // todo check Clearing Status by hovering mouse over the numbers -> The new frontend doesn't support this feature yet.
            // todo Click Create Clearing Request icon under Actions column -> The new frontend doesn't support this feature yet.

            cy.deleteProjectByNameAndVersion(projectName,projectVersion)
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
                fillDataLinkedReleasesAndProjectsTab(testData.linked_releases_and_projects_tab)
                // todo delete linked projects -> bug of the new front end
                // todo delete linked releases
            }
            // todo verifyCreatedOrUpdatedProject(testData)
            // todo searchProjectByName(testData.summary_tab.name)
            // todo check Clearing Status by hovering mouse over the numbers -> The new frontend doesn't support this feature yet.
        })
    })

    it('TC07: Duplicate an existing project', () => {
        cy.fixture('projects/register').then((project) => {
            const originTestData = project['TC02_ALL_FIELDS']
            const originProjectName = originTestData.summary_tab.name
            const newTestData = project['TC07_DUPLICATE_PROJECT']

            registerProject(originTestData)
            originTestData.summary_tab = { ...originTestData.summary_tab, ...newTestData.summary_tab }
            originTestData.administration_tab = { ...originTestData.administration_tab, ...newTestData.administration_tab }
            originTestData.linked_releases_and_projects_tab = { ...originTestData.linked_releases_and_projects_tab, ...newTestData.linked_releases_and_projects_tab }
            if (newTestData.administration_tab && newTestData.administration_tab.clearing_state == null) {
                newTestData.administration_tab.clearing_state = { name: 'Open' }
            }
            
            searchProjectByName(originProjectName)
            cy.contains('a', originProjectName).closest('tr').find('td').last().find('svg').eq(2).click()
            cy.contains('Create Project')
            registerDuplicateProject(newTestData)
            verifyCreatedOrUpdatedProject(originTestData)
        })
    })

    after(() => {
        cy.deleteAllProjects()
        cy.deleteAllReleases()
        cy.deleteAllComponents()
    })
})