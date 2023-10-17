import { VStack } from "native-base"
import * as React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { color, typography } from "../../theme"
import { TextField } from "../text-field/text-field"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

export interface UserEditContactFormProps {
  /**
   * An optional style override useful for padding & margin.
   */
  address: {
    addrLine1: string
    addrLine2?: string
    city: string
    postCode?: string
    state?: string
    country: string
  }
  setFieldValue: (name: string, value: any) => any
}

/**
 * Describe your component here
 */
export const UserEditContactForm = (props: UserEditContactFormProps) => {
  const { address, setFieldValue } = props

  return (
    <VStack px={6}>
      <TextField
        label="Address line 1"
        value={address?.addrLine1 || ""}
        onChangeText={(t) => setFieldValue("address.addrLine1", t)}
      />
      <TextField
        label="Address line 2"
        value={address?.addrLine2 || ""}
        onChangeText={(t) => setFieldValue("address.addrLine2", t)}
      />
      <TextField
        label="City or Town"
        value={address?.city || ""}
        onChangeText={(t) => setFieldValue("address.city", t)}
      />
      <TextField
        label="State"
        value={address?.state || ""}
        onChangeText={(t) => setFieldValue("address.state", t)}
      />
      <TextField
        label="Zip code"
        value={address?.postCode || ""}
        onChangeText={(t) => setFieldValue("address.postCode", t)}
      />
      <TextField
        label="Country"
        value={address?.country || ""}
        onChangeText={(t) => setFieldValue("address.country", t)}
      />
    </VStack>
  )
}
