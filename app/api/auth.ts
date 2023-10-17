import { Auth } from "aws-amplify"
import { AUTH_TOKEN, REFRESH_TOKEN } from "../config/constants"
import { apiSdk } from "../utils/api"
import { storage } from "../utils/storage/storage"

export const authApi = {
  login: async (username: string = "", password: string = "") => {
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
