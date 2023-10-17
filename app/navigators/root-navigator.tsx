/**
 * The root navigator is used to switch between major navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow (which is contained in your MainNavigator) which the user
 * will use once logged in.
 */
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigationContainerRef,
  Theme,
} from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { useToken } from "native-base"
import React from "react"
import { useColorScheme } from "react-native"
import { MainNavigator } from "./main-navigator"
/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type RootParamList = {
  mainStack: undefined
  test: undefined
}

const Stack = createStackNavigator<RootParamList>()

const RootStack = () => {
  return (
    <Stack.Navigator
      detachInactiveScreens
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="mainStack" component={MainNavigator} />
      {/* <Stack.Screen name="test" component={TestScreen} /> */}
    </Stack.Navigator>
  )
}

export const RootNavigator = React.forwardRef<
  NavigationContainerRef,
  Partial<React.ComponentProps<typeof NavigationContainer>>
>((props, ref) => {
  const [primaryColor] = useToken("colors", ["primary.500"])
  const colorScheme = useColorScheme()

  console.log("color schema", colorScheme)

  const finalTheme: Theme = colorScheme === "dark" ? DarkTheme : DefaultTheme
  return (
    <NavigationContainer
      {...props}
      ref={ref}
      theme={{
        ...finalTheme,
        colors: {
          ...finalTheme.colors,
          primary: primaryColor,
        },
        // dark: true,
        dark: colorScheme === "dark",
      }}

      // theme={DarkTheme}
    >
      <BottomSheetModalProvider>
        <RootStack />
      </BottomSheetModalProvider>
    </NavigationContainer>
  )
})

RootNavigator.displayName = "RootNavigator"
