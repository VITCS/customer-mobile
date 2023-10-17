import { CompositeScreenProps } from "@react-navigation/core"
import { StackScreenProps } from "@react-navigation/stack"
import { Spinner, View } from "native-base"
import React, { useState } from "react"
import { FlatList, TouchableOpacity } from "react-native"
import { Searchbar } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useQuery } from "react-query"
import { Text, TextField } from "ui"
import { CategoriesMenu, ProductSearchListItem, Screen } from "../../components"
import { Product, useSearchProductsQuery } from "../../graphql/generated/graphql"
import { AppScreensParamsList, HomeParamList } from "../../navigators"
import { spacing } from "../../theme"
import { apiSdk } from "../../utils/api"
import { useDebounce } from "../../utils/hooks"
import { useStyles } from "../../utils/styles"

// type ISuggestion = {
//   name: string
//   id: string
//   image: string
//   type: "product" | "category" | "manufacturer"

// }

type ISuggetionTypes = "product" | "category" | "manufacturer"

type IProductSuggestion = Pick<Product, "id" | "prodName" | "images" | "prodCategory">

type ICategorySuggestion = Pick<Product, "id" | "prodCategory" | "prodCategoryRef">

type IManufacturerSuggestion = Pick<Product, "id" | "manufacturer" | "brandLine">

type ISuggestion<T extends ISuggetionTypes> = T extends "product"
  ? IProductSuggestion
  : T extends "category"
  ? ICategorySuggestion
  : IManufacturerSuggestion

type Props = CompositeScreenProps<
  StackScreenProps<AppScreensParamsList, "search">,
  StackScreenProps<HomeParamList, "productsList">
>
export const SearchScreen: React.FC<Props> = (props) => {
  const { navigation } = props
  const [searchValue, setSearchValue] = useState<string>("")

  const deboucedValue = useDebounce(searchValue, 500)

  // const [suggestions, setSuggestions] = React.useState<Suggestion<"product">[]>([])

  const { data, isLoading, isError } = useSearchProductsQuery(apiSdk, {
    limit: 10,
    filter: {
      or: [
        {
          prodFullName: {
            matchPhrase: deboucedValue,
          },
        },
        {
          prodCategory: {
            matchPhrase: deboucedValue,
          },
        },
        {
          brandLine: {
            matchPhrase: deboucedValue,
          },
        },
      ],
    },
  })
  const keywordSearch = () => {
    console.log("Search Value ", searchValue);
    navigation.navigate("category", {
      category: {
        searchKeyword: searchValue,
      },
    })
  }

  const renderSuggestionListItem = React.useCallback(
    ({ item, index }: { item: IProductSuggestion; index: number }) => {
      // if (item.type === "product") {
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("productInfo", {
              product: {
                id: item.id,
              },
            })
          }}
        >
          <ProductSearchListItem {...item} />
        </TouchableOpacity>
      )
      // }
    },
    [],
  )

  const styles = useStyles({
    create: (theme) => ({
      emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      emptyText: {
        marginTop: 42,
        fontSize: 18,
        fontWeight: "600",
        color: theme.colors.primary,
      },
      searchInput: {
        borderRadius: 16,
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderColor: theme.colors.primary,
        borderWidth: 1,
        marginTop: 42,
        fontSize: 18,
        fontWeight: "800",
      },
      container: {
        paddingHorizontal: spacing[3],
      },
    }),
  })
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0)
  // const {} = useQuery("searchProducts")
  return (
    <Screen style={[styles.container]}>
      <Searchbar
        placeholder="Search products/brands"
        style={styles.searchInput}
        placeholderTextColor="gray.400"
        value={searchValue}
        onChangeText={setSearchValue}
        returnKeyType="search"
        returnKeyLabel="Search"
        onSubmitEditing={(keywordSearch)}
      />
      {/* <CategoriesMenu selectedCategoryIndex={null} onSelect={setSelectedCategoryIndex} /> */}

      <FlatList
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            {deboucedValue?.length > 0 && (
              <>
                {isError ? (
                  <Text style={styles.emptyText}>Error</Text>
                ) : isLoading ? (
                  <Spinner />
                ) : (
                  <Text style={styles.emptyText}>No results found</Text>
                )}
              </>
            )}
          </View>
        }
        data={data?.searchProducts?.items || []}
        renderItem={renderSuggestionListItem}
      />
    </Screen>
  )
}

// Objectives:
// 4. Address picker
// 1. filters
// 2. sort order
// 3. selected category (heading)
