import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet"
import { CompositeNavigationProp, NavigationProp, useNavigation } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { useToast } from "native-base"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { ActivityIndicator, FlatList, View, ViewStyle } from "react-native"
import { useQueryClient } from "react-query"
import { spacing } from "ui"
import { OrderConfirmationShipment, Screen } from "../../components"
import { PaymentSuccessPayload, ShipmentPaymentForm } from "../../components/ShipmentPaymentForm"
import {
  ListShipmentsQuery,
  OrderStatus,
  ShipmentStatus,
  useCreateOrderMutation,
  useDeleteCartShipmentMutation,
  useListShipmentsQuery,
} from "../../graphql/generated/graphql"
import { AuthStackParamsList, CartParamsList, MainStackParamsList } from "../../navigators"
import { useLoggedInUser } from "../../stores/auth"
import { useCartId } from "../../stores/cart"
import { apiSdk } from "../../utils/api"

const defaultStatusHistory = {
  fromStatus: "fromStatus",
  toStatus: "toStatus",
  updatedBy: "updatedBy",
}

const ROOT: ViewStyle = {
  flex: 1,
  // marginBottom: 40,
  padding: spacing[3],
}

export type IComputedShipment = ListShipmentsQuery["getCart"]["cartShipment"]["items"][number] & {
  tax: string
  deliveryCharges: string
  subTotalDiscount: string
  subTotalProductAmount: string
  tip: string
  total: string
  // unitPrice: string
  // qtyPurchased: string
}

