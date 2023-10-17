import { useFormikContext } from "formik"
import {
  FormControl,
  ScrollView,
  Icon,
  Select,
  useToast,
  VStack,
  Box,
  List,
  Input,
  useColorModeValue,
  FlatList,
} from "native-base"
import React, { useState } from "react"
import { Control, Controller, useFormContext, UseFormSetValue } from "react-hook-form"
import { View, ViewStyle } from "react-native"
import { ADDRESS_CATEGORIES, IDynamicInput, TextField } from "../"
import { Ionicons } from "@expo/vector-icons"
import { CreateCustomerAddressInput, useSearchAddressQuery } from "../../graphql/generated/graphql"
import { AddNewContactInput } from "../../screens/add-delivery-contact-form/add-delivery-contact-form-screen"
import { AutoCompleteInput, FormInput, spacing, useStyles } from "ui"
import { useDebounce } from "../../utils/hooks"
import { Button, Text } from "../../components"
import { commaify, formattSearchAddressResult } from "../../utils/format"
import { useMMKVObject } from "react-native-mmkv"
import { DELIVERY_ADDRESS } from "../../config/constants"
import { apiSdk, createClient, getLocationOptions, searchPlace } from "../../utils/api"
import { IStateAddress } from "../../stores/cart"
const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

export interface AddNewContactAddressesListItemProps {
  control: Control<AddNewContactInput>
  addresses: CreateCustomerAddressInput[]
  index: number
  //setValue: UseFormSetValue<AddNewContactInput>
}

/**
 * Describe your component here
 */
export const AddNewContactAddressesListItem = React.memo(
  (props: AddNewContactAddressesListItemProps) => {
    const [showCustomType, setShowCustomType] = useState(false)
    const { addresses, index, control } = props
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
    // const onPlaceSelected = React.useCallback(
    //   async (place) => {
    //     setLoading(true)
    //     setSearch(place)
    //     setOptionsVisible(false)
    //     // setData([])
    //     try {
    //       const placeData = await searchPlace(place, client)
    //       console.log("selected Adsss", placeData)
    //       setSelectedAddress(placeData)
    //       console.log(" placeData.addrLine1 ", placeData.addrLine1)
    //       setValue(`addresses.${index}.addrLine1`, placeData.addrLine1)
    //       setValue(`addresses.${index}.city`, placeData.city)
    //       setValue(`addresses.${index}.addrState`, placeData.addrState)
    //       setValue(`addresses.${index}.postCode`, placeData.postCode)
    //       setValue(`addresses.${index}.country`, placeData.country)
    //     } catch (err) {
    //       console.log(err)
    //       throw err
    //     } finally {
    //       setLoading(false)
    //     }
    //   },
    //   [client],
    // )
    return (
      <View>
        <ScrollView
          nestedScrollEnabled={true}
          p={4}
          bg="bg"
          contentContainerStyle={{
            paddingBottom: 100,
          }}
        >
          <ScrollView horizontal={true} style={{ width: "100%" }}>
            <VStack p={4} space="xl">
              <Text fontSize={"lg"}>Enter delivery address</Text>
              <View
                style={{
                  marginVertical: spacing[4],
                }}
              >
                <AutoCompleteInput
                  getOptions={getLocationOptions}
                  onSelect={async (selectedLocation) => {
                    const resp = await searchPlace(selectedLocation.label)
                    console.log("resp ", resp)
                    setSelectedAddress(resp)
                    setValue(`addresses.${index}.addrLine1`, resp?.addrLine1)
                    setValue(`addresses.${index}.city`, resp?.city)
                    setValue(`addresses.${index}.addrState`, resp?.state)
                    setValue(`addresses.${index}.postCode`, resp?.postCode)
                    setValue(`addresses.${index}.country`, resp?.country)
                  }}
                />
              </View>
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
                      <List.Item
                        p={2}
                        onPress={() => {
                          onPlaceSelected(value)
                        }}
                      >
                        <Text>{value}</Text>
                      </List.Item>
                    )
                  }}
                />
              )} */}
            </VStack>
          </ScrollView>
          <View>
            <Controller
              {...{ control }}
              name="addressType"
              render={({ field: { value, onBlur, onChange }, fieldState }) => {
                return (
                  <FormControl>
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
                name="contactCustomType"
                render={({ field: { value, onBlur, onChange }, fieldState }) => {
                  return (
                    <FormControl>
                      <FormInput label="Customer Type" name="contactCustomType" {...{ control }} />
                    </FormControl>
                  )
                }}
              />
            ) : (
              ""
            )}

            <FormInput label="First name" name="firstName" required {...{ control }} />
            <FormInput label="Middle name" name="middleName" {...{ control }} />
            <FormInput label="Last name" required name="lastName" {...{ control }} />
            <FormInput
              {...{ control }}
              label="Address line 1"
              required
              name={`addresses.${index}.addrLine1`}
              textInputprops={{
                editable: false,
              }}
            />
            <FormInput
              label="Address line 2"
              name={`addresses.${index}.addrLine2`}
              {...{ control }}
            />
            <FormInput
              label="City/Town"
              textInputprops={{
                editable: false,
              }}
              name={`addresses.${index}.city`}
              required
              {...{ control }}
            />
            <FormInput
              label="State"
              required
              textInputprops={{
                editable: false,
              }}
              name={`addresses.${index}.addrState`}
              {...{ control }}
            />
            <FormInput
              label="Postalcode"
              required
              textInputprops={{
                editable: false,
              }}
              name={`addresses.${index}.postCode`}
              {...{ control }}
            />
            <FormInput
              required
              label="Country"
              textInputprops={{
                editable: false,
              }}
              name={`addresses.${index}.country`}
              {...{ control }}
            />
            <FormInput
              label="Delivery Instruction"
              name={`addresses.${index}.instructions`}
              {...{ control }}
            />
            {/* 
          {formInputs.map((input) => {
            const values = getValues();
            const { label, show = true, required, isDisabled, dataKey, autoCapitalize } = input
            console.log("data key values", values, values[dataKey])
            const finalValue = values[dataKey] || ""
            if (!show) {
              return null
            }
            return (
              <FormInput
                name={dataKey}
                autoCapitalize={autoCapitalize || "none"}
                label={label}
                control={control}
                // errorMessage={touched[dataKey] && (errors[dataKey] as string)}
                required={required || false}
                value={(finalValue as string) || ""}
                isDisabled={isDisabled || false}
              />
            )
          })} */}
          </View>
        </ScrollView>
      </View>
    )
  },
)
