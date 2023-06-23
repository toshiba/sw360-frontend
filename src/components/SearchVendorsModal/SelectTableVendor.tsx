// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import { Session } from '@/object-types/Session'
import { Form } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { Table, _ } from '@/components/sw360'
import VendorResponse from '@/object-types/VendorResponse'
interface Props {
  vendors: any[],
  onChange: any
}

const SelectTableVendor = ({vendors, onChange} : Props) => {
// item._links.self.href
  const handlerRadioButton = (item: any) => {
    const vendorId: string =  handleId(item._links.self.href);
    const vendorResponse: VendorResponse = {
        id: vendorId,
        fullName: item.fullName
    }
    onChange(vendorResponse)
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
            <Table data={vendors} columns={columns} />
        </div>
    </>
  )
}


export default React.memo(SelectTableVendor);