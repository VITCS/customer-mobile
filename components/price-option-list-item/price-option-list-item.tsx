import { Entypo } from "@expo/vector-icons"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { Button, HStack, TextField, VStack } from "native-base"
import * as React from "react"
import { Text } from "../"
import { DeliveryAddress, PriceAndAvailability, Product } from "../../graphql/generated/graphql"
import { getCartInvalidFlag } from "../../hooks/cart"
import { MainStackParamsList } from "../../navigators"
import { useCartApi } from "../../stores/cart"

export type PriceOptionListItemProps = Pick<PriceAndAvailability, "storeId" | "price"> & {
  storeName: string
  product: Pick<Product, "id" | "prodFullName" | "prodShortDesc">
  removeExisingProductReferences?: boolean
  deliveryAddress: DeliveryAddress
}

/**
 * Describe your component here
 */

const initialCount = 1

export const PriceOptionListItem = React.memo((props: PriceOptionListItemProps) => {
  const {
    storeId,
    storeName,
    price,
    product,
    removeExisingProductReferences,
    deliveryAddress,
  } = props
  console.log(" props : ", props)
  const { id: productId, prodShortDesc, prodFullName } = product
  console.log(storeId, storeName, price, product, deliveryAddress)
  const navigation = useNavigation<NavigationProp<MainStackParamsList, "app">>()
  const [count, setCount] = React.useState(initialCount)
  const { cart, processProduct } = useCartApi()

  const updateCart = React.useCallback(
    (flexibleBuy?: boolean) => {
      // if (isCartInValid) {
      //   return Alert.alert("Invalid cart", "Please discard current cart before adding new item")
      // }
      processProduct({
        product: {
          id: productId,
          prodFullName,
          prodShortDesc,
        },
        removeExisingProductReferences,
        quantity: count,
        assignedStoreId: storeId,
        assignedStoreName: storeName,
        flexibleBuy,
        deliveryAddress: deliveryAddress,
        unitPrice: String(price),
      })
      // setCount(initialCount)
      // if (flexibleBuy) {
      //   navigation.navigate("cart")
      // }
    },
    [
      productId,
      prodFullName,
      prodShortDesc,
      storeId,
      price,
      storeName,
      count,
      removeExisingProductReferences,
      processProduct,
    ],
  )

  return (
    <VStack bg="white" px={4} py={3} space={"xs"} direction="column">
      <Text fontWeight="Bold" ml={3} style={{ fontSize: 18, marginBottom: 10 }}>
        {storeName}
      </Text>
      <HStack alignItems={"center"} justifyContent={"space-between"} w="full">
        <VStack>
          <Text fontSize={"xl"} fontWeight={"semibold"}>
            $ {price}
          </Text>
          <Text fontSize={"m"} fontWeight={"semibold"}>
            Delivery fee is applied
          </Text>
        </VStack>
        <HStack alignItems={"center"} justifyContent={"space-between"}>
          <Button
            variant={"solid"}
            rounded={"full"}
            onPress={() => {
              // onRemoveFromCart()
              setCount((c) => Math.max(c - 1, 1))
            }}
          >
            <Entypo
              name="minus"
              style={{
                fontSize: 20,
              }}
              color="white"
            />
          </Button>

          <TextField
            mt={4}
            mx={1}
            borderWidth={3}
            textAlign="center"
            textAlignVertical="center"
            // value={currentCartQuantity.toString()}
            value={count?.toString()}
            w="16"
            isDisabled
          />
          <Button
            variant={"solid"}
            rounded={"full"}
            onPress={() => {
              setCount((c) => c + 1)
            }}
          >
            <Entypo
              name="plus"
              style={{
                fontSize: 20,
              }}
              color="white"
            />
          </Button>
        </HStack>
      </HStack>

      <HStack ml="auto" space={6}>
        <Button
          variant={"outline"}
          onPress={() => {
            updateCart(true)
          }}
        >
          {getCartInvalidFlag() ? "Update Cart" : "Add to cart"}
        </Button>
        {removeExisingProductReferences ? null : (
          <Button
            onPress={() => {
              updateCart(true)
              navigation.navigate("cart")
            }}
          >
            Buy now
          </Button>
        )}
      </HStack>

      {/* <HStack>
      {new Array(5).fill(0).map((_, i) => (
        <Ionicons
          name={rating >= i ? "star" : "star-outline"}
          key={i}
          color={rating >= i ? "orange" : "orange"}
          size={20}
        />
      ))}
      <Text ml={4}>{reviewCount} Reviews</Text>
    </HStack>
    <Text> {deliveryFee}$ Delivery fee</Text> */}
      <Button
        onPress={() => {

          navigation.navigate("cart")
        }
        }
      >
        View Cart
      </Button>
    </VStack>
  )

})
