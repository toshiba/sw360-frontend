// Copyright (C) TOSHIBA CORPORATION, 2024. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2024. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

import { addEditSelectors, viewSelectors, projectListSelectors } from './selectors'

export function goToRegisterProjectPage() {
    cy.get(viewSelectors.navProject).click()
    cy.contains('Add Project')
    cy.get(viewSelectors.btnAddProject).click()
    cy.contains('Create Project')
}

export function selectVendor(vendorInputData) {
    cy.openDialog(addEditSelectors.dialogVendor.openDialog, addEditSelectors.dialogVendor.dialog)
    cy.selectOrAddVendor(addEditSelectors.dialogVendor, addEditSelectors.dialogVendor.chooseVendor, vendorInputData)
}

export function addAdditionalRoles(roleSelected, mailInput) {
    cy.get(addEditSelectors.addRowAdditionalRoles.btnAddRow).click()
    cy.get(addEditSelectors.addRowAdditionalRoles.role).last().select(roleSelected)
    cy.get(addEditSelectors.addRowAdditionalRoles.mail).last().should('exist')
        .type(mailInput)
}

export function addKeyValue() {
    cy.get(btnAddRowExternal).click()
    cy.get(keySelector).last()
        .type(inputKey)
    cy.get(valueSelector).last()
        .type(inputValue)
}

export function addLinked(dialogSelectors, numUser) {
    cy.openDialog(dialogSelectors.openDialog, dialogSelectors.dialog)

    cy.get(dialogSelectors.searchBtn)
        .contains('Search')
        .click()

    cy.selectItemsFromTable(dialogSelectors.selectLinked, true, numUser)

    cy.get(dialogSelectors.LinkedBtn)
        .click()
}

export function clearAndType(selector, value, isUpdate, shouldClick = false) {
    cy.get(selector).then((element) => {
        if (shouldClick) {
            cy.wrap(element).click()
        }

        if (isUpdate) {
            cy.wrap(element).clearAndType(value)
        } else {
            cy.wrap(element).type(value)
        }
    })
}

export function fillDataSummaryTab(testData, isUpdate) {
    const nStep = Object.keys(testData).length
    for (let i = 0; i < nStep; i++) {
        const keyFieldName = Object.keys(testData)[i]
        const fieldValue = testData[keyFieldName]
        switch (keyFieldName) {
            case 'name':
                clearAndType(addEditSelectors.txtName, fieldValue, isUpdate)
                break
            case 'version':
                clearAndType(addEditSelectors.txtVersion, fieldValue, isUpdate)
                break
            case 'visibility':
                cy.get(addEditSelectors.selectVisibility).select(fieldValue.value)
                break
            case 'project_type':
                cy.get(addEditSelectors.selectProjectType).select(fieldValue.value)
                break
            case 'tag':
                clearAndType(addEditSelectors.txtTag, fieldValue, isUpdate)
                break
            case 'description':
                clearAndType(addEditSelectors.txtDescription, fieldValue, isUpdate)
                break
            case 'domain':
                cy.get(addEditSelectors.selectDomain).select(fieldValue.value)
                break
            case 'vendor':
                selectVendor(fieldValue)
                break
            case 'external_URL':
                cy.addKeyValueRow(addEditSelectors.addRowExternalURLs, fieldValue)
                break
            case 'project_manager':
                cy.selectOneUser(addEditSelectors.dialogProjectManager, fieldValue.user_no)
                break
            case 'project_owner':
                cy.selectOneUser(addEditSelectors.dialogProjectOwner, fieldValue.user_no)
                break
            case 'owner_accounting_unit':
                clearAndType(addEditSelectors.txtOwnerAccountingUnit, fieldValue, isUpdate)
                break
            case 'owner_billing_group':
                clearAndType(addEditSelectors.txtOwnerBillingGroup, fieldValue, isUpdate)
                break
            case 'owner_country':
                cy.get(addEditSelectors.selectOwnerCountry)
                    .select(fieldValue.name)
                break
            case 'lead_architect':
                cy.selectOneUser(addEditSelectors.dialogLeadArchitect, fieldValue.user_no)
                break
            case 'moderators':
                cy.selectMultiUsers(addEditSelectors.dialogModerators, fieldValue.num_user)
                break
            case 'contributors':
                cy.selectMultiUsers(addEditSelectors.dialogContributors, fieldValue.num_user)
                break
            case 'security_responsibles':
                cy.selectMultiUsers(addEditSelectors.dialogSecurityResponsibles, fieldValue.num_user)
                break
            case 'additional_roles':
                addAdditionalRoles(fieldValue.value, fieldValue.mail)
                break
            case 'external_ids':
                cy.addKeyValueRow(addEditSelectors.addRowExternalIds, fieldValue)
                break
            case 'external_data':
                cy.addKeyValueRow(addEditSelectors.addRowAdditionalData, fieldValue)
                break
            default:
                break
        }
    }
}

