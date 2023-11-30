// Copyright (c) Helio Chissini de Castro, 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import { QuickFilterProps } from '@/components/sw360/QuickFilter/QuickFilter.types'
import { Form } from 'react-bootstrap'

function QuickFilterLicense({ id, searchFunction, title = 'Quick Filter' }: QuickFilterProps) {
    return (
        <div className='card-deck' style={{ width: '258px', height: '74px', marginRight: '0px', marginLeft: 'auto' }}>
            <div id='component-quickfilter' className='card'>
                <div className='card-header'>{title}</div>
                <div className='card-body'>
                    <Form>
                        <Form.Group key={id} className='mb-3' controlId={id}>
                            <Form.Control
                                className='form-control'
                                type='text'
                                size='sm'
                                name={title}
                                onInput={searchFunction}
                            />
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default QuickFilterLicense
