import {
  BillingDetails,
  CardField,
  StripeProvider,
  useConfirmPayment,
  useConfirmSetupIntent,
} from "@stripe/stripe-react-native"
import { HStack, View, VStack, Text, useTheme, Spinner, Checkbox } from "native-base"
import { Ionicons } from "@expo/vector-icons"
import * as React from "react"
import { ActivityIndicator, FlatList, TouchableOpacity, ViewStyle } from "react-native"
import { Button } from "ui"
import env from "../config/env"
import { usePaymentMethods } from "../hooks/payment-methods"
import { IComputedShipment, PaymentMethodsScreen } from "../screens"
import { usePaymentIntentSecret } from "../stores/stripe"
import { spacing } from "../theme"
import { OrderConfirmationShipment } from "./order-confirmation-shipment/order-confirmation-shipment"
import { IPaymentMethod } from "../../lib/types/stripe"
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated"
import { getUserId } from "../utils/api"

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

export type PaymentSuccessPayload = {
  paymentIntentId: string
  paymentIntentRes: string
  scheduledDeliveryDt: string
  scheduledTimeSlot: string
}

export interface ShipmentPaymentFormProps {
  shipment: IComputedShipment
  onPaymentconfirmed: (payload: PaymentSuccessPayload) => any
}

const ROOT: ViewStyle = {
  paddingHorizontal: spacing[3],
  paddingVertical: spacing[2],
}
/**
 * Describe your component here
 */
export const ShipmentPaymentForm = (props: ShipmentPaymentFormProps) => {
  const { shipment, onPaymentconfirmed } = props
  const { data, isLoading, defaultPaymentMethodId } = usePaymentMethods()
  const { colors } = useTheme()
  const [isAddCardOpen, setIsAddCardOpen] = React.useState(false)

  if (!shipment) {
    return null
  }
  //console.log(" shipment  :: ", shipment)
  const { assignedStoreName, subTotalProductAmount, total } = shipment
  const userId = getUserId()
  const { data: res, isLoading: intentLoading } = usePaymentIntentSecret(total, userId)
  console.log("payment intent response is ", res)

  const { confirmPayment, loading } = useConfirmPayment()
  const billingDetails: BillingDetails = {
    email: "jenny.rosen@example.com",
  }
  const onPayPressed = React.useCallback(async () => {
    const resp = await confirmPayment(res.clientSecret, {
      paymentMethodType: "Card",
      setup_future_usage: "",
    })

    console.log("confirming payment ", resp)
    onPaymentconfirmed({
      paymentIntentId: res.id,
      paymentIntentRes: JSON.stringify(resp),
      scheduledDeliveryDt: "",
      scheduledTimeSlot: "",
    })
  }, [confirmPayment, res])
  return (
    <StripeProvider publishableKey={env.stripe_publishable_key}>
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
            <TouchableOpacity
              onLongPress={() => {
                //setMultiSelectEnabled(true)
              }}
              activeOpacity={0.6}
              onPress={() => {
                // console.log("clicked", storeName)
                // if (multiSelectEnabled) {
                //   return
                // }
              }}
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
                  {defaultPaymentMethodId === id ? (
                    <Button>Default</Button>
                  ) : (
                    <Button>Make default</Button>
                  )}
                  <Button variant={"outline"}>
                    <Ionicons name="trash-bin-outline" color={colors.primary[500]} size={20} />
                  </Button>
                </HStack>
              </HStack>
            </TouchableOpacity>
          )
        }}
      />
      {/* <View> */}
      {/* <Heading mb={3}>{assignedStoreName}</Heading> */}
      {/* <OrderConfirmationShipment shipment={shipment} /> */}
      {intentLoading ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <View>
          <CardField
            postalCodeEnabled
            onCardChange={(card) => {
              console.log("card complete ", card.complete, card)
            }}
            placeholders={{
              number: "4242 4242 4242 4242",
            }}
            cardStyle={{
              backgroundColor: "#FFFFFF",
              textColor: "#000000",
            }}
            style={{
              width: "100%",
              height: 50,
              marginVertical: 30,
            }}
            onCardChange={(cardDetails) => {
              console.log("cardDetails", cardDetails)
            }}
            onFocus={(focusedField) => {
              console.log("focusField", focusedField)
            }}
          />
          <Checkbox isChecked value={""}>
            Save card for future payments
          </Checkbox>

          <Button isLoading={loading} onPress={onPayPressed}>
            PAY
          </Button>
        </View>
      )}
      {/* </View> */}
    </StripeProvider>
  )
}
