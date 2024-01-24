// Copyright (C) Siemens AG, 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

import { useState } from 'react'
import SnippetInformation from '../../../../../../../../object-types/spdx/SnippetInformation'
interface Props {
    snippetInformation: SnippetInformation
}

function SnippetCopyrightText({ snippetInformation }: Props) {
    // snippetCopyrightText
    const [snippetCopyrightTextExist, setSnippetCopyrightTextExist] = useState(true)
    const [snippetCopyrightTextNone, setSnippetCopyrightTextNone] = useState(false)
    const [snippetCopyrightTextNoasserttion, setSnippetCopyrightTextNoasserttion] = useState(false)

    const selectSnippetCopyrightTextExist = () => {
        setSnippetCopyrightTextExist(true)
        setSnippetCopyrightTextNone(false)
        setSnippetCopyrightTextNoasserttion(false)
    }
    const selectSnippetCopyrightTextNone = () => {
        setSnippetCopyrightTextExist(false)
        setSnippetCopyrightTextNone(true)
        setSnippetCopyrightTextNoasserttion(false)
    }
    const selectSnippetCopyrightTextNoasserttion = () => {
        setSnippetCopyrightTextExist(false)
        setSnippetCopyrightTextNone(false)
        setSnippetCopyrightTextNoasserttion(true)
    }

    return (
        <td colSpan={3}>
            <div className='form-group'>
                <label className='lableSPDX'>9.8 Snippet copyright text</label>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ display: 'inline-flex', flex: 3, marginRight: '1rem' }}>
                        <input
                            className='spdx-radio'
                            id='snippetCopyrightText'
                            type='radio'
                            name='_sw360_portlet_components_SNIPPET_COPYRIGHT_TEXT'
                            value='EXIST'
                            onClick={selectSnippetCopyrightTextExist}
                            checked={snippetCopyrightTextExist}
                        />
                        <textarea
                            style={{ flex: 6, marginRight: '1rem' }}
                            id='copyrightTextValueSnippet'
                            rows={5}
                            className='form-control'
                            placeholder='Enter snippet copyright text'
                            value={snippetInformation.copyrightText ?? ''}
                            disabled={snippetCopyrightTextNone || snippetCopyrightTextNoasserttion}
                        ></textarea>
                    </div>
                    <div style={{ flex: 2 }}>
                        <input
                            className='spdx-radio'
                            id='snippetCopyrightTextNone'
                            type='radio'
                            name='_sw360_portlet_components_SNIPPET_COPYRIGHT_TEXT'
                            value='NONE'
                            onClick={selectSnippetCopyrightTextNone}
                            checked={snippetCopyrightTextNone}
                        />
                        <label
                            style={{ marginRight: '2rem' }}
                            className='form-check-label radio-label lableSPDX'
                            htmlFor='snippetCopyrightTextNone'
                        >
                            NONE
                        </label>
                        <input
                            className='spdx-radio'
                            id='snippetCopyrightTextNoAssertion'
                            type='radio'
                            name='_sw360_portlet_components_SNIPPET_COPYRIGHT_TEXT'
                            value='NOASSERTION'
                            onClick={selectSnippetCopyrightTextNoasserttion}
                            checked={snippetCopyrightTextNoasserttion}
                        />
                        <label
                            className='form-check-label radio-label lableSPDX'
                            htmlFor='snippetCopyrightTextNoAssertion'
                        >
                            NOASSERTION
                        </label>
                    </div>
                </div>
            </div>
        </td>
    )
}

export default SnippetCopyrightText
