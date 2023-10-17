import { Ionicons } from "@expo/vector-icons"
import faker from "faker"
import { Badge, HStack, Image, useToken, View, VStack } from "native-base"
import * as React from "react"
import { ImageStyle, useColorScheme } from "react-native"
import { Text } from "../"
import { IMAGE_PLACEHOLDER_URL } from "../../config/constants"
import { Product } from "../../graphql/generated/graphql"
import { useStyles } from "../../utils/styles"
// import { IProduct } from "../../stores/products"f

export type IProductInCard = Pick<Product, "prodFullName" | "images" | "prodCategory">
export type ProductListItemCardProps = IProductInCard

const price = faker.commerce.price()

const IMAGE_HEIGHT = 140

export const ProductListItemCard = (props: ProductListItemCardProps) => {
  const { prodFullName, images, prodCategory } = props
  const [golderStar] = useToken("colors", ["amber.500"])
  const image = images?.length > 0 ? images[0] : IMAGE_PLACEHOLDER_URL

  const colorScheme = useColorScheme()
  const styles = useStyles({
    create: ({ colors }) => ({
      image: {
        backgroundColor: colors.background,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
      },
      container: {
        borderColor: colors.border,
        borderRadius: 8,
        borderWidth: colorScheme === "dark" ? 2 : 1,
        height: 280,
      },
      textRed: {
        color:colors.primary,
      },
      Badge: {
        color:colors.background,
      },
      badge: {
        backgroundColor: colors.primary,
      }
    }),
  })
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: image }}
        alt={prodFullName || ""}
        height={IMAGE_HEIGHT}
        style={[styles.image as ImageStyle]}
        resizeMode="cover"
      />
      <View p={2} alignItems="center" justifyContent="center" flexDirection='column'>
        <Text
          isTruncated
          maxW="100%"
          numberOfLines={2}
          textAlign="center"
        justifyContent= "center" 
        >
          {prodFullName}
        </Text>
        <HStack space={1} mt={1}>
          {[...Array(5)].map((_, index) => (
            <Ionicons name="star" key={index} color={golderStar} size={15} />
          ))}
          <Text fontSize="sm">{"5.0"}</Text>
        </HStack>
        <HStack space={1} mt={2}>
          <Badge
            mr={"auto"}
            style={styles.badge}
            borderRadius={10}
          >
          <Text style={styles.Badge}>{prodCategory}</Text>  
          </Badge>
        </HStack>
        <HStack mt="auto" space={1} mt={1}>
          <Text fontWeight="medium" style={styles.textRed}>
            Starts from
          </Text>
          <Text fontWeight="medium">
            ${price}
          </Text>
        </HStack>
      </View>
    </View>
  )
}
