import { FontAwesome, Ionicons } from "@expo/vector-icons"
import * as React from "react"
import Tooltip from "rn-tooltip"
import { spacing, Text, TextFieldProps } from "ui"
import { TextField } from "../"

export interface PasswordInputProps extends TextFieldProps {
  label?: string
}

/**
 * Describe your component here
 */
export const PasswordInput = (props: PasswordInputProps) => {
  const { label } = props
  const [hidePass, setHidePass] = React.useState(true)
  return (
    <TextField
      label={label?.length > 0 ? label : "Password"}
      required
      labelRight={
        <Tooltip
          popover={
            <Text
              style={{
                maxWidth: 400,
              }}
              noOfLines={3}
            >
              Min Length 8, One Numerical, One Special Character, One UpperCase and One LowerCase
              Character.
            </Text>
          }
          actionType="press"
          width={300}
          height={70}
        >
          <Ionicons
            style={{
              marginHorizontal: spacing[1],
            }}
            name="information-circle"
          />
        </Tooltip>
      }
      InputRightElement={
        <FontAwesome
          name={hidePass ? "eye-slash" : "eye"}
          size={20}
          style={{
            marginRight: 12,
          }}
          color="black"
          onPress={() => setHidePass(!hidePass)}
        />
      }
      secureTextEntry={!!hidePass}
      {...props}
    />
  )
}
