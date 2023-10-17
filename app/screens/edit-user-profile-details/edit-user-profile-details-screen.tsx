import Auth from "@aws-amplify/auth"
import { Ionicons } from "@expo/vector-icons"
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet"
import { StackScreenProps } from "@react-navigation/stack"
import { useFormik } from "formik"
import { Heading, HStack, useToast, VStack } from "native-base"
import React, { useCallback, useMemo, useRef, useState } from "react"
import { ActivityIndicator, TouchableOpacity, View, ViewStyle } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { useQueryClient } from "react-query"
import { Button, Screen, Text, TextField } from "../../components"
import { UserEditPrimaryForm } from "../../components/user-edit-primary-form/user-edit-primary-form"
import {
  EditUserProfileDocument,
  EditUserProfileMutationVariables,
  useEditUserProfileMutation,
  useGetPrefilledValuesQuery,
} from "../../graphql/generated/graphql"
import { MainStackParamsList } from "../../navigators"
import { apiSdk, getUserId } from "../../utils/api"
import { useStyles } from "../../utils/styles"
import * as yup from "yup"
import { yupPhone } from "../../utils/format"
import { yupResolver } from "@hookform/resolvers/yup"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { useLoggedUserId } from "../../api/hooks/auth"

const ROOT: ViewStyle = {
  flex: 1,
  backgroundColor: "white",
  paddingBottom: 32,
}

// type FormikInput = EditUserProfileMutationVariables["input"]
type EditUserProfileFormikInput = Omit<EditUserProfileMutationVariables["input"], "userId">
type IProps = StackScreenProps<MainStackParamsList, "editUserProfile">

