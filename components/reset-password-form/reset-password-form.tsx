import { Auth } from "aws-amplify"
import React, { useState } from "react"
import { Alert, View } from "react-native"
import { spacing } from "../../theme"
import { Button } from "../button/button"
import { TextField } from "../text-field/text-field"

export interface ResetPasswordFormProps {
  switchToChangepassword: () => any
  goToLogin: () => any
}

/**
 * Describe your component here
 */
export const ResetPasswordForm = (props: ResetPasswordFormProps) => {
  const { switchToChangepassword, goToLogin } = props
  const [username, setusername] = useState("")

  const verifyCode = React.useCallback(async () => {
    try {
      if (username?.length > 0) {
        const res = await Auth.forgotPassword(username)
        switchToChangepassword()
      } else {
        Alert.alert("Username can't be empty")
      }
    } catch (error) {}
  }, [username])
  return (
    <View
      style={{
        padding: spacing[4],
      }}
    >
      <TextField
        label="User name"
        onChangeText={setusername}
        value={username}
        placeholder={"Enter your user name"}
      />
      <Button
        mt={3}
        onPress={verifyCode}
        textProps={{
          color: "white",
        }}
      >
        Send verification code
      </Button>

      <Button
        bg="white"
        variant="outline"
        mt={3}
        onPress={goToLogin}
        textProps={{
          color: "primary.500",
          fontWeight: "600",
        }}
      >
        Sign in to existing account
      </Button>
    </View>
  )
}
