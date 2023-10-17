import { StackScreenProps } from "@react-navigation/stack"
import React, { useContext, useMemo } from "react"
import { ActivityIndicator, FlatList, TouchableOpacity, View, ViewStyle } from "react-native"
import { AntDesign } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons';
import {
  ProductListItemCard,
  ProductsFiltersModal,
  Screen,
  Text,
  ProductsSortModal,
} from "../../components"
import { HomeParamList } from "../../navigators"
import { ProductsConnector } from "../../services/product"
import { useDeliveryAddress } from "../../stores/cart"
import { SearchProvider } from "@elastic/react-search-ui"

import { SearchDriver } from "@elastic/search-ui"
import {
  SearchableProductFilterInput,
  SearchableProductSortInput,
  useSearchProductsLambdaQuery,
} from "../../graphql/generated/graphql"
import { apiSdk } from "../../utils/api"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Button, spacing } from "ui"
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProps } from "@gorhom/bottom-sheet"
import { SearchFiltersContext, SearchFiltersProvider } from "../../stores/search-filters"
import { HStack } from "native-base"
import { NavigationProp, useNavigation } from "@react-navigation/native";
const ROOT: ViewStyle = {
  flex: 1,
}

const FILTER_BUTTON: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  padding: spacing[4],
}

const filterKeyMappings = {
  brand: "brandLine",
  ProdCategory: "prodCategory",
}

const commonModalProps = {
  index: 1,
  backdropComponent: (r) => <BottomSheetBackdrop {...r} />,
}
// const connector = new ProductsConnector()
// const driver = new SearchDriver({})
export const ProductCategoryScreen: React.FC<StackScreenProps<HomeParamList, "category">> = (
  props,
) => {
  const { bottom, top } = useSafeAreaInsets()
  const { route } = props
  console.log("category params", route);
  const { id, searchKeyword, sortOrder } = route?.params?.category || {}
  const { data: deliveryData } = useDeliveryAddress()

  const filterModalRef = React.useRef<BottomSheetModal>(null)
  const sortModalRef = React.useRef<BottomSheetModal>(null)
  const { attributes } = useContext(SearchFiltersContext)
  const sort: SearchableProductSortInput = React.useMemo(() => {
    let _sort = { direction: "asc", field: "prodFullName" };
    if (sortOrder) {
      _sort = { direction: sortOrder, field: "prodFullName" };
    }
    return _sort;
  }, [attributes, sortOrder])
  const filter: SearchableProductFilterInput = React.useMemo(() => {
    const _filters: SearchableProductFilterInput[] = []

    if (id) {
      _filters.push({
        prodCategory: {
          eq: id,
        },
      })
    }
    if (searchKeyword) [
      _filters.push({
        prodFullName: {
          matchPhrase: searchKeyword,
        },
      })
    ]
    Object.keys(attributes).forEach((key) => {
      const values = attributes[key]
      const fieldKey = filterKeyMappings[key] || key

      Object.keys(values).forEach((eachValue) => {
        if (values[eachValue]) {
          _filters.push({
            [fieldKey]: {
              eq: eachValue,
            },
          })
        }
      })
    })
    return {
      and: _filters,
    }
  }, [attributes, id])


  console.log("Final Filters", filter, sort);
  const { data, isLoading, isError, error } = useSearchProductsLambdaQuery(apiSdk, {
    limit: 10,
    distance: 100,

    // distance: 10,
    lat: deliveryData?.latitude,
    lon: deliveryData?.longitude,
    // maxPrice,
    // minPrice,
    sort,
    filter,
  })
  console.log("data is ", error, data)
  const navigation = useNavigation<NavigationProp<HomeParamList, "landing">>()
  const { searchProductsLambda = {} } = data || {}
  const { items, nextToken, total, __typename, ...rest } = searchProductsLambda
  return (
    <>
      <Screen unsafe preset="scroll" style={{ marginLeft: 9, marginRight: 9 }}>
        <HStack style={{ justifyContent: "space-between" }}>
          <Button variant={"link"} onPress={() => {
            sortModalRef?.current?.present()
          }}>
            <Text><FontAwesome name="sort" size={14} /> Sort By</Text>
          </Button>
          <Button variant={"link"} onPress={() => {
            filterModalRef?.current?.present()
          }}>
            <Text><AntDesign name="filter" size={14} /> Filter</Text>
          </Button>
        </HStack>
        <FlatList
          numColumns={2}
          ListEmptyComponent={isLoading ? <ActivityIndicator /> : <Text>No products found</Text>}
          data={items}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item, index }) => (
            <View flex={1} style={{ padding: 5 }}  >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("productInfo", {
                    product: { id: item.id }
                  })
                }}
              >
                <ProductListItemCard {...item} />
              </TouchableOpacity>
            </View>
          )}
        />
        {/* <FlatList
          data={items}
          ListEmptyComponent={isLoading ? <ActivityIndicator /> : <Text>No products found</Text>}
          renderItem={({ item: eachProduct }) => {
            return <ProductListItemCard {...eachProduct} />
          }}
        /> */}
        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            borderTopWidth: 1,
            borderTopColor: "#000",
          }}
        >
          <TouchableOpacity
            style={[FILTER_BUTTON, { borderRightWidth: 1, borderRightColor: "#000" }]}
            onPress={() => {
              sortModalRef?.current?.present()
            }}
          >
            <Text>Sort</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              filterModalRef?.current?.present()
            }}
            style={FILTER_BUTTON}
          >
            <Text>Filter</Text>
          </TouchableOpacity>
        </View> */}
      </Screen>
      <BottomSheetModal {...commonModalProps} snapPoints={[1, "100%"]} ref={filterModalRef}>
        <ProductsFiltersModal attributes={rest} />
      </BottomSheetModal>

      <BottomSheetModal {...commonModalProps} snapPoints={[1, "60%"]} ref={sortModalRef}>
        <ProductsSortModal attributes={rest} />
      </BottomSheetModal>
    </>
  )
}
