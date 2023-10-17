import { Flex, Spinner } from "native-base"
import * as React from "react"
import { FlatList, View } from "react-native"
import { useMMKVObject } from "react-native-mmkv"
import { Button, Text } from "ui"
import { AddressPickerModal, PriceOptionListItem } from ".."
import { DELIVERY_ADDRESS } from "../../config/constants"
import {
  Product,
  useSearchPriceAndAvailabilitysQuery,
  useSearchStoresQuery,
} from "../../graphql/generated/graphql"
import { useDeliveryAddress } from "../../stores/cart"
import { apiSdk, getUserId } from "../../utils/api"

export type DeliveryPurchaseOptionsProps = Pick<
  Product,
  "id" | "prodFullName" | "prodShortDesc"
> & {
  removeExisingProductReferences?: boolean
  parentScrollEnabled?: boolean
}

/**
 * Describe your component here
 */

const distance = 400

export const DeliveryPurchaseOptions = (props: DeliveryPurchaseOptionsProps) => {
  const { id, prodShortDesc, prodFullName, removeExisingProductReferences } = props
  const [deliveryAddress] = useMMKVObject(DELIVERY_ADDRESS)
  const [showAddressPicker, setShowAddressPicker] = React.useState(false)
  const {
    data: { latitude, longitude } = { latitude: 0, longitude: 0 },
    isLoading: deliveryLoading,
  } = useDeliveryAddress()
  console.log(" latitude, longitude :: ", latitude, longitude)
  console.log(" deliveryAddress pusrchase : ", deliveryAddress)
  const {
    data,
    isLoading: priceLoading,
    isError: priceError,
  } = useSearchPriceAndAvailabilitysQuery(
    apiSdk,
    {
      distance,
      lat: latitude || deliveryAddress?.latitude,
      lon: longitude || deliveryAddress?.longitude,
      filter: {
        id: {
          eq: id,
        },
      },
    },
    {
      enabled: latitude?.toString()?.length > 0 && longitude?.toString()?.length > 0,
    },
  )

  const { data: storeData, isLoading: storeLoading, isError: storesError } = useSearchStoresQuery(
    apiSdk,
    {
      distance,
      lat: latitude || deliveryAddress?.latitude,
      lon: longitude || deliveryAddress?.longitude,
      filter: {
        or: data?.searchPriceAndAvailabilitys?.items?.map((item) => {
          return {
            id: {
              eq: item.storeId,
            },
            isDeliveryPaused: {
              ne: true,
            },
          }
        }),
      },
    },
    {
      enabled:
        latitude?.toString().length > 0 &&
        longitude?.toString().length > 0 &&
        data?.searchPriceAndAvailabilitys?.items?.length > 0,
    },
  )

  const pricesAndStores = React.useMemo(() => {
    return data?.searchPriceAndAvailabilitys?.items?.map((store) => {
      console.log(" store -> ", store)
      const { storeId } = store
      console.log(" storeData -> ", storeData)
      const foundStore = storeData?.searchStores?.items?.find((r) => r.id === storeId)
      console.log(" store -> ", foundStore)
      const storeName = foundStore?.storeName || ""
      return {
        ...store,
        storeName,
      }
    })
  }, [data, storeData])

  const { isLoading, isError } = React.useMemo(() => {
    return {
      isLoading: priceLoading || storeLoading || deliveryLoading,
      isError: priceError || storesError,
    }
  }, [priceLoading, storeLoading, priceError, storesError, deliveryLoading, deliveryAddress])

  return (
    <>
      <FlatList
        scrollEnabled={false}
        data={pricesAndStores}
        keyExtractor={(e, index) => e.id?.toString() + index?.toString()}
        contentContainerStyle={{
          marginTop: isLoading ? 80 : 0,
        }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListEmptyComponent={
          <>
            {isLoading ? (
              <Spinner size={"lg"} />
            ) : isError ? (
              <Text>Something went wrong. Please try again later.</Text>
            ) : (
              <Flex alignItems={"center"} py={32}>
                <Text fontSize={"lg"}>No available stores found</Text>
                <Button
                  mt={4}
                  onPress={() => {
                    setShowAddressPicker(true)
                  }}
                >
                  {latitude && longitude ? "Change address" : "Select address"}
                </Button>
              </Flex>
            )}
          </>
        }
        renderItem={({ item }) => {
          console.log("item :: -> ", deliveryAddress)
          return (
            <PriceOptionListItem
              {...item}
              deliveryAddress={deliveryAddress}
              {...{
                removeExisingProductReferences,
              }}
              product={{
                id,
                prodShortDesc,
                prodFullName,
              }}
            />
          )
        }}
      />

      <AddressPickerModal
        visible={showAddressPicker}
        onDismiss={() => {
          setShowAddressPicker(false)
        }}
      />
    </>
  )
}
