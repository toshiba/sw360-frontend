// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import { Form } from 'react-bootstrap'
import React, { useState } from 'react'
import { Table, _ } from '@/components/sw360'
import ModeratorsTable from './ModeratorsTable'
import ModeratorsResponse from '@/object-types/ModeratorResponse'

interface Props {
  users: any[]
  onChange: any
  email: any[]
}

const SelectTableModerators = ({users, onChange, email} : Props) => {

  const handlerRadioButton = (item: any) => {
    if (email.includes(item)) {
      const index = email.indexOf(item);
      if (index !== -1) {
        email.splice(index, 1);
      }
    } else {
      email.push(item)
    }
    const fullNames: string [] = [];
    const moderatorsEmail: string [] = [];
    email.map((item) => {
      fullNames.push(item.givenName.concat(" ").concat(item.lastName));
      moderatorsEmail.push(item.email);
    })
    const moderatorsName: string = fullNames.join(" , ");
    const moderatorsResponse: ModeratorsResponse = {
      fullName: moderatorsName,
      emails: moderatorsEmail
    }
    onChange(moderatorsResponse);
  }

  const columns = [
    {
        name: "",
        formatter: (item: string) => _(<Form.Check name='moderatorId' type='checkbox' onClick={() => {handlerRadioButton(item)}} ></Form.Check>),
        width: '7%'
      },
      {
        name: "GivenName",
        width: '14%',
        sort: true
      },
      {
        name: "LastName",
        sort: true,
        width: '14%',
      },
      {
        name: "Email",
        sort: true,
        width: '40%',
      },
      {
        name: "Department",
        sort: true
      }
  ]

  return (
    <>
        <div className='row'>
            <ModeratorsTable data={users} columns={columns} />
        </div>
    </>
  )
}


export default React.memo(SelectTableModerators);