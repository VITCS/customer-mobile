import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import { SettingsScreen } from "../../screens"

export type SettingStackParamList = {
  settingsInfo: undefined
}

const Stack = createStackNavigator<SettingStackParamList>()
export const SettingsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="settingsInfo"
        component={SettingsScreen}
        options={{ headerTitle: "Settings info" }}
      />
    </Stack.Navigator>
  )
}
