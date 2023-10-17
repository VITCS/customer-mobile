import { View } from "native-base"
import React, { ReactNode } from "react"
import { ViewStyle } from "react-native"
import { Text } from "../"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

export interface UserSigupGenericFormProps {
  //title: string
  children: ReactNode
}

/**
 * Describe your component here
 */
export const UserSigupGenericForm = (props: UserSigupGenericFormProps) => {
  const { children } = props

  return (
    <View py={2} style={CONTAINER}>
      {/* <Text fontSize="3xl">{title}</Text> */}
      {children}
    </View>
  )
}
