import { CompositeNavigationProp, NavigationProp, useNavigation } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import React, { useMemo } from "react"
import { ActivityIndicator, FlatList, TouchableOpacity, View, ViewStyle } from "react-native"
import { ObjectRenderer, Screen, Text } from "../../components"
import { useGetOrderShipmentQuery } from "../../graphql/generated/graphql"
import { AppScreensParamsList, MyordersParamList } from "../../navigators"
import { spacing } from "../../theme"
import { apiSdk } from "../../utils/api"
import { EMPTY_VALUE_STRING, formatPrice } from "../../utils/format"
import { useStyles } from "../../utils/styles"

const ROOT: ViewStyle = {
  flex: 1,
}

type Navigation = CompositeNavigationProp<
  NavigationProp<AppScreensParamsList, "profile">
  // NavigationProp<AppScreensParamsList, "produ">
>

export const OrderDetailsScreen: React.FC<StackScreenProps<MyordersParamList, "orderDetails">> = (
  props,
) => {
  const { route } = props

  const { params } = route
  const selectedOrderShipment = useMemo(() => route?.params?.orderShipment, [route])

  const { isLoading, data, isError } = useGetOrderShipmentQuery(
    apiSdk,
    {
      id: selectedOrderShipment?.id,
    },
    {
      enabled: selectedOrderShipment?.id?.length > 0,
    },
  )

  const {
    subTotalTax,
    subTotalDiscount,
    orderLineItems = [],
    subTotalDeliveryCharges,
    subTotalProductAmount,
  } = data?.getOrderShipment || {}
  const navigation = useNavigation<Navigation>()

  const styles = useStyles({
    create: (theme) => ({
      itemsHeading: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: spacing[2],
      },

      container: {
        paddingHorizontal: 12,
      },
      itemsContainer: {
        marginTop: 12,
      },
      productName: {
        fontSize: 16,
        fontWeight: "500",
        color: theme.colors.primary,
      },

      productMainRow: {
        width: "100%",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.background,
        padding: spacing[2],
      },
      key: {
        fontSize: 14,
        color: theme.colors.text,
        fontWeight: "300",
      },
      value: {
        fontSize: 14,
        marginLeft: 10,
        color: theme.colors.text,
        opacity: 1,
      },
    }),
  })

  return (
    <Screen style={styles.container} preset="scroll">
      {isLoading ? (
        <ActivityIndicator size={"large"} />
      ) : isError ? (
        <Text>Something went wrong.Please try again.</Text>
      ) : (
        // <Text>{JSON.stringify(data?.getOrderShipment, null, 2)}</Text>
        <>
          <ObjectRenderer
            content={[
              {
                label: "Price",
                value: String(formatPrice(subTotalProductAmount || 0)),
              },
              {
                label: "Tax",
                value: String(subTotalTax || EMPTY_VALUE_STRING),
              },
              {
                label: "Discount",
                value: String(subTotalDiscount),
              },
              {
                label: "Delivery charges",
                value: String(subTotalDeliveryCharges),
              },
            ]}
          />
          <FlatList
            ListHeaderComponent={<Text style={styles.itemsHeading}>Items</Text>}
            data={orderLineItems}
            contentContainerStyle={styles.itemsContainer}
            keyExtractor={(item) => item.productId}
            renderItem={({ item, index }) => {
              const { productId, productName, unitPrice, qtyPurchased } = item
              return (
                <View style={[styles.row, styles.productMainRow]}>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("home", {
                          screen: "productInfo",
                          params: {
                            product: {
                              id: productId,
                            },
                          },
                        })
                      }}
                    >
                      <Text style={styles.productName}>{productName}</Text>
                    </TouchableOpacity>
                    <View style={styles.row}>
                      <Text style={styles.key}>Unit price</Text>
                      <Text style={styles.value}>{formatPrice(+unitPrice)}</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.key}>Quantity</Text>
                      <Text style={styles.value}>{qtyPurchased}</Text>
                    </View>
                  </View>

                  <View>
                    {/* <Text>Price</Text> */}
                    <Text>{formatPrice(qtyPurchased * +unitPrice)}</Text>
                  </View>
                </View>
              )
            }}
          />
        </>
      )}
    </Screen>
  )
}
