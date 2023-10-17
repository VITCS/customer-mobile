import { AntDesign, Ionicons } from "@expo/vector-icons"
import { HStack, IconButton, Image, VStack } from "native-base"
import * as React from "react"
import { Text } from "../"

export interface CartProductListItemProps {
  product: {
    id: string
    name: string
    price: number
    image: string
    quantity: number
  }
}

/**
 * Describe your component here
 */
export const CartProductListItem = (props: CartProductListItemProps) => {
  const { product } = props
  const { id, image, name, price, quantity } = product
  return (
    <HStack key={id} h="20" space={6} alignItems={"flex-start"}>
      <Image source={{ uri: image }} w={20} h={20} rounded={"lg"} alt={name} bg="gray.600" />

      <VStack flex={1} h="full" justifyContent={"space-between"}>
        <Text fontSize={"lg"} fontWeight={"normal"}>
          {name}
        </Text>
        <HStack w="full" justifyContent={"space-between"} alignItems={"center"}>
          <Text fontSize={"lg"} fontWeight={"bold"} maxW={"1/2"}>
            ${price * quantity}
          </Text>
          <HStack alignItems={"center"} w="2/5">
            <IconButton
              // w="10"
              p={3}
              colorScheme="primary"
              rounded={"full"}
              color="white"
              variant={"outline"}
              icon={<AntDesign name="minus" color="#000" />}
            />
            <Text mx={2} fontSize={"md"} fontWeight={"bold"}>
              {quantity}
            </Text>
            <IconButton
              colorScheme="primary"
              rounded={"full"}
              color="white"
              variant={"outline"}
              icon={<Ionicons name="add" color={"#fff"} />}
            />
          </HStack>
        </HStack>
      </VStack>
    </HStack>
  )
}
