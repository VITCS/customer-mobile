import { Button, FormControl, VStack } from "native-base"
import * as React from "react"
import { PhonenumberInput } from "ui"
import { TextField } from "../text-field/text-field"
import { EditUserProfileFormikInput } from "../../screens"
import { Control, Controller } from "react-hook-form"
import { FormInput } from "../form-input/form-input"

// export interface UserEditPrimaryFormProps {
//   /**
//    * An optional style override useful for padding & margin.
//    */
//   firstName: string
//   middleName: string
//   lastName: string
//   phoneNumber: string
//   email: string
//   setFieldValue: (name: string, value: any) => any
//   onRequestVerifyEmail: () => any
//   onRequestVerifyMobile: () => any
// }
export interface UserEditPrimaryFormProps {
  onRequestVerifyEmail: () => any
  onRequestVerifyMobile: () => any
  control: Control<EditUserProfileFormikInput>
}
/**
 * Describe your component here
 */
export const UserEditPrimaryForm = React.memo(function UserEditPrimaryForm(
  props: UserEditPrimaryFormProps,
) {
  // const {
  //   firstName,
  //   middleName,
  //   lastName,
  //   phoneNumber,
  //   email,
  //   setFieldValue,
  //   onRequestVerifyEmail,
  //   onRequestVerifyMobile,
  // } = props
  const { onRequestVerifyEmail, onRequestVerifyMobile, control } = props
  return (
    <VStack px={4} mb={2} space="md">
      <FormInput {...{ control }} label="First name" required name="firstName" />
      <FormInput {...{ control }} label="Middle name" name="middleName" />
      <FormInput {...{ control }} label="last name" required name="lastName" />
      <VStack space="sm">
        <Controller
          {...{ control }}
          name="phoneNumber"
          render={({ field: { value, onChange, onBlur }, fieldState }) => {
            console.log("field state ", fieldState)
            return (
              <>
                <FormControl isRequired>
                  <FormControl.Label> Phone number </FormControl.Label>
                  <PhonenumberInput {...{ value: value || "", onBlur }} onChangeText={onChange} />
                </FormControl>

                <Button
                  variant={"outline"}
                  isDisabled={!!fieldState.error}
                  onPress={onRequestVerifyMobile}
                  margin={4}
                >
                  Verify mobile
                </Button>
              </>
            )
          }}
        />
      </VStack>
      <VStack space="sm">
        <Controller
          {...{ control }}
          name="email"
          render={({ field: { value, onChange, onBlur }, fieldState }) => {
            console.log("field state ", fieldState)

            return (
              <>
                <TextField {...{ value, onBlur }} onChangeText={onChange} label="Email" required />

                <Button
                  variant={"outline"}
                  isDisabled={!!fieldState.error}
                  onPress={onRequestVerifyEmail}
                >
                  Verify email
                </Button>
              </>
            )
          }}
        />
      </VStack>
      {/* <TextField
        label="First name"
        value={firstName}
        required={true}
        onChangeText={(t) => setFieldValue("firstName", t)}
      />
      <TextField
        label="Middle name"
        value={middleName}
        onChangeText={(t) => setFieldValue("middleName", t)}
      />
      <TextField
        label="last name"
        required
        value={lastName}
        onChangeText={(t) => setFieldValue("lastName", t)}
      /> */}
      {/* <TextField
          label="Mobile number"
          value={phoneNumber}
          onChangeText={(t) => setFieldValue("phoneNumber", t)}
        /> */}
      {/* <FormControl isRequired>
        <FormControl.Label> Phone number </FormControl.Label>
        <PhonenumberInput
          onChangeText={(t) => setFieldValue("phoneNumber", t)}
          value={phoneNumber}
        />
      </FormControl> */}
      {/* <Button onPress={onRequestVerifyMobile} variant="outline">
        Verify mobile
      </Button>
      <TextField label="Email" value={email} onChangeText={(t) => setFieldValue("email", t)} />
      <Button variant="outline" onPress={onRequestVerifyEmail}>
        Verify email
      </Button> */}
    </VStack>
  )
})
