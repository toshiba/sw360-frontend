// Copyright (C) TOSHIBA CORPORATION, 2024. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2024. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

export const selectors = {
    packagesLink: '[href="/packages"]',
    packageNameField: 'name',
    nameInputId: `#createOrEditPackage\\.name`,
    primaryButton: 'button.btn.btn-primary.col-auto',
    fillData: (key) => `#createOrEditPackage\\.${key}`,
    checkValidField: (field) => fieldNames.hasOwnProperty(field),
    createPackageButtonName: 'Create Package',
    addPackageButtonName: 'Add Package',
    updatePackageButtonName: 'Update Package',
    selectableFields: ['packageType'],
    successCreateMessage: 'Success: Package created successfully',
    successUpdateMessage: 'Success: Package updated successfully',
    packagesUrl: /\/packages$/,
    getFieldName: (key) => fieldNames[key],
    icon: 'td:last-child svg',
    editIconPosition: 0
}

const fieldNames = {
    'name': 'Name',
    'version': 'Version',
    'packageType': 'Package Type',
    'purl': 'PURL (Package URL)',
    'packageManager': 'Package Manager',
    'vcs': 'VCS (Version Control System)',
    'homepageUrl': 'Homepage URL',
    'licenses': 'Licenses',
    'release': 'Linked Release',
    'description': 'Description',
    'createdOn': 'Created on',
    'createdBy': 'Created By',
    'modifyOn': 'Modified On',
    'modifiedBy': 'Modified By'
}