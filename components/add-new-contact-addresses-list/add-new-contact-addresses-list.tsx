import { Box } from "native-base"
import React, { memo } from "react"
import { Control, UseFormSetValue } from "react-hook-form"
import { View, ViewStyle } from "react-native"
import { CreateCustomerAddressInput } from "../../graphql/generated/graphql"
import { AddNewContactInput } from "../../screens/add-delivery-contact-form/add-delivery-contact-form-screen"
import { AddNewContactAddressesListItem } from "../add-new-contact-addresses-list-item/add-new-contact-addresses-list-item"
import { Text } from "../index"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

export interface AddNewContactAddressesListProps {
  control: Control<AddNewContactInput>
  addresses: CreateCustomerAddressInput[]
  getValues: UseFormSetValue<AddNewContactInput>
}

/**
 * Describe your component here
 */

export const AddNewContactAddressesList = memo((props: AddNewContactAddressesListProps) => {
  const { control, addresses, getValues } = props
  return (
    <View style={CONTAINER}>
      {addresses.map((address, addrIndex) => {
        return (
          <Box
            key={addrIndex}
            width="100%"
            mb={3}
            borderBottomWidth={addrIndex !== addresses.length - 1 ? 1 / 2 : 0}
            borderColor="grey"
            pb={3}
          >
            <Text mb={2} fontSize="lg">
              Address #{addrIndex + 1}{" "}
            </Text>
            <AddNewContactAddressesListItem
              {...{ control, getValues, addresses }}
              index={addrIndex}
            />
          </Box>
        )
      })}
    </View>
  )
})
