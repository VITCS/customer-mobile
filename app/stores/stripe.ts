import { useEffect, useState } from "react"
import { useCreatePaymentIntentMutation } from "../graphql/generated/graphql"
import { apiSdk } from "../utils/api"
import { useLoggedInUser } from "./auth"

export const usePaymentIntentSecret = (totalAmount: string, userId: string) => {
  const [res, setRes] = useState(null)
  const { mutate, isLoading } = useCreatePaymentIntentMutation(apiSdk, {
    onSuccess: (data) => {
      console.log("createPaymentIntent success", data)
      setRes(data.createPaymentIntent)
    },
  })
  //const userId = useLoggedInUser()
  console.log("  total amount userId :: ",userId )
  useEffect(() => {
    let tempTotal = +totalAmount * 100
    console.log("  tempTotal total amount userId :: ",tempTotal )
    return mutate({
      input: {
        paymentMethodType: "Card",
        currency: "USD",
        totalAmount: +totalAmount,
        userId,
      },
    })
  }, [])

  return { data: res, isLoading }
}
