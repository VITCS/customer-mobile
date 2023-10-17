import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import { PaymentMethodsScreen, ProfileScreen, ChangePasswordScreen } from "../../screens"
import { DeliveryContactNavigator, MyOrdersNavigator, SettingsNavigator } from "../index"

export type ProfileStackParamList = {
  profileInfo: undefined
  deliveryContacts: undefined
  myOrders: undefined
  settings: undefined
  paymentMethods: undefined
  changePassword: undefined
}

const Stack = createStackNavigator<ProfileStackParamList>()
export const ProfileNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="profileInfo"
        component={ProfileScreen}
        options={{ headerTitle: "My profile" }}
      />
      <Stack.Screen name="deliveryContacts" component={DeliveryContactNavigator} />
      <Stack.Screen
        name="paymentMethods"
        component={PaymentMethodsScreen}
        options={{
          headerShown: true,
          title: "Payment methods",
        }}
      />
      <Stack.Screen
        name="settings"
        component={SettingsNavigator}
        options={{
          headerShown: true,
          title: "Settings",
        }}
      />      
      <Stack.Screen
        name="myOrders"
        component={MyOrdersNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="changePassword"
        component={ChangePasswordScreen}
        options={{ headerShown: true, title: "Change Password" }}
      />
    </Stack.Navigator>
  )
}
