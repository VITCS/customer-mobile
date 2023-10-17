import { Box, Divider, HStack, ScrollView, useToast, View } from "native-base"
import * as React from "react"
import { Image, Alert } from "react-native"
import { Maybe, OrderLineItem, OrderShipment, OrderStatus, ShipmentStatus, useListOrdersByUserIdQuery, useUpdateOrderShipmentMutation } from "../../graphql/generated/graphql"
import { Button, DeliveryAddressCard, DeliveryOccasionCard, Text } from "../"
import { useStyles } from "ui"
import { apiSdk, getUserId } from "../../utils/api"
import { useQueryClient } from "react-query"
export type MyOrderShipmentDetailsProps = {
  orderId: string
  orderStatus: string
  orderShipment?: Maybe<Pick<OrderShipment, | "id"
    | "shipmentStatus"
    | "assignedStoreName"
    | "deliveryAddress"
    | "deliveryType"
    | "orderLineItems"
    | "rejectionMsg"
    | "isUpdated"
    | "subTotalAmount"
    | "subTotalProductAmount"
    | "subTotalDiscount"
    | "subTotalDeliveryCharges"
    | "subTotalTax"
    | "subTotalTipAmount">[]>
  & {
    orderLineItems?: Maybe<Pick<OrderLineItem, | "id"
      | "prodShortDesc"
      | "productId"
      | "productName"
      | "qtyPurchased"
      | "size"
      | "totalPrice"
      | "unitPrice"
      | "uom"
    >[]>
  }
}
export const MyOrderShipmentDetails = (props: MyOrderShipmentDetailsProps) => {
  const { orderShipment, orderId, orderStatus } = props;
  console.log("order shipment details", orderShipment);

  const queryClient = useQueryClient()
  const toast = useToast()
  const { mutate: updateShipment } = useUpdateOrderShipmentMutation(apiSdk, {
    onSuccess: (data) => {
      queryClient.refetchQueries(useListOrdersByUserIdQuery.getKey({
        userId: getUserId(),
        limit: 5,
        filter: {
          orderStatus: {
            eq: OrderStatus.Created,
          },
        },
      }))
      toast.show({
        title: "Success",
        description: "Order shipment Cancelled"
      })
    },
    onError: (error) => {
      console.log("error in deleting address >>", error)

      toast.show({
        title: "Error",
        description: "Seomthing went wrong."
      })
    },
  })


  const styles = useStyles({
    create: ({ colors }) => ({
      grid: {
        borderColor: '#ACABAB',
        borderWidth: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomWidth: 0
      },
      gridHead: {
        backgroundColor: '#FFF0EF',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        p: 4
      },
      statusRejectAlert: {
        borderRadius: 50,
        color: '#fff',
        padding: 4,
        backgroundColor: 'red'
      },
      statusUpdateAlert: {
        borderRadius: 50,
        color: '#fff',
        padding: 4,
        backgroundColor: 'green'
      },
      IconImage: {
        width: 48,
        height: 48,
        borderRadius: 24,
      }
    }),
  })

  return (
    <ScrollView borderWidth={1} borderColor='#ACABAB' >
      {orderShipment?.items?.map((shipmentItem) => {
        return (
          <Box >
            <View p={2}>
              <HStack w="100%" mt={2} justifyContent="space-between" alignItems="center">
                <Text fontSize="md" flex={1} fontWeight="semibold">
                  Status:{shipmentItem?.shipmentStatus}
                  {/* {shipmentItem?.shipmentStatus} */}
                </Text>
                {/* <Text fontSize="md" flex={1} fontWeight="medium" noOfLines={1}>
                  View
                </Text> */}
                <Text>
                  {shipmentItem.shipmentStatus === 'Rejected' ? (
                    <Box style={[styles.statusRejectAlert]}>
                      <Text style={{ color: '#fff' }}>Rejected</Text>
                    </Box>
                  ) : null}
                  {shipmentItem.shipmentStatus === 'Updated' ? (
                    <Box style={[styles.statusUpdateAlert]}>
                      <Text style={{ color: '#fff' }}>Updated</Text>
                    </Box>
                  ) : null}
                </Text>
              </HStack>
              <HStack w="100%" mt={1} justifyContent="space-between" alignItems="center">
                <Text fontSize="sm" flex={1} fontWeight="semibold">
                  Product Subtotal: $
                  {shipmentItem.subTotalProductAmount}
                </Text>
                <Divider orientation="vertical" borderTopWidth={1} my='3' borderColor="grey" height="6" />

                <Text fontSize="sm" flex={1} fontWeight="medium" noOfLines={1}>
                  Discount: ${shipmentItem.subTotalDiscount}
                </Text>
                <Divider orientation="vertical" borderTopWidth={1} my='3' borderColor="grey" height="6" />


              </HStack>
              <HStack w="100%" justifyContent="space-between" alignItems="center">
                <Text fontSize="sm" flex={1} fontWeight="medium" noOfLines={1}>
                  Delivery Charges: ${shipmentItem.subTotalDeliveryCharges}
                </Text>
                {/* <Text fontSize="sm" flex={1} fontWeight="semibold">
                  Tax & Fees:
                </Text> */}
              </HStack>
              <Divider orientation="horizontal" borderTopWidth={1} my='3' borderColor="grey" height="1" />
              <HStack w="100%" justifyContent="space-between" alignItems="center">
                {/* {shipmentItem.deliveryType === 'Pickup' ? (
                  <Image
                    source={require('../../assets/icons/pickup.svg')}
                  />
                ) : null}
                {shipmentItem.deliveryType === 'Home Delivery' ? (
                  <Image
                    source={require('../../assets/icons/delivery.svg')}
                  />
                ) : null} */}
                <Text fontSize="md" flex={1} fontWeight="semibold"  >
                  {shipmentItem.deliveryType}
                </Text>
                {shipmentItem.shipmentStatus !== ShipmentStatus.Rejected &&
                  orderStatus !== OrderStatus.Fulfilled &&
                  shipmentItem.shipmentStatus !== ShipmentStatus.Cancelled && (
                    <Button variant='outline' size="xs"
                      onPress={() => {
                        Alert.alert("Cancel order", "Are you sure to Cancel Order?", [
                          {
                            text: "Ok",
                            style: "destructive",
                            onPress: async () => {
                              updateShipment({
                                input: {
                                  id: shipmentItem.id,
                                  orderId: orderId,
                                  shipmentStatus: ShipmentStatus.Cancelled
                                },
                              })
                            },
                          },
                          {
                            text: "cancel",
                            style: "cancel",
                          },
                        ])
                      }}
                    >Cancel Order</Button>
                  )}

                <Button variant='solid' size="xs">Track Order</Button>
              </HStack>
            </View>
            <View style={[styles.grid]} mt={2} m={1}>
              <Box style={[styles.gridHead]} h={8} p={2}>
                <HStack w="100%" justifyContent="space-between" alignItems="center">
                  <Text fontSize="md" flex={1} fontWeight="semibold">
                    Item Description
                  </Text>
                  <Text fontSize="md" flex={1} fontWeight="semibold">
                    Total Price
                  </Text>
                </HStack>
              </Box>
              <Box borderWidth={1} borderColor='#ACABAB' p={3}>
                {shipmentItem?.orderLineItems?.map((lineItem) => {
                  console.log("lineItem details123", lineItem);
                  return (
                    <Box>
                      <HStack w="100%" justifyContent="space-between" alignItems="flex-start">
                        <Text fontSize="md" flex={1} fontWeight="semibold" style={styles.primaryText}>
                          {lineItem.productName}
                        </Text>
                        <Text fontSize="md" flex={1} fontWeight="semibold" style={styles.primaryText}>
                          ${lineItem.totalPrice}
                        </Text>
                      </HStack> <View flexWrap="wrap">
                        <Text fontSize="sm" flex={1} fontWeight="semibold">
                          Qty: {lineItem.qtyPurchased}
                        </Text>
                        <Text fontSize="sm" flex={1} fontWeight="semibold">
                          Price: {lineItem.unitPrice}
                        </Text>
                        <Text fontSize="sm" flex={1} fontWeight="semibold">
                          Item Total: ${lineItem.unitPrice * lineItem.qtyPurchased}
                        </Text>
                      </View>
                    </Box>
                  )
                })}
              </Box>
            </View>
          </Box>
        )

      })}

    </ScrollView >
  )
}
