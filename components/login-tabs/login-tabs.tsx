import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import * as React from "react"
import { View } from "react-native"
import { useStyles } from "../../utils/styles"
import { UserIdLoginForm } from "../index"

export type ILoginTabsNavigatorParamsList = {
  userid: undefined
  mobile: undefined
  email: undefined
}

const Tab = createMaterialTopTabNavigator<ILoginTabsNavigatorParamsList>()

export interface LoginTabsProps {}

/**
 * Describe your component here
 */

export const LoginTabs = (props: LoginTabsProps) => {
  // const [grey] = useToken("color", ["gray.700"])
  console.log(" inside login tab")
  const styles = useStyles({
    create: ({ colors }, { width, height }) => ({
      container: {
        paddingVertical: height / 20,
        flex: 1,
        height: "100%",
        justifyContent: "center",
        // alignItems: "center",
      },
    }),
  })
  return (
    <View style={[styles.container]}>
      <Tab.Navigator
        screenOptions={{
          lazy: true,

          tabBarStyle: { borderColor: "#b72618", backgroundColor: "transparent" },
          tabBarLabelStyle: {
            textTransform: "none",
            fontSize: 20,

            marginBottom: 6,
          },
        }}
      >
        <Tab.Screen
          name="userid"
          options={{
            title: "User Id",
          }}
        >
          {(props) => (
            <UserIdLoginForm
              inputType={"userID"}
              switchToSignup={() => props.navigation.navigate("signup")}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="mobile"
          options={{
            title: "Mobile",
          }}
        >
          {(props) => (
            <UserIdLoginForm
              inputType={"mobile"}
              switchToSignup={() => props.navigation.navigate("signup")}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="email"
          options={{
            title: "Email",
          }}
        >
          {(props) => (
            <UserIdLoginForm
              inputType={"email"}
              switchToSignup={() => props.navigation.navigate("signup")}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  )
}
