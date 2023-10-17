import { useFormikContext } from "formik"
import get from "lodash/get"
import { FormControl, Select, useToast, List, VStack, Input, Icon, ScrollView, useColorModeValue, FlatList } from "native-base"
import React, { useState } from "react"
import { FormInput, useStyles, AutoCompleteInput, spacing } from "ui"
import { Button, IDynamicInput, Text, UserSigupGenericForm } from "../"
import {
  AddressType,
  SearchAddressDocument,
  SearchAddressQuery,
  useSearchAddressQuery,
} from "../../graphql/generated/graphql"
import { apiSdk, searchPlace, createClient, getLocationOptions } from "../../utils/api"
import { View, ViewStyle } from "react-native"
import { Control, Controller, useFormContext, UseFormSetValue } from "react-hook-form"
import { useMMKVObject } from "react-native-mmkv"
import { useDebounce } from "../../utils/hooks"
import { DELIVERY_ADDRESS } from "../../config/constants"
import { commaify, formattSearchAddressResult } from "../../utils/format"
import { IStateAddress } from "../../stores/cart"
import { Ionicons } from "@expo/vector-icons"

export interface UserSignupDeliveryContactsFormProps {
  goPrev: () => any
  goNext: () => any
  control: any
  handleSubmit: any
  onSubmit: any
}

/**
 * Describe your component here
 */

