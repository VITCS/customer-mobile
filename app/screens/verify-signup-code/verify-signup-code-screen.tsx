import { Auth } from "@aws-amplify/auth"
import { RouteProp } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { Button, useToast, HStack, VStack } from "native-base"
import React, { useState } from "react"
import { ViewStyle } from "react-native"
import { Screen, Text, TextField, useCounter } from "../../components"
import { AuthStackParamsList } from "../../navigators"

const ROOT: ViewStyle = {
  flex: 1,
}

type IProps = StackScreenProps<AuthStackParamsList, "verifySignupCode"> &
  RouteProp<AuthStackParamsList, "verifySignupCode">

export const VerifySignupCodeScreen: React.FC<IProps> = ({ navigation, route }) => {
  const [verifyLoading, setVerifyLoading] = useState(false)

  const { userName = "", phoneNumber = "" } = route?.params
  const toast = useToast()
  const [code, setCode] = useState("")
  const { counter, reset: resetCounter } = useCounter()

  const resend = async () => {
    const resp = await Auth.resendSignUp(userName)
    console.log("resp is ", resp)
    toast.show({
      title: `Verification code resent.`,
      description: "",
      status: "success",
    })

    resetCounter()
  }
  
  const verifyCode = async () => {
    try {
      setVerifyLoading(true)
      const res = await Auth.confirmSignUp(userName, code)

      console.log("res", res)

      setTimeout(() => {
        setVerifyLoading(false)
        navigation.navigate("login", {
          justSignedUp: true,
        })
      }, 1000)
    } catch (error) {
      console.log("error ", error.message)

      setVerifyLoading(false)
      toast.show({
        title: "Error",
        description: error.message || "Something went wrong. Please try again",
        status: "error",
      })
      console.log("[verifyCode] :: error ", error)
    }
  }
  return (
    <Screen style={ROOT}>
      <VStack justifyContent="center" flex={1} mt={4} mx={4}>
        <Text fontSize="lg">
          Verification code sent to your mobile
          <Text fontWeight="600">
            {"\n"}
            xxx-xxx-x{phoneNumber.substring(phoneNumber.length - 3)}
          </Text>
        </Text>        
        <TextField
          label="Verification code"
          autoCapitalize="none"
          value={code}
          onChangeText={setCode}
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
            onPress={() => resend()}
          >
            Resend code
          </Button>
        </HStack>

        <Button
          _text={{ fontSize: "lg", fontWeight: "normal" }}
          mt={4}
          isLoading={verifyLoading}
          onPress={() => verifyCode()}
        >
          Verify
        </Button>
      </VStack>
    </Screen>
  )
}
