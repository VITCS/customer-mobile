import { StackScreenProps } from "@react-navigation/stack"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { HStack, useToast } from "native-base"
import React, { useState } from "react"
import { ViewStyle } from "react-native"
import { Button, ContactOccassionEditForm, Screen, Text } from "../../components"
import { SubmitHandler, useForm } from "react-hook-form"
import {
  EditCustomerOccasionMutationVariables,
  useCreateOccasionMutation,
  useEditCustomerOccasionMutation,
  useGetCustomerOccasionQuery,
  useGetDeliveryAddressInitQuery,
  useGetDeliveryContactsQuery,
} from "../../graphql/generated/graphql"
import { DeliveryContactParamList } from "../../navigators"
import { apiSdk, getUserId } from "../../utils/api"
import { useQueryClient } from "react-query"

const ROOT: ViewStyle = {
  flex: 1,
}
type FormikInput = Omit<EditCustomerOccasionMutationVariables["input"], "id">

type Props = StackScreenProps<DeliveryContactParamList, "addOccasion">

export interface ContactOccassionEditFormInput {
  /**
   * An optional style override useful for padding & margin.
   */
  occasionDate: string
  reminder: boolean
  occasionTitle: string
  // setFieldValue: (name: string, value: any) => any
  // saveOccasionForm: () => any
}

export const EditDeliveryAddressOccasionFormScreen: React.FC<Props> = ({ navigation, route }) => {
  const [id, customerContactId] = React.useMemo(
    () => [route.params?.id, route?.params?.customerContactId],
    [route],
  )
  const queryClient = useQueryClient()
  const userId = getUserId()
  const { mutate: createOccasion } = useCreateOccasionMutation(apiSdk, {
    onSuccess: () => {
      toast.show({
        title: "Success",
        description: "",
      })
      queryClient.refetchQueries(useGetCustomerOccasionQuery.getKey({ id }))
      queryClient.refetchQueries(useGetDeliveryContactsQuery.getKey({ userId }))
      navigation.goBack()
    },
    onError: (err) => {
      toast.show({
        title: "Error",
        description: `Error: ${err}`,
      })
    },
  })
  const toast = useToast()
  const { mutate: editCustomerOccasion } = useEditCustomerOccasionMutation(apiSdk, {
    onSuccess: () => {
      toast.show({
        title: "Success",
        description: "",
      })
      queryClient.refetchQueries(useGetCustomerOccasionQuery.getKey({ id }))
      queryClient.refetchQueries(useGetDeliveryContactsQuery.getKey({ userId }))
      navigation.goBack()
    },
    onError: (err) => {
      toast.show({
        title: "Error",
        description: `Error: ${err}`,
      })
    },
  })
  const schema = yup.object({
    occasionDate: yup.date().required("Occasion date is required"),
    occasionTitle: yup.string().required("Please enter occasion name "),
  })
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      occasionDate: "",
      reminder: true,
      occasionTitle: "",
    },
    resolver: yupResolver(schema),
    // mode: "onChange",
  })

  const addEditOccasion: SubmitHandler<ContactOccassionEditFormInput> = async (values) => {
    try {
      setLoading(true)
      console.log("Iam in Occassion add/Edit form ", values)
      let mutationRes
      if (id?.length > 0) {
        mutationRes = await editCustomerOccasion({
          input: {
            id,
            ...values,
          },
        })
      } else {
        mutationRes = await createOccasion({
          input: { ...values, customerContactId },
        })
      }
      setLoading(false)
      queryClient.invalidateQueries(["getCustomerOccasion"])
    } catch (error) {
      console.log("eror", error)
      setLoading(false)
    }
  }
  const [loading, setLoading] = useState(false)

  const {} = useGetCustomerOccasionQuery(
    apiSdk,
    {
      id,
    },
    {
      enabled: id?.length > 0,
      onSuccess: (data) => {
        reset(data.getCustomerOccasion)
      },
    },
  )

  return (
    <Screen style={ROOT} preset="scroll">
      <ContactOccassionEditForm {...{ control }} />
      <HStack space="lg" my={4} px={4} justifyContent="flex-end">
        <Button isLoading={loading} flex={1} onPress={handleSubmit(addEditOccasion)}>
          {" "}
          Save
        </Button>
      </HStack>
    </Screen>
  )
}
