import { HStack, ITextProps, VStack } from "native-base"
import * as React from "react"
import { View } from "react-native"
import { Text } from "../"
import { GetUserProfileQuery } from "../../graphql/generated/graphql"
import { EMPTY_VALUE_STRING, formatAddress } from "../../utils/format"

export interface UserProfileContactsProps {
  user: Partial<GetUserProfileQuery["getMerchantUser"]>
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

/**
 * Describe your component here
 */
export const UserProfileContacts = (props: UserProfileContactsProps) => {
  const { user } = props
  const { address } = user

  return (
    <View>
      <VStack px={4} py={4}>
        <HStack>
          <Text {...labelProps} flex={1}>
            Address
          </Text>
          {address ? (
            <Text {...valueProps} flex={1} numberOfLines={4}>
              {formatAddress(address)}
            </Text>
          ) : (
            <Text>{EMPTY_VALUE_STRING}</Text>
          )}
        </HStack>
      </VStack>
    </View>
  )
}
