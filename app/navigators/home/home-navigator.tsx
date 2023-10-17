import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import { GenericHeader, IProductInCard } from "../../components/index"
import { Product } from "../../graphql/generated/graphql"
import {
  LandingScreen,
  ProductInfoScreen,
  ProductsSearchScreen,
  ProductCategoryScreen,
} from "../../screens"

type ICategory = {
  id?: string
  name?: string
  searchKeyword?: string
  sortOrder?: string
}

export type HomeParamList = {
  landing: undefined
  productInfo: {
    product: Partial<Pick<Product, "id" | "prodFullName">>
    siblings?: Array<IProductInCard>
    purpose?: "invalidCart"
  }
  category?: {
    category: ICategory
  }
  productsList:
  | undefined
  | {
    selection: {
      category?: ICategory
    }
  }
}

const Stack = createStackNavigator<HomeParamList>()
export const HomeNavigator = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="landing"
          options={{
            header: function NavigationHeader() {
              return <GenericHeader />
            },
            title: "Home",
          }}
          component={LandingScreen}
        />
        <Stack.Screen
          name="category"
          component={ProductCategoryScreen}
          options={({ route }) => ({
            title: route?.params?.category?.name || "",
          })}
        />
        <Stack.Screen
          name="productsList"
          component={ProductsSearchScreen}
          options={{
            title: "Products",
          }}
        />
        <Stack.Screen
          name="productInfo"
          component={ProductInfoScreen}
          options={({ route }) => ({
            title: route?.params?.product?.prodFullName || "",
          })}
        />
      </Stack.Navigator>
    </>
  )
}
