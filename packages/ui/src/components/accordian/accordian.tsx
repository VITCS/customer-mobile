import { Ionicons as IonIcon } from "@expo/vector-icons";
import { HStack, Icon, Box } from "native-base";
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
  const bgColor = outlined ? "white" : "primary.500";
  const textColor = outlined ? "primary.500" : "white";
  return (
    <Box

      borderRadius={8}
    >
      <NativeAccordion
        underlayColor="transparent"
        renderHeader={(section, id, isActive) => {
          return (
            <HStack
              alignItems="center"
              bg={bgColor}
              px={3}
              py={3}
              mt={5}
              borderRadius={8}
              borderWidth={1}
              borderColor={"primary.500"}
            >
              <Text fontWeight="600" maxW="90%" style={{ color: outlined ? "#b72618" : "white", fontSize: 18 }} >
                {section?.title || ""}
              </Text>
              <View
                style={{
                  marginLeft: "auto",
                }}
              >
                {isActive ? (
                  <Icon
                    as={() => (
                      <IonIcon size={24} name="chevron-down" style={{ color: outlined ? "#b72618" : "white" }} />
                    )}
                  />
                ) : (
                  <Icon
                    as={() => (
                      <IonIcon size={24} name="chevron-up" style={{ color: outlined ? "#b72618" : "white" }} />
                    )}
                  />
                )}
              </View>
            </HStack >
          );
        }}
        {...restProps}
      ></NativeAccordion >
    </Box>

  );
});