export const OrderConfirmationScreen = (
  props: StackScreenProps<CartParamsList, "orderConfirmation">,
) => {
  const { route } = props
  const { params: { filter } = { filter: [] } } = route

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const queryClient = useQueryClient()
  // variables
  const snapPoints = useMemo(() => [1, "60%"], [])
  const [paymentResponses, setPaymentResponses] = useState<Record<string, PaymentSuccessPayload>>(
    {},
  )

  const cartId = useCartId()

  const { isLoading, data } = useListShipmentsQuery(
    apiSdk,
    {
      cartId,
    },
    {
      enabled: cartId?.length > 0,
    },
  )

  const computedShipments: IComputedShipment[] = useMemo(() => {
    return data?.getCart?.cartShipment?.items?.map((eachCartShipment) => {
      // console.log(" cart shipment data ", data, " eachCartShipment : ", eachCartShipment)
      let subTotalProductAmount = 0
      let tip = 0
      eachCartShipment.lineItems.map((eachLineItem) => {
        subTotalProductAmount += eachLineItem.unitPrice * eachLineItem.qtyPurchased
        tip = Math.ceil((subTotalProductAmount * 15) / 100)
      })
      console.log(" eachCartShipment subTotalProductAmount :: ", eachCartShipment)
      const tax = 0
      const deliveryCharges = 4.49
      //const tip = 5
      return {
        ...eachCartShipment,
        tax: `0`,
        deliveryCharges: `4.49`,
        subTotalDiscount: `0`,
        subTotalProductAmount: subTotalProductAmount,

        // subTotalProductAmount: (
        //   eachCartShipment?.lineItems?.unitPrice * eachCartShipment.lineItems?.qtyPurchased
        // )?.toString(),
        //subTotalProductAmount: subTotalProductAmount?.toString(),
        tip: `${tip}`,
        total: (subTotalProductAmount + tip + deliveryCharges + tax)?.toString(),
      }
    })
  }, [data])

  const [selectedShipmentIndex, setSelectedShipmentIndex] = useState(-1)
  const navigation = useNavigation<
    CompositeNavigationProp<
      NavigationProp<AuthStackParamsList, "login">,
      NavigationProp<MainStackParamsList, "auth">
    >
  >()
  const onPayPressed = useCallback(
    (shipment, index) => () => {
      console.log("item to be payed ", shipment)
      bottomSheetModalRef?.current?.present()
      setSelectedShipmentIndex(index)
    },
    [],
  )

  const selectedShipment = useMemo(
    () => computedShipments && computedShipments[selectedShipmentIndex],
    [computedShipments, selectedShipmentIndex],
  )

  // const { mutate: createOrderMutation } = useCreateOrderMutation(apiSdk, {
  //   retry: false,
  // })
  const toast = useToast()
  const { mutate: createOrderMutation } = useCreateOrderMutation(apiSdk, {
    onSuccess: (data) => {
      console.log("delete res is ", data)
      //queryClient.refetchQueries(useGetDeliveryContactsQuery.getKey({ userId }))
      toast.show({
        title: "Success",
        description: "Order has been created",
      })
      //queryClient.refetchQueries(useDeleteCartShipmentMutation( cartId))
      navigation.navigate("myOrders")
    },
    onError: (error) => {
      console.log("error in deleting address >>", error)

      toast.show({
        title: "Error",
        description: "Seomthing went wrong.",
      })
    },
  })
  const onPaymentconfirmed = useCallback(
    (shipmentId) => (payload: PaymentSuccessPayload) => {
      setPaymentResponses((prev) => ({
        ...prev,
        [shipmentId]: payload,
      }))
    },
    [computedShipments],
  )

  const userId = useLoggedInUser()
  useEffect(() => {
    const isEveryPaymentDone = computedShipments?.every(
      (shipment) => !!paymentResponses[shipment.id],
    )

    console.log(" is every payment done ", isEveryPaymentDone)

    if (isEveryPaymentDone) {
      createOrderMutation({
        input: {
          cartId: cartId,
          channel: "direct",
          orderShipment: computedShipments.map((eachShipment) => {
            const {
              id,
              subTotalDiscount,
              subTotalProductAmount,
              assignedStoreId,
              assignedStoreName,
            } = eachShipment
            const paymentFields = paymentResponses[id]
            //console.log(" eachShipment.lineItems ", eachShipment.lineItems)
            //const tempLineItems = eachShipment.lineItems
            return {
              //...eachShipment,

              ...paymentFields,
              //deliveryAddress: eachShipment.deliveryAddress,
              assignedStoreId: assignedStoreId,
              assignedStoreName: assignedStoreName,
              updatedBy: userId,
              subTotalDiscount: +subTotalDiscount,
              subTotalProductAmount: +subTotalProductAmount,
              shipmentStatus: ShipmentStatus.Placed,
              statusHistory: defaultStatusHistory,
              orderLineItems: eachShipment.lineItems,
              deliveryAddress: eachShipment.deliveryAddress,
            }
          }),
          orderStatus: OrderStatus.Created,
          totalAmount: 0,
          totalDeliveryCharges: 0,
          totalDiscount: 0,
          totalProductAmount: 0,
          totalTaxAmount: 0,
          totalTipAmount: 0,
          transactionId: cartId,
          userId,
        },
      })
    }
  }, [paymentResponses, computedShipments])

  return (
    <Screen style={ROOT} preset="scroll" unsafe>
      <FlatList
        ListEmptyComponent={() => <>{isLoading ? <ActivityIndicator size={"large"} /> : ""}</>}
        data={computedShipments}
        keyExtractor={(i, index) => i.assignedStoreName}
        renderItem={({ item: shipment, index }) => {
          const paymentDone = !!paymentResponses[shipment?.id]
          return (
            <OrderConfirmationShipment
              onPayPressed={onPayPressed(shipment, index)}
              {...{ shipment, paymentDone }}
            />
          )
        }}
      />

      <BottomSheetModal
        backdropComponent={(r) => <BottomSheetBackdrop {...r} />}
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={(index) => index === 0 && setSelectedShipmentIndex(-1)}
      >
        <View style={ROOT}>
          {/* <OrderConfirmationShipment shipment={selectedShipment} /> */}
          <ShipmentPaymentForm
            shipment={selectedShipment}
            onPaymentconfirmed={onPaymentconfirmed(selectedShipment?.id)}
          />
        </View>
      </BottomSheetModal>
    </Screen>
  )
}
