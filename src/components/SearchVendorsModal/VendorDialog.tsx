// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

"use client"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Session } from '@/object-types/Session'
import SelectTableVendor from './SelectTableVendor';
import styles from "@/css/SearchModal.module.css"
import { notFound } from 'next/navigation';
import ApiUtils from '@/utils/api/api.util';
import HttpStatus from '@/object-types/enums/HttpStatus';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import CommonUtils from '@/utils/common.utils';
import VendorResponse from '@/object-types/VendorResponse';

interface Props {
  show?: boolean,
  setShow?: React.Dispatch<React.SetStateAction<boolean>>,
  session? : Session
  onChange: any
}

const VendorDialog = ({ show, setShow, session, onChange}: Props) => {

  const [data, setData] = useState();
  const [vendorResponse, setVendorResponse] = useState<VendorResponse>();
  const [vendors, setVendors] =useState([]);
  const handleCloseDialog = () => {
    setShow(!show);
  }

  const searchVendor = () => {
    setVendors(data);
  }

  const fetchData: any = useCallback(async (url: string) => {
    const response = await ApiUtils.GET(url, session.user.access_token)
    if (response.status == HttpStatus.OK) {
      const data = await response.json();
      return data;
    } else {
      notFound();
    }
  }, [])

  useEffect(() => {
    fetchData(`vendors`).then((vendors: any) => {
      console.log(vendors)
      if (!CommonUtils.isNullOrUndefined(vendors['_embedded'])
        && !CommonUtils.isNullOrUndefined(vendors['_embedded']['sw360:vendors'])) {
        const data = vendors['_embedded']['sw360:vendors'].map((item: any) =>
          [item, item.fullName, item.shortName, item.url,''])
        setData(data)
      }
    })
  }, []);

  const handleClickSelectVendor = () => {
    console.log(vendorResponse)
    onChange(vendorResponse)
    setShow(!show);
  }


  const getVendorId = useCallback((vendorResponse: VendorResponse) => setVendorResponse(vendorResponse), []);

  return (
    <Modal
      show={show}
      onHide={handleCloseDialog}
      backdrop='static'
      centered
      size='lg'
    >
      <Modal.Header closeButton>
        <Modal.Title>Search Vendor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-body">
            <div className="row">
                <div className="col-lg-4">
                    <button type="button" className={`fw-bold btn btn-light ${styles['button-plain']} me-2`} onClick={searchVendor}>Search</button>
                </div>
            </div>
            <div className="row mt-3">
                <SelectTableVendor vendors={vendors} onChange={getVendorId}/>
            </div>
        </div>
      </Modal.Body>
      <Modal.Footer className='justify-content-end' >
        <Button type="button" data-bs-dismiss="modal" className={`fw-bold btn btn-light ${styles['button-plain']} me-2`} onClick={handleCloseDialog}>Close</Button>
        <Button type="button" className={`fw-bold btn btn-light ${styles['button-plain']}`}>Add Vendor</Button>
        <Button type="button" className={`fw-bold btn btn-light ${styles['button-orange']}`} onClick={handleClickSelectVendor} >Select Vendor</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default VendorDialog