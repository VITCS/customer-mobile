import { StackScreenProps } from "@react-navigation/stack"
import React from "react"
import { TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import { Screen, Text } from "../../components"
import { BusinessOnboardingParamsList } from "../../navigators"
import { AUTH_INPUT, LOGIN_BUTTON } from "../login/login-screen"

const ROOT: ViewStyle = {
  flex: 1,
  paddingHorizontal: 16,
}

const FORM_CONTAINER: ViewStyle = {
  marginTop: 32,
}

const FORM_INPUT: ViewStyle = {}
const HEADING: TextStyle = {
  fontSize: 32,
  width: "80%",
  marginBottom: 24,
}

const LABEL: TextStyle = {
  fontWeight: "500",
}
const NEXT_BUTTON: ViewStyle = { marginTop: "auto", marginBottom: 32 }

const NEXT_BUTTON_TEXT: TextStyle = {
  fontSize: 20,
  fontWeight: "400",
}

type Props = StackScreenProps<BusinessOnboardingParamsList, "userAccount">

export const UserOnboardingScreen: React.FC<Props> = (props) => {
  // Pull in navigation via hook
  const { navigation } = props
  return (
    <Screen style={ROOT} preset="scroll">
      {/* <View
        style={{
          backgroundColor: colors.background,
          shadowColor: "#303030",
          shadowOffset: {
            height: 1,
            width: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 10,
          alignItems: "center",
          flexDirection: "row",
          paddingBottom: 12,
        }}
      >
        <TouchableOpacity>
          <Icon name="arrow-back" size={32} />
        </TouchableOpacity>
      </View> */}
      <View style={FORM_CONTAINER}>
        <Text preset="header" style={HEADING} text="Configure user details" />

        <View style={FORM_INPUT}>
          <Text style={LABEL}>Full name</Text>

          <TextInput style={AUTH_INPUT} placeholder="Enter full name" />
        </View>
      </View>

      <TouchableOpacity
        style={[LOGIN_BUTTON, NEXT_BUTTON]}
        onPress={() => {
          navigation.navigate("businessAccount")
        }}
      >
        <Text style={NEXT_BUTTON_TEXT}>Next</Text>
      </TouchableOpacity>
    </Screen>
  )
}
