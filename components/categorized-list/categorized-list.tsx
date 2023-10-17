import { AntDesign, Ionicons } from "@expo/vector-icons"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { Box, HStack, IconButton, Image, VStack, DeleteIcon } from "native-base"
import * as React from "react"
import { TouchableOpacity } from "react-native"
import { IconProps } from "./icon.props"
import { useQueryClient } from "react-query"
import { apiSdk, getUserId } from "../../utils/api"
import { Accordion, Button, Checkbox, Text } from "ui"
import { Icon } from "../icon/icon"
import { DELIVERY_ADDRESS, IMAGE_PLACEHOLDER_URL } from "../../config/constants"
import { commaify } from "../../utils/format"
import { CartShipment, LineItem, Product, Store } from "../../graphql/generated/graphql"
import { ProductsParamList } from "../../navigators"
import { useCartApi } from "../../stores/cart"
import { makeDisplayString } from "../../utils/format"
import { useStyles } from "../../utils/styles"
import { useCart } from "../../stores/cart"
import { useDeleteCartMutation, useGetCartByUserIdQuery, useGetCartQuery } from "../../graphql/generated/graphql"

export interface CategorizedListProps {
  shipments: Array<
    Pick<CartShipment, "assignedStoreName" | "deliveryType" | "deliveryAddress"> & {
      lineItems?: Pick<
        LineItem,
        "productId" | "qtyPurchased" | "unitPrice" | "totalPrice" | "productName"
      >[]
    }
  >
  onCheckBoxToggle: (isActive: boolean, assignedStoreId: string, productId: string) => void
}

