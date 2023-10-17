import { AntDesign } from "@expo/vector-icons"
import { StackNavigationProp } from "@react-navigation/stack"
import React from "react"
import { TouchableOpacity, ViewStyle } from "react-native"
import { OnboardingSteps, Screen } from "../../components"
import { AuthStackParamsList } from "../../navigators"

const ROOT: ViewStyle = {
  flex: 1,
  // justifyContent: "space-between",
  alignItems: "center",
}

type ProfileScreenNavigationProp = StackNavigationProp<AuthStackParamsList, "onboarding">

type Props = {
  navigation: ProfileScreenNavigationProp
}

export const OnboardingScreen: React.FC<Props> = (props: Props) => {
  const { navigation } = props
  const NEXT_BUTTON: ViewStyle = {
    marginTop: "auto",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 64,
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
  }
  return (
    <Screen style={ROOT} preset="scroll">
      <OnboardingSteps />
      <TouchableOpacity
        style={NEXT_BUTTON}
        onPress={() => {
          navigation.push("login")
        }}
      >
        <AntDesign name="right" size={24} color={"#000"} />
      </TouchableOpacity>
    </Screen>
  )
}
