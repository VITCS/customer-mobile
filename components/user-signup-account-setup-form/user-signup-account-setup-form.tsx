import { useField, useFormikContext } from "formik"
import { FormControl, VStack, HStack } from "native-base"
import * as React from "react"
import { TextInputProps } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Button, Text, TextField, UserSigupGenericForm,PasswordInput, FormInput } from "../"
import { SignUpInput } from "../../screens"
import { HomeParamList } from "../../navigators"
import { NavigationProp, useNavigation } from "@react-navigation/core"
import { PhonenumberInput } from "ui";
import { Controller, useFormContext, } from "react-hook-form"

export interface UserSignupAccountSetupFormProps {
  goNext: () => any,
  control: any
}

/**
 * Describe your component here
 */
export type IDynamicInput = {
  label?: string
  dataKey?: keyof SignUpInput
  required?: boolean
  render?: (args: { value: string; onChange?: (string) => any }) => React.ReactNode
  autoCapitalize?: TextInputProps["autoCapitalize"]
  show?: boolean
  password?: boolean
  isDisabled?: boolean
}
export const UserSignupAccountSetupForm = (props: UserSignupAccountSetupFormProps) => {
  const navigation = useNavigation<NavigationProp<HomeParamList, "landing">>()
  // const { handleChange, values, errors } = formik
  const { goNext, control, } = props
  const { formState, } = useFormContext();
  const [nextDisabled, setNextDisabled] = React.useState(true)
  React.useEffect(() => {
    if(
      formState?.errors?.user_id ||
      formState?.errors?.given_name ||
      formState?.errors?.family_name ||
      formState?.errors?.phone_number ||
      formState?.errors?.password ||
      formState?.errors?.confirm_password ||
      formState?.errors?.email
    ){
      setNextDisabled(true);
    } else{
      setNextDisabled(false);
    }
  }, [formState])
  return (
    <KeyboardAwareScrollView enableOnAndroid>
      <UserSigupGenericForm>
        <VStack px={6} width="full" space="xs">
        <FormInput
          {...{ control }}
          label="User Id"
          textInputprops={{
            autoCapitalize: "none",
            autoComplete: "off",
          }}
          required
          name={"user_id"}
        />
        <FormInput
          {...{ control }}
          label="First name"
          textInputprops={{
            autoCapitalize: "none",
          }}
          required
          name={"given_name"}
        />
        <FormInput
          {...{ control }}
          label="Middle name"
          textInputprops={{
            autoCapitalize: "none",
          }}
          name={"middle_name"}
        />
        <FormInput
          {...{ control }}
          label="Last name"
          textInputprops={{
            autoCapitalize: "none",
          }}
          required
          name={"family_name"}
        />
        <FormInput
          {...{ control }}
          label="Email"
          textInputprops={{
            autoCapitalize: "none",
          }}
          name="email"
          required
        />
        <Controller
          {...{ control }}
          name="phone_number"
          render={({ field: { value, onChange, onBlur }, fieldState }) => {
            return (
              <FormControl mb={2} isRequired isInvalid={!!fieldState.error}>
                <PhonenumberInput onChangeText={onChange} {...{ value, onBlur }} />
                <FormControl.ErrorMessage>{fieldState?.error?.message}</FormControl.ErrorMessage>
              </FormControl>
            )
          }}
        />

        <Controller
          {...{ control }}
          name="password"
          render={({ field: { value, onChange, onBlur }, fieldState }) => {
            return (
              //
              <FormControl mb={3} isRequired isInvalid={!!fieldState.error}>
                <PasswordInput label="Password" onChangeText={onChange} {...{ onBlur, value }} />
                <FormControl.ErrorMessage>{fieldState?.error?.message}</FormControl.ErrorMessage>
              </FormControl>
            )
          }}
        />
        <Controller
          {...{ control }}
          name="confirmPassword"
          render={({ field: { value, onChange, onBlur }, fieldState }) => {
            return (
              // <PasswordInput
              //   label="Confirm password"
              //   errorMessage={fieldState?.error?.message}
              //   autoCapitalize="none"
              //   required
              //   onChangeText={onChange}
              //   {...{ value, onBlur }}
              // />
              <FormControl mb={3} isRequired isInvalid={!!fieldState.error}>
                <PasswordInput
                  label="Confirm password"
                  onChangeText={onChange}
                  {...{ onBlur, value }}
                />
                <FormControl.ErrorMessage>{fieldState?.error?.message}</FormControl.ErrorMessage>
              </FormControl>
            )
          }}
        />

        <HStack mt={1} mb={"2"} space="md" justifyContent="space-between">
            <Button width="100%" onPress={goNext} isDisabled={nextDisabled} mb={8}>
              <Text color={nextDisabled ? "primary.400" : "white"}>Next</Text>
            </Button>
          </HStack>
      </VStack>
      </UserSigupGenericForm>
    </KeyboardAwareScrollView>
  )
}

const DynamicInput = React.memo(
  ({
    required,
    autoCapitalize,
    label,
    password,
    name: dataKey,
  }: IDynamicInput & {
    name: string
  }) => {
    const [field, meta, helpers] = useField(dataKey)
    if(password){
    return (
      <PasswordInput
      key={dataKey}
      autoCapitalize={autoCapitalize || "none"}
      label={label}
      onChangeText={(t) => helpers.setValue(t)}
      errorMessage={meta.touched && meta.error}
      onBlur={() =>
        field.onBlur({
          target: {
            name: dataKey,
            id: dataKey,
          },
        })
      }
      required={required || false}
      value={field.value || ""}
    />

)}
      
      return (
      <TextField
        key={dataKey}
        autoCapitalize={autoCapitalize || "none"}
        label={label}
        onChangeText={(t) => helpers.setValue(t)}
        errorMessage={meta.touched && meta.error}
        onBlur={() =>
          field.onBlur({
            target: {
              name: dataKey,
              id: dataKey,
            },
          })
        }
        required={required || false}
        value={field.value || ""}
      />
    )
  },
)
