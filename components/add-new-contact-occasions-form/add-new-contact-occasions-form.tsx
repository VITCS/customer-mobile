import { Feather, MaterialCommunityIcons } from "@expo/vector-icons"
import dayjs from "dayjs"
import { FormikHandlers, FormikHelpers } from "formik"
import { isInterfaceType } from "graphql"
import { Box, FormControl, HStack, Select, useDisclose, VStack, Input } from "native-base"
import React, { useState } from "react"
import { Control, Controller, UseFormSetValue } from "react-hook-form"
import { Platform } from "react-native"
import { FormInput } from "ui"
import { CreateCustomerOccasionInput } from "../../graphql/generated/graphql"
import { AddNewContactFormContainer, Button, Text, TextField } from "../index"
import { FontAwesome } from "@expo/vector-icons"
import { DATE_FORMAT } from "../../config/constants"
import { AddNewContactInput } from "../../screens/add-delivery-contact-form/add-delivery-contact-form-screen"
import DatePicker from "react-native-date-picker"
type InputDataKeys = "occasionDate" | "occasionTitle" | "reminder"
// export type AddNewContactOccasionsFormProps = Pick<FormikHandlers, "handleBlur" | "handleChange"> &
//   Pick<FormikHelpers<AddNewContactInput>, "setFieldValue"> & {
//     values: Array<Pick<CreateCustomerOccasionInput, InputDataKeys>>
//   }
export interface AddNewContactOccasionsFormProps {
  control: Control<AddNewContactInput>
  index: number
  // getValues: UseFormSetValue<AddNewContactInput>
  // values: Array<Pick<CreateCustomerOccasionInput, InputDataKeys>>
}
// const CustomDatePicker = () => null

// const DatePicker = Platform.OS === "web" ? CustomDatePicker : CustomDatePicker
/**
 * Describe your component here
 */

export const AddNewContactOccasionsForm = React.memo(function AddNewContactOccasionsForm(
  props: AddNewContactOccasionsFormProps,
) {
  const { control, index } = props

  const { isOpen, onOpen, onClose } = useDisclose()
  return (
    <VStack>
      <FormInput
        label="Occasion name"
        name={`occasions.${index}.occasionTitle`}
        required
        // autoCapitalize="none"
        {...{ control }}
        
      />
      <Controller
        {...{ control }}
        name={`occasions.${index}.occasionDate`}
        render={({ field: { value, onBlur, onChange }, fieldState }) => {
          return (
            <FormControl isRequired={true}>
              <FormControl.Label>Occasion Date </FormControl.Label>
              <TextField
                autoCapitalize="none"
                value={value}
                onFocus={() => {
                  onOpen()
                }}
                InputRightElement={
                  <FontAwesome
                    size={20}
                    style={{ marginRight: 5, color: "#b72618" }}
                    name="calendar"
                  />
                }
              />
              <DatePicker
                open={isOpen}
                onDateChange={() => {}}
                mode="date"
                date={(value && dayjs(value, DATE_FORMAT).toDate()) || new Date()}
                // date={new Date(occasionDate)}
                onConfirm={(date) => {
                  //   setFieldValue("occasionDate", dayjs(date).format(DATE_FORMAT))
                  onChange(dayjs(date).format(DATE_FORMAT))
                  //console.log("  date value ", value)
                  onClose()
                }}
                modal
                onCancel={() => {
                  onClose()
                }}
              />
            </FormControl>
          )
        }}
      />
      <Controller
        {...{ control }}
        name={`occasions.${index}.reminder`}
        render={({ field: { value, onBlur, onChange }, fieldState }) => {
          return (
            <FormControl>
              <FormControl.Label> Reminder </FormControl.Label>
              <Select
                onValueChange={(a) => onChange("reminder", a === "Yes")}
                borderWidth={1}
                selectedValue={value ? "Yes" : "No"}
                defaultValue="Yes"
              >
                <Select.Item value={"Yes"} label={"Yes"} />
                <Select.Item value={"No"} label={"No"} />
              </Select>
            </FormControl>
          )
        }}
      />

      {/* <Button
          onPress={() => {
            getValues("occasions", [
              ...occasions,
              {
                occasionTitle,
                occasionDate,
                reminder,
              },
            ])
          }}
        >
          Add
        </Button> */}
    </VStack>
  )
})
