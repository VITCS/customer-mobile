import { HStack, VStack } from "native-base"
import React from "react"
import { Image, ImageStyle } from "react-native"
import { Text } from "../../components"
import { MerchantUser } from "../../graphql/generated/graphql"
import { formatname } from "../../utils/format"
import { GenericListItem } from "../generic-list-item/generic-list-item"

export interface UserListItemProps<T> {
  user: T
  checked?: boolean
  onCheckChange?: (b: boolean) => any
  inMultiSelect?: boolean
}

const STORE_IMAGE: ImageStyle = {
  width: 48,
  height: 48,
  borderRadius: 24,
}
/**
 * Describe your component here
 */
export function UserListItem<
  T extends Pick<
    MerchantUser,
    "userId" | "firstName" | "lastName" | "middleName" | "userRole" | "email" | "phoneNumber"
  >
>(props: UserListItemProps<T>) {
  const { user, checked, inMultiSelect, onCheckChange } = props

  return (
    <GenericListItem
      name={formatname(user.firstName, user.middleName, user.lastName)}
      isMultiSelectEnabled={inMultiSelect}
      onCheckChange={onCheckChange}
      isSelected={checked}
    >
      <HStack w="100%" px={4} py={2}>
        <Image source={require("../../assets/user.png")} style={STORE_IMAGE} />
        <VStack ml={3} space={2} flex={1}>
          <HStack alignItems="center">
            <Text flex={1} fontWeight="700">
              User Id
            </Text>
            <Text fontWeight="400" color="gray.500" flex={2}>
              {user.userId}
            </Text>
          </HStack>

          <HStack alignItems="center" w="100%">
            {/* <Text>Email</Text> */}
            <Text flex={1} fontWeight="700">
              Email
            </Text>

            <Text fontWeight="400" color="gray.500" flex={2}>
              {user.email}
            </Text>
          </HStack>

          <HStack alignItems="center">
            <Text flex={1} fontWeight="700">
              Mobile number
            </Text>
            <Text fontWeight="400" color="gray.500" flex={2}>
              {user.phoneNumber}
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </GenericListItem>
  )
}
