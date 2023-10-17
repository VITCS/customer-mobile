import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import { ProductInfoScreen, ProductsSearchScreen } from "../../screens"
import { IProduct } from "../../stores/products"

export type ProductsParamList = {
  productsSearch: undefined
  productInfo: {
    product: Pick<IProduct, "id" | "title">
  }
}

const Stack = createStackNavigator<ProductsParamList>()
export const ProductsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="productsSearch"
        component={ProductsSearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="productInfo"
        component={ProductInfoScreen}
        options={({ route }) => {
          return {
            headerTitle: route?.params?.product?.title || "",
            headerBackTitle: "Products",
            headerStyle: {
              backgroundColor: "red",
            },
          }
        }}
      />
    </Stack.Navigator>
  )
}
