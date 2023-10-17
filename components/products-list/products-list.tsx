import { NavigationProp, useNavigation } from "@react-navigation/core"
import { Spinner, View } from "native-base"
import * as React from "react"
import { FlatList, TouchableOpacity } from "react-native"
import { ProductListItemCard, Text } from "../"
import { Product } from "../../graphql/generated/graphql"
import { HomeParamList } from "../../navigators"

export type ItemProduct = Pick<Product, "id" | "prodName" | "images" | "prodCategory">

export type ProductsListProps = {
  products: ItemProduct[]
  isLoading: boolean
}

/**
 * Describe your component here
 */

export const ProductsList = (props: ProductsListProps) => {
  const { products, isLoading } = props
  const navigation = useNavigation<NavigationProp<HomeParamList, "productsList">>()
  return (
    <>
      <FlatList
        numColumns={2}
        ListEmptyComponent={() => {
          return <View>{isLoading ? <Spinner mt={6} /> : <Text>No Products</Text>}</View>
        }}
        data={products}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item, index }) => (
          <View flex={1} p={1}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("productInfo", {
                  product: { id: item.id },
                  // get four products as siblings
                  siblings: [products[0], products[1], products[2], products[3]],
                })
              }}
            >
              <ProductListItemCard {...item} />
            </TouchableOpacity>
          </View>
        )}
      />
    </>
  )
}
