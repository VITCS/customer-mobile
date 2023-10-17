import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet"
import { Badge, HStack, VStack } from "native-base"
import * as React from "react"
import { TouchableOpacity } from "react-native"
import { spacing, Text } from "ui"
import { AnonymousAddressPicker, DeliveryAddressesList } from "../"
import { useGetProfileQuery } from "../../graphql/generated/graphql"
import { useLoggedInUser } from "../../stores/auth"
import { apiSdk } from "../../utils/api"
import { useStyles } from "../../utils/styles"

export interface AddressPickerModalProps {
  visible: boolean
  onDismiss: () => void
}
export enum IEnumCategories {
  self = "Self",
  recent = "Recent",
  all = "All",
}

/**
 * Describe your component here
 */
export const AddressPickerModal = (props: AddressPickerModalProps) => {
  const { visible, onDismiss } = props
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null)

  const snapPoints = React.useMemo(() => [1, "90%"], [])

  const [selectedCategory, setSelectedCategory] = React.useState<IEnumCategories>(
    IEnumCategories.self,
  )

  React.useEffect(() => {
    if (visible) {
      bottomSheetModalRef.current?.present()
    } else {
      bottomSheetModalRef.current.close()
    }
  }, [visible])

  const userId = useLoggedInUser()
  const { data } = useGetProfileQuery(
    apiSdk,
    {
      userId: userId,
    },
    {
      enabled: userId?.length > 0,
    },
  )
  // const { bottom } = useSafeAreaInsets()
  const styles = useStyles({
    create: (theme) => ({
      heading: {
        fontSize: 20,
        // color: theme.colors.background,
        marginBottom: spacing[4],
      },
      badge: {
        paddingHorizontal: spacing[4],
        paddingVertical: spacing[3],
      },
    }),
  })
  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={1}
      // bottomInset={bottom}
      snapPoints={snapPoints}
      onDismiss={onDismiss}
      // footerComponent={({animatedFooterPosition}) => {
      //   return (
      //     <BottomSheetFooter  animatedFooterPosition={} >
      //       <Button
      //         // mt="auto"
      //         alignSelf={"center"}
      //         px={6}
      //         // mt={3}
      //         onPress={() => {
      //           // dispatch?.cart?.setDeliveryAddress(selectedAddress)
      //         }}
      //         // isDisabled={!selectedAddress}
      //         // isLoading={loading}
      //       >
      //         <Text fontSize={"xl"} color="white">
      //           Select Address
      //         </Text>
      //       </Button>
      //     </BottomSheetFooter>
      //   )
      // }}
      backdropComponent={(p) => <BottomSheetBackdrop {...p} />}
    >
      <VStack px={3}>
        <Text style={[styles.heading]}>Delivery addresses</Text>
        {data?.getCustomerProfile ? (
          <>
            <HStack space={4}>
              {Object.values(IEnumCategories).map((category) => {
                const isSelected = selectedCategory === category
                return (
                  <TouchableOpacity onPress={() => setSelectedCategory(category)} key={category}>
                    <Badge
                      px={4}
                      py={2}
                      colorScheme="primary"
                      rounded={"full"}
                      variant={isSelected ? "solid" : "outline"}
                    >
                      {category}
                    </Badge>
                  </TouchableOpacity>
                )
              })}
            </HStack>
            <DeliveryAddressesList category={selectedCategory} />
          </>
        ) : (
          <AnonymousAddressPicker />
        )}
      </VStack>
    </BottomSheetModal>
    
  )
}
