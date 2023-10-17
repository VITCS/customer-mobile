import { NavigationProp, useNavigation } from "@react-navigation/core"
import { useTheme } from "@react-navigation/native"
import { Stack, View, VStack } from "native-base"
import React, { memo, useCallback, useMemo, useState } from "react"
import { ActivityIndicator, TouchableOpacity } from "react-native"
import { Button, spacing } from "ui"

import { CategoriesMenu, ProductListItemCard, STATIC_CATEGORIES, Text } from "../"
import {
  Product,
  SearchableProductFilterInput,
  useGetRecommendationsQuery,
} from "../../graphql/generated/graphql"
import { HomeParamList } from "../../navigators"
import { apiSdk } from "../../utils/api"
import { useStyles } from "../../utils/styles"

export interface LandingRecommendationsProps {
  products?: Pick<Product, "id">[]
  onItemPress?: (productId: string) => void
  horizontal?: boolean
}

const LOCALE = {
  title: "All products",
  seeAll: "See all",
}

const navigationItems = [
  {
    navItem: "Beer",
    navLinks: [
      {
        title: "Beer Varieties",
        links: [
          { name: "Alternative", url: "/category/Beer/Alternative" },
          { name: "Malt", url: "/category/Beer/Malt" },
          { name: "Flavored", url: "/category/Beer/Flavored" },
          { name: "Gluten Free", url: "/category/Beer/Gluten Free" },
          { name: "Cider", url: "/category/Beer/Cider" },
          { name: "Seltzer", url: "/category/Beer/Seltzer" },
          { name: "Imported", url: "/category/Beer/Imported" },
          { name: "Ale", url: "/category/Beer/Ale" },
          { name: "Low Alcohol", url: "/category/Beer/Low Alcohol" },
          { name: "Craft", url: "/category/Beer/Craft" },
          { name: "Non-Alcoholic", url: "/category/Beer/Non-Alcoholic" },
          { name: "Premium Beer", url: "/category/Beer/Premium Beer" },
          { name: "Light Beer", url: "/category/Beer/Light Beer" },
        ],
      },
    ],
  },
  {
    navItem: "Wine",
    navLinks: [
      {
        title: "Wine Varieties",
        links: [
          { name: "All Wine", url: "/" },
          { name: "Sparkling Wine", url: "/Sparkling" },
          { name: "Other Wine", url: "/Other Wine" },
          { name: "Non-Alcoholic Wine", url: "/Non-Alcoholic Wine" },
          { name: "Ready-to-Drink Wine", url: "/Ready-to-Drink Wine" },
          { name: "Coolers/Cocktails", url: "/Coolers" },
        ],
      },
    ],
  },
  {
    navItem: "Liquor",
    navLinks: [
      {
        title: "Liquor Varieties",
        links: [
          { name: "Whiskey", url: "/category/Liquor/Whiskey" },
          { name: "Brandy", url: "/category/Liquor/Brandy" },
          { name: "Vodka", url: "/category/Liquor/Vodka" },
          { name: "Gin", url: "/category/Liquor/Gin" },
          { name: "Rum", url: "/category/Liquor/Rum" },
          { name: "Tequila", url: "/category/Liquor/Tequila" },
          { name: "Cocktails", url: "/category/Liquor/Cocktails" },
          { name: "Non Alcoholic", url: "/category/Liquor/Non Alcoholic" },
          { name: "Asian Spirits", url: "/category/Liquor/Asian Spirits" },
          {
            name: "Distilled Spirits",
            url: "/category/Liquor/Distilled Spirits",
          },
          { name: "Mezcal", url: "/category/Liquor/Mezcal" },
          { name: "Moonshine", url: "/category/Liquor/Moonshine" },
          { name: "Flavoured", url: "/category/Liquor/Flavoured" },
          { name: "Grain", url: "/category/Liquor/Grain" },
          { name: "Liqueur", url: "/category/Liquor/Liqueur" },
          { name: "Armagnac", url: "/category/Liquor/Armagnac" },
          { name: "Cognac", url: "/category/Liquor/Cognac" },
          {
            name: "Molecular Spirit",
            url: "/category/Liquor/Molecular Spirit",
          },
          { name: "Raicilla", url: "/category/Liquor/Raicilla" },
          { name: "Sotol", url: "/category/Liquor/Sotol" },
          {
            name: "Sugar Cane Spirit",
            url: "/category/Liquor/Sugar Cane Spirit",
          },
          { name: "Vermouth", url: "/category/Liquor/Vermouth" },
          { name: "Gift Set", url: "/category/Liquor/Gift Set" },
          { name: "Mixers", url: "/category/Liquor/Mixers" },
        ],
      },
    ],
  },
]

