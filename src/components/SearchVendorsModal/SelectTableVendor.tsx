'use client'

import { Session } from '@/object-types/Session'
import { Form } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { Table, _ } from '@/components/sw360'
import VendorResponse from '@/object-types/VendorResponse'
interface Props {
  session?: Session,
  vendors: any[],
  onChange: any
}

const SelectTableVendor = (props : Props) => {
// item._links.self.href
  const handlerRadioButton = (item: any) => {
    const vendorId: string =  handleId(item._links.self.href);
    const vendorResponse: VendorResponse = {
        id: vendorId,
        fullName: item.fullName
    }
    props.onChange(vendorResponse)
  }

  const handleId = (id: string): string => {
    const splits: string[] = id.split("/");
    return splits[splits.length-1];
  }
 
  const columns = [
    {
        name: "",
        formatter:  (item: any) => _(<Form.Check type='radio' name='VendorId' onChange={() => handlerRadioButton(item)}></Form.Check>),
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
            <Table data={props.vendors} columns={columns} />
        </div>
    </>
  )
}


export default React.memo(SelectTableVendor);