import { yupResolver } from "@hookform/resolvers/yup"
import { RouteProp } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { Auth } from "aws-amplify"
import { FormControl, useToast, VStack } from "native-base"
import * as React from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { ViewStyle } from "react-native"
import * as yup from "yup"
import { Button, PasswordInput, Screen } from "../../components"
import { AuthStackParamsList } from "../../navigators"
import { authApi } from "../../stores/auth"
import { spacing } from "../../theme"

const ROOT: ViewStyle = {
  flex: 1,
  padding: spacing[4],
}

type IProps = StackScreenProps<AuthStackParamsList, "changePassword"> &
  RouteProp<AuthStackParamsList, "changePassword">

type ChangePasswordInput = {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

const schema = yup.object({
  oldPassword: yup.string().required("Please enter old password").min(8),
  newPassword: yup.string().required("Please enter new password").min(8),
  confirmPassword: yup.string().oneOf([yup.ref("newPassword")], "Passwords don't match"),
})

export const ChangePasswordScreen: React.FC<IProps> = ({ navigation }) => {
  const toast = useToast()
  const [verifyLoading, setVerifyLoading] = React.useState(false)

  const { control, handleSubmit } = useForm<ChangePasswordInput>({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
    resolver: yupResolver(schema),
  })
  const changePassword: SubmitHandler<ChangePasswordInput> = async (values) => {
    try {
      setVerifyLoading(true)
      const userObj = await Auth.currentAuthenticatedUser()
      console.log(" userObj --> ", userObj)
      await Auth.changePassword(userObj, values.oldPassword, values.newPassword)

      toast.show({
        title: "Success",
        description: "Successfully Changed Password",
      })
      // navigation.goBack()
      navigation.navigate("auth", { screen: "login" })
      // setTimeout(() => {
      setVerifyLoading(false)
      //authApi.logout();
      
      // }, 1000)
    } catch (error) {
      setVerifyLoading(false)
      console.log("error is ", error)
      // if (error.code === "UserNotFoundException") {
      //   // setIsSigningIn(false);
      // }
      toast.show({
        title: "Error",
        description: error?.message || "Something went wrong. Please try again",
      })
    }
  }

  return (
    <>
      <Screen style={ROOT} unsafe>
        <Controller
          {...{ control }}
          name="oldPassword"
          render={({ field: { onBlur, onChange, value }, fieldState }) => {
            return (
              <FormControl mb={3} isRequired isInvalid={!!fieldState.error}>
                {/* <HStack mb={1} alignItems="center">
                  <FormControl.Label>Old password</FormControl.Label>
                </HStack> */}
                <PasswordInput
                  label="Old password"
                  onChangeText={onChange}
                  {...{ onBlur, value }}
                />
                <FormControl.ErrorMessage>{fieldState?.error?.message}</FormControl.ErrorMessage>
              </FormControl>
            )
          }}
        />
        <Controller
          {...{ control }}
          name="newPassword"
          render={({ field: { onBlur, onChange, value }, fieldState }) => {
            return (
              <FormControl mb={3} isRequired isInvalid={!!fieldState.error}>
                <PasswordInput
                  label="New password"
                  onChangeText={onChange}
                  {...{ onBlur, value }}
                />
                <FormControl.ErrorMessage>{fieldState?.error?.message}</FormControl.ErrorMessage>
              </FormControl>
            )
          }}
        />
        <Controller
          {...{ control }}
          name="confirmPassword"
          render={({ field: { onBlur, onChange, value }, fieldState }) => {
            return (
              <FormControl mb={3} isRequired isInvalid={!!fieldState.error}>
                <PasswordInput
                  label="Confirm password"
                  onChangeText={onChange}
                  {...{ onBlur, value }}
                />
                <FormControl.ErrorMessage>{fieldState?.error?.message}</FormControl.ErrorMessage>
              </FormControl>
            )
          }}
        />

        <VStack justifyContent="space-between">
          <Button isLoading={verifyLoading} onPress={handleSubmit(changePassword)}>
            Submit
          </Button>
        </VStack>
      </Screen>
    </>
  )
}
