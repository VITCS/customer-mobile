import { CompositeNavigationProp, NavigationProp, useNavigation } from "@react-navigation/native"
import { Alert, Box, HStack, Text, VStack } from "native-base"
import React, { useCallback, useMemo } from "react"
import { ActivityIndicator } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useQueryClient } from "react-query"
import { Button, spacing } from "ui"
import {
  AvailabiiltySearchPicker,
  CategorizedList,
  HeaderLocationPicker,
  InvalidCartList,
  Screen,
} from "../../components"
import { Product, useDeleteCartMutation, useGetCartByUserIdQuery, useGetCartQuery } from "../../graphql/generated/graphql"
import { getCartInvalidFlag, useCartValidity, useFlexibleCart } from "../../hooks/cart"
import { CartParamsList, HomeParamList, MainStackParamsList } from "../../navigators"
import { IcustomWhiteListedShipments, useCart } from "../../stores/cart"
import { apiSdk, getUserId } from "../../utils/api"
import { useStyles } from "../../utils/styles"

// const groupByOptions = ["stores", "products"]

export const CartScreen = () => {
  const [orderLoading, setOrderLoading] = React.useState(false)
  const [shipmentsLoading, setShipmentsLoading] = React.useState(false)
  const cart = useCart()
  const fCart = useFlexibleCart()
  const [activeAvailabilitySearchProduct, setActiveAvailabilitySearchProduct] = React.useState<
    Pick<Product, "id" | "prodFullName" | "prodShortDesc">
  >(null)

  const [customWhiteListings, setCustomWhiteListings] = React.useState<IcustomWhiteListedShipments>(
    [],
  )

  const [validShipments, inValidShipments] = useCartValidity()
  const isAnyShipmentAddressInValid = useMemo(() => inValidShipments?.length > 0, [
    inValidShipments,
  ])
  const navigation = useNavigation<
    CompositeNavigationProp<
      NavigationProp<CartParamsList, "orderConfirmation">,
      NavigationProp<HomeParamList, "landing">
    // NavigationProp<CartParamsList, "cartHome">
    >
  >()
  const onCheckBoxToggle = useCallback(
    (value: boolean, storeId: string, productId: string) => {
      // console.log("vaue   ", value)
      setCustomWhiteListings((oldW) => {
        const alreadyThere = customWhiteListings.find(
          (r) => r.storeId === storeId && r.productId === productId,
        )
        if (alreadyThere) {
          const newW = customWhiteListings.filter(
            (r) => r.productId !== productId && r.storeId !== storeId,
          )
          console.log("value length ", alreadyThere, productId, newW)
          return newW
        } else {
          return [
            ...customWhiteListings,
            {
              productId,
              storeId,
            },
          ]
        }
      })
    },
    [setCustomWhiteListings, customWhiteListings],
  )
  const queryClient = useQueryClient()
  const userId = getUserId()
  const { mutate, isLoading } = useDeleteCartMutation(apiSdk, {
    onSuccess: (data) => {
      queryClient.refetchQueries(useGetCartByUserIdQuery.getKey({ userId }))
      queryClient.refetchQueries(useGetCartQuery.getKey({ id: cart?.id, }))
      navigation.navigate("landing");
    }
  })


  const onConfirm = useCallback(async () => {
    console.log("white listed products are ", customWhiteListings)
    navigation.navigate("orderConfirmation", {
      filter: customWhiteListings,
    })

    // if (inValidShipments?.length > 0) {useDeleteCartMutation
    //   RNAlert.alert("Please fix the cart before ordering.")
    //   return
    // }
    // await dispatch?.cart?.createOrder(null)
    // setOrderLoading(true)
    // toast.show({
    //   title: "Order created successfully",
    //   description: "We will let you know about updates.",
    //   status: "success",
    // })
    // navigation.navigate("app", {
    //   screen: "home",
    //   params: {
    //     screen: "landing",
    //   },
    // })
  }, [customWhiteListings])
  const { bottom } = useSafeAreaInsets()
  const styles = useStyles({
    create: (theme) => ({
      screen: {
        // flex: 1,
        paddingBottom: bottom + spacing[3],
        paddingHorizontal: spacing[3],
      },
    }),
  })

  return (
    <Screen style={styles.screen} unsafe preset="scroll">
      <Box
        bg="white"
        shadow={4}
        rounded="lg"
        borderWidth={1}
        borderColor="primary.800"
        p={3}
        my={4}
      >
        <Text fontWeight={"light"} fontSize="lg">
          Delivery address
        </Text>
        <HeaderLocationPicker />
      </Box>

      {isAnyShipmentAddressInValid && (
        <Alert status="warning">
          <VStack space={2} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
              <HStack flexShrink={1} space={2} alignItems="center">
                <Alert.Icon />
                <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                  Cart items are invalid
                </Text>
              </HStack>
              <Button
                variant={"outline"}
                onPress={() => {
                  if (cart?.id?.length > 0) {
                    mutate({
                      input: {
                        id: cart?.id,
                      },
                    })
                  }
                }}
              >
                Clear cart
              </Button>
            </HStack>
            <Box
              pl="6"
              _text={{
                color: "coolGray.600",
              }}
            >
              {`Products in your cart are not available in selected addresses.\nPlease select stores available in your region`}
            </Box>
          </VStack>
        </Alert>
      )}

      {isAnyShipmentAddressInValid && (
        <InvalidCartList
          shipments={inValidShipments}
          onSelect={(p) => {
            setActiveAvailabilitySearchProduct(p)
          }}
        />
      )}

      {shipmentsLoading ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <CategorizedList
          // @ts-ignore
          shipments={fCart?.cartShipment || validShipments}
          onCheckBoxToggle={onCheckBoxToggle}
        />
      )}
      <AvailabiiltySearchPicker
        product={activeAvailabilitySearchProduct}
        onClose={() => {
          setActiveAvailabilitySearchProduct(null)
        }}
      />
      {getCartInvalidFlag() ? null :
        orderLoading ||
          isAnyShipmentAddressInValid ||
          shipmentsLoading ? (
          <Box bg="White" rounded="lg" p="3" >
            <Text fontSize="lg" textAlign="center">Your cart is empty</Text>
          </Box>
        ) : null
      }
      <Button
        py={3}
        m={2}
        _text={{ fontSize: "lg" }}
        isDisabled={
          validShipments?.length === 0 ||
          orderLoading ||
          isAnyShipmentAddressInValid ||
          shipmentsLoading
        }
        isLoading={orderLoading || shipmentsLoading}
        _loading={{
          bg: "primary.700",
        }}
        isLoadingText={"Processing..."}
        onPress={onConfirm}
        zIndex={-2}
      >
        Proceed to checkout
      </Button>
    </Screen>
  )
}
