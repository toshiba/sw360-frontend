
// elements of add/edit project page
const btnCreateProject = '.row > .me-2'
const btnUpdateProject = '.btn-primary'
const alertMessageEditPage = '.global-message .alert'

/******* Summary tab *******/
const tabSummary = '[id*=":-tab-summary"]'
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
const addRowExternalURLs = {
  // 'btnAddRow': ':nth-child(2) > .row > .col-lg-4 > .btn',
  'btnAddRow': '[id*=":-tabpane-summary"] > .ms-1 > :nth-child(2) > .row > .col-lg-4 > .btn',
  'key': '.col-lg-6 > .form-control',
  'value': ':nth-child(2) > :nth-child(2) > .row > .col-lg-5 > .form-control'
}

// Role
const dialogProjectManager = {
  "openDialog": "#addProjects\\.projectManager",
  "dialog": ".modal-content",
  "searchBtn": ":nth-child(1) > .col-lg-4 > :nth-child(1)",
  "selectUser": "[data-column-id=\"user-selection\"] > :nth-child(1) > div > .form-check-input",
  "selectUsersBtn": ".justify-content-end > .btn-primary"
}

const dialogProjectOwner = {
  "openDialog": "#addProjects\\.projectOwner",
  "dialog": ".modal-content",
  "searchBtn": ":nth-child(1) > .col-lg-4 > :nth-child(1)",
  "selectUser": "[data-column-id=\"user-selection\"] > :nth-child(1) > div > .form-check-input",
  "selectUsersBtn": ".justify-content-end > .btn-primary"
}
const txtOwnerAccountingUnit = '#addProjects\\.ownerAccountingUnit'
const txtOwnerBillingGroup = '#addProjects\\.ownerGroup'
const selectOwnerCountry = '#country'
const dialogLeadArchitect = {
  "openDialog": "#addProjects\\.leadArchitect",
  "dialog": ".modal-content",
  "searchBtn": ":nth-child(1) > .col-lg-4 > :nth-child(1)",
  "selectUser": "[data-column-id=\"user-selection\"] > :nth-child(1) > div > .form-check-input",
  "selectUsersBtn": ".justify-content-end > .btn-primary"
}

const dialogModerators = {
  "openDialog": "#addProjects\\.moderators",
  "dialog": ".modal-content",
  "searchBtn": ":nth-child(1) > .col-lg-4 > :nth-child(1)",
  "selectUser": "[data-column-id=\"user-selection\"] > :nth-child(1) > div > .form-check-input",
  "selectUsersBtn": ".justify-content-end > .btn-primary"
}

const dialogContributors = {
  "openDialog": "#addProjects\\.contributors",
  "dialog": ".modal-content",
  "searchBtn": ":nth-child(1) > .col-lg-4 > :nth-child(1)",
  "selectUser": "[data-column-id=\"user-selection\"] > :nth-child(1) > div > .form-check-input",
  "selectUsersBtn": ".justify-content-end > .btn-primary"
}

const dialogSecurityResponsibles = {
  "openDialog": "#addProjects\\.securityResponsibles",
  "dialog": ".modal-content",
  "searchBtn": ":nth-child(1) > .col-lg-4 > :nth-child(1)",
  "selectUser": "[data-column-id=\"user-selection\"] > :nth-child(1) > div > .form-check-input",
  "selectUsersBtn": ".justify-content-end > .btn-primary"
}

// Additional Roles
const addRowAdditionalRoles = {
  'btnAddRow': ':nth-child(4) > :nth-child(2) > .col-lg-4 > .btn',
  'role': ':nth-child(4) > :nth-child(2) > .row > :nth-child(1) > .form-select',
  'mail': ':nth-child(4) > :nth-child(2) > .row > :nth-child(2) > .form-control'
}

// External Ids
const addRowExternalIds = {
  'btnAddRow': ':nth-child(5) > :nth-child(2) > .col-lg-4 > .btn',
  'key': ':nth-child(5) > :nth-child(2) > .row > .col-lg-6 > .form-control',
  'value': ':nth-child(5) > :nth-child(2) > .row > .col-lg-5 > .form-control'
}

