import { HStack, Image, VStack } from "native-base"
import * as React from "react"
import { Text } from "../"
import { IMAGE_PLACEHOLDER_URL } from "../../config/constants"
import { Product } from "../../graphql/generated/graphql"

export type ProductSearchListItemProps = Pick<Product, "prodCategory" | "prodName" | "images">
/**
 * Describe your component here
 */
export const ProductSearchListItem = (props: ProductSearchListItemProps) => {
  const { images, prodCategory, prodName } = props

  return (
    <HStack mb={2} py={1} alignItems="center">
      <Image
        height="100%"
        width="20%"
        mr={2}
        resizeMode="cover"
        source={{ uri: images?.length > 0 ? images[0] : IMAGE_PLACEHOLDER_URL }}
      />
      <VStack>
        <Text isTruncated fontSize="lg" fontWeight="semibold">
          {prodName}
        </Text>
        <Text isTruncated fontSize="md" fontWeight="light">
          {prodCategory}
        </Text>
      </VStack>
    </HStack>
  )
}
