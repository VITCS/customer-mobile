import { Auth } from "@aws-amplify/auth"
import messaging from "@react-native-firebase/messaging"
import { useEffect, useState } from "react"
import { useMMKVListener } from "react-native-mmkv"
import { AUTH_TOKEN, REFRESH_TOKEN, socialLoginUserObj } from "../config/constants"
import {
  CreateDeviceTokenDocument,
  GetProfileIdDocument,
  GetProfileIdQuery,
} from "../graphql/generated/graphql"
import { apiSdk, getUserId } from "../utils/api"
import { storage } from "../utils/storage"

export type AuthStatus = "loading" | "error" | "loggedIn" | "anonymous"

export const authApi = {
  login: async (username, password) => {
    console.log("login variables", username, password)
    if (username?.length === 0) {
      throw new Error("username can't be empty")
    }
    if (password?.length === 0) {
      throw new Error("password can't be empty")
    }
    const res = await Auth.signIn(username?.trim(), password)

    const token = await res?.signInUserSession?.idToken?.jwtToken
    const refreshToken = await res?.signInUserSession?.refreshToken?.token
    // console.log("token is ", Object.keys(res.signInUserSession.refreshToken))

    storage.set(AUTH_TOKEN, token)
    storage.set(REFRESH_TOKEN, refreshToken)
    apiSdk.setHeader("Authorization", token)
    apiSdk.setHeader("authorization", token)
    await authApi.getFCMTokenAndUpdateInDb()
    return {
      ...res,
      token,
    }
    // try{
    //   const res = await Auth.signIn(username, password)
    //   const token = await res?.signInUserSession?.idToken?.jwtToken
    //   const refreshToken = await res?.signInUserSession?.refreshToken?.token

  
    //   console.log("token is ", token)
    //   storage.set(AUTH_TOKEN, token)
    //   storage.set(REFRESH_TOKEN, refreshToken)
    //   apiSdk.setHeader("Authorization", token)
    //   apiSdk.setHeader("authorization", token)
    // }catch (err) {
    //   throw new Error("Please enter valid username and password")
    // }
    
    // try {
    //   await authApi.getFCMTokenAndUpdateInDb()
    // } catch (err) {
    // } finally {
    //   //return res
    // }
  },
  getFCMTokenAndUpdateInDb: async () => {
    // const fcmTOken = await messaging().getToken()
    // console.log("firebase token is ", fcmTOken)
    // const userId = getUserId()

    // try {
    //   const data = await apiSdk.request(CreateDeviceTokenDocument, {
    //     input: {
    //       deviceToken: fcmTOken,
    //       userId,
    //     },
    //   })

    //   console.log("fcm response ", data)
    //   return data
    // } catch (error) {
    //   console.log("fcm error ", error)
    // }
  },
  logout: () => {
    return storage.delete(AUTH_TOKEN)
  },
}

export const useLoggedInUser = () => {
  const [userId, setUserId] = useState<string>(null)

  const fetchUser = async () => {
    try {
      const token = storage.getString(AUTH_TOKEN)
      const userId = getUserId()

      console.log("token is ", userId)

      if (userId?.length > 0) {
        const data: GetProfileIdQuery = await apiSdk
          .setHeader("Authorization", token)
          .setHeader("authorization", token)
          .request(GetProfileIdDocument, {
            userId,
          })

        console.log("logged user ", data)

        if (data?.getCustomerProfile?.userId) {
          setUserId(data.getCustomerProfile.userId)
        } else {
          setUserId(null)
        }
      } else {
        setUserId(null)
      }
    } catch (error) {
      console.log("error >>>>", error)
      setUserId(null)
    }
  }
  useEffect(() => {
    fetchUser()
  }, [])
  useMMKVListener((key) => {
    const newValue = storage.getString(key)
    console.log(`Value for "${key}" changed to `, newValue)

    if (key === AUTH_TOKEN) {
      fetchUser()
    }
  })

  return userId
}

export const setSocialLoggedInUserData = (userObj) => {
  console.log('socialLoginUserObj----', userObj);
  storage.set(socialLoginUserObj, userObj)

}

export const useSocialLoggedInUserData = () => { 
  console.log('get Login-----',storage.getString(socialLoginUserObj));
  return storage.getString(socialLoginUserObj);

}
