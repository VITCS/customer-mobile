import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import { MyOrdersScreen } from "../../screens"

export type AllOrdersParamList = {
  allOrders: undefined
}

const Stack = createStackNavigator<AllOrdersParamList>()
export const AllOrdersNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: "transparent" }, headerShown: false }}
    >
      <Stack.Screen name="allOrders" component={MyOrdersScreen} />
    </Stack.Navigator>
  )
}
