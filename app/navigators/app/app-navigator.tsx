import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeNavigationProp, NavigationProp } from "@react-navigation/native"
import { Menu, useToast, useToken } from "native-base"
import React, { useEffect } from "react"
import { Alert, Platform, Pressable, View } from "react-native"
import { } from "react-native-gesture-handler"
import {
  AddressPickerModal,
  AnonymousAddressPicker,
  GenericHeader,
  ICategory,
} from "../../components"
import { Maybe, Product } from "../../graphql/generated/graphql"
import { LoginScreen, SearchScreen, StoreLocatorScreen } from "../../screens"
import {
  authApi,
  useLoggedInUser,
  setSocialLoggedInUserData,
  useSocialLoggedInUserData,
} from "../../stores/auth"
import { useStyles } from "../../utils/styles"
import { HomeNavigator } from "../home/home-navigator"
import { MyOrdersNavigator } from "../myorders/myorders-navigator"
import { ProfileNavigator, ProfileStackParamList } from "../profile/profile-navigator"
import { Auth } from "@aws-amplify/auth"
import { Amplify, Hub } from "@aws-amplify/core"
import { DELIVERY_ADDRESS } from "../../config/constants"
import { useMMKVObject } from "react-native-mmkv"
import { useDeliveryAddress } from "../../stores/cart"

export type AppScreensParamsList = {
  home: undefined
  stores: undefined
  profile: undefined
  myOrders: undefined
  more: undefined
  search:
  | undefined
  | {
    filter?: {
      category?: ICategory
      product?: Maybe<Pick<Product, "id" | "prodFullName">>
    }
  }
}

const Tab = createBottomTabNavigator<AppScreensParamsList>()

const TAB_ICONS: {
  [state: string]: {
    [name: string]:
    | typeof Ionicons["name"]
    | {
      name: typeof MaterialCommunityIcons["name"]
      iconProvider?: "ion" | "matCom"
      moreButton?: boolean
    }
  }
} = {
  active: {
    home: "home",
    stores: {
      name: "storefront",
      iconProvider: "matCom",
    },
    profile: "person-circle",
    search: "search",
    // myOrders: {
    //   name: "script",
    //   iconProvider: "matCom",
    // },
    more: { name: "grid", iconProvider: "ion", moreButton: true },
  },
  inactive: {
    home: "home-outline",
    stores: {
      name: "storefront",
      iconProvider: "matCom",
    },
    profile: "person-circle-outline",
    search: "search-outline",
    // myOrders: {
    //   name: "script-text-outline",

    //   iconProvider: "matCom",
    // },
    more: { name: "grid", iconProvider: "ion", moreButton: true },
  },
}

const EmptyScreen = () => {
  return <View />
}
export const MenuItems = ({
  navigation,
}: {
  navigation: CompositeNavigationProp<
    NavigationProp<AppScreensParamsList, "profile">,
    NavigationProp<ProfileStackParamList, "settings">
  >
}) => {
  return (
    <>
      <Menu.Item
        onPress={() =>
          navigation.navigate("settings", {
            screen: "settingsInfo",
          })
        }
      >
        Settings
      </Menu.Item>
      <Menu.Item
        onPress={() => {
          navigation.navigate("deliveryContacts")
        }}
      >
        Delivery contacts
      </Menu.Item>
      <Menu.Item
        onPress={() => {
          navigation.navigate("paymentMethods")
        }}
      >
        Payment methods
      </Menu.Item>
      {/* <Menu.Item
        onPress={() => {
          navigation.navigate("myOrders")
        }}
      >
        My orders
      </Menu.Item> */}
      <Menu.Item
        onPress={() => {
          navigation.navigate("changePassword")
        }}
      >
        Change Password
      </Menu.Item>
      <Menu.Item
        _text={{
          color: "danger.500",
        }}
        onPress={() => {
          Alert.alert("Logout", "Are you sure to logout?", [
            {
              text: "Sure, logout",
              style: "destructive",
              onPress: async () => {
                authApi.logout()
              },
            },
            {
              text: "cancel",
              style: "cancel",
            },
          ])
        }}
      >
        Logout
      </Menu.Item>
    </>
  )
}

