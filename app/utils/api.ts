import { Auth } from "@aws-amplify/auth"
import Location from "aws-sdk/clients/location"
import { GraphQLClient } from "graphql-request"
import jwtDecode from "jwt-decode"
import { useEffect, useState } from "react"
import { AUTH_TOKEN } from "../config/constants"
import awsmobile from "../config/env"
import { IStateAddress } from "../stores/cart"
import { storage } from "./storage"
import {
  SearchAddressDocument,
  SearchAddressQuery,
  GetImageUrlDocument
} from "../graphql/generated/graphql"
import env from "../config/env"
import { commaify, formatSearchAddress } from "./format"
import { uploadToS3 } from "../screens"

const TIME_OUT = 5000

export const getApiHeaders = () => {
  const token = storage.getString(AUTH_TOKEN)
  // console.log("getApiHeaders", token)

  let headers: any = {}

  console.log("token is ", token?.length)
  if (token?.length > 0) {
    headers = {
      ...headers,
      Authorization: token,
      authorization: token,
    }
  } else {
    headers = {
      ...headers,
      "x-api-key": awsmobile.aws_appsync_apiKey,
    }
  }

  // console.log("headers is ", headers)
  return headers
}

// const headers = getApiHeaders()
const client = new GraphQLClient(awsmobile.aws_appsync_graphqlEndpoint, {
  // headers: getApiHeaders(),
  timeout: TIME_OUT,
  requestMiddleware: (req) => {
    const authHeaders = getApiHeaders()

    return {
      ...req,
      headers: {
        ...req.headers,
        ...authHeaders,
      },
    }
  },
  responseMiddleware: (response: any) => {
    console.log("response ", response.status)

    const status = +response.status

    if (status === 401) {
      storage.delete(AUTH_TOKEN)
    }
  },
})

export const apiSdk = client

export const getUser = (token) => {
  if (!token) {
    return null
  }
  return jwtDecode(token)
}

export const getUserId = () => {
  const user = getUser(storage.getString(AUTH_TOKEN))
  return (user && user["cognito:username"]) || null
}

export const createClient = async () => {
  const credentials = await Auth.currentCredentials()

  console.log("creds", credentials)

  const tempCient = new Location({
    credentials,
    region: awsmobile.aws_project_region,
  })

  return tempCient
}

export const useLocationClient = () => {
  const [client, setClient] = useState<Location>(null)

  useEffect(() => {
    createClient().then(setClient)
  }, [])

  return client
}
export const getLocationOptions = async (keyword: string) => {
  console.log(" getLocationOptions : ",keyword)
  const data: SearchAddressQuery = await apiSdk.request(SearchAddressDocument, {
    input: {
      searchStr: keyword,
    },
  })
console.log(" data : ",data)
  return data.searchAddress?.items?.slice(0, 5)?.map((addr) => {
    return {
      // @ts-ignore
      label: formatSearchAddress(addr),
      value: addr,
    }
  })
}

// export const searchPlace = async (place: string, client: Location): Promise<IStateAddress> => {
//   const params = {
//     IndexName: env.aws_geo_mapIndexName,
//     MaxResults: 1,
//     Text: place,
//   }

//   const addrData = await client.searchPlaceIndexForText(params).promise()
//   if (addrData?.Results?.length > 0 && addrData?.Results[0]?.Place) {
//     const place = addrData.Results[0].Place
//     // const addressStr = search?.split(",")
//     const lat = place.Geometry.Point[1] || 40
//     const lon = place.Geometry.Point[0] || -70
//     const label = place?.Label

//     const postCode = place?.PostalCode || ""
//     const country = place.Country || ""
//     const state = place.Region || ""
//     const city = place.Municipality || ""
//     const [addrLine1] = label.split(",")

//     const placeData: IStateAddress = {
//       addrLine1,
//       city,
//       addrState: state,
//       postCode,
//       latitude: lat,
//       longitude: lon,
//       country,
//     }
//     return placeData
//   }
//   return null
// }

