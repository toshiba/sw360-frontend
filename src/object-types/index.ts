// Copyright (c) Helio Chissini de Castro, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Siemens AG, 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

// Interfaces
import AccessToken from './AccessToken'
import AddtionalDataType from './AddtionalDataType'
import AdministrationDataType from './AdministrationDataType'
import Attachment from './Attachment'
import AuthToken from './AuthToken'
import COTSDetails from './COTSDetails'
import CVEReference from './CVEReference'
import Changelogs from './Changelogs'
import ClearingInformation from './ClearingInformation'
import Component from './Component'
import ComponentPayload from './ComponentPayLoad'
import ECC from './ECC'
import ECCInformation from './ECCInformation'
import Embedded from './Embedded'
import FossologyProcessInfo from './FossologyProcessInfo'
import FossologyProcessStatus from './FossologyProcessStatus'
import InputKeyValue from './InputKeyValue'
import LicenseDetail from './LicenseDetail'
import LicensePayload from './LicensePayload'
import LinkedAttachments from './LinkedAttachments'
import LinkedRelease from './LinkedRelease'
import LinkedVulnerability from './LinkedVulnerability'
import Links from './Links'
import { Message, MessageOptions } from './Message'
import ModerationRequest from './ModerationRequest'
import ModerationRequestDetails from './ModerationRequestDetails'
import ModerationRequestPayload from './ModerationRequestPayload'
import NavList from './NavList'
import NodeData from './NodeData'
import OAuthClient from './OAuthClient'
import Obligation from './Obligation'
import Package from './Package'
import Preferences from './Preferences'
import Project from './Project'
import ProjectPayload from './ProjectPayload'
import { ProjectData, ProjectVulnerability, ProjectsPayloadElement, VulnerabilityRatingAndActionPayload } from './ProjectVulnerabilityTypes'
import Release from './Release'
import ReleaseDetail from './ReleaseDetail'
import ReleaseLink from './ReleaseLink'
import Repository from './Repository'
import RequestContent from './RequestContent'
import Resources from './Resources'
import RestrictedResource from './RestrictedResource'
import RolesType from './RolesType'
import SearchResult from './SearchResult'
import Session from './Session'
import SummaryDataType from './SummaryDataType'
import ToastData from './ToastData'
import { CreateUserPayload, User } from './User'
import UserCredentialInfo from './UserCredentialInfo'
import Vendor from './Vendor'
import VendorAdvisory from './VendorAdvisory'
import VendorPayload from './VendorPayload'
import VendorType from './VendorType'
import VerificationStateInfo from './VerificationStateInfo'
import Vulnerability from './Vulnerability'
import { ProjectVulnerabilityTrackingStatus, VulnerabilityTrackingStatus } from './VulnerabilityTrackingStatus'

export type {
    AccessToken,
    AddtionalDataType,
    AdministrationDataType,
    Attachment,
    AuthToken,
    COTSDetails,
    CVEReference,
    Changelogs,
    ClearingInformation,
    Component,
    ComponentPayload, CreateUserPayload, ECC, ECCInformation,
    Embedded,
    FossologyProcessInfo,
    FossologyProcessStatus,
    InputKeyValue, LicenseDetail, LicensePayload, LinkedAttachments,
    LinkedRelease,
    LinkedVulnerability,
    Links, Message,
    MessageOptions, ModerationRequest,
    ModerationRequestDetails,
    ModerationRequestPayload,
    NodeData,
    OAuthClient,
    Obligation,
    Package,
    Project,
    ProjectData,
    ProjectPayload, ProjectVulnerability, ProjectVulnerabilityTrackingStatus, ProjectsPayloadElement,
    Release,
    ReleaseDetail,
    ReleaseLink,
    Repository,
    RequestContent,
    Resources,
    RestrictedResource,
    RolesType,
    SearchResult,
    Session,
    SummaryDataType,
    ToastData,
    User, UserCredentialInfo,
    Vendor,
    VendorAdvisory,
    VendorPayload,
    VendorType,
    VerificationStateInfo,
    Vulnerability,
    VulnerabilityRatingAndActionPayload, VulnerabilityTrackingStatus
}

// Special functions for populate data
export { NavList, Preferences }

// Enums
import ActionType from './enums/ActionType'
import AttachmentType from './enums/AttachmentTypes'
import CommonTabIds from './enums/CommonTabsIds'
import ComponentTabIds from './enums/ComponentTabIds'
import DocumentTypes from './enums/DocumentTypes'
import HttpStatus from './enums/HttpStatus'
import LicenseTabIds from './enums/LicenseTabIds'
import ReleaseTabIds from './enums/ReleaseTabIds'
import RequestDocumentTypes from './enums/RequestDocumentTypes'
import VulnerabilitiesVerificationState from './enums/VulnerabilitiesVerificationState'

export {
    ActionType,
    AttachmentType,
    CommonTabIds,
    ComponentTabIds,
    DocumentTypes, HttpStatus, LicenseTabIds, ReleaseTabIds, RequestDocumentTypes, VulnerabilitiesVerificationState
}

