import { useNavigation, useRoute } from "@react-navigation/core"
import { FormikContext, useFormik } from "formik"
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormGetValues,
  useFormState,
} from "react-hook-form"
import { ScrollView, useToast, View, Box } from "native-base"
import React, { useEffect } from "react"
import {
  Accordion,
  AddNewContactAddressesForm,
  AddNewContactCategoryForm,
  AddNewContactOccasionsForm,
  Button,
  DeliveryContactListItemProps,
  Screen,
} from "../../components"
import {
  AddressType,
  ContactCategory,
  CreateCustomerAddressInput,
  CreateCustomerContactInput,
  CreateCustomerOccasionInput,
  useCreateCustomerContactWithRelationsMutation,
  useGetDeliveryContactsQuery,
  useUpdateCustomerContactMutation,
} from "../../graphql/generated/graphql"
import { apiSdk, getUserId } from "../../utils/api"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { yupPhone } from "../../utils/format"
import { ViewStyle } from "react-native"
import { DeliveryContactParamList, MainStackParamsList } from "../../navigators"
import { StackScreenProps } from "@react-navigation/stack"
import { boolean } from "yup/lib/locale"
import { useQueryClient } from "react-query"

type Props = StackScreenProps<DeliveryContactParamList, "addContact">

const ROOT: ViewStyle = {
  flex: 1,
  backgroundColor: "white",
  paddingBottom: 32,
}

