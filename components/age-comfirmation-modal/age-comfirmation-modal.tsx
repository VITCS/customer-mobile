import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet"
import { useNavigation } from "@react-navigation/core"
import { HStack, View } from "native-base"
import React, { useCallback, useEffect, useMemo, useRef } from "react"
import { useMMKVObject } from "react-native-mmkv"
import { spacing, useStyles, Text } from "ui"
import { Button } from "../"
import { ageConfirmation } from "../../config/constants"
import { color } from "../../theme"
import { storage } from "../../utils/storage"

export interface AgeComfirmationModalProps {
  //visible: boolean
}

/**
 * Describe your component here
 */
export const AgeComfirmationModal = (props: AgeComfirmationModalProps) => {
  const {} = props
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const navigation = useNavigation()
  const snapPoints = useMemo(() => ["45%"], [])

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      bottomSheetModalRef?.current?.present()
    }, 3000)
  }, [bottomSheetModalRef])

  const styles = useStyles({
    create: (theme) => ({
      shipmentItem: {
        padding: spacing[3],
        borderWidth: 1,
        borderColor: theme.colors.primary,
        borderRadius: 8,
        marginBottom: spacing[2],
        // borderStyle:'solid'
      },
      title: {
        fontSize: 18,
        marginBottom: spacing[3],
        fontWeight: "500",
        color: color.error,
      },
      body: {
        fontSize: 18,
        marginBottom: spacing[3],
        fontWeight: "600",
      },
      total: {
        fontSize: 18,
        fontWeight: "500",
      },
    }),
  })

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      backdropComponent={(p) => (
        <BottomSheetBackdrop {...p} disappearsOnIndex={1} appearsOnIndex={2} />
      )}
      // enableHandlePanningGesture={false}
      enablePanDownToClose={false}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      // style={{
      //   shadowColor: "#000",
      //   shadowOffset: {
      //     width: 0,
      //     height: 6,
      //   },
      //   shadowOpacity: 0.37,
      //   shadowRadius: 7.49,

      //   elevation: 12,
      // }}
    >
      <View alignItems="center">
        <Text style={styles.title}>Welcome to 1800spirits</Text>
        <View alignItems="center" mt={8}>
          <Text style={styles.body}>Are you 21 years old ? </Text>
          <Text fontWeight="light" mt={4} mx={6}>
            You must be 21 years(Minimum Legal Drinking Age) to order alcohol through our platform.
          </Text>
          <HStack mx={4} mt={8} space="lg" justifyContent="space-between">
            <Button
              variant="outline"
              flex={1}
              onPress={() => {
                storage.set("ageConfirmation", false)
                bottomSheetModalRef.current.close()
              }}
            >
              <Text color="primary.400">No</Text>
            </Button>
            <Button
              variant="solid"
              flex={1}
              width="100%"
              onPress={() => {
                storage.set("ageConfirmation", false)
                bottomSheetModalRef.current.close()
                navigation.navigate("auth", { screen: "login" })
              }}
            >
              <Text color="white">Yes</Text>
            </Button>
          </HStack>
        </View>
      </View>
    </BottomSheetModal>
  )
}
