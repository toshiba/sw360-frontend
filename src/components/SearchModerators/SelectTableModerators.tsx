'use client'

import { Session } from '@/object-types/Session'
import { Form } from 'react-bootstrap'
import React, { useState } from 'react'
import { Table, _ } from '@/components/sw360'
import ModeratorsTable from './ModeratorsTable'
import ModeratorsResponse from '@/object-types/ModeratorResponse'

interface Props {
  session?: Session,
  users: any[]
  onChange: any
  email: any[]
}

const SelectTableModerators = ({session, users, onChange, email} : Props) => {

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