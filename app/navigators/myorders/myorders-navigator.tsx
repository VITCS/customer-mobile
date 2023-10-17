import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import { OrderShipment } from "../../graphql/generated/graphql"
import { MyOrdersScreen, OrderDetailsScreen } from "../../screens"

export type MyordersParamList = {
  list: undefined
  orderDetails: {
    orderShipment: Pick<
      OrderShipment,
      | "id"
      | "assignedStoreName"
      | "subTotalTax"
      | "subTotalProductAmount"
      | "subTotalDiscount"
      | "subTotalDeliveryCharges"
    >
  }
}

const Stack = createStackNavigator<MyordersParamList>()
export const MyOrdersNavigator = () => {
  return (
    <Stack.Navigator detachInactiveScreens>
      <Stack.Screen
        name="list"
        component={MyOrdersScreen}
        options={({ navigation }) => ({
          headerTitle: "My orders",
          headerTitleAlign: "center",
        })}
      />
      <Stack.Screen
        name="orderDetails"
        options={{
          title: "Order details",
        }}
        component={OrderDetailsScreen}
      />
    </Stack.Navigator>
  )
}
