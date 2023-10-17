import { AUTH_TOKEN } from "../config/constants"
import { getApiHeaders } from "./api"
import { storage } from "./storage"

export const myFetcher = async (url: string, options: any) => {
  console.log("custom interceptor >>>", url, options)
  const headers = getApiHeaders()
  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      chati: "babu",
    },
  })

  if (response.status === 401) {
    storage.delete(AUTH_TOKEN)
  }
  return response
}
