// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import EditRelease from './components/EditRelease'
import { ApiUtils } from '@/utils'
import { ConfigKeys, Configuration } from '@/object-types'

interface Context {
    params: { id: string }
}

const ReleaseEditPage = async ({ params }: Context) => {
    const releaseId = params.id
    const session = await getServerSession(authOptions)
    const response = await ApiUtils.GET('configurations', session.user.access_token)
    const config = await response.json() as Configuration
    const isSPDXFeatureEnabled = config[ConfigKeys.SPDX_DOCUMENT_ENABLED] == 'true'

    return <EditRelease releaseId={releaseId} isSPDXFeatureEnabled={isSPDXFeatureEnabled}/>
}

export default ReleaseEditPage
