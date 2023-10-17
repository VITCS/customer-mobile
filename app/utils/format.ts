import { LastArrayElement } from "type-fest"
import { Address, SearchAddress, SearchAddressQuery } from "../graphql/generated/graphql"
import * as yup from "yup"
import dayjs from "dayjs"
import { isValidPhoneNumber } from "libphonenumber-js"

export function formatname(firstName: string, middleName, lastName: string) {
  let final = ""
  const names = [firstName, middleName, lastName].filter((r) => r?.length > 0)
  names.forEach((n, nIndex) => {
    if (n?.length > 0) {
      final += `${n}`
      if (nIndex !== names.length - 1) {
        final += " "
      }
    }
  })
  return final
}

export function commaify(...rest) {
  let final = ""
  const names = [...rest].filter((r) => r?.trim()?.length > 0)
  names.forEach((n, nIndex) => {
    if (n?.length > 0) {
      final += `${n}`
      if (nIndex !== names.length - 1) {
        final += ", "
      }
    }
  })
  return final
}

export const EMPTY_VALUE_STRING = "--"

export function formatSearchAddress(address: SearchAddress) { 
  return `${address.street_line}, ${address.city}, ${address.state}, ${address.zipcode}`
}

export function formatAddress(address: Address) {
  let result = ""

  Object.keys(address).forEach((key, kIndex) => {
    const value = address[key]
    if (value?.length > 0) {
      if (kIndex !== 0 && kIndex !== Object.keys(address).length - 1) {
        result += ","
      }
      result += value
    }
  })

  return result
}

export const makeDisplayString = (input: string, emptyReplacement?: string) => {
  if (input?.length > 0) {
    return input
  } else {
    return emptyReplacement || EMPTY_VALUE_STRING
  }
}

type SearchAddressResult = LastArrayElement<SearchAddressQuery["searchAddress"]["items"]>

export const formattSearchAddressResult = (
  address: Pick<SearchAddressResult, "street_line" | "city" | "state" | "zipcode">,
) => {
  const { street_line, city, state, zipcode } = address
  return `${street_line}, ${city}, ${state}, ${zipcode}`
}

export const formatPrice = (price: number) => {
  return `$${price?.toFixed(2)}`
}

export const formatDate = (dateString: string) => {
  return dayjs(dateString).format("MM/DD/YYYY HH:mm A")
}

export const yupPhone = yup.string().test({
  name: "isvalid",
  test: (value) => {
    return isValidPhoneNumber(value || "")
  },
  message: "Invalid phone number",
})

// input: prodCategory
// output  "Prod Category"
export const titleCase = (str?: string) => {
  return str?.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())
}

