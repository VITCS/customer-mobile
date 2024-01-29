import { Ionicons as IonIcon } from "@expo/vector-icons";
import { HStack, Icon } from "native-base";
import * as React from "react";
import { View } from "react-native";
import NativeAccordion, {
  AccordionProps as NativeAccordionProps,
} from "react-native-collapsible/Accordion";
import { Text } from "..";

export interface AccordianProps<T> extends NativeAccordionProps<T> {
  variant?: "default" | "outline";
}

/**
 * Describe your component here
 */
export const Accordion = React.memo(function Accordion<
  T extends { title: string } = { title: "" }
>(props: Omit<AccordianProps<T>, "renderHeader">) {
  const { variant, ...restProps } = props;

  const outlined = variant === "outline";
  const bgColor = outlined ? "transparent" : "primary.500";
  const textColor = outlined ? "primary.500" : "white";
  return (
    <NativeAccordion
      underlayColor="transparent"
      renderHeader={(section, id, isActive) => {
        return (
          <HStack
            borderBottomWidth={1}
            borderBottomColor="gray.100"
            bg={bgColor}
            px={2}
            py={2}
          >
            <Text color={textColor} fontWeight="600" fontSize={18} maxW="90%">
              {section?.title || ""}
            </Text>
            <View
              style={{
                marginLeft: "auto",
              }}
            >
              {isActive ? (
                <Icon
                  color={textColor}
                  as={() => (
                    <IonIcon size={24} name="chevron-down" color={textColor} />
                  )}
                />
              ) : (
                <Icon
                  color={textColor}
                  as={() => (
                    <IonIcon size={24} name="chevron-up" color={textColor} />
                  )}
                />
              )}
            </View>
          </HStack>
        );
      }}
      {...restProps}
    ></NativeAccordion>
  );
});
