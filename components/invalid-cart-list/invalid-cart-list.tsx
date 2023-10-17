import { HStack, Image, View, VStack } from "native-base"
import * as React from "react"
import { Button, spacing } from "ui"
import { Text } from "../"
import { IMAGE_PLACEHOLDER_URL } from "../../config/constants"
import { CartShipment, LineItem, Product } from "../../graphql/generated/graphql"
import { onlyUnique } from "../../utils/utils"

export type InvalidCartListProps = {
  shipments: Array<
    Pick<CartShipment, "assignedStoreName"> & {
      lineItems?: Pick<LineItem, "productId" | "productName">[]
    }
  >
  onSelect: (product: Pick<Product, "id" | "prodFullName" | "prodShortDesc">) => void
}

/**
 * Describe your component here
 */
export const InvalidCartList = (props: InvalidCartListProps) => {
  const { shipments, onSelect } = props

  const products = React.useMemo<Pick<LineItem, "productName" | "productId">[]>(() => {
    let products_ = []
    shipments.forEach((shipment) => {
      products_ = products_.concat(shipment?.lineItems || [])
    })
    console.log("products", products_?.length)
    return onlyUnique(products_)
  }, [shipments])
  // const navigation = useNavigation<NavigationProp<HomeParamList, "landing">>()

  return (
    <View bg="warning.100" p={2}>
      <VStack space={4}>
        {products?.map((eachProduct) => {
          const { productName, productId } = eachProduct
          return (
            <View>
              <HStack
                space={2}
                key={productId}
                alignItems="flex-start"
                borderTopWidth={1}
                borderColor="gray.400"
                pt={2}
              >
                <Image
                  w={"16"}
                  h={"16"}
                  source={{ uri: IMAGE_PLACEHOLDER_URL }}
                  alt={productName}
                  rounded="md"
                />
                <View
                  style={[
                    {
                      alignItems: "flex-start",
                    },
                  ]}
                >
                  <Text fontSize={"md"} fontWeight="semibold" noOfLines={2} isTruncated w={"1/2"}>
                    {productName}
                  </Text>
                  <Button
                    // ml="auto"
                    style={{
                      marginTop: spacing[1],
                    }}
                    variant={"outline"}
                    onPress={() => {
                      // navigation.navigate("productInfo", {
                      //   product: {
                      //     id: productId,
                      //   },
                      //   siblings: [],
                      //   purpose: "invalidCart",
                      // })
                      onSelect({
                        id: productId,
                        prodFullName: productName,
                        prodShortDesc: "",
                      })
                    }}
                  // leftIcon={<Ionicons name="warning" color={warningColor} />}
                  >
                    Update
                  </Button>
                </View>
              </HStack>
            </View>
          )
        })}
      </VStack>
    </View>
  )
}
