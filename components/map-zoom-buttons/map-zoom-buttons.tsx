import { FontAwesome5 } from "@expo/vector-icons"
import * as React from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { Button } from "../"

export interface MapZoomButtonsProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>

  onZoomIn: () => any

  onZoomOut: () => any
}

/**
 * Describe your component here
 */
export const MapZoomButtons = (props: MapZoomButtonsProps) => {
  const { style, onZoomIn, onZoomOut } = props

  return (
    <View
      style={[
        {
          position: "absolute",
          top: 200,
          left: 20,
        },
        style,
      ]}
    >
      <Button size="md" bg="white" onPress={onZoomIn}>
        <FontAwesome5 name="plus" />
      </Button>

      <Button size="md" bg="white" onPress={onZoomOut}>
        <FontAwesome5 name="minus" />
      </Button>
    </View>
  )
}
