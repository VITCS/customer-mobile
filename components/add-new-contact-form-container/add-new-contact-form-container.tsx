import * as React from "react"
import { View } from "react-native"
import { Text } from "../"

export interface AddNewContactFormContainerProps {
  title: string
  children: React.ReactNode
}

/**
 * Describe your component here
 */
export const AddNewContactFormContainer = (props: AddNewContactFormContainerProps) => {
  const { children, title } = props

  return (
    <View py={4}>
      <Text fontSize="xl" fontWeight="semibold" mb={3}>
        {title}
      </Text>
      {children}
    </View>
  )
}