const schema = yup.object({
  firstName: yup
    .string()
    .required("First name is required")
    .min(1, "Minimum 2 characters are required"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(1, "Minimum 2 characters are required"),
  middleName: yup.string().nullable(),
  email: yup.string().required("Email is required ").email("Invalid email"),
  phoneNumber: yupPhone,
})

export const EditUserProfileDetailsScreen: React.FC<IProps> = ({ navigation, route }) => {
  // const [loading, setLoading] = useState(false)
  // const [fetchLoding, setFetchLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const verifyModalRef = useRef<BottomSheetModal>()
  const verifyModalMobileRef = useRef<BottomSheetModal>()
  const [verifyLoading, setVerifyLoading] = useState(false)
  const [requestVerifyLoading, setRequestVerifyLoading] = useState(false)
  const [verifyCode, setVerifyCode] = useState("")
  const [verifyMobileCode, setVerifyMobileCode] = useState("")
  const queryClient = useQueryClient()
  const formMethods = useForm<EditUserProfileFormikInput>({
    defaultValues: {
      firstName: "",
      lastName: "",
      middleName: "",
      email: "",
      phoneNumber: "",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  })
  const { control, handleSubmit, reset, getValues, getFieldState } = formMethods

  const { mutate, isLoading: mutateLoading } = useEditUserProfileMutation(apiSdk, {
    onSuccess: () => {
      navigation.goBack()
    },
  })
  // const formik = useFormik<EditUserProfileFormikInput>({
  //   initialValues: {
  //     id: getUserId(),
  //     firstName: "",
  //     lastName: "",
  //     middleName: "",
  //     email: "",
  //     phoneNumber: "",
  //   },
  //   onSubmit: (values) => {
  //     mutate({
  //       input: {
  //         userId: getUserId(),
  //         ...values,
  //       },
  //     })
  //   },
  // })
  // const { setValues, setFieldValue, submitForm, values } = formik
  // const { email, phoneNumber, firstName, lastName, middleName } = values
  const toast = useToast()
  const onRequestVerifyEmail = useCallback(async () => {
    try {
      //setRequestVerifyLoading(true)
      const email = getValues("email")
      const user = await Auth.currentAuthenticatedUser()
      console.log(" currentAuthenticatedUser attributes:::  ", " email :: ", email)
      const updatedUserAttributes = await Auth.updateUserAttributes(user, { email: email })
      console.log(" Current user onRequestVerifyEmail ::: -->> " + updatedUserAttributes)
      const verifyREs = await Auth.verifyCurrentUserAttribute("email")
      //setRequestVerifyLoading(false)

      verifyModalRef.current.snapToIndex(1)
    } catch (error) {
      toast.show({
        title: "Error",
        //status: "error",
        description: error?.message || "Something went wrong.Please try again.",
      })
      console.log("error is ", error.message)
    }
  }, [])
  const onRequestVerifyMobile = useCallback(async () => {
    console.log(" onRequestVerifyMobile ::: ---> ")
    try {
      //setRequestVerifyLoading(true)
      const user = await Auth.currentAuthenticatedUser()
      const phoneNumber = getValues("phoneNumber")
      console.log(
        " currentAuthenticatedUser attributes:::  ",
        user.attributes,
        " phoneNumber :: ",
        phoneNumber,
      )

      const updatedUserAttributes = await Auth.updateUserAttributes(user, {
        phone_number: phoneNumber,
      })
      console.log(" Current user ::: -->> " + updatedUserAttributes)
      const verifyREs = await Auth.verifyCurrentUserAttribute("phone_number")
      console.log(" verifyREs ::: -->> " + verifyREs)
      setRequestVerifyLoading(false)

      verifyModalMobileRef.current.snapToIndex(1)
    } catch (error) {
      toast.show({
        title: "Error",
        //status: "error",
        description: error?.message || "Something went wrong.Please try again.",
      })
      console.log("error is ", error.message)
    }
    // console.log("current auth", await Auth.userAttributes())

    // console.log("verify res is ", verifyREs)
  }, [])
  const userId = useLoggedUserId()
  console.log("user is ", userId)
  const { isLoading: isPrefillLoading } = useGetPrefilledValuesQuery(
    apiSdk,
    {
      userId: userId || "",
    },
    {
      enabled: (userId && userId?.length > 0) || false,
      onSuccess: (data) => {
        const { getCustomerProfile } = data
        console.log("data is ", getCustomerProfile)
        reset({
          ...data.getCustomerProfile,
        })
      },
      staleTime: 0,
      cacheTime: 0,
    },
  )

  // variables
  const snapPoints = useMemo(() => [1, "40%"], [])
  const onVerifyConfirmed = useCallback(async () => {
    try {
      setVerifyLoading(true)
      const resp = await Auth.verifyCurrentUserAttributeSubmit("email", verifyCode)

      setVerifyLoading(false)
      setVerifyCode("")
      toast.show({
        title: "Successfully verified your email",
        //status: "success",
        description: "",
      })
      verifyModalRef?.current?.snapToIndex(0)
    } catch (error) {
      setVerifyLoading(false)

      toast.show({
        title: "Error",
        // status: "error",

        description: error?.message || "Something went wrong.Please try again.",
      })
      console.log("error is ", error.message)
    }
  }, [verifyCode, verifyModalRef])
  const onVerifyMobileConfirmed = useCallback(async () => {
    console.log("onVerifyMobileConfirmed  ::: --->> ")
    try {
      setVerifyLoading(true)
      const resp = await Auth.verifyCurrentUserAttributeSubmit("phone_number", verifyMobileCode)
      console.log("resp ::: --->> " + resp)
      setVerifyLoading(false)
      setVerifyMobileCode("")
      toast.show({
        title: "Successfully verified your phone number",
        // status: "success",
        description: "",
      })
      verifyModalMobileRef?.current?.snapToIndex(0)
    } catch (error) {
      setVerifyLoading(false)

      toast.show({
        title: "Error",
        // status: "error",

        description: error?.message || "Something went wrong.Please try again.",
      })
      console.log("error is ", error.message)
    }
  }, [verifyMobileCode, verifyModalMobileRef])

  const onSubmit: SubmitHandler<EditUserProfileFormikInput> = async (values) => {
    try {
      setLoading(true)
      console.log("update res values ", values)
      const updatedRes = await apiSdk.request(EditUserProfileDocument, {
        input: {
          userId: getUserId(),
          ...values,
        },
      })
      console.log("update res ", updatedRes)
      setLoading(false)
      queryClient.invalidateQueries(["getUserProfile"])

      navigation.goBack()
    } catch (error) {
      console.log("eror", error)

      setLoading(false)
    }
  }

  const styles = useStyles({ create: (theme) => ({}) })
  return (
    <BottomSheetModalProvider>
      <Screen style={ROOT} preset="fixed" unsafe>
        <VStack px={4} my={4}>
          <HStack justifyContent="space-between" alignItems="center">
            <Heading>Edit user profile</Heading>
            <View>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons size={36} name="close-circle-outline" />
              </TouchableOpacity>
            </View>
          </HStack>
        </VStack>
        {isPrefillLoading ? (
          <ActivityIndicator size={"large"} style={styles.primaryText} />
        ) : (
          <>
            <KeyboardAwareScrollView enableOnAndroid>
              <FormProvider {...formMethods}>
                <UserEditPrimaryForm
                  {...{ control }}
                  onRequestVerifyEmail={onRequestVerifyEmail}
                  onRequestVerifyMobile={onRequestVerifyMobile}
                />
                <HStack space="lg" my={4} px={4} justifyContent="flex-end">
                  <Button
                    flex={1}
                    variant="outline"
                    onPress={() => {
                      navigation.goBack()
                    }}
                  >
                    <Text color="primary.900" text="Cancel"></Text>
                  </Button>
                  <Button isLoading={loading} flex={1} onPress={handleSubmit(onSubmit)}>
                    <Text color="white" text="Save"></Text>
                  </Button>
                </HStack>
              </FormProvider>
            </KeyboardAwareScrollView>
          </>
        )}

        <BottomSheet
          backdropComponent={(r) => <BottomSheetBackdrop {...r} />}
          snapPoints={snapPoints}
          ref={verifyModalRef}
        >
          <VStack px={4}>
            <Heading mb={4}>Verify email</Heading>

            <TextField
              label="Verification code"
              labelStyle={{
                fontSize: 16,
                fontWeight: "500",
              }}
              value={verifyCode}
              onChangeText={setVerifyCode}
            />
            <Button isLoading={verifyLoading} onPress={onVerifyConfirmed} mt={3}>
              <Text color="white">Verify code</Text>
            </Button>
          </VStack>
        </BottomSheet>
        <BottomSheet
          backdropComponent={(r) => <BottomSheetBackdrop {...r} />}
          snapPoints={snapPoints}
          ref={verifyModalMobileRef}
        >
          <VStack px={4}>
            <Heading mb={4}>Verify mobile</Heading>
            <TextField
              label="Verification code"
              labelStyle={{
                fontSize: 16,
                fontWeight: "500",
              }}
              value={verifyMobileCode}
              onChangeText={setVerifyMobileCode}
            />

            <Button isLoading={verifyLoading} onPress={onVerifyMobileConfirmed} mt={3}>
              <Text color="white">Verify code</Text>
            </Button>
          </VStack>
        </BottomSheet>
      </Screen>
    </BottomSheetModalProvider>
  )
}
