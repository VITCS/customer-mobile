import { HStack, ITextProps, VStack } from "native-base"
import * as React from "react"
import { View, ViewStyle } from "react-native"
import { Text } from "../"
import { CustomerProfile } from "../../graphql/generated/graphql"
import { formatname } from "../../utils/format"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const labelProps: ITextProps = {
  fontSize: "xl",
  fontWeight: "700",
}

const valueProps: ITextProps = {
  fontSize: "lg",
  fontWeight: "500",
  isTruncated: true,
}
export interface UserPrimaryDetailsProps {
  user: Pick<
    CustomerProfile,
    "firstName" | "lastName" | "middleName" | "email" | "phoneNumber" | "userId"
  >
}

/**
 * Describe your component here
 */
export const UserPrimaryDetails = (props: UserPrimaryDetailsProps) => {
  const { user } = props
  console.log("user props", user)
  const { firstName, lastName, middleName, email, phoneNumber, userId } = user
  return (
    <View style={CONTAINER}>
      <VStack space="md" px={4} py={2}>
        <HStack>
          <Text {...labelProps} flex={1}>
            User ID
          </Text>
          <Text {...valueProps} flex={1}>
            {userId}
          </Text>
        </HStack>
        <HStack>
          <Text {...labelProps} flex={1}>
            User name
          </Text>
          <Text {...valueProps} flex={1} numberOfLines={4}>
            {formatname(firstName, middleName, lastName)}
          </Text>
        </HStack>
        <HStack>
          <Text {...labelProps} flex={1}>
            Email
          </Text>
          <Text {...valueProps} flex={1}>
            {email}
          </Text>
        </HStack>
        <HStack>
          <Text {...labelProps} flex={1}>
            Mobile number
          </Text>
          <Text {...valueProps} flex={1}>
            {phoneNumber}
          </Text>
        </HStack>
      </VStack>
    </View>
  )
}
