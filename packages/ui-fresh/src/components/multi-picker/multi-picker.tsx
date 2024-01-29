import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import { IconButton, Input } from "native-base";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { Text, View } from "react-native";
import { Checkbox } from "../";
import { spacing } from "../../theme";

export type IMultiSelectOption = {
  label: string;
  value: any;
};

export interface MultiPickerProps {
  creatable?: boolean;
  options: IMultiSelectOption[];
  onChange: <I extends IMultiSelectOption>(value: I["value"]) => any;
  selectedValue: any[];
  isOpen: boolean;
  label: string;
  onClose: () => any;
}

/**
 * Describe your component here
 */
export const MultiPicker = memo(function MultiPicker(props: MultiPickerProps) {
  const {
    selectedValue,
    onChange,
    options,
    creatable,
    isOpen,
    onClose,
    label,
  } = props;
  const sheetRef = useRef<BottomSheet>(null);

  const [allOptions, setAllOptions] = useState<IMultiSelectOption[]>([]);
  const [name, setName] = useState("");
  useEffect(() => {
    setAllOptions(options);
  }, [options, setAllOptions]);
  useEffect(() => {
    console.log("is open is ", isOpen);

    if (isOpen) {
      sheetRef?.current?.snapToIndex(1);
    } else {
      sheetRef?.current?.snapToIndex(0);
    }
  }, [isOpen, sheetRef]);

  const snapPoints = useMemo(() => [1, "60%"], []);

  return (
    <BottomSheet
      snapPoints={snapPoints}
      ref={sheetRef}
      backdropComponent={(p) => <BottomSheetBackdrop {...p} />}
      index={0}
      onChange={(index) => {
        console.log("index is ", index);
        if (index === 0) {
          onClose();
        }
      }}
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        paddingHorizontal: 16,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "600",
          marginLeft: 12,
        }}
      >
        {label}
      </Text>

      {creatable && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Input
            style={{
              width: "100%",
            }}
            InputRightElement={
              <IconButton
                onPress={() => {
                  setAllOptions([
                    ...options,
                    {
                      label: name,
                      value: name,
                    },
                  ]);
                  onChange([...selectedValue, name]);
                  setName("");
                }}
                variant="solid"
                style={{
                  height: 48,
                  width: 58,
                  // marginTop: "auto",
                  marginLeft: 12,
                }}
                // icon={<FontAwesome5 name="plus" color="white" />}
              />
            }
            value={name}
            onChangeText={(t) => setName(t)}
          />
        </View>
      )}
      <BottomSheetFlatList
        contentContainerStyle={{
          marginTop: 16,
          paddingVertical: 12,
          paddingHorizontal: 12,
        }}
        data={allOptions}
        keyExtractor={(item) => item?.value}
        renderItem={({ item }) => {
          if (!item) {
            return null;
          }
          const selected = !!selectedValue?.some((r) => r === item?.value);
          return (
            <View
              style={{
                flexDirection: "row",
                marginBottom: 12,
                alignItems: "center",
              }}
            >
              <Checkbox
                boxType="square"
                style={{
                  // width: 18,
                  // height: 18,
                  marginRight: 12,
                }}
                value={selected || false}
                onValueChange={(v) => {
                  // if (!v) {
                  //   onChange()
                  // }
                  let newValue = [...selectedValue];
                  if (v === true) {
                    newValue.push(item.value);
                  } else {
                    newValue = newValue.filter((r) => r !== item?.value);
                  }
                  onChange(newValue);
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  marginLeft: spacing[3],
                  fontWeight: "500",
                }}
              >
                {item.label}
              </Text>
            </View>
          );
        }}
      />
    </BottomSheet>
  );
});
