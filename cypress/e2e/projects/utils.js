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

export function fillDataSummaryTab(testData, isUpdate) {
    const nStep = Object.keys(testData).length
    for (let i = 0; i < nStep; i++) {
        const keyFieldName = Object.keys(testData)[i]
        const fieldValue = testData[keyFieldName]
        switch (keyFieldName) {
            case 'name':
                if (isUpdate == true)
                    cy.get(addEditSelectors.txtName).clearAndType(fieldValue)
                else
                    cy.get(addEditSelectors.txtName).type(fieldValue)
                break
            case 'version':
                if (isUpdate == true)
                    cy.get(addEditSelectors.txtVersion).clearAndType(fieldValue)
                else
                    cy.get(addEditSelectors.txtVersion).type(fieldValue)
                break
            case 'visibility':
                cy.get(addEditSelectors.selectVisibility).select(fieldValue.value)
                break
            case 'project_type':
                cy.get(addEditSelectors.selectProjectType).select(fieldValue.value)
                break
            case 'tag':
                if (isUpdate == true)
                    cy.get(addEditSelectors.txtTag).clearAndType(fieldValue)
                else
                    cy.get(addEditSelectors.txtTag).type(fieldValue)
                break
            case 'description':
                if (isUpdate == true)
                    cy.get(addEditSelectors.txtDescription).clearAndType(fieldValue)
                else
                    cy.get(addEditSelectors.txtDescription).type(fieldValue)
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
                if (isUpdate == true)
                    cy.get(addEditSelectors.txtOwnerAccountingUnit).clearAndType(fieldValue)
                else
                    cy.get(addEditSelectors.txtOwnerAccountingUnit).type(fieldValue)
                break
            case 'owner_billing_group':
                if (isUpdate == true)
                    cy.get(addEditSelectors.txtOwnerBillingGroup).clearAndType(fieldValue)
                else
                    cy.get(addEditSelectors.txtOwnerBillingGroup).type(fieldValue)
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
                // cy.get(addEditSelectors.selectClearingTeam).select(fieldValue.value)
                cy.get(addEditSelectors.selectClearingTeam).select(fieldValue.value_no)
                break
            case 'deadline_for_pre_evaluation':
                if (isUpdate == true)
                    cy.get(addEditSelectors.dtDeadlineForPreEvaluation).click()
                        .clearAndType(fieldValue)
                else
                    cy.get(addEditSelectors.dtDeadlineForPreEvaluation).click()
                        .type(fieldValue)
                break
            case 'clearing_summary':
                if (isUpdate == true)
                    cy.get(addEditSelectors.txtClearingSummary).clearAndType(fieldValue)
                else
                    cy.get(addEditSelectors.txtClearingSummary).type(fieldValue)
                break
            case 'special_risk_OSS':
                if (isUpdate == true)
                    cy.get(addEditSelectors.txtSpecialRiskOSS).clearAndType(fieldValue)
                else
                    cy.get(addEditSelectors.txtSpecialRiskOSS).type(fieldValue)
                break
            case 'general_risk_3rd':
                if (isUpdate == true)
                    cy.get(addEditSelectors.txtGeneralRisk3rd).clearAndType(fieldValue)
                else
                    cy.get(addEditSelectors.txtGeneralRisk3rd).type(fieldValue)
                break
            case 'special_risk_3rd':
                if (isUpdate == true)
                    cy.get(addEditSelectors.txtSpecialRisk3rd).clearAndType(fieldValue)
                else
                    cy.get(addEditSelectors.txtSpecialRisk3rd).type(fieldValue)
                break
            case 'sales_and_delivery_channels':
                if (isUpdate == true)
                    cy.get(addEditSelectors.txtSalesAndDeliveryChannels).clearAndType(fieldValue)
                else
                    cy.get(addEditSelectors.txtSalesAndDeliveryChannels).type(fieldValue)
                break
            case 'remarks_additional_requirements':
                if (isUpdate == true)
                    cy.get(addEditSelectors.txtRemarksAdditionalRequirements).clearAndType(fieldValue)
                else
                    cy.get(addEditSelectors.txtRemarksAdditionalRequirements).type(fieldValue)
                break
            case 'system_test_begin_date':
                if (isUpdate == true)
                    cy.get(addEditSelectors.dtSystemTestBeginDate).click()
                        .clearAndType(fieldValue)
                else
                    cy.get(addEditSelectors.dtSystemTestBeginDate).click()
                        .type(fieldValue)
                break
            case 'system_test_end_date':
                if (isUpdate == true)
                    cy.get(addEditSelectors.dtSystemTestEndDate).click()
                        .clearAndType(fieldValue)
                else
                    cy.get(addEditSelectors.dtSystemTestEndDate).click()
                        .type(fieldValue)
                break
            case 'delivery_start_date':
                if (isUpdate == true)
                    cy.get(addEditSelectors.dtDeliveryStartDate).click()
                        .clearAndType(fieldValue)
                else
                    cy.get(addEditSelectors.dtDeliveryStartDate).click()
                        .type(fieldValue)
                break
            case 'phase_out_date':
                if (isUpdate == true)
                    cy.get(addEditSelectors.dtPhaseOutDate).click()
                        .clearAndType(fieldValue)
                else
                    cy.get(addEditSelectors.dtPhaseOutDate).click()
                        .type(fieldValue)
                break
            case 'license_info_header':
                if (isUpdate == true)
                    cy.get(addEditSelectors.txtLicenseInfoHeader).clearAndType(fieldValue)
                else
                    cy.get(addEditSelectors.txtLicenseInfoHeader).type(fieldValue)
                break
            default:
                break
        }
    }
}

export function fillDataLinkedReleasesAndProjectsTab(testData, isUpdate) {
    const nStep = Object.keys(testData).length
    for (let i = 0; i < nStep; i++) {
        const keyFieldName = Object.keys(testData)[i]
        const fieldValue = testData[keyFieldName]
        switch (keyFieldName) {
            case 'linked_projects':
                // skip because bug new front end search without projects
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
        fillDataLinkedReleasesAndProjectsTab(testData.linked_releases_and_projects_tab, false)
    }
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
                cy.get(viewSelectors.projectOwner).invoke('text').should('not.to.eq', '')
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
                cy.get(viewSelectors.externalIds).invoke('text').should('contain', fieldValue.key)
                cy.get(viewSelectors.externalIds).invoke('text').should('contain', fieldValue.value)
                break
            case 'external_data':
                cy.get(viewSelectors.additionalData).invoke('text').should('contain', fieldValue.key)
                cy.get(viewSelectors.additionalData).invoke('text').should('contain', fieldValue.value)
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
                cy.get(viewSelectors.clearingState).invoke('text').should('contain', fieldValue.name)
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

export function verifyCreatedProject(testData) {
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