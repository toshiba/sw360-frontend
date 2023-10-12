// Copyright (C) Siemens AG, 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import LinkedReleases from './component/LinkedReleasesAndProjects/LinkedReleases'
import LinkedProjects from './component/LinkedReleasesAndProjects/LinkedProjects'
// import { Session } from '@/object-types/Session'

export default function LinkedReleasesAndProjects() {
    return (
        <>
            <div className='ms-1'>
                <LinkedProjects />
                <LinkedReleases />
            </div>
        </>
    )
}