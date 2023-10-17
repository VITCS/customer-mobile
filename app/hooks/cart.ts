import { ConsoleLogger } from "@aws-amplify/core"
import { useMemo } from "react"
import { useMMKVObject } from "react-native-mmkv"
import { FLEXIBLE_CART_KEY } from "../config/constants"
import { ICart, useCart, useDeliveryAddress } from "../stores/cart"

export const useCartValidity = () => {
  const cart = useCart()
  const shipments = useMemo(() => cart?.cartShipment?.items, [cart])

  // const shipments = []
  const { data: selectedDeliveryAddress } = useDeliveryAddress()

  const [validShipments, invalidShipments]: Array<
    Array<ICart["cartShipment"]["items"][0]>
  > = useMemo(() => {
    if (!selectedDeliveryAddress) {
      const flattenLineItems = shipments?.flatMap((eachShipment) => eachShipment?.lineItems)
      return [[], flattenLineItems]
    }

    const validShipments = []
    const invalidShipments = []
    let isAddressValid = false;
    shipments?.forEach((eachShipment) => {
      eachShipment.lineItems.forEach((product) => {
        if (product.itemInvalid) {
          isAddressValid = true;
        }
      });

      // const isAddressValid =
      //   selectedDeliveryAddress?.latitude === eachShipment?.deliveryAddress?.latitude &&
      //   selectedDeliveryAddress?.longitude === eachShipment?.deliveryAddress?.longitude

      if (isAddressValid) {
        invalidShipments.push({ ...eachShipment })
      } else {
        validShipments.push({ ...eachShipment })
      }
    })
    console.log("Cart INvalid details", cart);
    console.log("Shipment ", validShipments, invalidShipments);
    return [validShipments, invalidShipments]
  }, [selectedDeliveryAddress, shipments])

  console.log("validShipments", validShipments?.length)
  return [validShipments, invalidShipments]
}

export function getCartInvalidFlag() {
  const [validShipments, inValidShipments] = useCartValidity()
  const isAnyShipmentAddressInValid = useMemo(() => inValidShipments?.length > 0, [
    inValidShipments,
  ])
  return isAnyShipmentAddressInValid
}


export function useFlexibleCart() {
  const [fCart] = useMMKVObject(FLEXIBLE_CART_KEY)

  return fCart as ICart
}
