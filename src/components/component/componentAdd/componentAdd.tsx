// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

"use client";
import styles from "@/css/AddComponents.module.css"
import AddKeyValueComponent from "@/components/AddKeyValue"
import SelectCountryComponent from "@/components/SelectCountry"
import AddAdditionalRolesComponent from "@/components/AddAdditionalRoles"
import SearchUsersModalComponent from "@/components/SearchUsersModal"
import CommonTabIds from "@/object-types/enums/CommonTabsIds";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import ComponentPayload from "@/object-types/ComponentPayLoad";
import MapData from "@/object-types/MapData";
import VendorDialog from "@/components/SearchVendorsModal/VendorDialog";
import { Session } from "@/object-types/Session";
import ModeratorsDiaglog from "@/components/SearchModerators/ModeratorsDiaglog";
import ComponentOwnerDiaglog from "@/components/SearchComponentOwner/ComponentOwnerDialog";
import { SideBar } from "@/components/sw360";
import VendorResponse from "@/object-types/VendorResponse";
import UserResponse from "@/object-types/UserResponse";
import ModeratorsResponse from "@/object-types/ModeratorResponse";

interface Props {
    session? : Session
}

export default function ComponentAddSummary({ session }: Props) {

    const [selectedTab, setSelectedTab] = useState<string>(CommonTabIds.SUMMARY)
    const router = useRouter();
    const [vendorName, setVendorName] = useState<string>();
    const [fullNameComponentOwner, setFullNameComponentOwner] = useState<string>();
    const [fullNameModerators, setFullNameModerators] = useState<string>();
    const [componentPayload, setComponentPayload] = useState<ComponentPayload>({
        name:'' ,
        description: '',
        componentType: '',
        moderators: null,
        componentOwner: '',
        ownerAccountingUnit: '',
        ownerGroup: '',
        ownerCountry:'',
        roles: null,
        externalIds:  null,
        additionalData: null,
        defaultVendorId: '',
        categories: null,
        homepage: '',
        mailinglist: '',
        wiki: '',
        blog: '',
    });

    const [dialogOpenVendor, setDialogOpenVendor] = useState(false)
    const [dialogOpenComponentOwner, setDialogOpenComponentOwner] = useState(false)
    const [dialogOpenModerators, setDialogOpenModerators] = useState(false)

    const handleClickSearchVendor = useCallback(() => setDialogOpenVendor(true), []);

    const handleClickSearchComponentOwner = useCallback(() => setDialogOpenComponentOwner(true), []);

    const handleClickSearchModerators = useCallback(() => setDialogOpenModerators(true), []);

    const tabList = [
        {
          id: CommonTabIds.SUMMARY,
          name: 'Summary'
        }
    ]

    const handleCancelClick = () => {
        router.push("/components")
    }

    const updateField = (e: any) => {
        setComponentPayload({
          ...componentPayload,
          [e.target.name]: e.target.value
        });
    };

    const setAddtionalData = (additionalDatas: MapData[]) => {
        setComponentPayload({
            ...componentPayload,
            additionalData: additionalDatas
        });
    };

    const setExternalIds = (externalIds: MapData[]) => {
        setComponentPayload({
            ...componentPayload,
            externalIds: externalIds
        });
    };

    const setRoles = (roles: MapData[]) => {
        setComponentPayload({
            ...componentPayload,
            roles: roles
        });
    };

    const setVendorId = (vendorResponse: VendorResponse) => {
        setVendorName(vendorResponse.fullName);
        setComponentPayload({
            ...componentPayload,
            defaultVendorId: vendorResponse.id
        });
    };

    const setComponentOwnerId = (userResponse: UserResponse) => {
        setFullNameComponentOwner(userResponse.fullName);
        setComponentPayload({
            ...componentPayload,
            componentOwner: userResponse.email
        });
    };

    const setModerators = (moderatorsResponse: ModeratorsResponse) => {
        setFullNameModerators(moderatorsResponse.fullName)
        setComponentPayload({
            ...componentPayload,
            moderators: moderatorsResponse.emails
        });
    };

    const submit = () => {


        console.log(componentPayload.description )
        console.log(componentPayload.componentType )
        console.log(componentPayload.moderators )
        console.log(componentPayload.componentOwner )
        console.log(componentPayload.ownerAccountingUnit )
        console.log(componentPayload.ownerGroup )
        console.log(componentPayload.ownerCountry)
        console.log(componentPayload.roles )
        console.log(componentPayload.externalIds  )
        console.log(componentPayload.additionalData )
        console.log(componentPayload.defaultVendorId )
        console.log(componentPayload.categories )
        console.log(componentPayload.homepage )
        console.log(componentPayload.mailinglist )
        console.log(componentPayload.wiki )
        console.log(componentPayload.blog )

        // router.push("/components")
    }



    return (
        <>
            <SearchUsersModalComponent />
            <form action="" id="form_submit" method="post" onSubmit={(e) => {e.preventDefault(); submit()}}>
                <div className='container' style={{ maxWidth: '98vw', marginTop: '10px' }}>
                    <div className='row'>
                        <div className='col-2 sidebar'>
                            <SideBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} tabList={tabList} />
                        </div>
                        <div className='col'>
                            <div className='row' style={{ marginBottom: '20px' }}>
                                <div className='col-auto'>
                                    <div className='btn-toolbar' role='toolbar'>
                                        <div className='btn-group' role='group'>
                                            <button type='submit' className='btn btn-primary'>Create Component</button>
                                        </div>
                                        <div className='btn-group' role='group'>
                                            <button type='button' id='mergeButton' className='btn btn-secondary' onClick={handleCancelClick}>Cancel</button>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            <div className="col">
                                <div className="row mb-4">
                                    <div className={`${styles["header"]} mb-2`}>
                                        <p className="fw-bold mt-3">General Information</p>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <label htmlFor="name" className="form-label fw-bold">Name </label>
                                            <input type="text" className="form-control" placeholder="Enter Name" id="name" name="name" 
                                            aria-describedby="name" required value={componentPayload.name} onChange={updateField}/>
                                        </div>
                                        <div className="col-lg-4">
                                            <label htmlFor="createdBy" className="form-label fw-bold">Created by</label>
                                            <input type="text" className="form-control" data-bs-toggle="modal" data-bs-target="#search_vendors_modal" 
                                            placeholder="Will be set auto" id="createdBy" aria-describedby="Created By" readOnly={true} />
                                            <div id="createdBy" className="form-text"><i className="bi bi-x-circle"></i></div>
                                        </div>
                                        <div className="col-lg-4">
                                            <label htmlFor="categories" className="form-label fw-bold">Categories </label>
                                            <input type="text" className="form-control" placeholder="e.g.,Library,cloud,mobile,..." 
                                            id="categories" aria-describedby="categories" required name = "categories" 
                                            onChange={updateField} value={componentPayload.categories}/>
                                        </div>
                                    </div>
                                    <hr className="my-4" />
                                    <div className="row">
                                    <div className="col-lg-4">
                                            <label htmlFor="component_type" className="form-label fw-bold">Component Type</label>
                                            <select className="form-select" aria-label="component_type" id="component_type" required defaultValue="" 
                                            name = "componentType" onChange={updateField} value={componentPayload.componentType}>
                                                <option value=""></option>
                                                <option value="OSS">OSS</option>
                                                <option value="COST">COST</option>
                                                <option value="Internal">Internal</option>
                                                <option value="Inner Source">Inner Source</option>
                                                <option value="Service">Service</option>
                                                <option value="Freeware">Freeware</option>
                                                <option value="Code Snippet">Code Snippet</option>
                                            </select>
                                            <div id="learn_more_about_component_type" className="form-text">
                                                <i className="bi bi-info-circle"></i> Learn more about component types.</div>
                                        </div>
                                        
                                        <div className="col-lg-4">
                                            <label htmlFor="default_vendor" className="form-label fw-bold">Default Vendor</label>
                                            <input type="text" className="form-control" data-bs-toggle="modal" data-bs-target="#search_vendors_modal" 
                                            placeholder="Click to set vendor" id="default_vendor" aria-describedby="Vendor" 
                                            readOnly={true} name = "defaultVendorId" onClick={handleClickSearchVendor} value={vendorName}/>
                                            <div id="default_vendor" className="form-text"><i className="bi bi-x-circle"></i></div>
                                            <VendorDialog show={dialogOpenVendor} setShow={setDialogOpenVendor} onChange={setVendorId} session={session}/>
                                        </div>
                                        <div className="col-lg-4">
                                            <label htmlFor="tag" className="form-label fw-bold">Homepage Url</label>
                                            <input type="text" className="form-control" placeholder="Will be set automatically" id="tag" aria-describedby="Tag"
                                             name = "homepage" onChange={updateField} value={componentPayload.homepage} />
                                        </div>
                                    </div>
                                    <hr className="my-4" />
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <label htmlFor="blog_url" className="form-label fw-bold">Blog URL</label>
                                            <input type="text" className="form-control" placeholder="Enter Blog URL" id="blog_url" aria-describedby="blog_url" 
                                            name = "blog" onChange={updateField} value={componentPayload.blog} />
                                        </div>
                                        <div className="col-lg-4">
                                            <label htmlFor="wiki_url" className="form-label fw-bold">Wiki URL</label>
                                            <input type="text" className="form-control" placeholder="Enter Wiki URL" id="wiki_url" aria-describedby="wiki_url"
                                            name = "wiki" onChange={updateField} value={componentPayload.wiki} />
                                        </div>
                                        <div className="col-lg-4">
                                            <label htmlFor="mailing_list_url" className="form-label fw-bold">Mailing List URL</label>
                                            <input type="text" className="form-control" placeholder="Enter Mailing List URL " id="mailing_list_url" 
                                            aria-describedby="mailing_list_url" name = "mailinglist" onChange={updateField} value={componentPayload.mailinglist} />
                                        </div>
                                    </div>
                                    <hr className="my-4" />
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <label htmlFor="description" className="form-label fw-bold">Description</label>
                                            <textarea className="form-control" placeholder="Enter Description" id="description" aria-describedby="Description"
                                                style={{ height: "100px" }}
                                                name = "description" onChange={updateField} value={componentPayload.description} />
                                        </div>
                                        <div className="col-lg-4">
                                            <label htmlFor="modified_on" className="form-label fw-bold">Modified On</label>
                                            <input type="date" className="form-control" id="modified_on" aria-describedby="Modified on" readOnly={true}/>
                                        </div>
                                        <div className="col-lg-4">
                                            <label htmlFor="modified_by" className="form-label fw-bold">Modified By</label>
                                            <input type="text" className="form-control" placeholder="Will be set automatically" 
                                            id="modified_by" aria-describedby="Modified By" readOnly={true} />
                                        </div>
                                    </div>
                                    <hr className="my-4" />
                                </div>
                                <div className="row mb-4">
                                    <div className={`${styles["header"]} mb-2`}>
                                        <p className="fw-bold mt-3">Roles</p>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <label htmlFor="component_owner" className="form-label fw-bold">Component Owner</label>
                                            <input type="text" className="form-control" data-bs-toggle="modal" data-bs-target="#search_users_modal" 
                                            placeholder="Click to edit" id="component_owner" aria-describedby="component_owner" readOnly={true} 
                                            name = "componentOwner" onClick={handleClickSearchComponentOwner} onChange={updateField} value={fullNameComponentOwner}/>
                                            <ComponentOwnerDiaglog show={dialogOpenComponentOwner} setShow={setDialogOpenComponentOwner}  session={session} onChange={setComponentOwnerId}/>
                                        </div>
                                        <div className="col-lg-4">
                                            <label htmlFor="owner_accounting_unit" className="form-label fw-bold">Owner Accounting Unit</label>
                                            <input type="text" className="form-control" placeholder="Enter Owner Accounting Unit" id="owner_accounting_unit" 
                                            aria-describedby="Owner Accounting Unit" 
                                            name = "ownerAccountingUnit" onChange={updateField} value={componentPayload.ownerAccountingUnit}/>
                                        </div>
                                        <div className="col-lg-4">
                                            <label htmlFor="owner_billing_group" className="form-label fw-bold">Owner Billing Group</label>
                                            <input type="text" className="form-control" placeholder="Enter Owner Billing Group" id="owner_billing_group" 
                                            aria-describedby="Owner Billing Group" 
                                            name = "ownerGroup" onChange={updateField} value={componentPayload.ownerGroup} />
                                        </div>
                                    </div>
                                    <hr className="my-4"           />
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <SelectCountryComponent onChange={updateField} value={componentPayload.ownerCountry}/>
                                        </div>
                                        <div className="col-lg-4">
                                            <label htmlFor="moderators" className="form-label fw-bold">Moderators</label>
                                            <input type="text" className="form-control" data-bs-toggle="modal" data-bs-target="#search_users_modal" 
                                            placeholder="Click to edit" id="moderators" aria-describedby="Moderators" readOnly={true} 
                                            name = "moderators" onChange={updateField} value={fullNameModerators} onClick={handleClickSearchModerators}/>
                                             <ModeratorsDiaglog show={dialogOpenModerators} setShow={setDialogOpenModerators}  session={session} onChange={setModerators}/>
                                        </div>
                                    </div>
                                    <hr className="my-4" />
                                </div>
                                <div className="row mb-4">
                                    <AddAdditionalRolesComponent isComponent={true} onChange={setRoles} />
                                </div>
                                <div className="row mb-4">
                                    <AddKeyValueComponent header={"External ids"} keyName={"external id"} onChange={setExternalIds}  />
                                </div>
                                <div className="row mb-4">
                                    <AddKeyValueComponent header={"Additional Data"} keyName={"additional data"} onChange={setAddtionalData}  />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
