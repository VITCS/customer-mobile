import { StackScreenProps } from "@react-navigation/stack"
import { Heading, VStack } from "native-base"
import React, { useCallback, useState } from "react"
import { ResetPasswordForm, UpdatePasswordForm } from "../../components"
import { AuthStackParamsList } from "../../navigators"

type IProps = StackScreenProps<AuthStackParamsList, "forgotPassword">

export const ForgotPasswordScreen: React.FC<IProps> = ({ navigation }) => {
  const [username, setusername] = useState("")
  const [didSubmit, setDidSubmit] = useState(true)
  const goToLogin = useCallback(() => {
    navigation.navigate("login")
  }, [navigation])
  return (
    <VStack bg="white" px={6} py={4} flex={1}>
      <Heading mb={2}>Reset your password</Heading>
      {didSubmit ? (
        <UpdatePasswordForm />
      ) : (
        <ResetPasswordForm switchToChangepassword={() => setDidSubmit(true)} {...{ goToLogin }} />
      )}
    </VStack>
  )
}
