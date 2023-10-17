import React from "react"
import { ViewStyle } from "react-native"
import { Screen, Text } from "../../components"

const ROOT: ViewStyle = {
  flex: 1,
}

export const EditProfileDetailsScreen = () => {
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" text="" />
    </Screen>
  )
}
