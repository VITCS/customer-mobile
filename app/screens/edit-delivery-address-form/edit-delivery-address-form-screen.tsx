import { StackScreenProps } from "@react-navigation/stack"
import { FormControl, ScrollView, Icon, Select, useToast, VStack, Box, List, Input, useColorModeValue, FlatList } from "native-base"
import React, { useState } from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { ADDRESS_CATEGORIES, Button, Text } from "../../components"
import { useMMKVObject } from "react-native-mmkv"
import * as yup from "yup"
import {
  AddressType,
  UpdateCustomerAddressInput,
  useCreateCustomerAddressMutation,
  useGetCustomerAddressQuery,
  useGetDeliveryContactsQuery,
  useUpdateCustomerAddressMutation,
} from "../../graphql/generated/graphql"
import { IStateAddress } from "../../stores/cart"
import { DeliveryContactParamList } from "../../navigators"
import { Ionicons } from "@expo/vector-icons"
import { View } from "react-native"
import { DELIVERY_ADDRESS } from "../../config/constants"
import { apiSdk, createClient, getLocationOptions, getUserId, searchPlace } from "../../utils/api"
import { useSearchAddressQuery } from "../../graphql/generated/graphql"
import { commaify, formattSearchAddressResult } from "../../utils/format"
import { useDebounce } from "../../utils/hooks"
import { useStyles } from "../../utils/styles"
import { AutoCompleteInput, FormInput, spacing } from "ui"
import { useQueryClient } from "react-query"
type Props = StackScreenProps<DeliveryContactParamList, "addAddress">
const queryClient = useQueryClient()
export const EditDeliveryAddressFormScreen: React.FC<Props> = (props) => {
  const { route, navigation } = props
  const { params } = route

  const [id, customerContactId] = React.useMemo(() => [params?.id, params?.customerContactId], [
    params,
  ])
  const editMode = React.useMemo(() => id?.length > 0, [id])
  const [showCustomType, setShowCustomType] = useState(false)
  const [client, setClient] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const userId = getUserId()
  const { mutate: updateCustomerAddress } = useUpdateCustomerAddressMutation(apiSdk, {
    onSuccess: () => {
      toast.show({
        title: "Success",
        description: ""
      })
      // queryClient.refetchQueries(["getStoreDetails"])
      queryClient.refetchQueries(useGetCustomerAddressQuery.getKey({ id }))
      queryClient.refetchQueries(useGetDeliveryContactsQuery.getKey({ userId }))
      navigation.goBack()
    },
    onError: (err) => {
      toast.show({
        title: "Error",
        description: `Error: ${err}`
      })
    },
  })
  const { mutate: createCustomerAddress } = useCreateCustomerAddressMutation(apiSdk, {
    onSuccess: () => {
      toast.show({
        title: "Success",
        description: ""
      })
      queryClient.refetchQueries(useGetCustomerAddressQuery.getKey({ id }))
      queryClient.refetchQueries(useGetDeliveryContactsQuery.getKey({ userId }))
      navigation.goBack()
    },
    onError: (err) => {
      toast.show({
        title: "Error",
        description: `Error: ${err}`
      })
    },
  })
  const schema = yup.object({
    firstName: yup.string().required("Please enter the First Name"),
    lastName: yup.string().required("Please enter the Last Name"),
    addrLine1: yup.string().required("Please enter the Address Line1"),
    city: yup.string().required("Please enter the City"),
    addrState: yup.string().required("Please enter the State"),
    postCode: yup.string().required("Please enter the postal Code "),
  });
  const { control, handleSubmit, reset, getValues, setValue } = useForm<UpdateCustomerAddressInput>({
    defaultValues: {
      addrLine1: "",
      addrLine2: "",
      addrState: "",
      addressType: AddressType.Home,
      city: "",
      country: "",
      customType: "",
      firstName: "",
      lastName: "",
      middleName: "",
      instructions: "",
      phoneNumber: "",
      postCode: "",
    },
    resolver: yupResolver(schema),
  })
  const onSubmit: SubmitHandler<UpdateCustomerAddressInput> = async (data) => {
    try {
      setLoading(true)
      const values = getValues();
      console.log("update input", values)
      if (id) {
        updateCustomerAddress({
          input: {
            ...values,
            id,
          },
        })
      } else {
        createCustomerAddress({
          input: {
            ...values,
            customerContactId,
            city: values?.city || "",
            addrLine1: values?.addrLine1 || "",
          },
        })
      }
    } catch (error) {
      console.log("error in updating addresss", error)
      toast.show({
        title: "Error",
        description: "Something went wrong.",
        //status: "error",
      })
    } finally {
      setLoading(false)
    }
  }
  const toast = useToast()
  React.useEffect(() => {
    createClient().then(setClient)
  }, [])
  const { } = useGetCustomerAddressQuery(
    apiSdk,
    {
      id,
    },
    {
      enabled: id?.length > 0,
      onSuccess: (data) => {
        reset(data.getCustomerAddress)
      },
    },
  )
  const addressType = getValues("addressType");
  const searchInputRef = React.useRef<typeof Input>(null)
  const [search, setSearch] = React.useState("")
  const [optionsVisible, setOptionsVisible] = React.useState(false)
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
  const [deliveryAddress, setDeliveryAddress] = useMMKVObject(DELIVERY_ADDRESS)
  const onPlaceSelected = React.useCallback(
    async (place) => {
      setLoading(true)
      setSearch(place)
      setOptionsVisible(false)
      // setData([])
      try {
        const placeData = await searchPlace(place, client)
        setSelectedAddress(placeData)
        setValue('addrLine1', placeData.addrLine1);
        setValue('city', placeData.city);
        setValue('addrState', placeData.addrState);
        setValue('postCode', placeData.postCode);
        setValue('country', placeData.country);
      } catch (err) {
        console.log(err)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [client],
  )
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
  const { data } = useSearchAddressQuery(apiSdk, {
    input: {
      searchStr: deboucedValue,
    },
  })
  const styles = useStyles({
    create: ({ colors }) => ({}),
  })
  return (
    <View>
      <ScrollView nestedScrollEnabled={true} p={4}
        bg="bg"
        contentContainerStyle={{
          paddingBottom: 100,
        }} >
        <ScrollView horizontal={true} style={{ width: '100%' }} />
          {/* <VStack  px={6} py={4} space="lg"> */}
          {/* <View
                style={{
                  marginVertical: spacing[4],
                }}
              > */}
        {/* <FormControl.Label>Search address here</FormControl.Label> */}
        {/* <AutoCompleteInput
          getOptions={getLocationOptions}
          onSelect={async (selectedLocation) => {
            const resp = await searchPlace(selectedLocation.label)
            console.log("resp ", resp)
            setSelectedAddress(resp)
            setValue('addrLine1', resp.addrLine1);
        setValue('city', resp.city);
        setValue('addrState', resp.state);
        setValue('postCode', resp.postCode);
        setValue('country', resp.country);
          }}
        /> */}
      {/* </View> */}
            {/* <Text fontSize={"lg"}>Enter delivery address</Text> */}
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
          {/* </VStack> */}
        {/* </ScrollView> */}
        <View>
        <AutoCompleteInput
          getOptions={getLocationOptions}
          onSelect={async (selectedLocation) => {
            const resp = await searchPlace(selectedLocation.label)
            console.log("resp ", resp)
            setSelectedAddress(resp)
            setValue('addrLine1', resp.addrLine1);
        setValue('city', resp.city);
        setValue('addrState', resp.state);
        setValue('postCode', resp.postCode);
        setValue('country', resp.country);
          }}
        />
          <Controller
            {...{ control }}
            name="addressType"
            render={({ field: { value, onBlur, onChange }, fieldState }) => {
              return (
                <FormControl marginTop={3}>
                  <FormControl.Label> Address type </FormControl.Label>
                  <Select
                    selectedValue={value}
                    onValueChange={(e) => {
                      console.log("address type", e);
                      setShowCustomType(e === "Custom");
                      onChange(e);
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
          {showCustomType ?
            <Controller
              {...{ control }}
              name="customType"
              render={({ field: { value, onBlur, onChange }, fieldState }) => {
                return (
                  <FormControl>
                    <FormInput
                      label="Customer Type"
                      name="customType"
                      {...{ control }}
                    />
                  </FormControl>
                )
              }}
            />
            : ""
          }

          <FormInput
            label="First name"
            name="firstName"
            required
            {...{ control }}
          />
          <FormInput
            label="Middle name"
            name="middleName"
            {...{ control }}
          />
          <FormInput
            label="Last name"
            required
            name="lastName"
            {...{ control }}
          />
          <FormInput
            label="Address line 1"
            required
            name="addrLine1"
            textInputprops={{
              editable: false,
            }}
            {...{ control }}
          />
          <FormInput
            label="Address line 2"
            name="addrLine2"
            {...{ control }}
          />
          <FormInput
            label="City/Town"
            textInputprops={{
              editable: false,
            }}
            name="city"
            required
            {...{ control }}
          />
          <FormInput
            label="State"
            required
            textInputprops={{
              editable: false,
            }}
            name="addrState"
            {...{ control }}
          />
          <FormInput
            label="Postalcode"
            required
            textInputprops={{
              editable: false,
            }}
            name="postCode"
            {...{ control }}
          />
          <FormInput
            label="Country"
            textInputprops={{
              editable: false,
            }}
            name="country"
            {...{ control }}
          />
          <FormInput
            label="Delivery Instruction"
            name="instructions"
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
          <Button mt={6} isLoading={loading} onPress={handleSubmit(onSubmit)}>
            <Text color="white"> {editMode ? "Update" : "Confirm"}</Text>
          </Button>
        </View>
        {/* </ScrollView> */}
       </ScrollView >
    </View >
  )
}