export const CategorizedList = (props: CategorizedListProps) => {
  const { shipments, onCheckBoxToggle } = props
  const navigation = useNavigation<NavigationProp<ProductsParamList, "productsSearch">>()
  const cart = useCart()
  const [activeSections, setActiveSections] = React.useState([])
  const { processProduct } = useCartApi()
  const updateCart = (
    product: Pick<Product, "id" | "prodFullName" | "prodShortDesc">,
    store: Pick<Store, "id" | "storeName">,
    newCount: number,
  ) => {
    processProduct({
      product,
      quantity: newCount,
      assignedStoreId: store.id,
      assignedStoreName: store.storeName,
    })
  }
  const styles = useStyles({
    create: ({ colors }) => ({
      textRed: {
        color: colors.primary
      }
    }),
  })
  const queryClient = useQueryClient()
  const userId = getUserId()
  const { mutate, isLoading } = useDeleteCartMutation(apiSdk, {
    onSuccess: (data) => {
      queryClient.refetchQueries(useGetCartByUserIdQuery.getKey({ userId }))
      queryClient.refetchQueries(useGetCartQuery.getKey({ id: cart?.id, }))
      navigation.navigate("cart");
    }
  })
  const formattedShipments = React.useMemo(
    () =>
      shipments.map((shipment) => {
        return {
          ...shipment,
          title: shipment?.assignedStoreName,
        }
      }),
    [shipments],
  )
  return (
    <Accordion
      variant="outline"
      expandMultiple
      activeSections={activeSections}
      sections={formattedShipments}
      renderAsFlatList
      onChange={setActiveSections}
      renderContent={(c, index, isActive) => {
        // @ts-ignore
        const content = c as CartShipment
        return (
          <VStack borderWidth={1} borderColor="primary.200" rounded="lg" p={1} space={3}>
            {content?.lineItems?.map((item) => {
              const { productName, productId, qtyPurchased, unitPrice, totalPrice } = item
              return (
                <Box>
                  <HStack
                    key={productId}
                    space={3}
                    alignItems={"flex-start"}
                    p={2}
                    borderBottomWidth={1}
                    borderBottomColor="gray.400"
                  >
                    <Image
                      source={{ uri: IMAGE_PLACEHOLDER_URL }}
                      w={20}
                      h={20}
                      rounded={"lg"}
                      alt={productName}
                      bg="gray.600"
                    />

                    <VStack flex={1} justifyContent={"space-between"}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("productInfo", {
                            product: {
                              id: productId,
                              title: productName,
                            },
                          })
                        }}
                      >
                        <Text fontSize={"lg"} fontWeight={"normal"}>
                          {productName}
                        </Text>
                        <HStack>
                          <Text fontSize={"lg"} fontWeight={"Bold"}>
                            Delivery By
                          </Text>
                          <Text fontSize={"lg"} fontWeight={"normal"} style={styles.textRed}>
                            {" "}
                            Fed Ex
                          </Text>
                          <Text style={{ marginLeft: 2, marginRight: 2 }}>{"|"} </Text>
                          <Text ml="2" alignSelf="end" >
                            {content?.deliveryType}
                          </Text>

                        </HStack>
                      </TouchableOpacity>

                      <HStack w="full" alignItems={"center"} space={2} p={2}>

                        <Text ml="auto" fontSize={"lg"} fontWeight={"bold"} maxW={"lg"}>
                          ${makeDisplayString(totalPrice)}
                        </Text>
                        <HStack alignItems={"center"} paddingLeft="100px">
                          <IconButton
                            p={2}
                            colorScheme="primary"
                            rounded={"full"}
                            color="white"
                            variant={"outline"}
                            onPress={() => {
                              updateCart(
                                {
                                  prodFullName: productName,
                                  prodShortDesc: "",

                                  id: productId,
                                },
                                {
                                  id: content?.assignedStoreId,
                                  storeName: content?.assignedStoreName,
                                },
                                qtyPurchased - 1,
                              )
                            }}
                            icon={<AntDesign name="minus" color="#000" />}
                          />
                          <Box paddingLeft={2} paddingRight={2} >
                            <Text fontSize={"md"} fontWeight={"bold"}>
                              {qtyPurchased}
                            </Text>
                          </Box>
                          <IconButton
                            p={2}
                            colorScheme="primary"
                            rounded={"full"}
                            color="white"
                            variant={"outline"}
                            onPress={() => {
                              updateCart(
                                {
                                  prodFullName: productName,
                                  prodShortDesc: "",

                                  id: productId,
                                },
                                {
                                  id: content?.assignedStoreId,
                                  storeName: content?.assignedStoreName,
                                },
                                qtyPurchased + 1,
                              )
                            }}
                            icon={<Ionicons name="add" color={"#000"} />}
                          />
                        </HStack>
                      </HStack>
                    </VStack>
                    {/* <Checkbox
                      onValueChange={(value) => {
                        onCheckBoxToggle(value, content.assignedStoreId, productId)
                      }}

                    /> */}
                    {/* <Ionicons name="refresh" color={"green"} size={20} />
                    <Ionicons name="heart" style={styles.textRed} size={20} /> */}

                    <TouchableOpacity>
                      <DeleteIcon onPress={() => {

                        // dispatch.cart?.discardProduct({
                        //   product: {
                        //     id: productId,
                        //   },
                        // })

                        if (cart?.id?.length > 0) {
                          mutate({
                            input: {
                              id: cart?.id,
                            },
                          })
                        }
                      }} size="md" />
                    </TouchableOpacity>
                  </HStack>
                  <Text fontWeight="bold" style={styles.textRed}>
                    {content?.assignedStoreName}
                  </Text>
                  <HStack>

                    <Text fontWeight="bold">
                      Store Address:{'  '}
                    </Text>
                    <Text>
                      {commaify(
                        content?.deliveryAddress?.addrLine1,
                        content?.deliveryAddress?.addrLine2,
                        content?.deliveryAddress?.city,
                        content?.deliveryAddress?.state,
                        content?.deliveryAddress?.country,
                      )}
                    </Text>
                  </HStack>
                </Box>
              )
            })}
          </VStack>
        )
      }}
    />
  )
}