// Additional Data
const addRowAdditionalData = {
  'btnAddRow': ':nth-child(6) > .row > .col-lg-4 > .btn',
  'key': ':nth-child(6) > :nth-child(2) > .row > .col-lg-6 > .form-control',
  'value': ':nth-child(6) > :nth-child(2) > .row > .col-lg-5 > .form-control'
}

/******* Administration tab *******/
const tabAdministration = '[id*=":-tab-administration"]'
const selectClearingState = '#addProjects\\.clearingState'
const selectClearingTeam = '#addProjects\\.clearingTeam'
const dtDeadlineForPreEvaluation = '#addProjects\\.deadlinePreEvaluation'
const txtClearingSummary = '#addProjects\\.clearingSummary'
const txtSpecialRiskOSS = '#addProjects\\.specialRiskOpenSourceSoftware'
const txtGeneralRisk3rd = '#addProjects\\.generalRiskThirdPartySoftware'
const txtSpecialRisk3rd = '#addProjects\\.specialRiskThirdPartySoftware'
const txtSalesAndDeliveryChannels = '#addProjects\\.salesAndDeliveryChannels'
const txtRemarksAdditionalRequirements = '#addProjects\\.remarksAdditionalRequirements'
const dtSystemTestBeginDate = ':nth-child(2) > #addProjects\\.systemTestBeginDate'
const dtSystemTestEndDate = '#addProjects\\.systemTestEndDate'
const dtDeliveryStartDate = ':nth-child(1) > #addProjects\\.systemTestBeginDate'
const dtPhaseOutDate = '#addProjects\\.phaseOutDate'
const txtLicenseInfoHeader = '#addProjects\\.licenseInfoHeader'

/******* Linked Releases and Projects tab *******/
const tabLinkedReleasesAndProjects = '[id*=":-tab-linkedProjects"]'
const dialogLinkProjects = {
  "openDialog": ":nth-child(3) > .col-lg-4 > .btn",
  "dialog": ".modal-content",
  "searchBtn": ".mb-3 > :nth-child(3) > .btn",
  "selectLinked": ".modal-footer .btn-primary",
  "LinkedBtn": ".modal-footer .btn-primary"
}

const dialogLinkReleases = {
  "openDialog": ":nth-child(2) > :nth-child(3) > .col-lg-4 > .btn",
  "dialog": ".modal-content",
  "searchBtn": ".col-auto > .btn",
  "selectLinked": ".form-check .form-check-input",
  "LinkedBtn": ".modal-footer > .btn-primary"
}

