/* eslint-disable camelcase */
import Auth from "@aws-amplify/auth"
import { StackScreenProps } from "@react-navigation/stack"
import { FormikContext, useFormik } from "formik"
import { useToast, View } from "native-base"
import React, { useCallback, useMemo, useRef, useState } from "react"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import StepIndicator from "react-native-step-indicator"
import { spacing } from "ui"
import * as yup from "yup"
import { UserSignupAccountSetupForm, UserSignupDeliveryContactsForm } from "../../components"
import { AuthStackParamsList } from "../../navigators"
import { yupPhone } from "../../utils/format"
import { Controller, SubmitHandler, useForm, FormProvider } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

export type SignUpInput = {
  user_id: string
  email: string
  password: string
  code: string
  confirm_password: string
  given_name: string
  middle_name: string
  family_name: string
  phone_number: string
  country_ext_code: string

  // delivery contact part
  firstName: string
  middleName: string
  lastName: string
  deliveryContact: {
    addressType: string
    ContactCategory: string
    address: {
      addrLine1: string
      addrLine2: string
      city: string
      addrState: string
      postCode: string
      country: string
    }
  }

  // payment part
  paymentSetup: {
    cardHolderName: string
    cardNumber: string
    ExpDate: string
    postCode: string
  }
}

type IProps = StackScreenProps<AuthStackParamsList, "signup">

const signupValidatitonSchema = yup.object().shape({
  user_id: yup
    .string()
    .required("User Id required")
    .test({
      name: "u",
      test: (value) => !value?.includes(" "),
      message: "The user id cannot include leading and trailing spaces",
    })
    .min(2),
  given_name: yup
    .string()
    .required("First name is required")
    .min(2, "First name must be atleast 2 characters"),
  family_name: yup
    .string()
    .required("Last name is required")
    .min(2, "Last name must be atleast 2 characters"),
  email: yup.string().required("Email is required").email("Invalid  email "),
  phone_number: yupPhone,
  password: yup.string().required("Password is required").min(8),
  confirmPassword: yup
    .string()
    .required("")
    .oneOf([yup.ref("password"), null], "Passwords doesn't match"),
  deliveryContact: yup.object().shape({
    address: yup.object().shape({
      addrLine1: yup.string().required("Address is required"),
      city: yup.string().required("City is required"),
      country: yup.string().required("Country is required"),
      addrState: yup.string().required("State is required"),
      postCode: yup.string().required("Post code is required"),
  }),
}),
})


export const SignupScreen: React.FC<IProps> = (props) => {
  const { navigation } = props
  const [currentStep, setCurrentStep] = useState(0)
  const scrollRef = useRef()
  const goNext = useCallback(() => {
    setCurrentStep((old) => old + 1)
    scrollRef?.current?.scrollTo({
      x: 0,
      y: 0,
      animated: true,
    })
  }, [setCurrentStep, scrollRef])
  const goPrev = useCallback(() => {
    setCurrentStep((old) => old - 1)
    scrollRef?.current?.scrollTo({
      x: 0,
      y: 0,
      animated: true,
    })
  }, [setCurrentStep, scrollRef])
  
  const toast = useToast()

  const onSubmit: SubmitHandler<SignUpInput> = async (values) => {
    console.log("signup with values ", values)
    try {
      const {
        email,
        given_name,
        middleName,
        middle_name,
        family_name,
        phone_number,
        user_id,
        password,
        firstName,
        lastName,
        deliveryContact,
        paymentSetup,
      } = values
      console.log("phnoe ", phone_number)
      // return

      const { addressType, ContactCategory, address } = deliveryContact
      const { addrLine1, addrLine2, addrState, city, country, postCode } = address
      const addlSignupData = JSON.stringify({
        deliveryContact: {
          addressType: addressType,
          ContactCategory: ContactCategory,
          address: {
            addrLine1,
            addrLine2,
            city,
            addrState,
            postCode,
            country:'USA',
            markDefault: true,
          },
        },
      })
      const { cardHolderName, cardNumber, ExpDate, postCode: _postCode } = paymentSetup
      const addlPaymentDetails = JSON.stringify({
        paymentSetup: {
          cardHolderName,
          cardNumber,
          ExpDate,
          postCode: _postCode,
        },
      })
      const res = await Auth.signUp({
        attributes: {
          email,
          phone_number,
          given_name,
          middle_name,
          family_name,
          "custom:fullName": `${firstName} ${middleName} ${lastName}`,
          // 'custom:lastName': lastName,
          "custom:addlSignupData": addlSignupData,
          "custom:addlPaymentDetails": addlPaymentDetails,
        },
        username: user_id,
        password: password,
      })
      toast.show({
        title: "Successfully created account",
        description: "Verify with code from your Phone to move forward",
      })
      navigation.navigate("verifySignupCode", {
        userName: user_id,
        phoneNumber: phone_number,
      })
    } catch (error) {
      console.log("error is ", error)

      toast.show({
        title: "Error",
        description: error.message,
        status: "error",
      })
    }      
  }

  const formMethods = useForm<SignUpInput>({
    defaultValues: {
      user_id: "",
      password: "",
      email: "",
      code: "",
      confirm_password: "",
      given_name: "",
      middle_name: "",
      family_name: "",
      phone_number: "",
      country_ext_code: "+1",
      // delivery contacts part
      firstName: "",
      middleName: "",
      lastName: "",
      deliveryContact: {
        addressType: "",
        ContactCategory: "",
        address: {
          addrLine1: "",
          addrLine2: "",
          city: "",
          addrState: "",
          country: "",
          postCode: "",
        },
      },
      paymentSetup: {
        cardHolderName: "",
        cardNumber: "",
        ExpDate: null,
        postCode: "",
      },
    },
    resolver: yupResolver(signupValidatitonSchema),
    mode: "all",
  })
  const { control, handleSubmit, reset, getValues, getFieldState, } = formMethods
  //console.log('formMethods: ---', formMethods);
  /* console.log('isDirty---', isDirty);
  console.log('errors: ---', errors);
  const isValid = signupValidatitonSchema.isValidSync(getValues());
  console.log('isValid: ---', isValid); */

  const steps = useMemo(() => {
    return [
      <UserSignupAccountSetupForm {...{ goNext, control }} />,
      <UserSignupDeliveryContactsForm {...{ goNext, goPrev, control, handleSubmit, onSubmit }} />,
      // <UserSignupPaymentsSetupForm {...{ goPrev }} />,
    ]
  }, [])

  const { bottom } = useSafeAreaInsets()
  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      extraHeight={100}
      contentContainerStyle={{
        paddingHorizontal: spacing[4],
        paddingBottom: bottom,
      }}
    >
      {/* <ScrollView
      bg="white"
      flex={1}
      // mx={5}
      w="100%"
      px={4}
      ref={scrollRef}
      contentContainerStyle={{ paddingBottom: bottom }}
    > */}
    <StepIndicator currentPosition={currentStep} stepCount={2} renderLabel={() => null} />
     <FormProvider {...formMethods}>      
        {steps.map((step, stepIndex) => {
          return (stepIndex === currentStep && <View>{step}</View>) || null
        })}
      </FormProvider>
      {/* </ScrollView> */}
    </KeyboardAwareScrollView>
  )
}
