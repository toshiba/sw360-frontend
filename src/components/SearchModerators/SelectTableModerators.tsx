'use client'

import { Session } from '@/object-types/Session'
import { Form } from 'react-bootstrap'
import React, { useState } from 'react'
import { Table, _ } from '@/components/sw360'
interface Props {
  session?: Session,
  users: any[]
  onChange: any
  email: Array<string>
}

const SelectTableModerators = ({session, users, onChange, email} : Props) => {

  


  const handlerRadioButton = (item: any) => {
    // const emails: Array<string> = email;
    console.log(item)
    // emails.push(emailModerator)
    // console.log("sau")
    // console.log(emails)
    // setmoderators(emails)
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
            <Table data={users} columns={columns} />
        </div>
    </>
  )
}


export default React.memo(SelectTableModerators);