export const addEditSelectors = {
  // summary tab
  tabSummary,
  btnCreateProject,
  btnUpdateProject,
  alertMessageEditPage,
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
  addRowExternalURLs,
  dialogProjectManager,
  dialogProjectOwner,
  txtOwnerAccountingUnit,
  txtOwnerBillingGroup,
  selectOwnerCountry,
  dialogLeadArchitect,
  dialogModerators,
  dialogContributors,
  dialogSecurityResponsibles,
  addRowAdditionalRoles,
  addRowExternalIds,
  addRowAdditionalData,

  // administration tab
  tabAdministration,
  selectClearingState,
  selectClearingTeam,
  dtDeadlineForPreEvaluation,
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
const btnEditProject= '.row > .btn-primary'

// summary tab
const name = ':nth-child(2) > tbody > :nth-child(2) > :nth-child(2)'
const version = ':nth-child(2) > tbody > :nth-child(3) > :nth-child(2)'
const visibility = ':nth-child(2) > tbody > :nth-child(4) > :nth-child(2)'
const projectType = ':nth-child(2) > tbody > :nth-child(9) > :nth-child(2)'
const tag = ':nth-child(2) > tbody > :nth-child(11) > :nth-child(2)'
const description = '[id*=":-tabpane-summary"] > .mt-3'
const domain = ':nth-child(2) > tbody > :nth-child(10) > :nth-child(2)'
const externalURLsKey = ':nth-child(14) > :nth-child(2) > li > .fw-bold'
const externalURLsValue = ':nth-child(14) > :nth-child(2) > li > .text-link'
const projectManager = ':nth-child(3) > tbody > :nth-child(2) > :nth-child(2)'
const projectResponsible = ':nth-child(3) > tbody > :nth-child(2) > :nth-child(2)'
const projectOwner = ':nth-child(3) > tbody > :nth-child(3) > :nth-child(2)'
const ownerAccountingUnit = ':nth-child(3) > tbody > :nth-child(4) > :nth-child(2)'
const ownerBillingGroup = ':nth-child(3) > tbody > :nth-child(5) > :nth-child(2)'
const ownerCountry = ':nth-child(3) > tbody > :nth-child(6) > :nth-child(2)'
const leadArchitect = ':nth-child(3) > tbody > :nth-child(7) > :nth-child(2)'
const moderators = ':nth-child(8) > :nth-child(2) > li > .text-link'
const contributors = ':nth-child(9) > :nth-child(2) > li > .text-link'
const securityResponsibles = ':nth-child(3) > tbody > :nth-child(10) > :nth-child(2)'
const additionalRoles = ':nth-child(3) > tbody > :nth-child(11) > :nth-child(2)'
const externalIds = ':nth-child(12) > :nth-child(2) > li'
const additionalData = ':nth-child(13) > :nth-child(2)'

//administration tab
const clearingState = ':nth-child(1) > tbody > :nth-child(1) > :nth-child(2)'
const clearingTeam = ':nth-child(1) > tbody > :nth-child(3) > :nth-child(2)'
const deadlineForPreEvaluation = ':nth-child(1) > tbody > :nth-child(4) > :nth-child(2)'
const clearingSummary = '#administration\\.clearingSummary'
const specialRiskOSS = '#administration\\.specialRiskOSS'
const generalRisk3rd = '#administration\\.generalRisks3rdPartySoftware'
const specialRisk3rd = '#administration\\.specialRisks3rdPartySoftware'
const salesAndDeliveryChannels = '#administration\\.salesAndDeliveryChannels'
const remarksAdditionalRequirements = '#administration\\.remarksAdditionalRequirements'
const systemTestBeginDate = ':nth-child(2) > tbody > :nth-child(2) > :nth-child(2)'
const systemTestEndDate = ':nth-child(2) > tbody > :nth-child(3) > :nth-child(2)'
const deliveryStartDate = ':nth-child(2) > tbody > :nth-child(4) > :nth-child(2)'
const phaseOutDate = ':nth-child(2) > tbody > :nth-child(5) > :nth-child(2)'
const licenseInfoHeader = '#administration\\.licenseInfoHeader'

export const viewSelectors = {
  navProject,
  btnAddProject,
  alertMessage,
  btnEditProject,

  // summary tab
  name,
  version,
  visibility,
  projectType,
  tag,
  description,
  domain,
  externalURLsKey,
  externalURLsValue,
  projectManager,
  projectResponsible,
  projectOwner,
  ownerAccountingUnit,
  ownerBillingGroup,
  ownerCountry,
  leadArchitect,
  moderators,
  contributors,
  securityResponsibles,
  additionalRoles,
  externalIds,
  additionalData,

  // administration tab
  clearingState,
  clearingTeam,
  deadlineForPreEvaluation,
  clearingSummary,
  specialRiskOSS,
  generalRisk3rd,
  specialRisk3rd,
  salesAndDeliveryChannels,
  remarksAdditionalRequirements,
  systemTestBeginDate,
  systemTestEndDate,
  deliveryStartDate,
  phaseOutDate,
  licenseInfoHeader
}

//project list
const advanceSearchName = '#name'
const btnSearch = '.w-100'
export const projectListSelectors = {
  advanceSearchName,
  btnSearch
}