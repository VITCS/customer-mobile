import { View } from "native-base"
import * as React from "react"
import { Product } from "../../graphql/generated/graphql"

export type AvailabilitySearchProps = {
  products: Pick<Product, "id">[]
}

/**
 * Describe your component here
 */
export const AvailabilitySearch = (props: AvailabilitySearchProps) => {
  const { products } = props

  const [productInFocus, setProductInFocus] = React.useState<Pick<Product, "id"> | null>(null)
  return <View></View>
}
