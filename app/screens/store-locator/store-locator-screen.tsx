import { Ionicons } from "@expo/vector-icons"
import { StackScreenProps } from "@react-navigation/stack"
import { Box, Button, Heading, HStack, VStack } from "native-base"
import React, { useCallback, useRef, useState } from "react"
import { FlatList, TextInput, TouchableOpacity, View, ViewStyle } from "react-native"
import MapView, { Marker } from "react-native-maps"
import { useMMKVObject } from "react-native-mmkv"
import {
  AddressPickerModal,
  AnonymousAddressPicker,
  NewAddressConfirmModal,
  Screen,
  Text,
} from "../../components"
import { DELIVERY_ADDRESS } from "../../config/constants"
import { Store, useSearchStoresQuery } from "../../graphql/generated/graphql"
import { AppScreensParamsList } from "../../navigators"
import { useDeliveryAddress } from "../../stores/cart"
import { spacing } from "../../theme"
import { apiSdk } from "../../utils/api"
import { commaify } from "../../utils/format"
import { storage } from "../../utils/storage"

const ROOT: ViewStyle = {
  flex: 1,
  backgroundColor: "transparent",
}

const EMPTY_STATE_CONTAINER: ViewStyle = {
  width: "100%",
  alignItems: "center",
  marginTop: spacing[6],
}
const HEADER: ViewStyle = {
  flexDirection: "row",
  paddingHorizontal: spacing[2],
  marginVertical: spacing[2],
}

const SEARCH_INPUT: ViewStyle = {
  flex: 1,
}

