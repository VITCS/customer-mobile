import { Ionicons } from "@expo/vector-icons"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { Box, HStack, VStack } from "native-base"
import React from "react"
import { ViewStyle } from "react-native"
import { Button, Text } from "ui"
import { Screen } from "../../components"
import { CartParamsList } from "../../navigators"

const ROOT: ViewStyle = {
  flex: 1,
}

export const PostOrderInfoScreen = () => {
  // Pull in navigation via hook
  const navigation = useNavigation<NavigationProp<CartParamsList, "postOrder">>()
  return (
    <Screen style={ROOT} preset="scroll">
      <VStack
        space={3}
        rounded="lg"
        mx={2}
        borderWidth={1}
        borderColor="gray.600"
        alignItems={"flex-start"}
      >
        <Box bg="primary.100" py={4} px={2} w="full">
          <Text fontSize={"xl"} color="white" fontWeight={"bold"}>
            Order confirmation
          </Text>
        </Box>
        <Box mx={1}>
          <HStack alignItems={"center"}>
            <Ionicons name="checkmark-circle" color={"green"} size={32} />
            <Text color="gray.900" fontSize={"lg"} fontWeight="semibold">
              Order placed, thank you.
            </Text>
          </HStack>
          <Text fontSize={"md"} color="gray.700" mx={2}>
            Confirmation will be sent to your email.
          </Text>
        </Box>
        <Button
          variant={"link"}
          onPress={() => {
            navigation.navigate("app", {
              screen: "profile",
              params: {
                screen: "myOrders",
              },
            })
          }}
        >
          Review and edit your recent orders
        </Button>
      </VStack>
    </Screen>
  )
}
