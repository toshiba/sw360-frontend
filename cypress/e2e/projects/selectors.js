
// elements of add/edit project page
const btnCreateProject = '.row > .me-2'
const btnUpdateProject = '[href=""] > .btn-primary'

/******* Summary tab *******/

// General Information
const txtName = '#addProjects\\.name'
const txtVersion = '#addProjects\\.version'
const selectVisibility = '#addProjects\\.visibility'
const selectProjectType = '#addProjects\\.projectType'
const txtTag = '#addProjects\\.tag'
const txtDescription = '#addProjects\\.description'
const selectDomain = '#addProjects\\.domain'
const selectVendor = ''
const dialogVendor = {
    "openDialog": "#addProjects\\.vendor",
    "dialog": ".modal-content",
    "addVendorBtn": ".justify-content-end > :nth-child(2)",
    "addVendorBtnInAddVendorDialog": ".justify-content-end > .btn-primary",
    "searchBtn": ":nth-child(1) > .col-lg-4 > :nth-child(1)",
    "selectVendorBtn": ".justify-content-end > :nth-child(3)",
    "chooseVendor": "[data-column-id=\"vendorId\"] > :nth-child(1) > div > .form-check-input"
  }

const tabLicense = ''
const tabLinkedObligations = ''
const tblObligations = ''

// External URLs
const externalURLs = {
    'btnAddRow': ':nth-child(2) > .row > .col-lg-4 > .btn',
    'key': '.col-lg-6 > .form-control',
    'value': ':nth-child(2) > :nth-child(2) > .row > .col-lg-5 > .form-control'
} 

// Role
const dialogProjectManager = {
    "openDialog": "#addProjects\\.projectManager",
    "dialog": ".modal-content",
    "searchBtn": ":nth-child(1) > .col-lg-4 > :nth-child(1)",
    "selectUser":"[data-column-id=\"user-selection\"] > :nth-child(1) > div > .form-check-input",
    "selectUsersBtn": ".justify-content-end > .btn-primary"
  }
  
const dialogProjectOwner = {
    "openDialog": "#addProjects\\.projectOwner",
    "dialog": ".modal-content",
    "searchBtn": ":nth-child(1) > .col-lg-4 > :nth-child(1)",
    "selectUser":"[data-column-id=\"user-selection\"] > :nth-child(1) > div > .form-check-input",
    "selectUsersBtn": ".justify-content-end > .btn-primary"
  }
const ownerAccountingUnit = '#addProjects\\.ownerAccountingUnit'
const ownerBillingGroup = '#addProjects\\.ownerGroup'
const ownerCountry = '#country'
const dialogLeadArchitect = {
    "openDialog": "#addProjects\\.leadArchitect",
    "dialog": ".modal-content",
    "searchBtn": ":nth-child(1) > .col-lg-4 > :nth-child(1)",
    "selectUser":"[data-column-id=\"user-selection\"] > :nth-child(1) > div > .form-check-input",
    "selectUsersBtn": ".justify-content-end > .btn-primary"
  }
  
const dialogModerators = {
    "openDialog": "#addProjects\\.moderators",
    "dialog": ".modal-content",
    "searchBtn": ":nth-child(1) > .col-lg-4 > :nth-child(1)",
    "selectUser":"[data-column-id=\"user-selection\"] > :nth-child(1) > div > .form-check-input",
    "selectUsersBtn": ".justify-content-end > .btn-primary"
  }
  
const dialogContributors = {
    "openDialog": "#addProjects\\.contributors",
    "dialog": ".modal-content",
    "searchBtn": ":nth-child(1) > .col-lg-4 > :nth-child(1)",
    "selectUser":"[data-column-id=\"user-selection\"] > :nth-child(1) > div > .form-check-input",
    "selectUsersBtn": ".justify-content-end > .btn-primary"
  }
  
const dialogSecurityResponsibles = {
    "openDialog": "#addProjects\\.securityResponsibles",
    "dialog": ".modal-content",
    "searchBtn": ":nth-child(1) > .col-lg-4 > :nth-child(1)",
    "selectUser":"[data-column-id=\"user-selection\"] > :nth-child(1) > div > .form-check-input",
    "selectUsersBtn": ".justify-content-end > .btn-primary"
  }

// Additional Roles
const additionalRoles = {
    'btnAddRow': ':nth-child(4) > :nth-child(2) > .col-lg-4 > .btn',
    'role': ':nth-child(4) > :nth-child(2) > .row > :nth-child(1) > .form-select',
    'mail': ':nth-child(4) > :nth-child(2) > .row > :nth-child(2) > .form-control'
}