type IProps = StackScreenProps<AppScreensParamsList, "stores">
const distance = 5
export const StoreLocatorScreen: React.FC<IProps> = ({ navigation }) => {
  const [deliveryAddress] = useMMKVObject(DELIVERY_ADDRESS)
  const {
    data: { latitude, longitude } = { latitude: 0, longitude: 0 },
    isLoading: deliveryLoading,
  } = useDeliveryAddress()

  const [searchInput, setSearchInput] = useState("")
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })
  console.log(latitude, deliveryAddress)
  // if (latitude == 0 && deliveryAddress == undefined) {
  //   return (
  //     <>
  //       <AnonymousAddressPicker />
  //     </>
  //   )
  // }
  const { data: storeData, isLoading, isError, refetch } = useSearchStoresQuery(
    apiSdk,
    {
      distance,
      lat: latitude || deliveryAddress?.latitude,
      lon: longitude || deliveryAddress?.longitude,
    },
    {
      onSuccess: (data) => {
        const storeCorrds = data.searchStores.items
          .filter((i) => i.address?.latitude)
          .map((r) => ({
            latitude: r.address.latitude,
            longitude: r.address.longitude,
          }))
        console.log("store locator data ", storeCorrds)
        mapRef?.current.fitToCoordinates(storeCorrds, {
          animated: true,
          edgePadding: {
            top: 30,
            left: 30,
            right: 30,
            bottom: 30,
          },
        })
      },
    },
  )
  const [selectedStore, setSelectedStore] = useState<Partial<Store>>(null)

  const mapRef = useRef<MapView>(null)
  return (
    <Screen style={ROOT} preset="fixed">
      <Box style={HEADER}>
        <Heading>Stores near me</Heading>
      </Box>
      <Box borderTopWidth={1 / 2} borderBottomWidth={1 / 2} borderColor="gray.500" px={2}>
        {/* <HStack
          my={2}
          borderColor="gray.400"
          borderWidth={1}
          height={12}
          alignItems="center"
          rounded="lg"
          px={2}
        > */}
        {/* <TextInput
            autoCapitalize="none"
            style={[SEARCH_INPUT, { color: "black" }]}
            value={searchInput}
            onChangeText={setSearchInput}
          />
          <Ionicons size={20} name="search" /> */}
        <HStack space="md">
          <Button
            flex={1}
            variant={"solid"}
            onPress={() => {
              //dismiss()
            }}
          >
            5 Miles
          </Button>

          <Button
            flex={1}
            isLoading={isLoading}
            variant={"outline"}
            onPress={() => {
              // updateOrderShipment({
              //   input: {
              //     id,
              //     orderLineItems: newLineItems,
              //   },
              // })
            }}
          >
            10 Miles
          </Button>
          <Button
            flex={1}
            variant={"outline"}
            onPress={() => {
              //dismiss()
            }}
          >
            15 Miles
          </Button>
          <Button
            flex={1}
            variant={"outline"}
            onPress={() => {
              //dismiss()
            }}
          >
            20 Miles
          </Button>
        </HStack>
      </Box>
      <MapView
        style={{ height: "35%" }}
        ref={mapRef}
        minZoomLevel={1}
        maxZoomLevel={100}
        // region={region}
      >
        {storeData?.searchStores?.items?.map((store) => {
          if (store.address) {
            const isSelected = selectedStore?.id === store.id
            const { latitude, longitude } = store?.address
            if (latitude && longitude) {
              return (
                <Marker
                  key={store.id}
                  pinColor={selectedStore ? (isSelected ? "#ff1b1c" : "#ffd6d6") : "#ff1b1c"}
                  coordinate={{ latitude, longitude }}
                />
              )
            }
          }
          return null
        })}
      </MapView>
      {/* <MapZoomButtons
        onZoomIn={async () => {
          // const camera = await mapRef?.current?.getCamera()

          // console.log("camerra ", camera?.zoom)
          // const exisintZoom = camera?.zoom || 0

          // mapRef?.current?.animateCamera({
          //   ...camera,
          //   zoom: exisintZoom + 1,
          // })
          // const oLat = Math.abs(region.latitude);
          // const oLng = Math.abs(region.longitude);
          // const dLat = Math.abs(region.latitude);
          // const dLng = Math.abs(region.longitude);

          const newRegion: Region = {
            ...region,
            latitudeDelta: region.latitudeDelta + 10,
            longitudeDelta: region.longitudeDelta + 10,
            // latitudeDelta: Math.abs(oLat - dLat) + zoom,
            // longitudeDelta: Math.abs(oLng - dLng) + zoom,
          }
          mapRef?.current?.animateToRegion(newRegion, 200)
        }}
        onZoomOut={() => {
          const newRegion: Region = {
            ...region,
            latitudeDelta: region.latitudeDelta * 200,
            longitudeDelta: region.longitudeDelta * 200,
          }
          console.log("new region is ", newRegion)
          mapRef?.current?.animateToRegion(newRegion, 200)
        }}
      /> */}
      <View
        style={{
          borderRadius: 20,
          borderTopLeftRadius: 20,
          flex: 1,
          // borderTopWidth: 1 / 2,
          // borderStyle: "solid",
        }}
      >
        <View
          style={{
            width: 100,
            height: 1,
            borderColor: "black",
            backgroundColor: "#333",
            alignSelf: "center",
            marginTop: 8,
            marginBottom: 12,
          }}
        />
        <FlatList
          data={storeData?.searchStores?.items}
          onRefresh={refetch}
          contentContainerStyle={{
            paddingBottom: spacing[4],
          }}
          refreshing={isLoading}
          ListEmptyComponent={() => {
            if (isLoading) {
              return null
            }
            if (isError) {
              return (
                <View style={EMPTY_STATE_CONTAINER}>
                  <Text>Error in fetching stores. Please try again.</Text>
                  <Button
                    style={{
                      marginTop: 16,
                    }}
                    _text={{
                      fontSize: 16,
                      fontWeight: "200",
                    }}
                    onPress={() => refetch()}
                  >
                    Retry
                  </Button>
                </View>
              )
            }
            return (
              <View style={EMPTY_STATE_CONTAINER}>
                <Text>No stores found.</Text>
              </View>
            )
          }}
          keyExtractor={({ id }) => `${id}`}
          renderItem={({ item: store }) => {
            const { address } = store
            return (
              <TouchableOpacity
                activeOpacity={0.4}
                onPress={() => {
                  setSelectedStore(store)
                  if (address?.latitude) {
                    mapRef.current.animateToRegion(
                      {
                        latitude: address.latitude,
                        longitude: address.longitude,
                        latitudeDelta: 0.13,
                        longitudeDelta: 0.13,
                      },
                      1000,
                    )
                  }
                }}
              >
                <HStack
                  mx={2}
                  px={2}
                  py={2}
                  borderLeftWidth={4}
                  borderLeftColor={selectedStore?.id === store?.id ? "primary.500" : "white"}
                  borderBottomWidth={1 / 2}
                  borderColor="gray.300"
                >
                  <VStack ml={4}>
                    <Text fontSize="xl" fontWeight="700" text={store.storeName} />
                    <Text fontSize="md" fontWeight="400">
                      {commaify(
                        address?.addrLine1,
                        address?.addrLine2,
                        address?.city,
                        address?.state,
                        address?.country,
                      )}
                    </Text>
                  </VStack>
                </HStack>
              </TouchableOpacity>
            )
          }}
        />
      </View>
    </Screen>
  )
}
