/* eslint-disable react-native/no-inline-styles */
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CompositeNavigationProp,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { Button, FormControl, VStack } from "native-base";
import React, { useMemo, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Alert } from "react-native";
import { useMutation, useQueryClient } from "react-query";
import { PhonenumberInput } from "ui";
import * as yup from "yup";
import {
  authApi,
  AuthStackParamsList,
  FormInput,
  MainStackParamsList,
  PasswordInput,
  VerifyCodeForm,
  yupPhone,
} from "../../../../../apps/customer-mobile";

type IProps = {
  switchToSignup: () => void;
  inputType: ILoginInputType;
};

export type ILoginInputType = "mobile" | "email" | "userID";
type Props = IProps;

type LoginInput = {
  username: string;
  password: string;
};
export function UserIdLoginForm(props: Props) {
  const { switchToSignup, inputType } = props;
  const navigation = useNavigation<
    CompositeNavigationProp<
      NavigationProp<AuthStackParamsList, "login">,
      NavigationProp<MainStackParamsList, "auth">
    >
  >();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const queryClient = useQueryClient();

  const [phoneNumberStr, setPhoneNumberStr] = useState("");
  const { mutate, isLoading } = useMutation(
    ({ username, password }: { username: string; password: string }) => {
      return authApi.login(username, password);
    },
    {
      onSuccess: (data) => {
        console.log("login success", data.token);

        queryClient?.invalidateQueries([
          "getUserId",
          {
            userId: data.username,
          },
        ]);
      },
      onError: (error: any, variables) => {
        console.log("error is ", error);
        if (error?.message?.includes("User is not confirmed")) {
          bottomSheetModalRef?.current?.present();
          setPhoneNumberStr(variables.username);
        } else {
          Alert.alert(
            "Error",
            error?.message || "Something went wrong.Please try again"
          );
        }
      },
    }
  );
  const [hidePass, setHidePass] = React.useState(true);

  const schema = yup.object({
    password: yup.string().required("Please enter password"),
    username:
      inputType === "email"
        ? yup.string().required("Email is required").email("Invalid  email ")
        : inputType === "mobile"
        ? yupPhone
        : yup.string().required("Please enter user Id"),
  });
  const { control, handleSubmit } = useForm<LoginInput>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<LoginInput> = (data) => {
    mutate({
      username: data.username,
      password: data.password,
    });
  };
  // const { values, errors, handleChange, handleBlur, handleSubmit, setFieldValue } = formik
  return (
    <>
      <VStack>
        {inputType === "email" ? (
          <>
            <FormInput
              {...{ control }}
              required
              name="username"
              label="Email"
            />
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
                );
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
                <PasswordInput
                  label="Password"
                  onChangeText={onChange}
                  {...{ onBlur, value }}
                />
                <FormControl.ErrorMessage>
                  {fieldState?.error?.message}
                </FormControl.ErrorMessage>
              </FormControl>
            );
          }}
        />

        <Button isLoading={isLoading} mb={1} onPress={handleSubmit(onSubmit)}>
          Login
        </Button>
        <Button
          variant="link"
          mb={2}
          onPress={() => navigation.navigate("forgotPassword")}
        >
          Forgot password ?
        </Button>

        {/* <HStack alignItems="center" mt={6}> */}
        <Button variant="outline" onPress={switchToSignup}>
          Signup
        </Button>
        {/* </HStack> */}
      </VStack>
      <BottomSheetModal
        backdropComponent={(p) => <BottomSheetBackdrop {...p} />}
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
      >
        <VerifyCodeForm
          username={phoneNumberStr}
          switchToSignIn={() => {
            bottomSheetModalRef.current?.close();
          }}
        />
      </BottomSheetModal>
    </>
  );
}
