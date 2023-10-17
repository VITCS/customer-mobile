import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons"
import { Divider, HStack, Menu, Switch, useToast, View, VStack } from "native-base"
import * as React from "react"
import { Pressable } from "react-native"
import { useQueryClient } from "react-query"
import {
  ContactCategory,
  CustomerAddress,
  useCustomerContactsByCustomerProfileIdQuery,
  useGetDeliveryAddressInitQuery,
  useGetDeliveryAddressQuery,
  useUpdateCartMutation,
  useUpdateCartShipmentMutation,
  useUpdateUserMutation,
} from "../../graphql/generated/graphql"
import { IStateAddress, useCart, useDeliveryAddress } from "../../stores/cart"
import { apiSdk, getUserId } from "../../utils/api"
import { IGenericListItemOptions } from "../../utils/component-util-types"
import { commaify, formatname } from "../../utils/format"
import { Text } from "../index"
import { useNavigation } from "@react-navigation/native"
import { Checkbox } from "ui"
export type INeccessaryFieldsForDeliveryAddressCard = Pick<
  CustomerAddress,
  | "id"
  | "addrLine1"
  | "addrLine2"
  | "firstName"
  | "middleName"
  | "markDefault"
  | "city"
  | "addrState"
  | "postCode"
  | "country"
  | "instructions"
  | "addressType"
  | "id"
  | "latitude"
  | "longitude"
>

export type DeliveryContactCardProps = INeccessaryFieldsForDeliveryAddressCard &
  IGenericListItemOptions & {
    isDefaultAddress?: boolean
    category?: string
    // onDeliveryToggle?: () => any
  }

/**
 * Describe your component here
 */
export const DeliveryAddressCard = React.memo(function DeliveryAddressCard(
  props: DeliveryContactCardProps,
) {
  const {
    markDefault,
    firstName,
    addrLine1,
    addrLine2,
    city,
    country,
    addrState,
    postCode,
    instructions,
    onEdit,
    latitude,
    longitude,
    onDelete,
    id,
    index,
    addressType,
    category
  } = props
  const { data: deliveryAddress } = useDeliveryAddress()
  // const { data: profiledata } = useGetProfileQuery(apiSdk, {
  //   userId: getUserId(),
  // })
  const navigation = useNavigation()
  const queryClient = useQueryClient()
  const dId = React.useMemo(() => deliveryAddress?.id, [deliveryAddress])

  const memoOnEdit = React.useCallback(() => {
    console.log("clickedon ", props)

    onEdit({ id, index })
  }, [onEdit, id, index])
  const toast = useToast()
  const memoOnDelete = React.useCallback(() => {
    onDelete({ id, index })
  }, [onDelete, id, index])
  const isThisDeliveryTo = React.useMemo(() => dId === id, [dId, id])
  const userId = getUserId()


  // const cartUpdate = () => {
  //   const cart = useCart()
  //   const cartItemsCount = React.useMemo(
  //     () => cart?.cartShipment?.items?.map((r) => r.lineItems.length).reduce((a, b) => a + b, 0),
  //     [cart],
  //   )
  //   console.log("Cart Product length", cartItemsCount);
  //   if (cartItemsCount > 0) {
  //     const updatedCart = cart;
  //     updatedCart.cartShipment.items.forEach(async (eachCartShipment) => {
  //       eachCartShipment.lineItems.forEach((product) => {
  //         product.itemInvalid = true;
  //       });
  //     });
  //     console.log("Invalid Cart", updatedCart);
  //     // const { mutateUpdateCart } = useUpdateCartMutation(apiSdk, {
  //     //   input: {
  //     //     UpdateCartInput: updatedCart
  //     //   }
  //     // });
  //   }
  // }
  const cart = useCart()
  const { mutate: updateCartShipment } = useUpdateCartShipmentMutation(apiSdk, {
    onSuccess: (data) => {

    },
  })
  const { mutate } = useUpdateUserMutation(apiSdk, {
    onSuccess: async () => {
      toast.show({
        title: "Successfully Updated",
        description: ""
      })
      queryClient.refetchQueries(useGetDeliveryAddressInitQuery.getKey({ userId }))
      queryClient.refetchQueries(useGetDeliveryAddressQuery.getKey({ userId }))
      queryClient.refetchQueries(useCustomerContactsByCustomerProfileIdQuery.getKey({
        userID: userId,
        filter: {
          contactCategory: { eq: category }
        }
      }))
      let cartItemsCount = 0;
      cart.cartShipment.items.forEach((eachCartShipment) => {
        eachCartShipment.lineItems.forEach(() => {
          cartItemsCount++;
        });
      });
      console.log("Cart Product length", cartItemsCount);
      if (cartItemsCount > 0) {
        const updatedCart = cart;
        updatedCart.cartShipment.items.forEach(async (eachCartShipment) => {
          eachCartShipment.lineItems.forEach((product) => {
            product.itemInvalid = true;
            delete eachCartShipment.serviceCharge

          });
          updateCartShipment({
            input: eachCartShipment
          })
        });
        console.log("Invalid Cart", updatedCart);


        //  cartUpdate();

      }
    }
  })
  const onDeliveryToggle = (newDeliveryAddress: IStateAddress) => {
    console.log("newDeliveryId", newDeliveryAddress)
    mutate({
      input: {
        userId: getUserId(),
        deliveryToId: newDeliveryAddress.id,
      },
    })
  }
  return (
    <View rounded="sm" borderRadius={8} bg="bg" h="32">
      <HStack w={"100%"} justifyContent="space-between" px={4} py={2} alignItems="flex-start">
      <Checkbox
                  value={markDefault}
                  onValueChange={(selected) => {
                  
                  }}
                />
        {/* <FontAwesome5 name="check-circle" size={24} color={markDefault ? "green" : "grey"} /> */}
        <VStack flexGrow="2" ml={2}>
          <Text fontWeight="bold" ml={3} style={{ fontSize: 16 }} numberOfLines={1}>
            {formatname(firstName, "-", addressType)}
          </Text>
          <HStack alignItems="center">
            <Text mr={3}>Delivery to</Text>
            <Switch
              ml="2"
              size="sm"
              isChecked={isThisDeliveryTo}
              onToggle={() => {
                if (!isThisDeliveryTo) {
                  onDeliveryToggle({
                    latitude,
                    longitude,
                    id: id,
                    addrLine1,
                    addrLine2,
                    city,
                    country,
                  })
                }
              }}
            />
          </HStack>
          {/* <Text>{formatname(firstName, middleName, lastName)}</Text> */}
          <Text style={{ fontSize: 12 }}>
            {commaify(addrLine1, addrLine2, postCode, city, addrState, country)}
          </Text>
          <Text style={{ fontSize: 12 }}>Delivery instructions</Text>
          <Text style={{ fontSize: 12 }}>{instructions}</Text>
        </VStack>

        <View flexDir="row" alignItems="center">
          {(onEdit || onDelete) && (
            <Menu
              trigger={(triggerProps) => {
                return (
                  <Pressable {...triggerProps}>
                    <MaterialCommunityIcons name="dots-vertical" size={24} />
                  </Pressable>
                )
              }}
            >
              {onEdit && <Menu.Item onPress={memoOnEdit}>Edit</Menu.Item>}
              {onDelete && <Menu.Item onPress={memoOnDelete}>Delete</Menu.Item>}
            </Menu>
          )}
        </View>
      </HStack>
      <HStack flex={1} p={4} justifyContent="space-between">
        <VStack maxWidth="40%"></VStack>
        <Divider orientation="vertical" borderWidth={1} borderColor="grey" height="100%" />
      </HStack>
    </View>
  )
})
