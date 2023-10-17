import * as React from "react"
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form"
import { TextInputProps } from "react-native"
import { TextField } from "ui"

export type FormInputProps<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
  label: string
  secureTextEntry?: boolean
  required?: boolean
  textInputprops?: TextInputProps
}
export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  secureTextEntry,
  required,
  textInputprops,
}: FormInputProps<T>) {
  return (
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value }, fieldState }) => (
        <TextField
          {...{ required }}
          errorMessage={fieldState.error?.message}
          secureTextEntry={secureTextEntry}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          label={label}
          {...textInputprops}
        />
      )}
      name={name}
    />
  )
}
