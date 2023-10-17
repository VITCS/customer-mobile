/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import { CompositeScreenProps, useFocusEffect } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { useToast } from "native-base"
import React, { memo, useCallback } from "react"
import { TextStyle, ViewStyle } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Button, LoginTabs, Text } from "../../components"
import { AuthStackParamsList, MainStackParamsList } from "../../navigators"
import { useStyles } from "../../utils/styles"

export const LOGIN_BUTTON: ViewStyle = {
  alignItems: "center",
  backgroundColor: "black",
  padding: 20,
  borderRadius: 10,
  // marginBottom: 180,
  marginTop: 20,
}
export const AUTH_INPUT: TextStyle = {
  height: 60,
  borderRadius: 10,
  padding: 20,
  marginVertical: 10,
  borderWidth: 1,
  fontSize: 16,
}

type Props = CompositeScreenProps<
  StackScreenProps<AuthStackParamsList, "login">,
  StackScreenProps<MainStackParamsList, "auth">
>

const bgImage = require("./../../assets/splash-background.png")

const LoginScreenMemo: React.FC<Props> = (props: Props) => {
  //console.log(" login scren props : ", props)
  const { route, navigation } = props
  const { params } = route
  const toast = useToast()
  const styles = useStyles({
    create: ({ colors }, { height, width }) => ({
      container: {
        paddingHorizontal: 20,
        paddingVertical: 30,
        flex: 1,
      },
      welcomeHeading: {
        marginTop: 0,
        fontSize: 28,
        fontWeight: "bold",
        color: colors.text,
      },
      welcomeText: {
        fontSize: 14,
        fontWeight: "300",
        color: colors.text,
      },
      welcomeContainer: {},
    }),
  })
  useFocusEffect(
    useCallback(() => {
      if (params?.justSignedUp) {
        toast.show({
          title: "Successfully created your account.",
          description: "Login to get started",
          status: "success",
        })
      }
    }, [params]),
  )
  return (
    <>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        {/* <ScrollView contentContainerStyle={styles.container}> */}

        <Text style={[styles.welcomeHeading]}>Welcome back</Text>
        <Text style={[styles.welcomeText]}>{"Sign into your account"}</Text>

        {/* <View
        style={[{ flex: 1, marginTop: 200 }]}
        // keyboardVerticalOffset={100}
        // behavior="position"

        // behavior={Platform.OS === "ios" ? "padding" : ""}
      > */}
        <LoginTabs />
        {/* </View> */}
        {/* //  */}

        {/* <Button
          variant="outline"
          onPress={() => {
            navigation.navigate("signup")
          }}
        >
          <Text color="primary.500">Sign up</Text>
        </Button> */}
        <Button
          variant="outline"
          onPress={() => {
            navigation.navigate("app", {
              screen: "home",
            })
          }}
        >
          <Text color="primary.500">Skip now</Text>
        </Button>

        {/* </ScrollView> */}
      </KeyboardAwareScrollView>
    </>
  )
}

export const LoginScreen = memo(LoginScreenMemo)