export function AppNavigator({ navigation }) {
  //social login changes
  const [userObj, setUserObj] = React.useState({})
  const [deliveryAddress] = useMMKVObject(DELIVERY_ADDRESS)
  const {
    data: { latitude, longitude } = { latitude: 0, longitude: 0 },
    isLoading: deliveryLoading,
  } = useDeliveryAddress()
  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload }) => {
      console.log("payload---", payload)
      const { event, data } = payload
      switch (event) {
        case "signIn":
        case "cognitoHostedUI":
          getUser().then((userData) => {
            console.log("userData Signin----", userData)
            Auth.currentSession().then((userInfo) => {
              const user = userInfo?.getIdToken()?.payload
              console.log("user Signin----", user)
              setSocialLoggedInUserData({
                username: userData.username,
                family_name: user.family_name,
                given_name: user.given_name,
                email: user.email,
              })
            })
          })
          break
        case "signOut":
          setUserObj(null)
          break
        case "signIn_failure":
        case "cognitoHostedUI_failure":
          console.log("Sign in failure", data)
          break
      }
    })

    // eslint-disable-next-line no-use-before-define
    getUser().then((userData) => {
      if (userData) {
        console.log("userData----", userData)
        Auth.currentSession().then((userInfo) => {
          const user = userInfo?.getIdToken()?.payload
          console.log("user----", user)
          setUserObj({
            username: userData.username,
            family_name: user.family_name,
            given_name: user.given_name,
            email: user.email,
          })
        })
      }
    })

    return unsubscribe
  }, [deliveryLoading, deliveryAddress])

  const getUser = async () => {
    return Auth.currentAuthenticatedUser()
      .then((userData) => userData)
      .catch(() => console.log("Not signed in"))
  }

  const [primary, secondary] = useToken("colors", ["primary.500", "secondary.500"])
  const userId = useLoggedInUser()

  const socialUser = useSocialLoggedInUserData()
  const toast = useToast()
  console.log("socialUser-------", socialUser)
  if (socialUser) {
    navigation.navigate("signup")
  }

  console.log("userId >> app", userId)
  console.log(" app navigatore ", latitude, deliveryAddress)
  const styles = useStyles({
    create: ({ colors }) => {
      const size = 54
      return {
        moreButton: {
          padding: 16,
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: colors.primary,
          alignItems: "center",
          justifyContent: "center",
          // position: "absolute",

          // left: width / 2 - size / 2,
          transform: [
            {
              translateY: -size / 2,
            },
            {
              scale: 1.3,
            },
          ],
        },
      }
    },
  })
  return (
    <Tab.Navigator
      initialRouteName="home"
      detachInactiveScreens={true}
      screenOptions={({ route }) => ({
        headerShown: false,
        header: () => <GenericHeader />,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 3,
          borderStyle: "solid",
          borderColor: primary,
          paddingVertical: Platform.OS === "android" ? 8 : 22,
          minHeight: Platform.OS === "android" ? 56 : 100,
        },

        tabBarIcon: ({ color, size, focused }) => {
          // if (route.name === "profile") {
          //   return null
          // }
          const iconSet = focused ? TAB_ICONS.active : TAB_ICONS.inactive
          const iconName = iconSet[route.name]
          if (typeof iconName === "object") {
            if (iconName.iconProvider === "matCom") {
              return (
                <>
                  <MaterialCommunityIcons name={iconName.name as any} size={size} color={primary} />
                </>
              )
            }
            return null
          }
          return <Ionicons name={iconName as any} size={size} color={primary} />
        },
      })}
    >
      <Tab.Screen name="home" component={HomeNavigator} />
      <Tab.Screen
        name="stores"
        component={
          deliveryAddress === undefined && longitude == 0
            ? AnonymousAddressPicker
            : StoreLocatorScreen
        }
      />

      {userId?.length > 0 && (
        <>
          <Tab.Screen
            name="more"
            component={EmptyScreen}
            options={({ navigation }) => ({
              tabBarButton(props) {
                return (
                  <Menu
                    trigger={(triggerProps) => {
                      return (
                        <Pressable {...triggerProps} style={[styles.moreButton]}>
                          <Ionicons size={18} color={"#fff"} name="grid" />
                        </Pressable>
                      )
                    }}
                  >
                    <Menu.Item
                      onPress={() =>
                        navigation.navigate("profile", {
                          screen: "profileInfo",
                        })
                      }
                    >
                      Profile
                    </Menu.Item>
                    <MenuItems {...{ navigation }} />
                  </Menu>
                )
              },
            })}
          />
          {/* <Tab.Screen
            name="myOrders"
            component={MyOrdersNavigator}
            //
          /> */}
        </>
      )}
      <Tab.Screen
        name="search"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen name="profile" component={ProfileNavigator} />
    </Tab.Navigator>
  )
}
