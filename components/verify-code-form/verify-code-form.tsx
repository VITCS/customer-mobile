import { yupResolver } from "@hookform/resolvers/yup"
import { Auth } from "aws-amplify"
import { Heading, HStack, useToast } from "native-base"
import * as React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { View, ViewStyle } from "react-native"
import { Button, spacing, useStyles } from "ui"
import { object, string } from "yup"
import { FormInput, Text } from "../"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
  paddingHorizontal: spacing[4],
}

export interface VerifyCodeFormProps {
  username: string
  switchToSignIn: () => any
}

type FormData = {
  code: string
}
const schema = object({
  code: string().required("Please enter code"),
})
export const useCounter = () => {
  const [counter, setCounter] = React.useState(59)

  React.useEffect(() => {
    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000)
    return () => {
      timer && clearInterval(timer)
    }
  }, [counter])
  const reset = () => {
    setCounter(59)
  }
  return {
    counter,
    reset,
  }
}

export const VerifyCodeForm = (props: VerifyCodeFormProps) => {
  //const { navigation } = props
  const { username, switchToSignIn } = props

  const [phoneNumber, setPhoneNumber] = React.useState("")
  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      code: "",
    },
    resolver: yupResolver(schema),
  })
  const { counter, reset: resetCounter } = useCounter()

  const toast = useToast()

  const resend = async () => {
    try {
      const resp = await Auth.resendSignUp(username)
      console.log("resp is ", resp)

      setPhoneNumber(resp.CodeDeliveryDetails?.Destination)
      resetCounter()
    } catch (error) {
      console.log("erorin resent", error)
      toast.show({
        title: error?.message || "Error",
        description: "",
      })
    }
  }

  React.useEffect(() => {
    if (username?.length) {
      resend()
    }
  }, [username])
  const resendCode = async () => {
    try {
      const res = await Auth.resendSignUp(username)

      toast.show({
        title: `Verification code resent.`,
        description: "",
        status: "success",
      })
    } catch (error) {
      console.log("error ", error.message)

      // setVerifyLoading(false)
      toast.show({
        title: "Error",
        description: error.message || "Something went wrong. Please try again",
        status: "error",
      })
      console.log("[resendCode] :: error ", error)
    }
  }

  const onVerify: SubmitHandler<FormData> = async (values) => {
    const { code } = values
    try {
      const resp = await Auth.confirmSignUp(username, code)
      toast.show({
        title: "Successfully verified your mobile",
        // status: "success",
        description: "Sign in to get started",
      })
    } catch (error) {
      console.log("error ", error.message)

      // setVerifyLoading(false)
      toast.show({
        title: "Error",
        description: error.message || "Something went wrong. Please try again",
        status: "error",
      })
      console.log("[verifyCode] :: error ", error)
    }
    setTimeout(() => {
      switchToSignIn()
      reset({
        code: "",
      })
    }, 1000)
  }
  const styles = useStyles({
    create: () => ({}),
  })

  return (
    <View style={CONTAINER}>
      <View>
        <Heading
          style={{
            marginBottom: spacing[3],
          }}
        >
          Verification
        </Heading>
        <Text
          style={{
            marginBottom: spacing[2],
            marginRight: spacing[3],
          }}
        >
          Verification code sent to your mobile
          {phoneNumber?.toString()}
        </Text>

        {/* <HStack
          style={{
            marginBottom: spacing[1],
          }}
        >
        </HStack> */}
        <FormInput {...{ control }} name="code" label="" />

        <HStack w="full" alignItems={"center"} justifyContent={"flex-end"}>
          <Text color={"primary.500"}>00:{counter}</Text>
          <Button
            disabled={counter != 0}
            variant={"ghost"}
            onPress={() => {
              resendCode()
            }}
          >
            Resend verification code
          </Button>
        </HStack>
        <Button onPress={handleSubmit(onVerify)}>Verify</Button>

        <Button
          variant={"outline"}
          onPress={() => {
            switchToSignIn()
          }}
        >
          Back to login
        </Button>
      </View>
    </View>
  )
}
