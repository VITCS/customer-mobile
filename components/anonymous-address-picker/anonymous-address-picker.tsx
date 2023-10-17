import { Ionicons } from "@expo/vector-icons"
import { useBottomSheetModal } from "@gorhom/bottom-sheet"
import { Box, FlatList, Icon, Input, List, useColorModeValue, VStack } from "native-base"
import * as React from "react"
import { useFormContext } from "react-hook-form"
import { View } from "react-native"
import { useMMKVObject } from "react-native-mmkv"
import { AutoCompleteInput, Button, Text } from "ui"
import { DELIVERY_ADDRESS } from "../../config/constants"
import { useSearchAddressQuery } from "../../graphql/generated/graphql"
import { IStateAddress } from "../../stores/cart"
import { apiSdk, createClient, getLocationOptions, searchPlace } from "../../utils/api"
import { commaify, formattSearchAddressResult } from "../../utils/format"
import { useDebounce } from "../../utils/hooks"
import { useStyles } from "../../utils/styles"

export interface AnonymousAddressPickerProps {}

/**
 * Describe your component here
 */
export const AnonymousAddressPicker = (props: AnonymousAddressPickerProps) => {
  console.log(" inside AnonymousAddressPicker ")
  const {} = props
  const [search, setSearch] = React.useState("")
  //const { setValue } = useFormContext()
  const [deliveryAddress, setDeliveryAddress] = useMMKVObject(DELIVERY_ADDRESS)

  const searchInputRef = React.useRef<typeof Input>(null)
  const [client, setClient] = React.useState(null)
  const deboucedValue = useDebounce(search, 300)
  const [selectedAddress, setSelectedAddress] = React.useState<
    Pick<
      IStateAddress,
      | "latitude"
      | "longitude"
      | "addrLine1"
      | "addrLine2"
      | "addrState"
      | "city"
      | "postCode"
      | "id"
    >
  >(null)
  const [loading, setLoading] = React.useState(false)
  const [optionsVisible, setOptionsVisible] = React.useState(false)

  const formattedAddress = React.useMemo(() => {
    const {
      addrLine1 = "",
      addrLine2 = "",
      addrState = "",
      city = "",
      country = "",
      postCode = "",
    } = (deliveryAddress as any) || {}
    return commaify(addrLine1, addrLine2, addrState, city, country, postCode)
  }, [deliveryAddress, selectedAddress])
  React.useEffect(() => {
    createClient().then(setClient)
  }, [])

  const onPlaceSelected = React.useCallback(
    console.log(" inside place data "),
    async (place) => {
      console.log(" inside place data place : ", place), setLoading(true)
      setSearch(place)
      setOptionsVisible(false)
      // setData([])
      try {
        //console.log(" inside place data ", place, client)
        const placeData = await searchPlace(place)
        console.log(" placeData : ", placeData)
        setSelectedAddress(placeData)
      } catch (err) {
        console.log(err)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [client],
  )

  const { data } = useSearchAddressQuery(apiSdk, {
    input: {
      searchStr: deboucedValue,
    },
  })

  const { dismiss } = useBottomSheetModal()
  const styles = useStyles({
    create: ({ colors }) => ({}),
  })
  console.log(" selectedAddress :: ", selectedAddress)
  return (
    <VStack space={2} mt={6} h={"400px"}>
      <Text fontSize={"lg"}>Enter delivery address</Text>
      {/* <Box flex={1}> */}
        {/* <View style={styles.inputContainer}> */}
          <AutoCompleteInput
            getOptions={getLocationOptions}
            onSelect={async (selectedLocation) => {
              const resp = await searchPlace(selectedLocation.label)
              console.log("resp ", resp)
              setSelectedAddress(resp)
            }}
          />
      <Button
        alignSelf={"center"}
        marginTop={5}
        px={6}
        onPress={() => {
          setDeliveryAddress(selectedAddress)
          dismiss()
        }}
        isDisabled={!selectedAddress}
        isLoading={loading}
      >
          Select Address
      </Button>
      {/* </View> */}
      {/* </Box> */}
      {/* </BottomSheetFooter> */}
    </VStack>
  )
}