export const LandingRecommendations = memo((props: LandingRecommendationsProps) => {
  const { products, onItemPress, horizontal } = props

  const navigation = useNavigation<NavigationProp<HomeParamList, "landing">>()
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0)
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>("")
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>("")

  const queryFilter = useMemo(() => {
    const selectedCategory = STATIC_CATEGORIES[selectedCategoryIndex]
    setSelectedCategoryName(selectedCategory?.name)
    setSelectedCategorySlug(selectedCategory?.slug)
    if (!selectedCategory?.name) {
      return undefined
    }
    const filter: SearchableProductFilterInput = {
      prodCategory: {
        eq: selectedCategory.name,
      },
    }

    // #TODO: bypass for testing

    return filter
  }, [selectedCategoryIndex, selectedCategoryName, selectedCategorySlug])
  const { data, isLoading, isError, error } = useGetRecommendationsQuery(apiSdk, {
    filter: queryFilter,
    limit: 4,
  })

  //console.log(" selectedCategory outside :: ", selectedCategoryName, selectedCategorySlug)

  const styles = useStyles({
    create: ({ colors }) => ({
      container: {
        minHeight: 500,
        // paddingHorizontal: 20,
        padding: 20,
        paddingTop: 8,
        // backgroundColor: "red",
      },
      header: {
        justifyContent: "space-between",
        alignItems: "center",
      },
      seeAllText: {
        fontSize: 15,
        color: colors.text,
        opacity: 0.6,
      },
      headerText: {},
      categoryContainer: {
        flexDirection: "row",
      },
      active: {},
    }),
  })
  const { colors } = useTheme()
  const onIndexSelected = useCallback((newIndex) => {
    setSelectedCategoryIndex(newIndex)
  }, [])

  const onViewMorePressed = useCallback(() => {
    //console.log(" selectedCategoryName ", selectedCategoryName)
    if (selectedCategoryName !== undefined) {
      navigation.navigate("category", {
        category: {
          name: selectedCategoryName,
          id: selectedCategorySlug,
        },
      })
    }
  }, [selectedCategoryName, selectedCategorySlug])

  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.header]}>
        <Text fontSize="2xl" style={styles.headerText} fontWeight="bold" my={2}>
          All Products
        </Text>

        <Button variant={"link"} onPress={onViewMorePressed} >
          <Text style={styles.seeAllText}  >See all</Text>
        </Button>
      </View>
      <CategoriesMenu onSelect={onIndexSelected} selectedCategoryIndex={selectedCategoryIndex} />

      <>
        {isLoading ? (
          <ActivityIndicator color={colors.primary} />
        ) : isError ? (
          <Text style={{ marginHorizontal: "auto" }}>Something went wrong</Text>
        ) : (
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Stack direction={"row"} flexWrap={"wrap"}>
              {data?.searchProducts?.items?.map((product) => {
                const { id } = product
                return (
                  <View p={1} key={id} w="1/2">
                    <TouchableOpacity
                      onPress={() => {
                        if (onItemPress) {
                          onItemPress(id)
                          return
                        }

                        navigation.navigate("productInfo", {
                          product: {
                            id: id,
                          },
                          siblings: [],
                        })
                      }}
                    >
                      {/* <Text>{"one"}</Text> */}
                      <ProductListItemCard {...product} />
                    </TouchableOpacity>
                  </View>
                )
              })}
            </Stack>
            {/* <Button
              style={{
                marginTop: spacing[3],
              }}
              variant={"outline"}
              onPress={onViewMorePressed}
            >
              View more
            </Button> */}
          </View>
        )}
      </>
    </View>
  )
})
