// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

import Moderators from "@/object-types/Moderators";

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

const isNullOrUndefined = (obj: any) => {
  if (obj === null || obj === undefined) {
    return true;
  }
  return false;
}

const isNullEmptyOrUndefinedString = (str: string) => {
  if (str === null || str === undefined || str.length === 0) {
    return true;
  }
  return false;
}

const createUrlWithParams = (url: string, params: any) => {
  const queryString =  Object.keys(params).map((key) => {
    return [key, params[key]].map(encodeURIComponent).join('=');
  }).join("&");
  return `${url}?${queryString}`;
}

const isNullEmptyOrUndefinedArray = (arr: Array<any>) => {
  if (arr === null || arr === undefined || arr.length === 0) {
    return true;
  }
  return false;
}

const handlerModerators = (emails: any[]) => {
  const fullNames: string[] = []
  const moderatorsEmail: string[] = []
  if (emails.length == 0) {
      return
  }
  emails.forEach((item) => {
      fullNames.push(item.fullName)
      moderatorsEmail.push(item.email)
  })
  const moderatorsName: string = fullNames.join(' , ')
  const moderatorsResponse: Moderators = {
      fullName: moderatorsName,
      emails: moderatorsEmail,
  }
  return moderatorsResponse
}

const handlerContributor = (emails: any[]) => {
  const fullNames: string[] = []
  const contributorsEmail: string[] = []
  if (emails.length == 0) {
      return
  }
  emails.forEach((item) => {
      fullNames.push(item.fullName)
      contributorsEmail.push(item.email)
  })
  const contributorsName: string = fullNames.join(' , ')
  const contributorsResponse: Moderators = {
      fullName: contributorsName,
      emails: contributorsEmail,
  }
  return contributorsResponse
}

const getEmailsModerators = (emails: any[]) => {
  const moderatorsEmail: string[] = []
  if (typeof emails === 'undefined') {
      return
  }
  emails.forEach((item) => {
      moderatorsEmail.push(item.email)
  })

  return moderatorsEmail
}

const convertObjectToMap = (data: string) => {
  const map = new Map(Object.entries(data))
  const inputs: Input[] = []
  map.forEach((value, key) => {
      const input: Input = {
          key: key,
          value: value,
      }
      inputs.push(input)
  })
  return inputs
}

const convertObjectToMapRoles = (data: string) => {
  if (data === undefined) {
      return null
  }
  const inputRoles: Input[] = []
  const mapRoles = new Map(Object.entries(data))
  mapRoles.forEach((value, key) => {
      for (let index = 0; index < value.length; index++) {
          const input: Input = {
              key: key,
              value: value.at(index),
          }
          inputRoles.push(input)
      }
  })
  return inputRoles
}

const convertRoles = (datas: Input[]) => {
  if (datas === null) {
      return null;
  }
  const contributors: string[] = []
  const commiters: string[] = []
  const expecters: string[] = []
  datas.forEach((data) => {
      if (data.key === 'Contributor') {
          contributors.push(data.value)
      } else if (data.key === 'Committer') {
          commiters.push(data.value)
      } else if (data.key === 'Expert') {
          expecters.push(data.value)
      }
  })
  const roles = {
      Contributor: contributors,
      Committer: commiters,
      Expert: expecters,
  }
  return roles
}

const CommonUtils = {
  isNullOrUndefined,
  isNullEmptyOrUndefinedString,
  createUrlWithParams,
  isNullEmptyOrUndefinedArray,
  handlerModerators,
  handlerContributor,
  getEmailsModerators,
  convertObjectToMap,
  convertObjectToMapRoles,
  convertRoles
}

export default CommonUtils;