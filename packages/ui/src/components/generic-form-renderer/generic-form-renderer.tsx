/* eslint-disable react/display-name */
import { useField } from "formik"
import { View } from "native-base"
import * as React from "react"
import { TextInputProps } from "react-native"
import { TextField } from "../"

export type GenericFormRendererProps<T> = {
  formInputs: Array<IDynamicInput<T>>
}

export type IDynamicInput<T> = {
  label?: string
  dataKey?: keyof T | string
  required?: boolean
  render?: () => React.ReactNode
  autoCapitalize?: TextInputProps["autoCapitalize"]
  show?: boolean
  // value: string
  // touched?: boolean
  // errorMessage?: string
  // handleChange?: FormikHandlers["handleChange"]
  // handleBlur?: FormikHandlers["handleBlur"]
}

const EachFormInput = React.memo(<T extends unknown>(props: IDynamicInput<T>) => {
  const {
    label,
    show = true,
    required,
    render,
    dataKey,
    autoCapitalize,
    // value,
    // errorMessage,
    // handleBlur,
    // handleChange,
    // touched,
  } = props
  const key = dataKey as string
  const [{ value, onChange, onBlur }, { touched, error }] = useField({
    name: key,
  })
  // const { handleChange, touched, errors, handleBlur, values } = useFormikContext<T>()

  if (!show) {
    return <React.Fragment {...{ key }} />
  }
  return render ? (
    <React.Fragment {...{ key }}>{render()}</React.Fragment>
  ) : (
    <>
      <TextField
        {...{ key }}
        autoCapitalize={autoCapitalize || "none"}
        label={label}
        onChangeText={onChange(dataKey)}
        errorMessage={touched && (error as string)}
        onBlur={onBlur(dataKey as string)}
        required={required || false}
        value={(value as string) || ""}
      />
    </>
  )
})

EachFormInput.displayName = "EachFormInput"

EachFormInput.whyDidYouRender = true

export const GenericFormRenderer = <T extends any>(props: GenericFormRendererProps<T>) => {
  const { formInputs } = props
  // const { handleChange, touched, errors, handleBlur, values } = useFormikContext<T>()

  return (
    <View>
      {formInputs.map((input, iIndex) => {
        return (
          <View key={iIndex} mb={3}>
            <EachFormInput {...input} />
          </View>
        )

        // const { label, show = true, required, render, dataKey, autoCapitalize } = input
        // const key = dataKey as string
        // const finalValue = get(values, dataKey)

        // if (!show) {
        //   return <React.Fragment {...{ key }} />
        // }
        // return render ? (
        //   <React.Fragment {...{ key }}>{render()}</React.Fragment>
        // ) : (
        //   <>
        //     <TextField
        //       {...{ key }}
        //       autoCapitalize={autoCapitalize || "none"}
        //       label={label}
        //       onChangeText={handleChange(dataKey)}
        //       errorMessage={touched[dataKey] && (errors[dataKey] as string)}
        //       onBlur={handleBlur(dataKey as string)}
        //       required={required || false}
        //       value={(finalValue as string) || ""}
        //     />
        //   </>
        // )
      })}
    </View>
  )
}

// GenericFormRenderer.whyDidYouRender = true
