import { useMMKVString } from "react-native-mmkv"
import { AUTH_TOKEN } from "../../config/constants"
import { getUser } from "../../utils/api"

export const useLoggedUserId = () => {
  const [token] = useMMKVString(AUTH_TOKEN)

  const user = getUser(token)

  return ((user && user["cognito:username"]) as string) || null
}
