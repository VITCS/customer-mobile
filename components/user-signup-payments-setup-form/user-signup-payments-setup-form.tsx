import { useFormikContext } from "formik"
import get from "lodash/get"
import { VStack } from "native-base"
import React from "react"
import { Button, IDynamicInput, Text, TextField, UserSigupGenericForm } from "../"
import { SignUpInput } from "../../screens"

export interface UserSignupPaymentsSetupFormProps {
  goPrev: () => any
}

/**
 * Describe your component here
 */
export const UserSignupPaymentsSetupForm = (props: UserSignupPaymentsSetupFormProps) => {
  const formik = useFormikContext<SignUpInput>()
  const { handleChange, handleBlur, values, touched, submitForm, errors } = formik
  const { goPrev } = props

  const formInputs: IDynamicInput[] = React.useMemo(() => {
    const inputs: IDynamicInput[] = [
      {
        label: "Card holder name",
        dataKey: "paymentSetup.cardHolderName" as any,
      },
      {
        label: "",
        dataKey: "paymentSetup.cardNumber" as any,
      },
      {
        label: "Expiry date (MM/YYYY)",
        dataKey: "paymentSetup.ExpiryDate",
      },
      {
        label: "Postal Code",
        dataKey: "paymentSetup.postCode",
      },
    ]
    return inputs
  }, [values.deliveryContact?.addressType])
  return (
    <UserSigupGenericForm title="Payment setup ">
      <VStack space="xs">
        {formInputs.map((input) => {
          const { label, show = true, required, render, dataKey, autoCapitalize } = input
          const finalValue = get(values, dataKey)
          if (!show) {
            return null
          }
          return render ? (
            render()
          ) : (
            <TextField
              key={dataKey}
              autoCapitalize={autoCapitalize || "none"}
              label={label}
              onChangeText={handleChange(dataKey)}
              errorMessage={touched[dataKey] && (errors[dataKey] as string)}
              onBlur={handleBlur(dataKey)}
              required={required || false}
              value={(finalValue as string) || ""}
            />
          )
        })}
        <VStack space={4} mt={6}>
          <Button variant="outline" onPress={goPrev}>
            <Text color="primary.500" fontSize="lg">
              Previous
            </Text>
          </Button>
          <Button variant="solid" py={3} onPress={submitForm}>
            <Text color="white" fontSize="lg">
              Finish
            </Text>
          </Button>
        </VStack>
      </VStack>
    </UserSigupGenericForm>
  )
}