export function fillDataAdministrationTab(testData, isUpdate) {
    const nStep = Object.keys(testData).length
    for (let i = 0; i < nStep; i++) {
        const keyFieldName = Object.keys(testData)[i]
        const fieldValue = testData[keyFieldName]
        switch (keyFieldName) {
            case 'clearing_state':
                cy.get(addEditSelectors.selectClearingState).select(fieldValue.value)
                break
            case 'clearing_team':
                cy.get(addEditSelectors.selectClearingTeam).select(fieldValue.value_no)
                break
            case 'deadline_for_pre_evaluation':
                clearAndType(addEditSelectors.dtDeadlineForPreEvaluation, fieldValue, isUpdate, true)
                break
            case 'clearing_summary':
                clearAndType(addEditSelectors.txtClearingSummary, fieldValue, isUpdate)
                break
            case 'special_risk_OSS':
                clearAndType(addEditSelectors.txtSpecialRiskOSS, fieldValue, isUpdate)
                break
            case 'general_risk_3rd':
                clearAndType(addEditSelectors.txtGeneralRisk3rd, fieldValue, isUpdate)
                break
            case 'special_risk_3rd':
                clearAndType(addEditSelectors.txtSpecialRisk3rd, fieldValue, isUpdate)
                break
            case 'sales_and_delivery_channels':
                clearAndType(addEditSelectors.txtSalesAndDeliveryChannels, fieldValue, isUpdate)
                break
            case 'remarks_additional_requirements':
                clearAndType(addEditSelectors.txtRemarksAdditionalRequirements, fieldValue, isUpdate)
                break
            case 'system_test_begin_date':
                clearAndType(addEditSelectors.dtSystemTestBeginDate, fieldValue, isUpdate, true)
                break
            case 'system_test_end_date':
                clearAndType(addEditSelectors.dtSystemTestEndDate, fieldValue, isUpdate, true)
                break
            case 'delivery_start_date':
                clearAndType(addEditSelectors.dtDeliveryStartDate, fieldValue, isUpdate, true)
                break
            case 'phase_out_date':
                clearAndType(addEditSelectors.dtPhaseOutDate, fieldValue, isUpdate, true)
                break
            case 'license_info_header':
                clearAndType(addEditSelectors.txtLicenseInfoHeader, fieldValue, isUpdate)
                break
            default:
                break
        }
    }
}

export function fillDataLinkedReleasesAndProjectsTab(testData) {
    const nStep = Object.keys(testData).length
    for (let i = 0; i < nStep; i++) {
        const keyFieldName = Object.keys(testData)[i]
        const fieldValue = testData[keyFieldName]
        switch (keyFieldName) {
            case 'linked_projects':
                // todo add linked projects: skip because bug new front end search without projects
                break
            case 'linked_releases':
                addLinked(addEditSelectors.dialogLinkReleases, fieldValue.num_releases)
                break
            default:
                break
        }
    }
}

// todo export function addLinkedPackage -> The current new frontend is not ready yet.

export function registerProject(testData) {
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
    }

    // todo fill data Linked Packages tab

    cy.get(addEditSelectors.btnCreateProject).click()
    cy.get(viewSelectors.alertMessage).contains('Success: Your project is created')
    cy.contains('Edit Projects')
}

