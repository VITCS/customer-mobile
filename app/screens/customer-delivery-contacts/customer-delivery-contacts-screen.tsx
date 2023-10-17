import { StackScreenProps } from "@react-navigation/stack"
import { Spinner, View } from "native-base"
import React, { useMemo, useState } from "react"
import { ViewStyle } from "react-native"
import {
  Accordion,
  DeliveryContactListItem,
  DeliveryContactListItemProps,
  Text,
} from "../../components"
import { useGetDeliveryContactsQuery } from "../../graphql/generated/graphql"
import { DeliveryContactParamList } from "../../navigators"
import { spacing } from "../../theme"
import { apiSdk, getUserId } from "../../utils/api"
import { formatname } from "../../utils/format"
// import { useNavigation } from "@react-navigation/native"

const ROOT: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing[2],
  paddingTop: spacing[2],
}
export type DeliveryContactScreenProps = StackScreenProps<
  DeliveryContactParamList,
  "deliveryContacts"
>

export const CustomerDeliveryContactsScreen: React.FC<DeliveryContactScreenProps> = () => {
  const [sections, setSections] = useState([0])

  const { data, isLoading, isError } = useGetDeliveryContactsQuery(apiSdk, {
    userId: getUserId(),
  })
  const deliveryContacts = useMemo(() => {
    return data?.getCustomerProfile?.customerContact?.items?.map((r) => {
      return {
        title: formatname(r.firstName, r.middleName, r.lastName) + " - " + r.contactCategory,
        id: r.id,
        ...r,
      }
    })
  }, [data])

  const renderContent = React.useCallback(
    (contact: DeliveryContactListItemProps["contact"], index: number, isOpen: boolean) => {
      console.log("contact details", contact);
      return <DeliveryContactListItem {...{ contact }} />
    },
    [],
  )
  return (
    <View style={ROOT}>
      {isLoading ? (
        <Spinner size="lg" />
      ) : (
        <>
          {deliveryContacts?.length === 0 ? (
            <Text alignSelf="center" mt={100} fontSize="xl" fontWeight="medium">
              No delivery contacts added
            </Text>
          ) : (
            <Accordion
              sections={deliveryContacts}
              activeSections={sections}
              onChange={setSections}
              renderAsFlatList
              expandMultiple
              renderContent={renderContent}
            />
          )}
        </>
      )}
    </View>
  )
}