export type AddNewContactInput = CreateCustomerContactInput & {
  addresses: CreateCustomerAddressInput[]
  occasions: CreateCustomerOccasionInput[]
  //getValues: UseFormGetValues<AddNewContactInput>
}
const ADD_SECTIONS = [
  {
    title: "Category",
    content: "category",
  },
  {
    title: "Addresses",
    content: "addresses",
  },
  {
    title: "Occasions",
    content: "occasions",
  },
]
const EDIT_SECTIONS = [
  {
    title: "Category",
    content: "category",
  },

]
const Addschema = yup.object({
  firstName: yup
    .string()
    .required("First name is required")
    .min(1, "Minimum 2 characters are required"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(1, "Minimum 2 characters are required"),
  middleName: yup.string().nullable(),
  email: yup.string().required("Email is required ").email("Invalid email"),
  phoneNumber: yupPhone,
  contactCategory: yup.string().required("Address type is required"),
  addresses: yup.array().of(
    yup.object({
      addrLine1: yup.string().required("Address is required"),
      city: yup.string().required("City is required"),
      country: yup.string().required("Country is required"),
      addrState: yup.string().required("State is required"),
      postCode: yup.string().required("Post code is required"),
      firstName: yup
        .string()
        .required("First name addresses is required")
        .min(1, "Minimum 2 characters are required"),
      lastName: yup
        .string()
        .required("Last name is required")
        .min(1, "Minimum 2 characters are required"),
    }),
  ),
  occasions: yup.array().of(
    yup.object().shape({
      occasionTitle: yup.string().required("Occasion name is required"),
      occasionDate: yup.date().required("Occasion date is required"),
      reminder: yup.string().required("Reminder is required"),
    }),
  ),
  // addresses: yup.object({
  //   addrLine1: yup.string(),
  //   addrLine2: yup.string(),
  //   city: yup.string(),
  //   country: yup.string(),
  //   state: yup.string(),
  //   postCode: yup.string(),
  // }),
})
const Editschema = yup.object({
  firstName: yup
    .string()
    .required("First name is required")
    .min(1, "Minimum 2 characters are required"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(1, "Minimum 2 characters are required"),
  email: yup.string().required("Email is required ").email("Invalid email"),
  phoneNumber: yupPhone,
  contactCustomType: yup.string().required("Address type is required")
})
//export const AddDeliveryContactFormScreen = ({ navigation, route }) => {

export const AddDeliveryContactFormScreen: React.FC<Props> = ({ navigation, route }) => {
  const [contact] = React.useMemo(
    () => [route.params?.contact],
    [route],
  )
  const userId = getUserId()
  const queryClient = useQueryClient()
  // const { id } = params
  // const navigation = useNavigation()
  const toast = useToast()
  const [sections, setSections] = React.useState([0])

  // Pull in navigation via hook
  // const route = useRoute() 
  // const { params } = route
  // const { id } = params
  // const navigation = useNavigation()
  const formMethods = useForm<AddNewContactInput>({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      contactCustomType: "",
      contactCategory: ContactCategory.Self,
      middleName: "",
      occasionReminderContact: false,
      addresses: [
        {
          addrLine1: "",
          addrLine2: "",
          addrState: "",
          city: "",
          firstName: "",
          lastName: "",
          addressType: AddressType.Home,
        },
      ],
      occasions: [
        {
          occasionTitle: "",
          occasionDate: "",
          reminder: false,
        },
      ],
    },
    resolver: yupResolver(contact ? Editschema : Addschema),
    mode: "onSubmit",
  })
  const { control, reset } = formMethods

  const { mutate: addCustomerContact } = useCreateCustomerContactWithRelationsMutation(apiSdk, {
    onSuccess: (data) => {
      console.log("create result is ", data)
      toast.show({
        title: "Sucesss",
        description: "created contact"
      })
      queryClient.refetchQueries(useGetDeliveryContactsQuery.getKey({ userId }))
      navigation.goBack()
    },
    onError: (error) => {
      console.log("error in adding contact is ", error)
      toast.show({
        title: "Error",
        description: "Something went wrong. "
      })
    },
  })

  const { mutate: editCustomerContact } = useUpdateCustomerContactMutation(apiSdk, {
    onSuccess: () => {
      toast.show({
        title: "Success",
        description: "",
      })
      queryClient.refetchQueries(useGetDeliveryContactsQuery.getKey({ userId }))
      navigation.goBack()
    },
    onError: (err) => {
      toast.show({
        title: "Error",
        description: `Error: ${err}`,
      })
    },
  })

  const onSubmit: SubmitHandler<AddNewContactInput> = async (values) => {
    try {
      console.log("values are ", values)
      // return
      const {
        firstName,
        lastName,
        middleName,
        email,
        phoneNumber,
        contactCategory,
        contactCustomType,
        occasionReminderContact,
      } = values
      let mutationRes
      if (contact) {

        mutationRes = await editCustomerContact({
          input: {
            id: contact?.contact.id,
            firstName,
            middleName,
            lastName,
            email,
            phoneNumber,
            userId,
            occasionReminderContact: occasionReminderContact || false,
            contactCategory,
            contactCustomType,
          },
        })
      }
      else {
        mutationRes = await addCustomerContact({
          input: {
            CustomerContactInput: {
              firstName,
              middleName,
              lastName,
              email,
              phoneNumber,
              userId,
              occasionReminderContact: occasionReminderContact || false,
              contactCategory,
              contactCustomType,
            },
            CustomerAddressInput: values.addresses,

            CustomerOccasionInput: values.occasions,
          },
        })
      }


    } catch (error) { }
  }

  useEffect(() => {
    if (route?.params) {
      const prefillValues = route?.params?.contact?.contact;
      reset({
        // addresses: [
        //   {
        //     ...prefillValues,
        //     addrLine1: prefillValues?.addrLine1 || "",
        //     addrLine2: prefillValues?.addrLine2 || "",
        //     city: prefillValues?.city || "",
        //     addrState: prefillValues?.addrState || "",
        //     country: prefillValues?.country || "",
        //     firstName: prefillValues?.firstName || "",
        //     lastName: prefillValues?.lastName || "",
        //   },
        // ],
        contactCustomType: prefillValues.contactCustomType || "",
        firstName: prefillValues.firstName || "",
        lastName: prefillValues.lastName || "",
        middleName: prefillValues.middleName || "",
        email: prefillValues.email || "",
        phoneNumber: prefillValues.phoneNumber || "",
        // occasions: [],
      })
    }
  }, [route, reset])
  // const formState = useFormState({ control })
  // console.log(" formState main : ", formState)
  return (
    <Screen style={ROOT} preset="fixed" unsafe>
      <ScrollView
           nestedScrollEnabled={true}
         p={4}>

        <FormProvider {...formMethods}>
          <Accordion
            sections={contact ? EDIT_SECTIONS : ADD_SECTIONS}
            underlayColor="white"
            activeSections={sections}
            renderAsFlatList
            expandMultiple
            renderContent={({ content, isActive }) => {
              if (content === "category") {
                return <AddNewContactCategoryForm {...{ control }} />
              } else if (content === "addresses") {
                return <AddNewContactAddressesForm index={0} {...{ control }} />
              } else if (content === "occasions") {
                return <AddNewContactOccasionsForm index={0} {...{ control }} />
              }
              return <View />
            }}
            onChange={setSections}
          />
          <Box margin={3}>
          <Button mx={3} my={3} onPress={formMethods.handleSubmit(onSubmit)} p={3}>
            Submit
          </Button>
          </Box>
        </FormProvider>
        </ScrollView>
    </Screen>
  )
}
