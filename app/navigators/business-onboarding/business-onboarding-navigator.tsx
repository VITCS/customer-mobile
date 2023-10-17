/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import { BusinessOnboardingScreen } from "../../screens"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type BusinessOnboardingParamsList = {
  userAccount: undefined
  businessAccount: undefined
}

const Stack = createStackNavigator<BusinessOnboardingParamsList>()

export function BusinessOnboardingNavigator({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerShown: false,
        cardStyle: { backgroundColor: "transparent" },
      }}
    >
      <Stack.Screen
        name="businessAccount"
        component={BusinessOnboardingScreen}
        options={{
          headerTitle: "Business setup",
        }}
      />
    </Stack.Navigator>
  )
}
