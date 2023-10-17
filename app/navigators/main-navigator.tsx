import { createStackNavigator, TransitionPresets } from "@react-navigation/stack"
import React, { memo } from "react"
import { AppNavigator, AuthNavigator, CartNavigator } from "."
import { ICategory } from "../components"
import { EditUserProfileDetailsScreen } from "../screens/edit-user-profile-details/edit-user-profile-details-screen"
import { ProductCategoryScreen } from "../screens/product-category/product-category-screen"
import { SearchFiltersProvider } from "../stores/search-filters"

export type MainStackParamsList = {
  app: undefined
  auth: undefined
  cart: undefined
  splash: undefined
  editUserProfile: {
    id: string
  }
  editMerchantProfile: {
    id: string
  }
  category: {
    category: ICategory
  }
}

const Stack = createStackNavigator<MainStackParamsList>()

export const MainNavigator = memo(function MainNavigatorUnRedux(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      detachInactiveScreens
      initialRouteName="app"
    >
      <Stack.Screen name="auth" component={AuthNavigator} />
      <Stack.Group>
        <Stack.Screen name="app" component={AppNavigator} />
        <Stack.Screen name="cart" component={CartNavigator} />
        {/* <Stack.Screen
          name="category"
          options={({ route }) => ({
            headerShown: true,
            title: route?.params?.category?.name || "",
            headerBackTitle: "Back",
          })}
          component={ProductCategoryScreen}
        /> */}
        <Stack.Screen
          name="editUserProfile"
          component={EditUserProfileDetailsScreen}
          options={{
            title: "Edit user profile",
            ...TransitionPresets.ModalPresentationIOS,
            gestureEnabled: false,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
})
/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes: Array<keyof MainStackParamsList> = []
export const canExit = (routeName: keyof MainStackParamsList) => exitRoutes.includes(routeName)
