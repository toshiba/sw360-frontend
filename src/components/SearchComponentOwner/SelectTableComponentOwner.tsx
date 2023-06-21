'use client'


import { Session } from '@/object-types/Session'
import { Form } from 'react-bootstrap'
import React, { useState } from 'react'
import { Table, _ } from '@/components/sw360'
import UserResponse from '@/object-types/UserResponse'

interface Props {
  session?: Session
  users: any[]
  onChange: any
}

const SelectTableComponentOwner = ({session, users, onChange} : Props) => {
  
  const handlerRadioButton = (item: any) => {
    const fullName = item.givenName.concat(" ").concat(item.lastName)
    const userResponse: UserResponse = {
      fullName: fullName,
      email: item.email
    }
    onChange(userResponse)
  }

  const columns = [
    {
        name: "",
        formatter: (item: any) => _(<Form.Check type='radio' name='VendorId' onChange={() => handlerRadioButton(item)}></Form.Check>),
    },
    {
        name: "FullName",
        sort: true
    },
    {
        name: "ShortName",
        sort: true
    },
    {
        name: "URL",
        sort: true
    },
    {
        name: "_links",
        hidden: true
    }
  ]

  return (
    <>
        <div className='row'>
            <Table data={users} columns={columns} />
        </div>
      {/* <div className='row'>
        <Grid
          data={showData}
          columns={[
            {
              name: "",
              formatter: (email: string) => _(<Form.Check name='componentOwner' type='radio' onClick={() => handlerRadioButton(email)} ></Form.Check>),
              width: '10%'
            },
            {
              name: "GivenName",
           
              sort: true
            },
            {
              name: "LastName",
              sort: true
            },
            {
              name: "Email",
              sort: true
            },
            {
              name: "Department",
              sort: true
            }
          ]}
          pagination={{
            limit: 10
          }}
          search={true}
          language={{
            search: {
              placeholder: "🔍 Search..."
            }
          }}
          style={{
            header: {
              display: 'block',
              width: 'fit-content',
              float: 'right'
            }
          }}
        />
      </div> */}
    </>
  )
}


export default React.memo(SelectTableComponentOwner);