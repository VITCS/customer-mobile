import * as React from "react"
import { TextInput, View, ViewStyle } from "react-native"
import { Text } from "../text/text"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

export interface WelcomeUserFormProps {
  /**
   * An optional style override useful for padding & margin.
   */
}

/**
 * Describe your component here
 */
export const WelcomeUserForm = (props: WelcomeUserFormProps) => {
  return (
    <View style={CONTAINER}>
      <View>
        <Text>Name</Text>
        <TextInput />
      </View>
      <TextInput />
    </View>
  )
}
