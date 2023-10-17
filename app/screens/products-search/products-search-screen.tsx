import { StackScreenProps } from "@react-navigation/stack"
import { View } from "native-base"
import React, { useMemo } from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { ProductsList } from "../../components"
import {
  SearchProductsQueryVariables,
  useSearchProductsQuery,
} from "../../graphql/generated/graphql"
import { HomeParamList } from "../../navigators"
import { apiSdk } from "../../utils/api"

type Props = StackScreenProps<HomeParamList, "productsList">

export type StateFilter = {
  categoryIds: string[]
  brandLines: string[]
  manufacturers: string[]
}

export const ProductsSearchScreen: React.FC<Props> = (props) => {
  const { route } = props
  const { bottom } = useSafeAreaInsets()
  const { params } = route
  const categoryId = React.useMemo(() => {
    return params?.selection?.category?.id
  }, [params?.selection?.category?.id])

  const [filter, setFilter] = React.useState<SearchProductsQueryVariables["filter"]>(null)

  React.useEffect(() => {
    setFilter({
      or: [
        {
          prodCategory: {
            eq: categoryId,
          },
        },
      ],
    })
  }, [categoryId])

  const { data, isLoading, isError } = useSearchProductsQuery(apiSdk, {
    filter: filter,
    limit: 10,
  })

  const products = useMemo(() => data?.searchProducts?.items, [data])
  return (
    <View pb={bottom * 2}>
      {/* <ProductsFilter {...{ filter }} /> */}
      <ProductsList {...{ products, isLoading }} />
    </View>
  )
}
