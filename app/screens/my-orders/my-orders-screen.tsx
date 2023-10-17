// import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { Box, HStack, ScrollView } from "native-base"
import React, { useEffect, useMemo, useState } from "react"
import { ActivityIndicator, FlatList, RefreshControl, TouchableOpacity, View } from "react-native"
import { Accordion, Button, usePagination } from "ui"
import { MyOrderListItem, MyOrdersFilterBar, Text } from "../../components"
import { OrderStatus, useListOrdersByUserIdQuery } from "../../graphql/generated/graphql"
import { MyordersParamList } from "../../navigators"
import { apiSdk, getUserId } from "../../utils/api"
import { useStyles } from "../../utils/styles"

const limit = 5

export const MyOrdersScreen = () => {
  const { currentPage, next, prev } = usePagination(0, limit)
  const [status, setStatus] = useState<OrderStatus>(OrderStatus.Created)

  const { data, isLoading, refetch, error } = useListOrdersByUserIdQuery(apiSdk, {
    userId: getUserId(),
    limit,
    filter: {
      orderStatus: {
        eq: status,
      },
    },
  })
  console.log(" get order : ", data?.listOrdersByUserId?.items)
  const orders = useMemo(
    () => data?.listOrdersByUserId?.items,
    [data],
  )

  useEffect(() => {
    refetch()
  }, [currentPage, refetch])

  console.log("display order are ", orders)
  const navigation = useNavigation<NavigationProp<MyordersParamList, "list">>()

  const styles = useStyles({
    create: ({ colors }) => ({
      emptyView: {
        paddingHorizontal: 32,
      },
      errorText: {
        marginTop: 64,
        textAlign: "center",
        fontWeight: "600",
        fontSize: 16,
      },
    }),
  })
  return (
    <View flex={1}>
      <MyOrdersFilterBar
        {...{ status }}
        onStatusChange={(status) => {
          setStatus(status)
        }}
      />
      <ScrollView>
        <FlatList
          refreshControl={
            orders?.length > 0 && <RefreshControl refreshing={isLoading} onRefresh={refetch} />
          }
          data={orders}
          ListEmptyComponent={
            <View style={[styles.emptyView]}>
              {isLoading ? (
                <ActivityIndicator />
              ) : error ? (
                <Text style={[styles.errorText]}>
                  Something went wrong.{"\n"} Please try again later.
                </Text>
              ) : (
                <Box w="full" flex={1} alignItems="center" justifyContent={"center"}>
                  <Text fontSize={"xl"}>No orders found</Text>
                </Box>
              )}
            </View>
          }
          contentContainerStyle={{
            paddingBottom: 100,
            height: "100%",
          }}
          renderItem={({ item }) => {
            return (
              // <TouchableOpacity
              //   onPress={() => {
              //     navigation.navigate("orderDetails", {
              //       orderShipment: {
              //         id: item.id,
              //       },
              //     })
              //   }}
              // >
              <MyOrderListItem order={item} />
              // </TouchableOpacity>
            )
          }}
        />
      </ScrollView>

      {/* {orders?.length > 0 && (
        <HStack w="full" px={2} my={2} justifyContent={"space-between"}>
          <Button px={3}>
            <Ionicons color="#fff" size={20} name="arrow-back" />
          </Button>
          <Button px={3}>
            <Ionicons color="#fff" size={20} name="arrow-forward" />
          </Button>
        </HStack>
      )} */}
    </View>
  )
}