// External Ids
const externalIds = {
    'btnAddRow': ':nth-child(5) > :nth-child(2) > .col-lg-4 > .btn',
    'key': ':nth-child(5) > :nth-child(2) > .row > .col-lg-6 > .form-control',
    'value': ':nth-child(5) > :nth-child(2) > .row > .col-lg-5 > .form-control'
}

// Additional Data
const additionalData = {
    'btnAddRow': ':nth-child(6) > .row > .col-lg-4 > .btn',
    'key': ':nth-child(6) > :nth-child(2) > .row > .col-lg-6 > .form-control',
    'value': ':nth-child(6) > :nth-child(2) > .row > .col-lg-5 > .form-control'
}

/******* Administration tab *******/
const tabAdministration = '[id*=":-tab-administration"]'
const selectClearingState = '#addProjects\\.clearingState'
const selectClearingTeam = '#addProjects\\.clearingTeam'
const dtDeadline_for_pre_evaluation = '#addProjects\\.deadlinePreEvaluation'
const txtClearingSummary = '#addProjects\\.clearingSummary'
const txtSpecialRiskOSS = '#addProjects\\.specialRiskOpenSourceSoftware'
const txtGeneralRisk3rd = '#addProjects\\.generalRiskThirdPartySoftware'
const txtSpecialRisk3rd = '#addProjects\\.specialRiskThirdPartySoftware'
const txtSalesAndDeliveryChannels = '#addProjects\\.salesAndDeliveryChannels'
const txtRemarksAdditionalRequirements = '#addProjects\\.remarksAdditionalRequirements'
const dtSystemTestBeginDate =':nth-child(2) > #addProjects\\.systemTestBeginDate'
const dtSystemTestEndDate ='#addProjects\\.systemTestEndDate'
const dtDeliveryStartDate =':nth-child(1) > #addProjects\\.systemTestBeginDate'
const dtPhaseOutDate ='#addProjects\\.phaseOutDate'
const txtLicenseInfoHeader = '#addProjects\\.licenseInfoHeader'

/******* Linked Releases and Projects tab *******/
const tabLinkedReleasesAndProjects = '[id*=":-tab-linkedProjects"]'
const dialogLinkProjects = {
  "openDialog": ":nth-child(3) > .col-lg-4 > .btn",
  "dialog": ".modal-content",
  "searchBtn": ".mb-3 > :nth-child(3) > .btn",
  "selectLinked":".modal-footer .btn-primary",
  "LinkedBtn": ".modal-footer .btn-primary"
}

const dialogLinkReleases = {
  "openDialog": ".mt-2",
  "dialog": ".modal-content",
  "searchBtn": ".modal-body > :nth-child(1) > :nth-child(2) > :nth-child(1)",
  "selectLinked":"[data-column-id=\"release-selection\"] > :nth-child(1) > .release-selection > .form-check-input",
  "LinkedBtn": ".justify-content-end > .d-inline-block"
}

export const addEditSelectors = {
    // summary tab
    btnCreateProject,
    btnUpdateProject,
    txtName,
    txtVersion,
    selectVisibility,
    selectProjectType,
    txtTag,
    txtDescription,
    selectDomain,
    selectVendor,
    tabLicense,
    tabLinkedObligations,
    tblObligations,
    dialogVendor,
    externalURLs,
    dialogProjectManager,
    dialogProjectOwner,
    ownerAccountingUnit,
    ownerBillingGroup,
    ownerCountry,
    dialogLeadArchitect,
    dialogModerators,
    dialogContributors,
    dialogSecurityResponsibles,
    additionalRoles,
    externalIds,
    additionalData,
    // administration tab
    tabAdministration,
    selectClearingState,
    selectClearingTeam,
    dtDeadline_for_pre_evaluation,
    txtClearingSummary,
    txtSpecialRiskOSS,
    txtGeneralRisk3rd,
    txtSpecialRisk3rd,
    txtSalesAndDeliveryChannels,
    txtRemarksAdditionalRequirements,
    dtSystemTestBeginDate,
    dtSystemTestEndDate,
    dtDeliveryStartDate,
    dtPhaseOutDate,
    txtLicenseInfoHeader,
    // linked Releases and Projects tab
    tabLinkedReleasesAndProjects,
    dialogLinkProjects,
    dialogLinkReleases
}

//elements of view page
const navProject = '[href="/projects"]'
const btnAddProject = '.btn-group > .btn-primary'
const alertMessage = '.fade > span'
export const viewSelectors = {
    navProject,
    btnAddProject,
    alertMessage
}