export function verifySummaryTab(expectedOutput) {
    const nStep = Object.keys(expectedOutput).length
    for (let i = 0; i < nStep; i++) {
        const keyFieldName = Object.keys(expectedOutput)[i]
        const fieldValue = expectedOutput[keyFieldName]
        switch (keyFieldName) {
            case 'name':
                cy.get(viewSelectors.name).invoke('text').should('contain', fieldValue)
                break
            case 'version':
                cy.get(viewSelectors.version).invoke('text').should('contain', fieldValue)
                break
            case 'visibility':
                // cy.get(viewSelectors.visibility).invoke('text').should('contain', fieldValue.name) -> bug new front end
                break
            case 'project_type':
                cy.get(viewSelectors.projectType).invoke('text').should('contain', fieldValue.name)
                break
            case 'tag':
                cy.get(viewSelectors.tag).invoke('text').should('contain', fieldValue)
                break
            case 'description':
                cy.get(viewSelectors.description).should('contain', fieldValue)
                break
            case 'domain':
                cy.get(viewSelectors.domain).invoke('text').should('contain', fieldValue.name)
                break
            case 'external_URL':
                cy.get(viewSelectors.externalURLsKey).should('contain', fieldValue.key)
                cy.get(viewSelectors.externalURLsValue).should('contain', fieldValue.value)
                break
            case 'project_manager':
                // cy.get(viewSelectors.projectManager).invoke('text').should('not.to.eq','') -> bug new front end
                break
            case 'project_owner':
                // cy.get(viewSelectors.projectOwner).invoke('text').should('not.to.eq', '') -> bug new front end
                // bug project_owner is blank when open edit project page
                break
            case 'owner_accounting_unit':
                cy.get(viewSelectors.ownerAccountingUnit).should('contain', fieldValue)
                break
            case 'owner_billing_group':
                cy.get(viewSelectors.ownerBillingGroup).should('contain', fieldValue)
                break
            case 'owner_country':
                cy.get(viewSelectors.ownerCountry).should('contain', fieldValue.name)
                break
            case 'lead_architect':
                cy.get(viewSelectors.leadArchitect).invoke('text').should('not.to.eq', '')
                break
            case 'moderators':
                cy.get(viewSelectors.moderators).invoke('text').should('not.to.eq', '')
                break
            case 'contributors':
                cy.get(viewSelectors.contributors).invoke('text').should('not.to.eq', '')
                break
            case 'security_responsibles':
                cy.get(viewSelectors.securityResponsibles).invoke('text').should('not.to.eq', '')
                break
            case 'additional_roles':
                // cy.get(viewSelectors.additionalRoles).invoke('text').should('not.to.eq','') -> bug new front end
                break
            case 'external_ids':
                cy.get(viewSelectors.externalIds)
                    .invoke('text')
                    .should('contain', fieldValue.key)
                    .and('contain', fieldValue.value)
                break
            case 'external_data':
                cy.get(viewSelectors.additionalData)
                    .invoke('text')
                    .should('contain', fieldValue.key)
                    .and('contain', fieldValue.value)
                break
            default:
                break
        }
    }
}

export function verifyAdministrationTab(expectedOutput) {
    const nStep = Object.keys(expectedOutput).length
    for (let i = 0; i < nStep; i++) {
        const keyFieldName = Object.keys(expectedOutput)[i]
        const fieldValue = expectedOutput[keyFieldName]
        switch (keyFieldName) {
            case 'clearing_state':
                // cy.get(viewSelectors.clearingState).invoke('text').should('contain', fieldValue.name) -> todo fix bug new front end: clearing state when create a duplicate project
                break
            case 'clearing_team':
                // cy.get(viewSelectors.clearingTeam).invoke('text').should('not.to.eq', '') -> bug new front end
                break
            case 'deadline_for_pre_evaluation':
                cy.get(viewSelectors.deadlineForPreEvaluation).invoke('text').should('contain', fieldValue)
                break
            case 'clearing_summary':
                cy.get(viewSelectors.clearingSummary).should('contain', fieldValue)
                break
            case 'special_risk_OSS':
                cy.get(viewSelectors.specialRiskOSS).should('contain', fieldValue)
                break
            case 'general_risk_3rd':
                cy.get(viewSelectors.generalRisk3rd).should('contain', fieldValue)
                break
            case 'special_risk_3rd':
                cy.get(viewSelectors.specialRisk3rd).should('contain', fieldValue)
                break
            case 'sales_and_delivery_channels':
                cy.get(viewSelectors.salesAndDeliveryChannels).should('contain', fieldValue)
                break
            case 'remarks_additional_requirements':
                cy.get(viewSelectors.remarksAdditionalRequirements).should('contain', fieldValue)
                break
            case 'system_test_begin_date':
                cy.get(viewSelectors.systemTestBeginDate).invoke('text').should('contain', fieldValue)
                break
            case 'system_test_end_date':
                cy.get(viewSelectors.systemTestEndDate).invoke('text').should('contain', fieldValue)
                break
            case 'delivery_start_date':
                cy.get(viewSelectors.deliveryStartDate).invoke('text').should('contain', fieldValue)
                break
            case 'phase_out_date':
                cy.get(viewSelectors.phaseOutDate).invoke('text').should('contain', fieldValue)
                break
            case 'license_info_header':
            // cy.get(viewSelectors.licenseInfoHeader).invoke('text').should('contain', fieldValue) -> bug new front end
            default:
                break
        }
    }
}

