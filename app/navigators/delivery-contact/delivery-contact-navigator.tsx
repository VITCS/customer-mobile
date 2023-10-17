import { FontAwesome5 } from "@expo/vector-icons"
import {
  CardStyleInterpolators,
  createStackNavigator,
  TransitionSpecs,
} from "@react-navigation/stack"
import React from "react"
import { Button, DeliveryContactListItemProps } from "../../components"
import {
  AddDeliveryContactFormScreen,
  CustomerDeliveryContactsScreen,
  EditDeliveryAddressFormScreen,
  EditDeliveryAddressOccasionFormScreen,
} from "../../screens"

export type DeliveryContactParamList = {
  deliveryContacts: undefined
  addContact: { contact?: DeliveryContactListItemProps; }
  addAddress: { id?: string; customerContactId?: string }
  addOccasion: {
    customerContactId?: string
    id?: string
  }
}

const Stack = createStackNavigator<DeliveryContactParamList>()
export const DeliveryContactNavigator = () => {
  return (
    <Stack.Navigator detachInactiveScreens screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="deliveryContacts"
        component={CustomerDeliveryContactsScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "Delivery contacts",
          headerRight: function HeaderRight() {
            return (
              <Button
                px={6}
                py={2}
                mr={4}
                onPress={() => {
                  navigation.navigate("addContact")
                }}
              >
                <FontAwesome5 size={18} name="plus" color={"#fff"} />
              </Button>
            )
          },
        })}
      />

      <Stack.Group
        screenOptions={{
          presentation: "modal",
        }}
      >
        <Stack.Screen
          name="addContact"
          component={AddDeliveryContactFormScreen}
          options={({ route }) => ({
            headerShown: true,
            headerBackTitle: "Cancel",
            headerTitle: `${route?.params?.contact ? "Edit" : "Add"} Delivery contact`,
          })}
        />
        <Stack.Screen
          name="addAddress"
          component={EditDeliveryAddressFormScreen}
          options={({ route }) => ({
            headerShown: true,
            headerBackTitle: "Cancel",
            headerTitle: `${route?.params?.id ? "Edit" : "Add"} address`,
          })}
        />
        <Stack.Screen
          name="addOccasion"
          component={EditDeliveryAddressOccasionFormScreen}
          options={({ route }) => ({
            headerShown: true,
            headerBackTitle: "Cancel",
            headerTitle: `${route.params?.id ? "Edit" : "Add"} Occasion`,
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}