export const searchPlace = (place) =>
  new Promise(async (resolve) => {
    // return
    // if (!client) {
    //   return null
    // }
    // const creds = Auth.Credentials.Auth.Credentials._credentials
    const creds = await Auth.currentUserCredentials()
    console.log("creds fetch", creds)

    const _client = new Location({
      credentials: creds,
      region: env.aws_project_region,
    })
    //console.log("auth cerdentials", _client)
    const params = {
      IndexName: env.aws_geo_mapIndexName,
      MaxResults: 1,
      Text: place,
    }

    _client.searchPlaceIndexForText(params, (err, data) => {
      if (err) console.error("erroe of Text", err)
      if (data && data?.Results?.length > 0) {

        const [{ Place: firstResult }] = data.Results || [{ Place: {} }]

        console.log("text Cordinates", firstResult)
        const [longitude, latitude] = firstResult?.Geometry?.Point

        if (firstResult) {
          const { Label, Region, PostalCode, Country, Municipality, AddressNumber, Street } =
            firstResult || {}
           const itemClickedStr = place?.split(',');
          console.log("entire location label is ", itemClickedStr)

          resolve({
            addrLine1: itemClickedStr[0],
            addrLine2: "",
            state: itemClickedStr[2],
            postCode: itemClickedStr[3],
            country: data.Results[0]?.Place.Country,
            city: itemClickedStr[1],
            latitude,
            longitude,
          })
        }
      }
    })
  })

export const searchPlaceIndex = (place) =>
  new Promise(async (resolve) => {
    // return
    // if (!client) {
    //   return null
    // }
    // const creds = Auth.Credentials.Auth.Credentials._credentials
    const creds = await Auth.currentUserCredentials()
    console.log("creds fetch", creds)

    const _client = new Location({
      credentials: creds,
      region: env.aws_project_region,
    })
    console.log("auth cerdentials", _client)
    const params = {
      IndexName: env.aws_geo_mapIndexName,
      MaxResults: 1,
      Text: place,
    }

    _client.searchPlaceIndexForText(params, (err, data) => {
      if (err) console.error("erroe of Text", err)
      if (data && data?.Results?.length > 0) {

        const [{ Place: firstResult }] = data.Results || [{ Place: {} }]

        console.log("text Cordinates", firstResult)
        const [longitude, latitude] = firstResult.Geometry.Point

        if (firstResult) {
          const { Label, Region, PostalCode, Country, Municipality, AddressNumber, Street } =
            firstResult || {}
           const itemClickedStr = place?.split(',');
          console.log("entire location label is ", itemClickedStr)

          resolve({
            addrLine1: itemClickedStr[0],
            addrLine2: "",
            state: itemClickedStr[2],
            postCode: itemClickedStr[3],
            country: data.Results[0]?.Place.Country,
            city: itemClickedStr[1],
            latitude,
            longitude,
          })
        }
      }
    })
  })
// const uploadImage = async () => {
//   try {
//     // console.log("merchant account id >>", merchantAccountId)
//     // return
//     const sdk = await getApiSdk()
//     setImageUploadLoading(true)

//     const { data } = await sdk.getImageURL({
//       fileName: newImage.fileName,
//       requestType: "put",
//       type: newImage.type,
//       userId: getUserId(),
//     })

//     const uploadRes = await uploadToS3(data.getS3SignedURL.signedURL, newImage)
//     console.log("upload res", uploadRes)

//     const {
//       data: {
//         getS3SignedURL: { signedURL: displayUrl },
//       },
//     } = await sdk.getImageURL({
//       fileName: data.getS3SignedURL.fileName,
//       requestType: "get",
//       type: newImage.type,
//       userId: getUserId(),
//     })

//     setImageUploadLoading(false)

//     // setUser({
//     //   ...user,
//     //   profileImage: displayUrl,
//     // })
//     setNewImage(null)
//   } catch (error) {
//     setImageUploadLoading(false)

//     console.log("error in loading user", error)

//     toast.show({
//       title: "Error",
//       description: error?.message || "Something went wrong. Please try again",
//       status: "error",
//     })
//   }
// }
export const uploadImage = async ({ userId, newImage }) => {
  console.log(" inside upload : ",userId, newImage.fileName)
  const data = await apiSdk.request(GetImageUrlDocument, {
    fileName: newImage.fileName,
    requestType: "put",
    type: newImage.type,
    userId:userId,
  })
  console.log("data i>>>", data)

  const uploadRes = await uploadToS3(data?.getS3SignedURL?.signedURL, newImage)
  return uploadRes
}
