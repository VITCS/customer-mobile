import React, { useState } from "react"
import { ViewStyle } from "react-native"
import { AutocompleteInput } from "ui"
import { Screen } from "../../components"

const ROOT: ViewStyle = {
  flex: 1,
}

export const TestScreen = (props) => {
  const [value, setValue] = useState("")
  return (
    <Screen style={ROOT} preset="fixed">
      <AutocompleteInput value={value} onChange={setValue} options={[]} />
    </Screen>
  )
}
