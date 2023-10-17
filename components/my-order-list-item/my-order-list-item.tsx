import { Box, Button, HStack, View } from "native-base"
import * as React from "react"
import { Text } from "../"
import { DeliveryAddress, Maybe, Order, OrderLineItem, OrderShipment, OrderStatus } from "../../graphql/generated/graphql"
import { commaify, formatname, formatPrice } from "../../utils/format"
import { useStyles } from "../../utils/styles"
import {
  Accordion
} from "../../components"
import { MyOrderShipmentDetails, MyOrderShipmentDetailsProps } from "../my-order-shipment-details/my-order-shipment-details"

export type MyOrderListItemProps = {
  order: Pick<
    Order,
    | "id"
    | "totalAmount"
    | "createdAt"
    | "orderStatus"
  > & {
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
  // orderLineItems: Array<
  //   Pick<
  //     OrderLineItem,
  //     "id" | "productId" | "productName" | "totalPrice" | "unitPrice" | "qtyPurchased"
  //   >
  // >
}

/**
 * Describe your component here
 */
export const MyOrderListItem = (props: MyOrderListItemProps) => {
  const styles = useStyles({
    create: ({ colors }) => ({
      grid: {
        borderColor: '#ACABAB',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: colors.card
      },
      gridHead: {
        backgroundColor: '#FFF0EF',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      },
    }),
  })
  const { order } = props
  if (!order) {
    return null
  }
  console.log(" Order details 123", order)
  const { id, createdAt, orderShipment, orderStatus } = order
  let totalAmount = 0;
  console.log(" Order details ", orderShipment);
  orderShipment?.items?.forEach((eachOrderShipment) => {
    totalAmount += eachOrderShipment.subTotalAmount;
  });
  const orderShipmentList = React.useMemo(() => {
    return orderShipment?.items?.map((r) => {
      return {
        title: r.assignedStoreName,
        id: r.id,
        ...r,
      }
    })
  }, [orderShipment])
  const [sections, setSections] = React.useState([])
  const renderContent = React.useCallback(
    (contact: MyOrderShipmentDetailsProps["orderShipment"], index: number, isOpen: boolean) => {
      console.log("contact details", contact);
      return <MyOrderShipmentDetails {...{ orderShipment, orderId: id, orderStatus }} />
    },
    [],
  )
  const orderCreatedAt = new Date(createdAt);
  const orderCreatedAtStr = `${[
    ('0' + (orderCreatedAt.getMonth() + 1)).slice(-2),
    ('0' + orderCreatedAt.getDate()).slice(-2),
    orderCreatedAt.getFullYear(),
  ].join('/')} ${[
    ('0' + orderCreatedAt.getHours()).slice(-2),
    ('0' + orderCreatedAt.getMinutes()).slice(-2),
    orderCreatedAt.getSeconds(),
  ].join(':')}`;

  return (
    <View shadow={4} my={1} mx={2} style={[styles.grid]}>
      <View style={[styles.gridHead]} p={3} >
        <HStack justifyContent={"space-between"} >
          <Text fontSize={"lg"} underline width="50%" fontWeight="bold">
            <Text style={styles.primaryText}>Order: </Text> #{id}
          </Text>
          <Text>  <Text style={styles.primaryText}>Total Amount:</Text> {formatPrice(totalAmount)}</Text>
        </HStack>
        <HStack justifyContent={"space-between"} mt={2}>
          <Text fontSize={"lg"} underline width="50%" fontWeight="bold">
            <Text style={styles.primaryText}>Order Placed: </Text> {orderCreatedAtStr}
          </Text>
          {orderStatus === OrderStatus.Fulfilled ? <Button variant='solid' size="sm">Download</Button> : null}
        </HStack>
      </View>
      <View px={2} mb={5}>
        {orderShipment?.items?.length > 0 ?
          <Accordion
            sections={orderShipmentList}
            activeSections={sections}
            onChange={setSections}
            renderAsFlatList
            renderContent={renderContent}
          />
          : <Box>No Order Shipment exist.</Box>}

      </View>
    </View >
  )
}
{/* <View w="30%" pr={6} justifyContent={"center"}>
          <ProgressSteps topOffset={0} marginBottom={0}>
            {[0, 1, 2].map((o, key) => {
              return (
                  removeBtnRow
                  viewProps={{
                    style: {
                      display: "none",
                    } as ViewStyle,
                  }}
                  key={key}
                  label=""
                  nextBtnStyle={{ width: 0, height: 0 }}
                >
                  {null}
                </ProgressStep>
              )
            })}
          </ProgressSteps>
        </View> */}
{/* <Ionicons name="chevron-forward" size={32} /> */ }