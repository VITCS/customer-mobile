import { Box, FlatList, Spinner } from "native-base"
import * as React from "react"
import { DeliveryAddressCard, IEnumCategories } from "../"
import {
  ContactCategory,
  CustomerAddress,
  useCustomerContactsByCustomerProfileIdQuery,
} from "../../graphql/generated/graphql"
import { apiSdk, getUserId } from "../../utils/api"

export interface DeliveryAddressesListProps {
  category: IEnumCategories
}

/**
 * Describe your component here
 */

type IStateAddress = Pick<
  CustomerAddress,
  | "firstName"
  | "addressType"
  | "addrLine1"
  | "addrLine2"
  | "city"
  | "country"
  | "addrState"
  | "id"
  | "postCode"
  | "latitude"
  | "longitude"
  | "lastName"
>[]
export const DeliveryAddressesList = (props: DeliveryAddressesListProps) => {
  const { category } = props
  let filters;
  if (category === "All") {
    filters = null;
  }
  if (category === "Self") {
    filters = { contactCategory: { eq: ContactCategory.Self } };
  }
  if (category === "Recent") {
    return (
      <Box mt={5} > No recent Contacts available</Box>
    )
  }
  const { data, isLoading } = useCustomerContactsByCustomerProfileIdQuery(apiSdk, {
    userID: getUserId(),
    filter: filters
  })

  const formattedData = React.useMemo(() => {
    return data?.CustomerContactsByCustomerProfileId?.items?.flatMap((eachContact) => {
      return eachContact?.deliveryAddress?.items?.map((eachAddress) => {
        return {
          ...eachAddress,
          // firstName: eachContact.firstName,
          // middleName: "",
          // lastName: "",
        }
      })
    })
  }, [data])
  return (
    <FlatList
      data={formattedData}
      refreshing={isLoading}
      ListEmptyComponent={isLoading ? <Spinner /> : <Box>No addresses found</Box>}
      my={6}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <Box h={4} />}
      renderItem={({ item }) => {
        const {
          id,
          firstName,
          addressType,
          addrLine1,
          addrLine2,
          city,
          latitude,
          longitude,
          country,
          postCode,
        } = item
        return (
          <Box mt={1} key={id}>
            <DeliveryAddressCard
              {...{
                id,
                firstName,
                addressType,
                addrLine1,
                addrLine2,
                city,
                latitude,
                longitude,
                country,
                postCode,
                category
              }}
            />
          </Box>
        )
      }}
    />
  )
}
