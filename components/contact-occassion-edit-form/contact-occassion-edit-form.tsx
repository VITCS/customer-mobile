import { FormControl, Input, Select, useDisclose, VStack } from "native-base"
import * as React from "react"
import { Control, useFormContext, Controller } from "react-hook-form"
import DatePicker from "react-native-date-picker"
import dayjs from "dayjs"
import { DATE_FORMAT } from "../../config/constants"
import { FontAwesome } from "@expo/vector-icons"
import { FormInput } from "ui"
import { ContactOccassionEditFormInput } from "../../screens"
export interface ContactOccassionEditFormProps {
  control: Control<ContactOccassionEditFormInput>
}

/**
 * Describe your component here
 */
export const ContactOccassionEditForm = (props: ContactOccassionEditFormProps) => {
  const { control } = props
  const { isOpen, onOpen, onClose } = useDisclose()
  return (
    <>
      <VStack px={6} mb={2}>
        <FormInput
          label="Occasion name"
          name="occasionTitle"
          required
          // autoCapitalize="none"
          {...{ control }}
        />
        {/* <TextField
          label="Occasion Date"
          autoCapitalize="none"
          value={occasionDate}
          onFocus={() => { onOpen() }}
          rightIcon={<AntDesign name="calendar" size={24} color="black" />}
        /> */}

        <Controller
          {...{ control }}
          name="occasionDate"
          render={({ field: { value, onBlur, onChange }, fieldState }) => {
            return (
              <FormControl isRequired={true}>
                <FormControl.Label>Occasion Date </FormControl.Label>
                <Input
                  autoCapitalize="none"
                  value={value}
                  onFocus={() => {
                    onOpen()
                  }}
                  InputRightElement={
                    <FontAwesome
                      size={18}
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
          name="reminder"
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
      </VStack>
    </>
  )
}
