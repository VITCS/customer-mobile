import { FontAwesome5 } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/core"
import { StackNavigationProp } from "@react-navigation/stack"
import { HStack, useToast, useToken, VStack, Divider } from "native-base"
import React from "react"
import { Alert, ViewStyle } from "react-native"
import { useQueryClient } from "react-query"
import { Button, DeliveryAddressCard, DeliveryOccasionCard, Text } from "../"
import {
  ContactCategory,
  CustomerContact,
  useDeleteCustomerAddressMutation,
  useDeleteCustomerContactMutation,
  useDeleteCustomerOccasionMutation,
  useGetDeliveryContactsQuery,
} from "../../graphql/generated/graphql"
import { DeliveryContactParamList } from "../../navigators"
import { IListItem } from "../../utils/component-util-types"
import { apiSdk, getUserId } from "./../../utils/api"

const CONTAINER: ViewStyle = {
  justifyContent: "center"
}

export interface DeliveryContactListItemProps {
  contact: Pick<
    CustomerContact,
    | "id"
    | "firstName"
    | "middleName"
    | "lastName"
    | "occasions"
    | "phoneNumber"
    | "email"
    | "deliveryAddress"
    | "contactCategory"
    | "contactCustomType"
  >
}

type DeliveryContactScreenProps = StackNavigationProp<DeliveryContactParamList, "deliveryContacts">

