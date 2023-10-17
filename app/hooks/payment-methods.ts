import { useMemo } from "react"
import { useQuery } from "react-query"
import {
  GetDefaultPaymentDocument,
  GetPaymentMethodListDocument,
  useGetStripeCustomerIdQuery,
} from "../graphql/generated/graphql"
import { useLoggedInUser } from "../stores/auth"
import { apiSdk } from "../utils/api"

export const usePaymentMethods = () => {
  const userId = useLoggedInUser()
  const { data: profileData, isLoading: profileLoading } = useGetStripeCustomerIdQuery(
    apiSdk,
    {
      userId,
    },
    {
      enabled: userId?.length > 0,
    },
  )

  const { data, isLoading } = useQuery(
    ["paymentMethods"],
    async () => {
      const data = await apiSdk.request(GetPaymentMethodListDocument, {
        input: {
          customerId: profileData?.getCustomerProfile?.customerId,
        },
      })

      return data
    },
    {
      enabled: profileData?.getCustomerProfile?.customerId?.length > 0,
    },
  )
  const { data: defaultPaymentData, isLoading: defaultPaymentLoading } = useQuery(
    ["paymentMethods"],
    async () => {
      const data = await apiSdk.request(GetDefaultPaymentDocument, {
        input: {
          customerId: profileData?.getCustomerProfile?.customerId,
        },
      })

      return data
    },
    {
      enabled: profileData?.getCustomerProfile?.customerId?.length > 0,
    },
  )

  const parsedData = useMemo(() => {
    return JSON.parse(data?.paymentMethodsList?.paymentMethods || "{}")
  }, [data])
  console.log("usePaymentMethods: >>", parsedData?.data)
  return {
    data: parsedData.data,
    isLoading: isLoading || profileLoading || defaultPaymentLoading,
    defaultPaymentMethodId: defaultPaymentData?.paymentMethodsList?.defaultPaymentMethodId,
  }
}
