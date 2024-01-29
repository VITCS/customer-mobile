import { FontAwesome as FontAwesomeIcon } from "@expo/vector-icons";
import { HStack, VStack } from "native-base";
import React, { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
import { Checkbox, Text } from "../";

export interface GenericListItemProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>;
  name: string;
  isSelected?: boolean;
  isMultiSelectEnabled?: boolean;
  onCheckChange?: (b: boolean) => any;
  children: ReactNode;
}

/**
 * Describe your component here
 */
export const GenericListItem = React.memo(function GenericListItem(
  props: GenericListItemProps
) {
  const {
    children,
    style,
    name,
    isSelected,
    isMultiSelectEnabled,
    onCheckChange,
  } = props;

  return (
    <VStack
      bg="white"
      shadow={3}
      rounded={"xl"}
      mx={4}
      mb={3}
      borderColor="gray.300"
      px={4}
      style={style}
    >
      <HStack
        py={2}
        alignItems="center"
        justifyContent="space-between"
        w="100%"
      >
        <Text fontWeight="semibold" fontSize="xl">
          {name}
        </Text>
        {isMultiSelectEnabled ? (
          <>
            <Animated.View>
              <Checkbox
                style={{
                  alignSelf: "flex-end",
                }}
                onValueChange={onCheckChange}
                value={isSelected}
              />
            </Animated.View>
          </>
        ) : (
          <FontAwesomeIcon name="angle-right" size={32} />
        )}
      </HStack>
      {children}
    </VStack>
  );
});
