import { FormikHandlers, FormikHelpers } from "formik"
import { FormControl, Select, View, VStack } from "native-base"
import * as React from "react"
import {
  Control,
  Controller,
  useFormContext,
  UseFormSetValue,
  useFormState,
  useWatch,
} from "react-hook-form"
import { AutoCompleteInput, FormInput, spacing } from "ui"
import {
  AddressType,
  CreateCustomerAddressInput,
  CustomerAddress,
} from "../../graphql/generated/graphql"
import { AddNewContactInput } from "../../screens/add-delivery-contact-form/add-delivery-contact-form-screen"
import { getLocationOptions, searchPlace } from "../../utils/api"
import {
  AddNewContactAddressesList,
  AddNewContactFormContainer,
  ADDRESS_CATEGORIES,
  Button,
  Text,
} from "../index"

// type  InputDataKeys =
// export type AddNewContactAddressesFormProps = Pick<FormikHandlers, "handleBlur" | "handleChange"> &
//   Pick<FormikHelpers<AddNewContactInput>, "setFieldValue"> & {
//     values: Array<
//       Pick<
//         CustomerAddress,
//         | "addrLine1"
//         | "addrLine2"
//         | "addrState"
//         | "city"
//         | "country"
//         | "firstName"
//         | "lastName"
//         | "middleName"
//         | "phoneNumber"
//         | "markDefault"
//       >
//     >
//   }

export interface AddNewContactAddressesFormProps {
  control: Control<AddNewContactInput>
  index: number
  //getValues: CreateCustomerAddressInput
  // getValues: UseFormSetValue<AddNewContactInput>
  // values: Array<
  //   Pick<
  //     CreateCustomerAddressInput,
  //     | "addrLine1"
  //     | "addrLine2"
  //     | "addrState"
  //     | "city"
  //     | "country"
  //     | "firstName"
  //     | "lastName"
  //     | "middleName"
  //     | "phoneNumber"
  //     | "markDefault"
  //   >
  // >
}

const defaultAddress: Partial<CreateCustomerAddressInput> = {
  addrLine1: "one",
  city: "Hyderabad",
  addrLine2: "twio",
  addrState: "Tg",
  country: "India",
  addressType: AddressType.Home,
  firstName: "First ",
  middleName: "middle",
  lastName: "last",
  instructions: "some in",
  phoneNumber: "+9876543210",
}

/**
 * Describe your component here
 */
export const AddNewContactAddressesForm = React.memo(function AddNewContactAddressesForm(
  props: AddNewContactAddressesFormProps,
) {
  // const { values: addresses, setFieldValue, handleBlur, handleChange } = props
  const { control, index } = props
  const { setValue } = useFormContext()
  const [showCustomType, setShowCustomType] = React.useState(false)
  const formState = useFormState({ control })
  console.log(" formState : ", formState)
  return (
    <VStack  space="sm">
      <View
        style={{
          marginVertical: spacing[4],
        }}
      >
        <AutoCompleteInput
          getOptions={getLocationOptions}
          onSelect={async (selectedLocation) => {
            const resp = await searchPlace(selectedLocation.label)
            console.log("resp ", resp, " index ", index)
            setValue(`addresses.${index}.addrLine1`, resp?.addrLine1)
            setValue(`addresses.${index}.city`, resp?.city)
            setValue(`addresses.${index}.addrState`, resp?.state)
            setValue(`addresses.${index}.postCode`, resp?.postCode)
            setValue(`addresses.${index}.country`, resp?.country)
          }}
        />
      </View>
      <Controller
        {...{ control }}
        name={`addresses.${index}.addressType`}
        render={({ field: { value, onBlur, onChange }, fieldState }) => {
          return (
            <FormControl>
              <FormControl.Label marginTop={3}> Address type </FormControl.Label>
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
          name={`addresses.${index}.contactCustomType`}
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
      <FormInput
        label="First name"
        name={`addresses.${index}.firstName`}
        required
        {...{ control }}
      />
      <FormInput label="Middle name" name={`addresses.${index}.middleName`} {...{ control }} />
      <FormInput label="Last name" required name={`addresses.${index}.lastName`} {...{ control }} />
      <FormInput
        {...{ control }}
        label="Address line 1"
        textInputprops={{
          editable: false,
        }}
        name={`addresses.${index}.addrLine1`}
        required
      />
      <FormInput {...{ control }} label="Address line 2" name={`addresses.${index}.addrLine2`} />
      <FormInput
        {...{ control }}
        label="City or Town"
        textInputprops={{
          editable: false,
        }}
        name={`addresses.${index}.city`}
        required
      />

      <FormInput
        {...{ control }}
        label="State"
        required
        name={`addresses.${index}.addrState`}
        textInputprops={{
          editable: false,
        }}
      />
      <FormInput
        {...{ control }}
        label="Zip code"
        required
        textInputprops={{
          editable: false,
        }}
        name={`addresses.${index}.postCode`}
      />
      <FormInput
        {...{ control }}
        label="Country"
        required
        textInputprops={{
          editable: false,
        }}
        name={`addresses.${index}.country`}
      />
      <FormInput
        label="Delivery Instruction"
        name={`addresses.${index}.instructions`}
        {...{ control }}
      />
    </VStack>
  )
})
