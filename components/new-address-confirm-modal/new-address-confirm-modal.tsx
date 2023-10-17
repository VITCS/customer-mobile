import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet"
import { useNavigation } from "@react-navigation/native"
import { FormControl, Heading, Radio, Select, Spinner, Stack, VStack } from "native-base"
import * as React from "react"
import { Button } from "ui"
import { Text } from "../"
import { DELIVERY_ADDRESS } from "../../config/constants"
import {
  CustomerContact,
  useCreateCustomerAddressMutation,
  useGetDeliveryContactNamesQuery,
  useUpdateUserMutation,
} from "../../graphql/generated/graphql"
import { apiSdk, getUserId } from "../../utils/api"
import { formatname } from "../../utils/format"
import { storage } from "../../utils/storage"

export interface NewAddressConfirmModalProps {
  visible: boolean
  onDismiss: () => void
}

/**
 * Describe your component here
 */
export const NewAddressConfirmModal = (props: NewAddressConfirmModalProps) => {
  const { visible, onDismiss } = props
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null)

  const snapPoints = React.useMemo(() => [1, "70%"], [])

  React.useEffect(() => {
    if (visible) {
      bottomSheetModalRef.current?.present()
    } else {
      bottomSheetModalRef.current?.close()
    }
  }, [visible])
  const [nextStep, setNextStep] = React.useState<"update" | "create">("create")

  const [contactsLoading, setContactsLoading] = React.useState(false)

  const [selectedContact, setSelectedContact] = React.useState<Pick<CustomerContact, "id">>(null)

  const { data, isLoading, isError } = useGetDeliveryContactNamesQuery(
    apiSdk,
    {
      userId: getUserId(),
    },
    {
      enabled: nextStep === "update",
    },
  )
  const contacts = React.useMemo(() => {
    return data?.getCustomerProfile?.customerContact?.items
  }, [data])

  const navigation = useNavigation()
  const { mutate: updateUser } = useUpdateUserMutation(apiSdk, {
    onSuccess: (data) => {
      storage.delete(DELIVERY_ADDRESS)
      onDismiss()
    },
  })
  const { mutate } = useCreateCustomerAddressMutation(apiSdk, {
    onSuccess: (data) => {
      updateUser({
        input: {
          userId: getUserId(),
          deliveryToId: data?.createCustomerAddress?.id,
        },
      })
    },
  })
  const onConfirm = React.useCallback(async () => {
    const address = await storage.getString(DELIVERY_ADDRESS)
    const addressJson = JSON.parse(address)
    if (nextStep === "create") {
      onDismiss()
      await storage.delete(DELIVERY_ADDRESS)
      navigation.navigate("profile", {
        screen: "deliveryContacts",
        params: {
          screen: "addContact",
          params: {
            prefillValues: {
              ...addressJson,
            },
          },
        },
      })
    } else {
      // update Customer Contact

      mutate({
        input: {
          addrLine1: addressJson?.addrLine1 || "",
          addrLine2: addressJson?.addrLine2 || "",
          city: addressJson?.city || "",
          customerContactId: selectedContact?.id,
          latitude: addressJson?.latitude || 0,
          longitude: addressJson?.longitude || 0,
        },
      })
    }
  }, [nextStep])
  return (
    <BottomSheetModal
      enableDismissOnClose={false}
      enableHandlePanningGesture={false}
      enableContentPanningGesture={false}
      ref={bottomSheetModalRef}
      index={1}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      // stackBehavior="push"
      backdropComponent={(p) => <BottomSheetBackdrop {...p} pressBehavior="none" />}
    >
      <VStack px={3} h="full">
        <Heading my={3}>New address detected</Heading>
        <Text fontSize={"md"} color="gray.600">
          Selected delivery address doesn't exist in your delivery contacts.{" "}
        </Text>

        <Text fontSize={"md"} color="gray.600" mt={6} mb={3}>
          Select what you want to do with selected address
        </Text>
        <Radio.Group name="nextStep" value={nextStep} onChange={(e) => setNextStep(e)}>
          <Radio value="create" colorScheme="red">
            Add New Delivery Contact
          </Radio>
          <Radio value="update" colorScheme="red">
            Add to Existing Delivery Contact
          </Radio>
        </Radio.Group>
        {nextStep === "update" && (
          <>
            {contactsLoading ? (
              <Spinner />
            ) : contacts?.length > 0 ? (
              <FormControl my={3}>
                <FormControl.Label>Select contact </FormControl.Label>
                <Select
                  selectedValue={selectedContact?.id}
                  onValueChange={(value) => {
                    setSelectedContact({
                      id: value,
                    })
                  }}
                >
                  {contacts.map((contact) => {
                    const value = formatname(
                      contact.firstName,
                      contact.middleName,
                      contact.lastName,
                    )
                    return <Select.Item key={contact.id} label={value} value={contact.id} />
                  })}
                </Select>
              </FormControl>
            ) : null}
          </>
        )}

        <Stack mt="auto" space={4} flexDir={"column"}>
          <Button
            variant={"outline"}
            onPress={() => {
              onDismiss()
              bottomSheetModalRef?.current?.close()
            }}
          >
            Cancel
          </Button>
          <Button mb={8} onPress={onConfirm}>
            Confirm
          </Button>
        </Stack>
      </VStack>
    </BottomSheetModal>
  )
}
