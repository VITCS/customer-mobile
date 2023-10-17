import FontAwesome from "@expo/vector-icons/build/FontAwesome"
import dayjs from "dayjs"
import { FormControl, HStack, Input, Select, Slider, useDisclose, VStack } from "native-base"
import * as React from "react"
import { Control, Controller } from "react-hook-form"
import { View } from "react-native"
import DatePicker from "react-native-date-picker"
import { Button, ObjectRenderer, spacing, Text, useStyles } from "ui"
import { DATE_FORMAT } from "../../config/constants"
import { commaify } from "../../utils/format"

export interface OrderConfirmationShipmentProps {
  shipment: {
    assignedStoreName?: string
    subTotalProductAmount?: string
    deliveryCharges?: string
    tax?: string
    total?: string
    tip?: string
    scheduledDeliveryDt?: string
    scheduledTimeSlot?: string
    deliveryAddress
  }
  onPayPressed?: () => any
  paymentDone?: boolean
  //control: Control<OrderConfirmationShipmentProps>
}
// enum ADDRESS_CATEGORIES {
//   ASAP
// }
export enum selectTime {
  Custom = "Custom",
  Home = "Home",
  Work = "Work",
}
/**
 * Describe your component here
 */
//export const ADDRESS_CATEGORIES = Object.values(selectTime)
export const OrderConfirmationShipment = React.memo(function OrderConfirmationShipment(
  props: OrderConfirmationShipmentProps,
) {
  const { shipment, onPayPressed, paymentDone } = props
  const { isOpen, onOpen, onClose } = useDisclose()
  const [date, setDate] = React.useState("")
  const [time, setTime] = React.useState()
  // const intent = usePaymentIntentSecret(shipment)

  // const { confirmPayment, loading } = useConfirmPayment()

  const {
    subTotalProductAmount,
    assignedStoreName,
    deliveryCharges,
    tax,
    total,
    tip,
    deliveryAddress,
  } = shipment

  // const { confirmPayment } = useStripe()
  // React.useEffect(() => {
  //   async function initialize() {
  //     await initStripe({
  //       publishableKey: env.stripe_publishable_key,
  //     })
  //   }
  //   initialize().catch(console.error)
  // }, [])

  const styles = useStyles({
    create: (theme) => ({
      shipmentItem: {
        padding: spacing[3],
        borderWidth: 1,
        borderColor: theme.colors.primary,
        borderRadius: 8,
        marginBottom: spacing[2],
        // borderStyle:'solid'
      },
      shipmentTitle: {
        fontSize: 18,
        marginBottom: spacing[3],
        fontWeight: "600",
      },
      total: {
        fontSize: 18,
        fontWeight: "500",
      },
    }),
  })

  // const onChangeTime = (value) => {
  //   const dateFormat = dayjs(value).format(DATE_FORMAT)
  //   console.log(" dateFormat ", dateFormat)
  //   setDate(value)
  // }
  // const onChangeTime = React.useCallback(
  //   (value) => {
  //     const dateFormat = dayjs(value).format(DATE_FORMAT)
  //     console.log(" dateFormat ", dateFormat)
  //     setDate(value)
  //   },
  //   [date],
  // )

  return (
    <View style={styles.shipmentItem}>
      <View style={styles.shipmentItem}>
        <Text style={styles.shipmentTitle}>{assignedStoreName}</Text>
        <ObjectRenderer
          content={[
            {
              label: "Product subtotal",
              value: `${subTotalProductAmount}`,
            },
            {
              label: "Taxes and fees",
              value: `${tax}`,
            },
            {
              label: "Delivery charges",
              value: `${deliveryCharges}`,
            },
            // {
            //   label: "Tips",
            //   value: `${tip}`,
            // },
          ]}
        />
        <HStack space={3} justifyContent={"space-between"}>
          <Text>Tips</Text>
          <VStack>
            <Slider defaultValue={tip} colorScheme="red" minValue={0} maxValue={50}>
              <Slider.Track shadow={2}>
                <Slider.FilledTrack />
              </Slider.Track>
              <Slider.Thumb shadow={3} />
            </Slider>
          </VStack>
          <Text>{tip}</Text>
          {/* <Button
            px={0}
            //disabled={counter !== 0}
            variant="link"
            textProps={{ color: "primary.900" }}
            //onPress={() => resend()}
          >
            Add tip
          </Button> */}
        </HStack>
        <HStack w="full" mb={2} justifyContent={"space-between"}>
          <Text>Delivery address</Text>
          <Text>
            {deliveryAddress &&
              commaify(
                deliveryAddress?.addrLine1,
                deliveryAddress?.addrLine2,
                deliveryAddress?.city,
                deliveryAddress?.addrState,
              )}
          </Text>
        </HStack>
        <HStack w="full" mb={2} justifyContent={"space-between"}>
          <Text style={styles.total}>Total</Text>
          <Text style={styles.total}>{total}</Text>
        </HStack>
      </View>
      <View style={styles.shipmentItem}>
        <Text style={styles.shipmentTitle}>Schedule delivery</Text>

        <FormControl isRequired={true}>
          <FormControl.Label>Select Date </FormControl.Label>
          <Input
            autoCapitalize="none"
            value={date}
            onFocus={() => {
              onOpen()
            }}
            InputRightElement={
              <FontAwesome size={18} style={{ marginRight: 5, color: "#b72618" }} name="calendar" />
            }
          />
          <DatePicker
            open={isOpen}
            mode="date"
            date={(date && dayjs(date, DATE_FORMAT).toDate()) || new Date()}
            // date={new Date(occasionDate)}
            onConfirm={(date) => {
              console.log(" date : ", date)
              //const onChangeTime = (dayjs(date).format(DATE_FORMAT))
              setDate(dayjs(date).format(DATE_FORMAT))
              //   setFieldValue("occasionDate", dayjs(date).format(DATE_FORMAT))
              //onChange(dayjs(date).format(DATE_FORMAT))
              onClose()
            }}
            modal
            onCancel={() => {
              onClose()
            }}
          />
          <FormControl.Label> Select time </FormControl.Label>
          <Select onValueChange={time} borderWidth={1} selectedValue={time} defaultValue="ASAP">
            <Select.Item value={"ASAP"} label={"ASAP"} />
            <Select.Item value={"11:00am-11:59pm"} label={"11:00am-11:59pm"} />
            <Select.Item value={"12:00pm-12:59pm"} label={"12:00pm-12:59pm"} />
            <Select.Item value={"1:00pm-1:59pm"} label={"1:00pm-1:59pm"} />
            <Select.Item value={"2:00pm-2:59pm"} label={"2:00pm-2:59pm"} />
            <Select.Item value={"3:00pm-3:59pm"} label={"3:00pm-3:59pm"} />
            <Select.Item value={"4:00pm-4:59pm"} label={"4:00pm-4:59pm"} />
            <Select.Item value={"5:00pm-5:59pm"} label={"5:00pm-5:59pm"} />
            <Select.Item value={"6:00pm-6:59pm"} label={"6:00pm-6:59pm"} />
          </Select>
        </FormControl>
      </View>
      {onPayPressed &&
        (paymentDone ? (
          <Button variant={"outline"}>Paid</Button>
        ) : (
          <Button onPress={onPayPressed}>PAY</Button>
        ))}
    </View>
  )
})
