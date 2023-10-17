import { useGetMerchantAccountIdQuery } from "../../graphql/generated/graphql"
import { apiSdk } from "../../utils/api"
import { useLoggedUserId } from "./auth"

export const useMerchantAccountId = () => {
  const userId = useLoggedUserId()
  const { data: accountData } = useGetMerchantAccountIdQuery(apiSdk, {
    userId,
  })

  return accountData?.getMerchantUser?.merchantAccountId
}
