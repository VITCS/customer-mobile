import { FontAwesome } from "@expo/vector-icons"
import { useToken } from "native-base"
import * as React from "react"
import { useCallback, useState } from "react"
import { TouchableOpacity, View } from "react-native"
import { useMMKVBoolean, useMMKVObject } from "react-native-mmkv"
import { ageConfirmation, DELIVERY_ADDRESS } from "../../config/constants"
import { useGetDeliveryAddressQuery } from "../../graphql/generated/graphql"
import { useLoggedInUser } from "../../stores/auth"
import { apiSdk } from "../../utils/api"
import { commaify, formatname } from "../../utils/format"
import { storage } from "../../utils/storage"
import { useStyles } from "../../utils/styles"
import { AddressPickerModal } from "../address-picker-modal/address-picker-modal"
import { AgeComfirmationModal, Text } from "../index"
import { NewAddressConfirmModal } from "../new-address-confirm-modal/new-address-confirm-modal"
export interface HeaderLocationPickerProps {}

export const HeaderLocationPicker = React.memo((props: HeaderLocationPickerProps) => {
  const {} = props

  const userId = useLoggedInUser()
  console.log(" header user id  : ", userId)
  const { data: deliveryAddressData } = useGetDeliveryAddressQuery(
    apiSdk,
    {
      userId,
    },
    {
      enabled: userId?.length > 0,
      staleTime: 0,
      cacheTime: 0,
      onSuccess: (res) => {
        // console.log(" inside on success  res :: ", res)
      },
    },
  )
  const [deliveryAddress] = useMMKVObject(DELIVERY_ADDRESS)
  const ageConfirmationSet = storage.getBoolean("ageConfirmation")
  console.log(" ageConfirmationSet :: ", ageConfirmationSet, "deliveryAddress ", deliveryAddress)
  const selectedDeliveryAddress = React.useMemo(
    () => deliveryAddressData?.getCustomerProfile?.deliveryToAddress || deliveryAddress,
    [deliveryAddressData, deliveryAddress, ageConfirmationSet],
  )

  const [primary] = useToken("colors", ["primary.500"])

  const [showPickerModal, setShowPickerModal] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const onDismiss = useCallback(() => {
    setShowPickerModal(false)
  }, [])

  const onDismissConfirmModal = useCallback(async () => {
    storage.delete(DELIVERY_ADDRESS)
    setShowConfirmationModal(false)
  }, [])

  const styles = useStyles({
    create: (theme, dims) => ({
      heading: {
        fontSize: 16,
        fontWeight: "600",
      },
      text: {
        fontSize: 12,
        fontWeight: "300",
      },
      container: {
        marginLeft: 12,
      },
    }),
  })
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setShowPickerModal(true)
        }}
      >
        <View style={[styles.row, styles.center]}>
          <FontAwesome color={primary} size={16} name="map-marker" />
          <View style={styles.container}>
            {selectedDeliveryAddress ? (
              selectedDeliveryAddress?.firstName ? (
                <Text
                  style={styles.heading}
                  ml={1}
                  fontSize="lg"
                  fontWeight="bold"
                  color="gray.700"
                >
                  {formatname(
                    selectedDeliveryAddress?.firstName,
                    "-",
                    selectedDeliveryAddress?.addressType,
                  )}
                </Text>
              ) : (
                ""
              )
            ) : (
              <Text style={styles.heading} ml={1} fontSize="lg" fontWeight="bold" color="gray.700">
                {" "}
                Delivery address{" "}
              </Text>
            )}

            <Text
              style={[styles.text]}
              fontWeight="light"
              color="gray.700"
              noOfLines={1}
              isTruncated
            >
              {selectedDeliveryAddress
                ? commaify(
                    selectedDeliveryAddress?.addrLine1,
                    selectedDeliveryAddress?.addrLine2,
                    selectedDeliveryAddress?.city,
                    selectedDeliveryAddress?.addrState,
                  )
                : "Select delivery address"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      {ageConfirmationSet ? <AgeComfirmationModal /> : ""}
      <AddressPickerModal onDismiss={onDismiss} visible={showPickerModal} />
      <NewAddressConfirmModal onDismiss={onDismissConfirmModal} visible={showConfirmationModal} />
    </>
  )
})
