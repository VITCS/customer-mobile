import * as React from "react"
import { FlatList, List, View, Text } from "native-base"
import { SearchFiltersContext } from "../../stores/search-filters"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { HomeParamList } from "../../navigators"
import { useBottomSheetModal } from "@gorhom/bottom-sheet"
export interface ProdutsSortModalProps {
}

/**
 * Describe your component here
 */
export const ProductsSortModal = (props: ProdutsSortModalProps) => {
  const navigation = useNavigation<NavigationProp<HomeParamList, "landing">>()
  const { dismiss } = useBottomSheetModal()
  const sortProducts = (sortOrder) => {
    navigation.navigate("category", {
      category: {
        sortOrder: sortOrder,
      },
    })
    dismiss();
  }
  return (
    <View p={3}>
      <Text fontWeight='bold'> Sort By </Text>
      <List mt={1} borderWidth={0}>
        <List.Item
          onPress={() => { sortProducts('asc') }}
        >
          Product Name - Ascending
        </List.Item>
        <List.Item
          onPress={() => { sortProducts('desc') }}
        >
          Product Name - Descending
        </List.Item>
      </List>

    </View >
  )
}
