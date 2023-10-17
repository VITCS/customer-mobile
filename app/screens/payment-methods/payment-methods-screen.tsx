import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { CardField, useConfirmSetupIntent } from "@stripe/stripe-react-native"
import { HStack, Spinner, Text, useTheme, VStack } from "native-base"
import React, { useLayoutEffect } from "react"
import { FlatList } from "react-native"
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated"
import { Button } from "ui"
import { IPaymentMethod } from "../../../lib/types/stripe"
import { Screen } from "../../components"
import { usePaymentMethods } from "../../hooks/payment-methods"

const AddCard = ({ onCancel }: { onCancel: () => void }) => {
  const { confirmSetupIntent } = useConfirmSetupIntent()
  return (
    <Animated.View entering={FadeInDown.duration(500)} exiting={FadeOutUp.duration(500)}>
      <VStack mb={3}>
        <CardField
          postalCodeEnabled={true}
          cardStyle={{
            backgroundColor: "#FFFFFF",
            textColor: "#000000",
          }}
          style={{
            width: "100%",
            height: 50,
            marginVertical: 30,
          }}
          onCardChange={(card) => {
            console.log("card", card)
          }}
          // dangerouslyGetFullCardDetails={true}
        />
        <VStack space={4}>
          <Button
            variant={"outline"}
            onPress={() => {
              onCancel()
            }}
          >
            Cancel
          </Button>
          <Button
            onPress={() => {
              confirmSetupIntent("some", {})
            }}
          >
            Add card
          </Button>
        </VStack>
      </VStack>
    </Animated.View>
  )
}

export const PaymentMethodsScreen = () => {
  const { data, isLoading, defaultPaymentMethodId } = usePaymentMethods()
  const { colors } = useTheme()

  const navigation = useNavigation()
  const [isAddCardOpen, setIsAddCardOpen] = React.useState(false)
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          name="ios-add"
          size={30}
          onPress={() => {
            setIsAddCardOpen(true)
          }}
          color={colors.primary[500]}
          style={{ marginRight: 20 }}
        />
      ),
    })
  }, [navigation])
  return (
    <Screen unsafe>
      <FlatList
        ListEmptyComponent={() => (
          <>{isLoading ? <Spinner mt={8} size={"lg"} /> : <Text>No cards</Text>}</>
        )}
        contentContainerStyle={{
          padding: 16,
        }}
        data={data as IPaymentMethod[]}
        ItemSeparatorComponent={() => <VStack mt={3} />}
        ListHeaderComponent={() =>
          isAddCardOpen && <AddCard onCancel={() => setIsAddCardOpen(false)} />
        }
        keyExtractor={(item) => item.id?.toString()}
        renderItem={({ item }) => {
          const { card, billing_details, id } = item
          return (
            <VStack
              space={4}
              p={4}
              bg="white"
              rounded="lg"
              borderColor={"gray.600"}
              borderWidth={1}
              borderStyle="solid"
            >
              <HStack w="full" justifyContent={"space-between"}>
                <HStack alignItems={"center"}>
                  <Text fontSize={"xl"} fontWeight="semibold">
                    {card.brand}
                  </Text>
                  {defaultPaymentMethodId === id && (
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      style={{
                        marginLeft: 10,
                      }}
                      accessibilityLabel="Default"
                      color={colors.green[700]}
                    />
                  )}
                </HStack>
                <Text fontWeight={"medium"}>
                  {card.exp_month}/{card.exp_year}
                </Text>
              </HStack>
              <HStack w="full" alignItems={"flex-end"} justifyContent={"space-between"}>
                <Text fontWeight={"normal"}>xxxx-{card.last4}</Text>
                <HStack space={2}>
                  <Button>Make default</Button>
                  <Button variant={"outline"}>
                    <Ionicons name="trash-bin-outline" color={colors.primary[500]} size={20} />
                  </Button>
                </HStack>
              </HStack>
            </VStack>
          )
        }}
      />
    </Screen>
  )
}
