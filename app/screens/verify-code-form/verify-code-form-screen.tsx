import { yupResolver } from "@hookform/resolvers/yup"
import { RouteProp } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { Auth } from "aws-amplify"
import { HStack, useToast } from "native-base"
import React, { useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { ViewStyle } from "react-native"
import { Text } from "ui"
import * as yup from "yup"
import { Button, FormInput, PasswordInput, Screen, useCounter } from "../../components"
import { AuthStackParamsList } from "../../navigators"
import { spacing } from "../../theme"

const ROOT: ViewStyle = {
  flex: 1,
  padding: spacing[4],
  paddingVertical: spacing[5],
}

type IProps = StackScreenProps<AuthStackParamsList, "verifyCodeForm"> &
  RouteProp<AuthStackParamsList, "verifyCodeForm">

const schema = yup.object({
  code: yup.string().required("Enter verification code"),
  password: yup.string().required("Enter password"),
  confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords don't match"),
})

type FormData = {
  code: string
  password: string
  confirmPassword: string
}
export const VerifyCodeFormScreen: React.FC<IProps> = ({ navigation, route }) => {
  const { username = "" } = route?.params
  const toast = useToast()
  const [verifyLoading, setVerifyLoading] = useState(false)
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      code: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  })

  // const { values, handleChange, setFieldValue, errors, dirty } = formik

  const { counter, reset: resetCounter } = useCounter()
  const resend = async () => {
    const resp = await Auth.forgotPassword(username)
    console.log("resp is ", resp)

    resetCounter()
  }
  const verifyCode: SubmitHandler<FormData> = async (values) => {
    try {
      setVerifyLoading(true)
      const res = await Auth.forgotPasswordSubmit(username, values.code, values.password)
      console.log("res", res)
      toast.show({
        title: "Successfully Created New Password",
        // status: 'success',
        description: "Sign in to get started",
      })
      setTimeout(() => {
        setVerifyLoading(false)
        navigation.push("login", {
          justSignedUp: false,
        })
      }, 1000)
    } catch (error) {
      setVerifyLoading(false)
      console.log("[verifyCode] :: error ", error)
      toast.show({
        title: "Something went wrong ",
        description: "Please try again",
        // status: 'error',
      })
      // setForgotPasswordState("signup")
    }
  }
  
  return (
    <>
      <Screen style={ROOT} unsafe>
        <Text
          style={{
            marginVertical: spacing[3],
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Verification code sent to you mobile number
        </Text>
        <FormInput
          {...{ control }}
          name="code"
          label={"Verification code"}
          textInputprops={{
            autoCapitalize: "none",
          }}
          // autoCapitalize="none"
          // value={values.code}
          // onChangeText={(t) => setFieldValue("code", t)}
        />
        <Controller
          {...{ control }}
          name="password"
          render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => {
            return (
              <PasswordInput
                label="Password"
                errorMessage={error?.message}
                onChangeText={onChange}
                {...{ onBlur, value }}
              />
            )
          }}
        />
        <Controller
          {...{ control }}
          name="confirmPassword"
          render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => {
            return (
              <PasswordInput
                label="Confirm password"
                onChangeText={onChange}
                errorMessage={error?.message}
                {...{ onBlur, value }}
              />
            )
          }}
        />

        <HStack alignItems="center" justifyContent="space-between">
          <Text
            style={{
              color: "primary.900",
            }}
          >
            00:{counter}
          </Text>
          <Button
            px={0}
            disabled={counter !== 0}
            variant="link"
            textProps={{ color: "primary.900" }}
            onPress={() => resend()}
          >
            Resend code
          </Button>
        </HStack>
        <Button
          isLoading={verifyLoading}
          onPress={handleSubmit(verifyCode)}
          px={8}
          textProps={{ color: "white" }}
        >
          Verify
        </Button>
      </Screen>
    </>
  )
}
