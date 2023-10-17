import * as React from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { Text } from "../text/text"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
  flex: 1,
}

export interface OnboardingStepsProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const OnboardingSteps = (props: OnboardingStepsProps) => {
  const { style } = props

  return (
    <View style={CONTAINER}>
      <Text>Onboarding screen</Text>
    </View>
  )
}
