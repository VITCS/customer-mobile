/* eslint-disable react-native/no-inline-styles */
import { Auth, CognitoHostedUIIdentityProvider } from "@aws-amplify/auth"
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet"
import { yupResolver } from "@hookform/resolvers/yup"
import { CompositeNavigationProp, NavigationProp, useNavigation } from "@react-navigation/native"
import { Button, FormControl, useTheme, VStack } from "native-base"
import React, { useCallback, useMemo, useRef, useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { Alert, TouchableOpacity, View } from "react-native"
import { useMutation, useQueryClient } from "react-query"
import { PhonenumberInput, Text, useStyles } from "ui"
import * as yup from "yup"
import { authApi } from "../../api"
import Apple from "../../assets/apple"
import Google from "../../assets/google"
import Meta from "../../assets/meta"
import { PasswordInput, VerifyCodeForm } from "../../components"
import { AuthStackParamsList, MainStackParamsList } from "../../navigators"
import { yupPhone } from "../../utils/format"
import { FormInput } from "../form-input/form-input"

type IProps = {
  switchToSignup: () => void
  inputType: ILoginInputType
}

export type ILoginInputType = "mobile" | "email" | "userID"
type Props = IProps

type LoginInput = {
  username: string
  password: string
}
export function UserIdLoginForm(props: Props) {
  const { switchToSignup, inputType } = props
  const navigation = useNavigation<
    CompositeNavigationProp<
      NavigationProp<AuthStackParamsList, "login">,
      NavigationProp<MainStackParamsList, "auth">
    >
  >()

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], [])

  const queryClient = useQueryClient()

  const [phoneNumberStr, setPhoneNumberStr] = useState("")
  const { mutate, isLoading } = useMutation(
    ({ username, password }: { username: string; password: string }) => {
      return authApi.login(username, password)
    },
    {
      onSuccess: (data) => {
        console.log("data ", data)
        queryClient.invalidateQueries(["getProfile"])
        navigation.navigate("home")
      },
      onError: (error: any, variables) => {
        console.log("error is ", error)
        if (error?.message?.includes("User is not confirmed")) {
          bottomSheetModalRef?.current?.present()
          setPhoneNumberStr(variables.username)
        } else {
          Alert.alert("Error", error?.message || "Something went wrong.Please try again")
        }
      },
    },
  )
  const [hidePass, setHidePass] = React.useState(true)

  const schema = yup.object({
    password: yup.string().required("Please enter password"),
    username:
      inputType === "email"
        ? yup.string().required("Email is required").email("Invalid  email ")
        : inputType === "mobile"
        ? yupPhone
        : yup.string().required("Please enter user Id"),
  })
  const { control, handleSubmit } = useForm<LoginInput>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(schema),
  })
  const onSubmit: SubmitHandler<LoginInput> = (data) => {
    mutate({
      username: data.username,
      password: data.password,
    })
  }
  const socialLogin = useCallback(async (social: CognitoHostedUIIdentityProvider) => {
    try {
      const res = await Auth.federatedSignIn({
        provider: social,
      })
      console.log("res is ", res)
    } catch (error) {
      console.log("error is ", error)
    }
  }, [])
  const styles = useStyles({
    create: (theme) => ({
      socialButton: {
        padding: 12,
        borderRadius: 10,
        borderColor: theme.colors.border,
        borderWidth: 1,
      },
      socialContainer: {
        justifyContent: "space-evenly",
        marginTop: 16,
      },
    }),
  })
  const { colors } = useTheme()

  return (
    <>
      <VStack>
        {inputType === "email" ? (
          <>
            <FormInput {...{ control }} required name="username" label="Email" />
          </>
        ) : inputType === "mobile" ? (
          <>
            <Controller
              control={control}
              name={"username"}
              render={({ field: { value, onBlur, onChange }, fieldState }) => {
                return (
                  // <FormControl mb={2} isRequired>
                  //   <FormControl.Label>Mobile number</FormControl.Label>
                  //   <PhonenumberInput value={value} onBlur={onBlur} onChangeText={onChange} />
                  // </FormControl>
                  <FormControl isInvalid={!!fieldState.error}>
                    <PhonenumberInput
                      value={value}
                      onBlur={onBlur}
                      // onChangeText={(r) => {
                      //   // console.log("phone", r)
                      //   onChange(r)
                      // }}
                      onChangeText={onChange}
                    />
                    {fieldState.error && (
                      <>
                        {/* <Text>error...</Text> */}
                        <FormControl.ErrorMessage>
                          {fieldState?.error?.message}
                        </FormControl.ErrorMessage>
                      </>
                    )}
                  </FormControl>
                )
              }}
            />
          </>
        ) : inputType === "userID" ? (
          <FormInput
            {...{ control }}
            required
            name="username"
            label={"User ID"}
            textInputprops={{
              autoCapitalize: "none",
            }}
          />
        ) : null}

        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange, onBlur }, fieldState }) => {
            return (
              <FormControl mb={3} isRequired isInvalid={!!fieldState.error}>
                {/* <HStack mb={1} alignItems="center">
              <FormControl.Label>Old password</FormControl.Label>
            </HStack> */}
                <PasswordInput label="Password" onChangeText={onChange} {...{ onBlur, value }} />
                <FormControl.ErrorMessage>{fieldState?.error?.message}</FormControl.ErrorMessage>
              </FormControl>
              // <FormControl mb={3} isRequired>
              //   <HStack mb={1} alignItems="center">
              //     <FormControl.Label>Password</FormControl.Label>
              //   </HStack>
              //   <Input
              //     InputRightElement={
              //       <FontAwesome
              //         name={hidePass ? "eye-slash" : "eye"}
              //         size={20}
              //         style={{
              //           marginRight: 12,
              //         }}
              //         color="black"
              //         onPress={() => setHidePass(!hidePass)}
              //       />
              //     }
              //     secureTextEntry={!!hidePass}
              //     onChangeText={onChange}
              //     {...{ onBlur, value }}
              //   />
              //   <FormControl.ErrorMessage>{fieldState.error}</FormControl.ErrorMessage>
              // </FormControl>
            )
          }}
        />

        <Button isLoading={isLoading} mb={1} onPress={handleSubmit(onSubmit)}>
          Login
        </Button>
        <Button variant="link" mb={2} onPress={() => navigation.navigate("forgotPassword")}>
          Forgot password ?
        </Button>

        {/* <HStack alignItems="center" mt={6}> */}
        <Button variant="outline" onPress={switchToSignup}>
          Signup
        </Button>
        {/* </HStack> */}
      </VStack>
      <View
        style={{
          // flex: 1,
          marginTop: 16,
        }}
      >
        <Text
          style={{
            textAlign: "center",
          }}
        >
          Or sign in using one of these sites
        </Text>
        <View style={[styles.row, styles.socialContainer]}>
          {/* <Button
              variant={"outline"}
              onPress={() => {
                socialLogin(CognitoHostedUIIdentityProvider.Google)
              }}
            >
              
              Login with Google
            </Button>
            <Button
              variant={"outline"}
              onPress={() => {
                socialLogin(CognitoHostedUIIdentityProvider.Facebook)
              }}
            >
              Login with Meta
            </Button> */}
          <TouchableOpacity
            style={[styles.socialButton]}
            onPress={() => socialLogin(CognitoHostedUIIdentityProvider.Google)}
          >
            <Google fill={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.socialButton]}
            onPress={() => socialLogin(CognitoHostedUIIdentityProvider.Facebook)}
          >
            <Meta fill={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => socialLogin(CognitoHostedUIIdentityProvider.Apple)}
            style={[styles.socialButton]}
          >
            <Apple fill={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
      <BottomSheetModal
        backdropComponent={(p) => <BottomSheetBackdrop {...p} />}
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
      >
        <VerifyCodeForm
          username={phoneNumberStr}
          switchToSignIn={() => {
            bottomSheetModalRef.current?.close()
          }}
        />
      </BottomSheetModal>
    </>
  )
}
