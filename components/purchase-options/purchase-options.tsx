import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import * as React from "react"
import { View } from "react-native"
import { DeliveryPurchaseOptions, Text } from "../"
import { Product } from "../../graphql/generated/graphql"

export type PurchaseOptionsProps = Pick<Product, "id" | "prodFullName" | "prodShortDesc"> & {
  removeExisingProductReferences?: boolean
}

/**
 * Describe your component here
 */

const tabs = ["Delivery", "Pick up", "Shipping"]

const TopTab = createMaterialTopTabNavigator()

export const PurchaseOptions = (props: PurchaseOptionsProps) => {
  const { id, prodShortDesc, prodFullName, removeExisingProductReferences } = props
  return (
    <TopTab.Navigator
      screenOptions={{
        lazy: true,
        tabBarLabelStyle: { fontSize: 12 },
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor:"gray.500",
      }}
    >
      <TopTab.Screen name={tabs[0]}>
        {(p) => (
          <DeliveryPurchaseOptions
            {...p}
            {...{ id, prodShortDesc, prodFullName, removeExisingProductReferences }}
          />
        )}
      </TopTab.Screen>
      <TopTab.Screen name={tabs[1]}>
        {(p) => (
          <View>
            <Text>Pick up stores</Text>
          </View>
        )}
      </TopTab.Screen>
      <TopTab.Screen name={tabs[2]}>
        {(p) => (
          <View>
            <Text>Coming soon</Text>
          </View>
        )}
      </TopTab.Screen>
    </TopTab.Navigator>
  )
}
