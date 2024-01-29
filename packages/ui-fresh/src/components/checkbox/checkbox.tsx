import { useToken } from "native-base"
import * as React from "react"
import RNCheckbox, { CheckBoxProps as Props } from "@react-native-community/checkbox"

export function Checkbox(props: Props) {
  const { ...rest } = props
  const [brand] = useToken("colors", ["primary.500"])
  return (
    <RNCheckbox
      {...rest}
      tintColor={brand}
      style={{ borderColor: brand }}
      onCheckColor={brand}
      tintColors={{
        true: brand,
        false: "#333",
      }}
    />
  )
}
