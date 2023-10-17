import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Badge, HStack, View } from "native-base"
import * as React from "react"
import { Button, Text } from "../"
import { StateFilter } from "../../screens"

export interface ProductsFilterProps {
  filter: StateFilter
}

export const ProductsFilter = (props: ProductsFilterProps) => {
  const { filter } = props
  const renderFilterButton = React.useCallback(
    (prefix) =>
      function renderFilterButton(text) {
        return (
          <Badge key={text} flexDir="row" alignItems="center" rounded="lg" colorScheme="primary">
            <Text color="white">
              {prefix}: {text}
            </Text>
            {/* <Ionicons color="white" name="close-circle-outline" size={16} /> */}
          </Badge>
        )
      },
    [],
  )
  return (
    <View px={4} py={2} borderBottomWidth={1} bg="bg" borderColor="pink.800">
      <Text fontSize="lg" fontWeight="bold">
        Filter
      </Text>
      <View flexDir="row" alignItems="center" justifyContent="space-between">
        <HStack space="md" flexWrap="wrap">
          {/* {
            
          }
          {filter.categoryIds.map(renderFilterButton("Category"))}
          {filter.brandLines.map(renderFilterButton("Brand"))}
          {filter.manufacturers.map(renderFilterButton("Manufacturer"))} */}
        </HStack>
        <Button bg="primary.400" rounded="full">
          <MaterialCommunityIcons color="#fff" size={20} name="filter-plus-outline" />
        </Button>
      </View>
    </View>
  )
}
