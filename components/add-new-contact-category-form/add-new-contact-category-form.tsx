import { useFormikContext } from "formik"
import get from "lodash/get"
import { FormControl, Select, VStack } from "native-base"
import * as React from "react"
import { Control, Controller, useWatch } from "react-hook-form"
import { FormInput, PhonenumberInput } from "ui"
import { AddNewContactFormContainer, ADDRESS_CATEGORIES, IDynamicInput, TextField } from "../"
import { CreateCustomerContactInput } from "../../graphql/generated/graphql"
import { AddNewContactInput } from "../../screens/add-delivery-contact-form/add-delivery-contact-form-screen"

export interface AddNewContactCategoryFormProps {
  control: Control<AddNewContactInput>
}

/**
 * Describe your component here
 */
export const AddNewContactCategoryForm = (props: AddNewContactCategoryFormProps) => {
  const { control } = props
  const contactCustomType = useWatch({
    control,
    name: "contactCustomType",
  })

  return (
    // <AddNewContactFormContainer title="Category">
    <VStack>
      <Controller
        {...{ control }}
        name="contactCustomType"
        render={({ field: { onChange, onBlur, value } }) => (
          <FormControl isRequired>
            <FormControl.Label> Address type </FormControl.Label>
            <Select onValueChange={onChange} selectedValue={value} borderWidth={1}>
              {ADDRESS_CATEGORIES.map((cat) => (
                <Select.Item value={cat} label={cat} key={cat} />
              ))}
            </Select>
          </FormControl>
        )}
      />

      {contactCustomType === "Custom" && (
        <FormInput {...{ control }} name="contactCategory" label="Address type" />
      )}

      <FormInput {...{ control }} name="firstName" label="First name" required />
      <FormInput {...{ control }} name="middleName" label="Middle name" />
      <FormInput {...{ control }} name="lastName" label="Last name" required />

      <Controller
        {...{ control }}
        name="phoneNumber"
        render={({ field: { value, onBlur, onChange }, fieldState }) => {
          return (
            <FormControl isRequired isInvalid={!!fieldState?.error}>
              <FormControl.Label>Enter your phone number</FormControl.Label>
              <PhonenumberInput value={value} onBlur={onBlur} onChangeText={onChange} />
              <FormControl.ErrorMessage>{fieldState?.error?.message}</FormControl.ErrorMessage>
            </FormControl>
          )
        }}
      />
      <FormInput {...{ control }} name="email" label="Email" required />
      {/* </AddNewContactFormContainer> */}
    </VStack>
  )
}
