/*
 * Copyright TOSHIBA CORPORATION, 2021. Part of the SW360 Portal Project.
 * Copyright Toshiba Software Development (Vietnam) Co., Ltd., 2021. Part of the SW360 Portal Project.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 */

enum RequestedAction {
    READ = 1,
    WRITE = 2,
    DELETE = 3,
    USERS = 4,
    CLEARING = 5,
    ATTACHMENTS = 6,
    WRITE_ECC = 7,
}

export default RequestedAction
