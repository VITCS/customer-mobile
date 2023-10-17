import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import { CartScreen, OrderConfirmationScreen, PostOrderInfoScreen } from "../../screens"
import { IcustomWhiteListedShipments } from "../../stores/cart"

export type CartParamsList = {
  cartHome: undefined
  orderConfirmation: undefined | { filter: IcustomWhiteListedShipments }
  postOrder:
    | undefined
    | {
        // order: Pick<Order, "id">
      }
}

const Stack = createStackNavigator<CartParamsList>()
export const CartNavigator = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="cartHome"
          options={{
            headerTitleAlign: "center",
            title: "Cart",
            headerBackTitleVisible: false,
          }}
          component={CartScreen}
        />
        <Stack.Screen
          name="orderConfirmation"
          component={OrderConfirmationScreen}
          options={{
            title: "Confirm order",
          }}
        />

        <Stack.Screen
          name="postOrder"
          component={PostOrderInfoScreen}
          options={{
            title: "Order successfull",
            headerLeft: null,
          }}
        />
      </Stack.Navigator>
    </>
  )
}
