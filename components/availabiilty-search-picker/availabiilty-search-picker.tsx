import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet"
import React, { memo, useCallback, useMemo, useRef, useState } from "react"
import { PurchaseOptions } from "../"
import { Product } from "../../graphql/generated/graphql"

export interface AvailabiiltySearchPickerProps {
  product: Pick<Product, "id" | "prodFullName" | "prodShortDesc">
  onClose: () => void
}

/**
 * Describe your component here
 */
export const AvailabiiltySearchPicker = memo((props: AvailabiiltySearchPickerProps) => {
  const { product } = props
  const bottomSheetModalRef = useRef<BottomSheet>(null)

  const [isOpen, setIsOpen] = useState(false)
  // variables
  const snapPoints = useMemo(() => [1, "80%"], [])

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index)
    if (index === 0) {
      setIsOpen(false)
    } else {
      setIsOpen(true)
    }
  }, [])

  React.useEffect(() => {
    if (product?.id?.length > 0) {
      bottomSheetModalRef?.current?.snapToIndex(1)
    }
  }, [product])

  return (
    <BottomSheet
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      enableOverDrag
      enablePanDownToClose={false}
      enableContentPanningGesture
      onChange={handleSheetChanges}
      style={{
        zIndex: 1000,
        backgroundColor: "white",
      }}
      backdropComponent={(p) => <BottomSheetBackdrop {...p} />}
    >
      {/* <BottomSheetScrollView
        contentContainerStyle={{
          flex: 1,
          zIndex: 10,
        }}
        // style={{
        //   flex: 1,
        // }}
      > */}
      {isOpen && <PurchaseOptions {...product} removeExisingProductReferences={true} />}
      {/* </BottomSheetScrollView> */}
    </BottomSheet>
  )
})