export const DeliveryContactListItem = React.memo(function DeliveryContactListItem(
  props: DeliveryContactListItemProps,
) {
  const { contact } = props
  const navigation = useNavigation<DeliveryContactScreenProps>()
  const toast = useToast()
  const { id, email, phoneNumber, deliveryAddress, occasions, contactCategory } = contact
  const [primary] = useToken("colors", ["primary.500"])
  const { mutate: deleteAddress } = useDeleteCustomerAddressMutation(apiSdk, {
    onSuccess: (data) => {
      console.log("delete res is ", data)
      queryClient.refetchQueries(useGetDeliveryContactsQuery.getKey({ userId }))
      toast.show({
        title: "Success",
        description: "Deleted address"
      })
    },
    onError: (error) => {
      console.log("error in deleting address >>", error)

      toast.show({
        title: "Error",
        description: "Seomthing went wrong."
      })
    },
  })
  const queryClient = useQueryClient()
  const userId = getUserId()
  const { mutate: deleteOccasion } = useDeleteCustomerOccasionMutation(apiSdk, {
    onSuccess: (data) => {
      queryClient.refetchQueries(useGetDeliveryContactsQuery.getKey({ userId }))
      toast.show({
        title: "Success",
        description: "Deleted occasion",
      })
    },
    onError: (error) => {
      console.log("error in deleting occasion >>", error)

      toast.show({
        title: "Error",
        description: "Seomthing went wrong."
      })
    },
  })
  const { mutate: deleteContact } = useDeleteCustomerContactMutation(apiSdk, {
    onSuccess: (data) => {
      queryClient.refetchQueries(useGetDeliveryContactsQuery.getKey({ userId }))
      toast.show({
        title: "Success",
        description: "Deleted Contact",
      })
    },
    onError: (error) => {
      console.log("error in deleting occasion >>", error)

      toast.show({
        title: "Error",
        description: "Seomthing went wrong."
      })
    },
  })
  const onAddressDelete = React.useCallback(
    (item: IListItem) => {
      const { id } = item
      Alert.alert("Confirm delete", "Are you sure to delete selected address", [
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            deleteAddress({
              input: {
                id,
              },
            })
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ])
    },
    [deleteAddress],
  )
  const onAddressEdit = React.useCallback((item: IListItem) => {
    const { id } = item
    console.log("clicked to edit contact", id)
    navigation.navigate("addAddress", { id })
  }, [])
  const onOccasionDelete = React.useCallback((item: IListItem) => {
    const { id } = item
    Alert.alert("Confirm delete", "Are you sure to delete selected occasion", [
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          deleteOccasion({
            input: {
              id,
            },
          })
        },
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ])
  }, [])
  const onContactEdit = React.useCallback((contact: DeliveryContactListItemProps) => {
    console.log("clicked to edit Contact >>", id)
    navigation.navigate("addContact", { contact })
  }, [])
  const onOccasionEdit = React.useCallback((item: IListItem) => {
    const { id } = item
    console.log("clicked to edit occasion >>", id)
    navigation.navigate("addOccasion", { id })
  }, [])
  return (
    <VStack
      style={CONTAINER}
      space="sm"
      p={3}
      borderColor="#b72618"
      borderWidth={1}
      borderTopWidth={0}
      borderRadius={5}
      borderTopRadius={0}
      marginTop={-1}
    >
      {contactCategory !== ContactCategory.Self ? (
        <HStack mx={4} mt={8} space="lg" justifyContent="space-between">
          <Button
            variant="solid"
            flex={1}
            onPress={() => {
              onContactEdit({ ...{ contact } })
            }}
          >
            Edit
          </Button>
          <Button
            variant="outline"
            flex={1}
            width="100%"
            onPress={() => {
              Alert.alert("Delete Contact", "Are you sure to Delete Contact?", [
                {
                  text: "Ok",
                  style: "destructive",
                  onPress: async () => {
                    deleteContact({
                      input: {
                        id,
                      },
                    })
                  },
                },
                {
                  text: "cancel",
                  style: "cancel",
                },
              ])
            }}
          >
            <Text color="white">Remove</Text>
          </Button>
        </HStack>
      ) : (null)}
      <Text style={{ fontSize: 16 }} flex={1} fontWeight="medium" noOfLines={1}>
        BASIC INFO
      </Text>
      <HStack w="100%" justifyContent="space-between">
        <Text fontSize="md" flex={1} fontWeight="semibold">
          Mobile number :
        </Text>
        <Text fontSize="md" flex={1} ml={2} fontWeight="medium" textAlign="right">
          {phoneNumber}
        </Text>
      </HStack>
      <HStack w="100%" justifyContent="space-between" alignItems="center">
        <Text fontSize="md" flex={1} fontWeight="semibold">
          Email ID :
        </Text>
        <Text fontSize="md" flex={1} fontWeight="medium" noOfLines={1}>
          {email}
        </Text>
      </HStack>
      <Divider />
      <HStack w="100%" justifyContent="space-between" alignItems="center">
        <Text flex={1} fontSize="xl" fontWeight="semibold">
          OCCASIONS
        </Text>
        <Button px={2}
          py={2}
          variant="outline"
          onPress={() => {
            navigation.navigate("addOccasion", {
              customerContactId: contact.id,
            })
          }}
        >
          <FontAwesome5 name="plus" />
        </Button>
      </HStack>
      <VStack space="md" w="100%" justifyContent={"space-between"}>
        {occasions?.items?.map((occasion) => {
          return (
            <>
              <DeliveryOccasionCard
                key={occasion.id}
                {...occasion}
                onEdit={onOccasionEdit}
                onDelete={onOccasionDelete}
              />
              <Divider />
            </>
          )
        })}
      </VStack>
      <VStack>
        <HStack mb={3} justifyContent="space-between" alignItems="center">
          <Text fontSize="xl" fontWeight="semibold">
            DELIVERY ADDRESSES
          </Text>
          <Button px={2}
            py={2}
            variant="outline"
            onPress={() => {
              navigation.navigate("addAddress", {
                customerContactId: contact.id,
              })
            }}
          >
            <FontAwesome5 name="plus" />
          </Button>
        </HStack>
        <VStack space="md">
          {deliveryAddress?.items?.map((address) => {
            const {
              firstName,
              middleName,
              lastName,
              addrLine1,
              addrLine2,
              city,
              postCode,
              addrState,
              country,
              markDefault,
              instructions,
              id,
              addressType
            } = address
            return (
              <DeliveryAddressCard
                key={id}
                {...{
                  id,
                  firstName,
                  lastName,
                  addrLine1,
                  addrLine2,
                  city,
                  addrState,
                  markDefault,
                  middleName,
                  postCode,
                  country,
                  instructions,
                  addressType
                }}
                onEdit={onAddressEdit}
                onDelete={onAddressDelete}
              />
            )
          })}
        </VStack>
      </VStack>
    </VStack >
  )
})
