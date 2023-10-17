import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../"
import { color, typography } from "../../theme"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

export interface CategoriesListProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const CategoriesList = (props: CategoriesListProps) => {
  const { style } = props

  return (
    <View style={CONTAINER}>
      <Text style={TEXT}>Hello</Text>
    </View>
  )
}