// verify License Clearing tab -> bug new front end

export function verifyCreatedOrUpdatedProject(testData) {
    if (testData.summary_tab)
        verifySummaryTab(testData.summary_tab)
    if (testData.administration_tab) {
        cy.get(addEditSelectors.tabAdministration).click()
        verifyAdministrationTab(testData.administration_tab)
    }
}

export function searchProjectByName(projectName) {
    cy.get(viewSelectors.navProject).click()
    cy.contains('Advanced Search')
    cy.get(projectListSelectors.advanceSearchName).clearAndType(projectName)
    cy.get(projectListSelectors.btnSearch).click()
    cy.contains('a', projectName)
}

export function gotoUpdateProjectPage(projectName) {
    searchProjectByName(projectName)
    cy.contains('a', projectName).closest('tr').find('td').last().find('svg').first().click()
    // todo verify the message "Success:You are editing the original document." => cy.get(viewSelectors.alertMessage).contains('Success:You are editing the original document.')
    cy.contains('Update Project')
}

export function updateProject(testData) {
    cy.get(addEditSelectors.txtName).should('not.have.value', '')
    // fill data Summary tab
    if (testData.summary_tab) {
        fillDataSummaryTab(testData.summary_tab, true)
        cy.get(addEditSelectors.txtName)
            .invoke('val')
            .then((projectName) => {
                cy.get(addEditSelectors.txtVersion)
                    .invoke('val')
                    .then((projectVersion) => {
                        // fill data Administration tab
                        if (testData.administration_tab) {
                            cy.get(addEditSelectors.tabAdministration).click()
                            fillDataAdministrationTab(testData.administration_tab, true)
                        }
                        // fill data Linked Releases and Projects tab
                        if (testData.linked_releases_and_projects_tab) {
                            cy.get(addEditSelectors.tabLinkedReleasesAndProjects).click()
                            fillDataLinkedReleasesAndProjectsTab(testData.linked_releases_and_projects_tab)
                        }
                        // todo fill data Linked Packages tab
                        cy.contains('Update Project').click()
                        const expectedMessage = `Success: Project ${projectName} (${projectVersion}) updated successfully!`
                        cy.get(viewSelectors.alertMessage).contains(expectedMessage)
                        cy.contains('Edit Projects')
                    })
            })
    }
}

export function registerDuplicateProject(testData) {
    cy.get(addEditSelectors.txtName).should('not.have.value', '')
    
    if (testData.summary_tab)
        fillDataSummaryTab(testData.summary_tab, true)
    
    if (testData.administration_tab) {
        cy.get(addEditSelectors.tabAdministration).click()
        fillDataAdministrationTab(testData.administration_tab, true)
    }
    
    if (testData.linked_releases_and_projects_tab) {
        cy.get(addEditSelectors.tabLinkedReleasesAndProjects).click()
        fillDataLinkedReleasesAndProjectsTab(testData.linked_releases_and_projects_tab)
    }

    // todo fill data Linked Packages tab
    
    cy.get(addEditSelectors.btnCreateProject).click()
    cy.get(viewSelectors.alertMessage).contains('Success: Your project is created')
    cy.contains('Edit Projects')
}