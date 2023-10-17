import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import {
  ChangePasswordScreen,
  ForgotPasswordScreen,
  LoginScreen,
  OnboardingScreen,
  SignupScreen,
  VerifyCodeFormScreen,
  VerifySignupCodeScreen,
} from "../../screens"

export type AuthStackParamsList = {
  signup: undefined
  login: {
    justSignedUp?: boolean
  }
  onboarding: undefined
  forgotPassword: undefined
  changePassword: undefined
  verifySignupCode: {
    phoneNumber: string
    userName: string
  }
  verifyCodeForm: {
    username: string
  }
}

const AuthStack = createStackNavigator<AuthStackParamsList>()

export const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="login"
    >
      <AuthStack.Screen
        options={{
          headerTitle: "Login",
        }}
        name="login"
        component={LoginScreen}
      />
      <AuthStack.Screen name="onboarding" component={OnboardingScreen} />
      <AuthStack.Screen
        name="signup"
        component={SignupScreen}
        options={{
          headerShown: true,
          headerTitle: "Create account",
        }}
      />

      <AuthStack.Screen
        name="forgotPassword"
        component={ForgotPasswordScreen}
        options={{
          headerShown: true,
          headerTitle: "",
        }}
      />
      <AuthStack.Screen
        name="changePassword"
        component={ChangePasswordScreen}
        options={{
          headerShown: true,
          headerTitle: "Change Password",
        }}
      />
      <AuthStack.Screen
        name="verifySignupCode"
        component={VerifySignupCodeScreen}
        options={{
          headerShown: true,
          headerTitle: "Verify signup",
        }}
      />
      <AuthStack.Screen
        name="verifyCodeForm"
        component={VerifyCodeFormScreen}
        options={{
          headerShown: true,
          headerTitle: "Verify code",
        }}
      />
    </AuthStack.Navigator>
  )
}
