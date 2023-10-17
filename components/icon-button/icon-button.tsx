import * as React from "react"
import { ReactNode } from "react"
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native"
import { spacing } from "../../theme"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
  padding: spacing[2],
}

export interface IconButtonProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  icon: ReactNode
  onPress?: () => any
}

/**
 * Describe your component here
 */
export const IconButton = (props: IconButtonProps) => {
  const { style, icon, onPress } = props

  return (
    <TouchableOpacity onPress={onPress} style={[CONTAINER, style]}>
      {icon}
    </TouchableOpacity>
  )
}
