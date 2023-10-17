import React, { memo } from "react"
import { FlatList, View } from "react-native"
import { Button } from "ui"

export interface CategoriesMenuProps {
  onSelect: (categoryIndex: number) => void
  selectedCategoryIndex: number
}

export type ICategory = {
  name: string
  slug: string
  children?: ICategory[]
}

export const STATIC_CATEGORIES: ICategory[] = [
  {
    name: "Beer",
    slug: "Beer",
    children: [
      {
        name: "Beer Varieties",
        slug: "beer-varieties",
        children: [
          {
            name: "Red",
            slug: "red",
            children: [
              { name: "Premium", slug: "/category/Beer" },
              { name: "Flavored Malt", slug: "#" },
            ],
          },
          {
            name: "White",
            slug: "white",
            children: [
              { name: "Microbrews/Craft", slug: "#" },
              { name: "Imports", slug: "#" },
            ],
          },
          {
            name: "Sparking",
            slug: "sparking",
            children: [
              { name: "Premium Plus/Super Premium", slug: "#" },
              { name: "Alcoholic Cider", slug: "#" },
            ],
          },
        ],
      },
      {
        name: "Trending",
        slug: "trending",
        children: [
          { name: "Budget/Value", slug: "#" },
          { name: "Non-Alcoholic", slug: "#" },
        ],
      },
      {
        name: "More Stuff",
        slug: "more-stuff",
        children: [
          { name: "Malt Liquor (Unflavored)", slug: "#" },
          { name: "Other Beer", slug: "#" },
          { name: "Alcoholic Seltzer", slug: "#" },
          { name: "Coolers/Wine Cocktailsr", slug: "#" },
          { name: "Hard Cider", slug: "#" },
        ],
      },
    ],
  },
  {
    name: "Wine",
    slug: "Wine",
    children: [
      {
        name: "Wine Varieties",
        slug: "wine-varieties",
        children: [
          { name: "Sparkling Wine", slug: "/category/Wine" },
          { name: "Wine", slug: "#" },
          { name: "Other Wine", slug: "#" },
          { name: "Non-Alcoholic Wine", slug: "#" },
          { name: "Ready-to-Drink Wine", slug: "#" },
          { name: "Coolers/Cocktails", slug: "#" },
        ],
      },
    ],
  },
  {
    name: "Liquor",
    slug: "Liquor",
    children: [
      {
        name: "Liquor Varieties",
        slug: "liquor-varieties",
        children: [
          { name: "Distilled Spirits", slug: "/category/Liquor" },
          { name: "Liqueurs & Cordials", slug: "#" },
          { name: "Cocktail Mixes", slug: "#" },
          { name: "Ready-to-Drink Cocktails", slug: "#" },
          { name: "Other Liquor", slug: "#" },
          { name: "Prepared Cocktails", slug: "#" },
        ],
      },
    ],
  },
]

export const CategoriesMenu = memo((props: CategoriesMenuProps) => {
  // const [button] = useToken("colors", ["primary.400", "white", "white"])
  const { selectedCategoryIndex, onSelect } = props

  return (
    <FlatList
      horizontal
      contentContainerStyle={{
        paddingVertical: 16,
        // backgroundColor: "red",
      }}
      ItemSeparatorComponent={() => (
        <View
          style={{
            width: 6,
          }}
        />
      )}
      data={
        [
          ...STATIC_CATEGORIES,
          {
            name: "More deals",
            slug: "/deals",
          },
        ] as typeof STATIC_CATEGORIES
      }
      renderItem={({ item, index }) => {
        const isSelected = selectedCategoryIndex === index
        const { name } = item
        return (
          <Button
            onPress={() => {
              onSelect(index)
            }}
            maxH={10}
            _text={{
              // fontSize: "md",
              fontWeight: "semibold",
            }}
            rounded="3xl"
            minW={20}
            variant={isSelected ? "solid" : "outline"}
          >
            {name}
          </Button>
        )
      }}
    />
  )
})
