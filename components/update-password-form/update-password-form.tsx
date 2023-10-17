import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigation } from "@react-navigation/native"
import { Auth } from "aws-amplify"
import { FormControl, Radio, useToast } from "native-base"
import React, { useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { PhonenumberInput, spacing } from "ui"
import * as yup from "yup"
import { yupPhone } from "../../utils/format"
import { Button } from "../button/button"
import { FormInput } from "../form-input/form-input"
export interface UpdatePasswordFormProps {
  /**
   * An optional style override useful for padding & margin.
   */
  switchToChangepassword: () => any
}

/**
 * Describe your component here
 */

type FormData = {
  username: string
}

export const UpdatePasswordForm: React.FC = (props: UpdatePasswordFormProps) => {
  // const { navigation } = props
  const navigation = useNavigation()
  const toast = useToast()
  // const [email, setEmail] = useState("")
  const {} = props

  const [choice, setChoise] = useState<"email" | "phone">("phone")
  // const [phone, setPhone] = useState("")

  const schema = yup.object({
    username:
      choice === "email"
        ? yup.string().required("Email is required").email("Please enter a valid email")
        : yupPhone,
  })
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      username: "",
    },
    // mode: "onChange",
    resolver: yupResolver(schema),
  })
  const verifyCode: SubmitHandler<FormData> = async (values) => {
    const value = values.username
    console.log("value :: ", value)
    try {
      const res = await Auth.forgotPassword(value)
      console.log("res :: ------>> " + res)
      navigation.navigate("verifyCodeForm", { username: value })
      // switchToChangepassword()
    } catch (error) {
      console.log("error is ", error.message)
       if (error.message?.includes("Username/client id combination not found.")) {
        toast.show({
          title: `Please enter valid ${choice === "email" ? "email" : "phone number"}`,
         })
      } else {
      toast.show({
        title: "Error",
        description: error.message || "Something went wrong. Please try again",
      })
    }
     }
  }

  return (
    <>
      <Radio.Group
        style={{
          marginBottom: spacing[4],
        }}
        value={choice}
        defaultValue={choice}
        name="choice"
        onChange={(value) => {
          reset({
            username: "",
          })
          setChoise(value)
        }}
      >
        <Radio
          style={{
            marginBottom: spacing[2],
          }}
          value="phone"
        >
          Mobile number
        </Radio>
        <Radio value="email">Email</Radio>
      </Radio.Group>
      {choice === "phone" ? (
        <Controller
          {...{ control }}
          name="username"
          render={({ field: { value, onBlur, onChange }, fieldState }) => {
            return (
              <FormControl isRequired isInvalid={!!fieldState?.error}>
                <FormControl.Label>Enter your phone number</FormControl.Label>
                <PhonenumberInput value={value} onBlur={onBlur} onChangeText={onChange} />
                <FormControl.ErrorMessage>{fieldState?.error?.message}</FormControl.ErrorMessage>
              </FormControl>
            )
          }}
        />
      ) : (
        <FormInput {...{ control }} name="username" label="Enter your email"  required />
        // <TextField label="Enter your email" onChangeText={setEmail} value={email} />
      )}
      <Button
        mt={6}
        onPress={handleSubmit(verifyCode)}
        // textProps={{
        //   color: "white",
        // }}
      >
        Send verification code
      </Button>
      {/* <TextField label={"Verification code"} autoCapitalize="none" />
      <TextField label={"New password"} autoCapitalize={"none"} secureTextEntry={true} />

      <HStack alignItems="center" justifyContent="space-between">
        <Button px={0} variant="link" textProps={{ color: "primary.900" }}>
          Resend code
        </Button>
        <Button 
        isLoading={verifyLoading}
        px={8} textProps={{ color: "white" }}>
          Verify
        </Button>
      </HStack> */}
    </>
  )
}