// export const ADDRESS_CATEGORIES = ["Home", "Work", "Custom"]
export const ADDRESS_CATEGORIES = Object.values(AddressType)
export const UserSignupDeliveryContactsForm = (props: UserSignupDeliveryContactsFormProps) => {
  const [showCustomType, setShowCustomType] = useState(false)
    const { goPrev, goNext, control, handleSubmit, onSubmit } = props
    const { setValue } = useFormContext()
    const styles = useStyles({
      create: ({ colors }) => ({}),
    })
    const [search, setSearch] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const deboucedValue = useDebounce(search, 300)

    const [deliveryAddress, setDeliveryAddress] = useMMKVObject(DELIVERY_ADDRESS)
    const { data } = useSearchAddressQuery(apiSdk, {
      input: {
        searchStr: deboucedValue,
      },
    })
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
    }, [deliveryAddress])
    const searchInputRef = React.useRef<typeof Input>(null)
    const [optionsVisible, setOptionsVisible] = React.useState(false)
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
    const [client, setClient] = React.useState(null)
    React.useEffect(() => {
      createClient().then(setClient)
    }, [])
    const onPlaceSelected = React.useCallback(
      async (place) => {
        console.log("place 1111--", place)
        console.log("client client--", client)
        setLoading(true)
        setSearch(place)
        setOptionsVisible(false)
        // setData([])
        try {
          console.log("place --", place)
          const placeData = await searchPlace(place, client)
          console.log("selected Adsss", placeData)
          setSelectedAddress(placeData)
          console.log(" placeData.addrLine1 ", placeData.addrLine1)
          setValue('addrLine1', placeData.addrLine1)
          setValue('city', placeData.city)
          setValue('addrState', placeData.addrState)
          setValue('postCode', placeData.postCode)
          //setValue('country', placeData.country)
        } catch (err) { 
          console.log(err)
          throw err
        } finally {
          setLoading(false)
        }
      },
      [client],
    )
  return (
    <UserSigupGenericForm title="">
      <View
                style={{
                  marginVertical: spacing[4],
                }}
              >
        <ScrollView
          nestedScrollEnabled={true}
          p={4}
          bg="bg"
        >
          {/* <VStack p={4} space="xs"> */}
              {/* <Text fontSize={"lg"}>Enter delivery address</Text>
                <AutoCompleteInput
                  getOptions={getLocationOptions}
                  onSelect={async (selectedLocation) => {
                    const resp = await searchPlace(selectedLocation.label)
                    console.log("resp ", resp)
                    setSelectedAddress(resp)
                    setValue('deliveryContact.address.addrLine1', resp?.addrLine1)
                    setValue('deliveryContact.address.city', resp?.city)
                    setValue('deliveryContact.address.addrState', resp?.state)
                    setValue('deliveryContact.address.postCode', resp?.postCode)
                    setValue('deliveryContact.address.country', resp?.country)
                  }}
                /> */}
              {/* <View style={styles.inputContainer}>
                <Input
                  defaultValue={formattedAddress}
                  value={search}
                  fontSize={"lg"}
                  onChangeText={(v) => {
                    setOptionsVisible(true)
                    setSearch(v)
                  }}
                  ref={searchInputRef}
                  onBlur={() => {
                    setOptionsVisible(false)
                  }}
                  onPressOut={() => {
                    setOptionsVisible(false)
                  }}
                  onFocus={() => {
                    setOptionsVisible(true)
                  }}
                  InputRightElement={
                    <Icon
                      color={useColorModeValue("primary.500", "primary.500")}
                      as={<Ionicons name="location-sharp" />}
                      size="sm"
                    />
                  }
                />
              </View> 
              {optionsVisible && data?.searchAddress?.items?.length > 0 && (
                <FlatList
                  mt={2}
                  shadow={"9"}
                  bg="white"
                  data={data?.searchAddress?.items}
                  keyExtractor={(item, index) => index?.toString()}
                  renderItem={({ item }) => {
                    const value = formattSearchAddressResult(item)
                    return (
                      <List mt={1} borderWidth={0}>
                      <List.Item
                        p={2}
                        onPress={(value) => {
                          console.log('value----', value)
                          onPlaceSelected(value)
                        }}
                      >
                        <Text>{value}</Text>
                      </List.Item>
                      </List>
                    )
                  }}
                />
              )}*/}
            {/* </VStack> */}
          <View>
          <Text fontSize={"lg"}>Enter delivery address</Text>
                <AutoCompleteInput
                  getOptions={getLocationOptions}
                  onSelect={async (selectedLocation) => {
                    const resp = await searchPlace(selectedLocation.label)
                    console.log("resp ", resp)
                    setSelectedAddress(resp)
                    setValue('deliveryContact.address.addrLine1', resp?.addrLine1)
                    setValue('deliveryContact.address.city', resp?.city)
                    setValue('deliveryContact.address.addrState', resp?.state)
                    setValue('deliveryContact.address.postCode', resp?.postCode)
                    setValue('deliveryContact.address.country', resp?.country)
                  }}
                />
            <Controller
              {...{ control }}
              rules={{
                  required: true,
                }}
              name="deliveryContact.addressType"
              render={({ field: { value, onBlur, onChange }, fieldState }) => {
                return (
                  <FormControl marginTop={3}>
                    <FormControl.Label> Address type </FormControl.Label>
                    <Select
                      selectedValue={value}
                      onValueChange={(e) => {
                        console.log("address type", e)
                        setShowCustomType(e === "Custom")
                        onChange(e)
                      }}
                      borderWidth={1}
                    >
                      {ADDRESS_CATEGORIES.map((cat) => (
                        <Select.Item value={cat} label={cat} key={cat} />
                      ))}
                    </Select>
                  </FormControl>
                )
              }}
            />
            {showCustomType ? (
              <Controller
                {...{ control }}
                name="deliveryContact.contactCustomType"
                render={({ field: { value, onBlur, onChange }, fieldState }) => {
                  return (
                    <FormControl>
                      <FormInput label="Customer Type" name="deliveryContact.contactCustomType" {...{ control }} />
                    </FormControl>
                  )
                }}
              />
            ) : (
              ""
            )}
            <FormInput
              {...{ control }}
              label="Address line 1"
              required
              name={'deliveryContact.address.addrLine1'}
              textInputprops={{
                editable: false,
              }}
            />
            <FormInput
              label="Address line 2"
              name={'deliveryContact.address.addrLine2'}
              {...{ control }}
            />
            <FormInput
              label="City/Town"
              textInputprops={{
                editable: false,
              }}
              name={'deliveryContact.address.city'}
              required
              {...{ control }}
            />
            <FormInput
              label="State"
              required
              textInputprops={{
                editable: false,
              }}
              name={'deliveryContact.address.addrState'}
              {...{ control }}
            />
            <FormInput
              label="Postalcode"
              required
              textInputprops={{
                editable: false,
              }}
              name={'deliveryContact.address.postCode'}
              {...{ control }}
            />            
          </View>
        </ScrollView>
        <VStack space={4} mt={6}>
          <Button variant="outline" onPress={goPrev}>
            <Text color="primary.500" fontSize="lg">
              Previous
            </Text>
          </Button>
          <Button variant="solid" py={3} onPress={handleSubmit(onSubmit)}>
            <Text color="white" fontSize="lg">
              Next
            </Text>
          </Button>
        </VStack>
      </View>

    </UserSigupGenericForm>
  )
}
