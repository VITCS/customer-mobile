/* eslint-disable react-native/no-inline-styles */
import { FontAwesome } from "@expo/vector-icons";
import { useFormik } from "formik";
import { FormControl, Input } from "native-base";
import * as React from "react";
import { View } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { Button } from "../button/button";
import { TextField } from "../text-field/text-field";

export type ILoginInputType = "mobile" | "email" | "userID";
type Props = {
  inputType: ILoginInputType;
  onSubmit: (values: { username: string; password: string }) => void;
  onPressForgotPassword: () => void;
  loginLoading?: boolean;
  socialButtons?: React.ReactNode;
};

type LoginInput = {
  username: "";
  password: "";
};

function UserIdLoginFormWithRedux(props: Props) {
  const { socialButtons } = props;

  const { inputType, onSubmit, onPressForgotPassword, loginLoading } = props;
  const [hidePass, setHidePass] = React.useState(true);
  // const [loginLoading, setLoginLoading] = React.useState(false);

  const formik = useFormik<LoginInput>({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit,
  });
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = formik;
  // return (
  //   <VStack bg="red.100">
  //     <View
  //       style={{
  //         flex: 1,
  //         height: 200,
  //         width: 300,
  //         // backgroundColor: "red",
  //       }}
  //     />
  //   </VStack>
  // );
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <>
        {inputType === "email" ? (
          <>
            <FormControl mb={3} isRequired>
              <FormControl.Label>Email</FormControl.Label>
              <TextField
                autoCapitalize="none"
                value={values.username}
                onChangeText={(t) => setFieldValue("username", t)}
              />
            </FormControl>
          </>
        ) : inputType === "mobile" ? (
          <>
            <FormControl mb={2} isRequired>
              <PhoneInput
                value={values.username}
                defaultCode="US"
                layout="first"
                onChangeText={(t) => setFieldValue("username", t)}
                onChangeFormattedText={(t) => setFieldValue("username", t)}
                withDarkTheme
                withShadow
                autoFocus
              />
            </FormControl>
          </>
        ) : inputType === "userID" ? (
          <FormControl mb={3} isInvalid={!!errors.username} isRequired>
            <TextField
              label="User ID"
              autoCapitalize="none"
              onBlur={handleBlur("username")}
              onChangeText={handleChange("username")}
              value={values.username}
            />
            <FormControl.ErrorMessage size="xs">
              Atleast 6 characters are required.
            </FormControl.ErrorMessage>
          </FormControl>
        ) : null}
      </>

      <FormControl mb={3} isRequired>
        <FormControl.Label>Password</FormControl.Label>
        <Input
          InputRightElement={
            <FontAwesome
              name={hidePass ? "eye-slash" : "eye"}
              size={20}
              style={{
                marginRight: 12,
              }}
              color="black"
              onPress={() => setHidePass(!hidePass)}
            />
          }
          secureTextEntry={!!hidePass}
          size="2xl"
          onBlur={handleBlur("password")}
          onChangeText={handleChange("password")}
          value={values.password}
        />
        <FormControl.ErrorMessage>{errors.password}</FormControl.ErrorMessage>
      </FormControl>

      <Button
        isLoading={loginLoading}
        isLoadingText="Logging in..."
        mb={1}
        onPress={() => formik.handleSubmit()}
      >
        Login
      </Button>
      {socialButtons}

      <Button variant="link" mb={2} onPress={onPressForgotPassword}>
        Forgot password ?
      </Button>
    </View>
  );
}

export const UserIdLoginForm = React.memo(UserIdLoginFormWithRedux);
