import { HStack,  VStack } from "native-base";
import * as React from "react";
import { Text } from "../";
import {View} from 'react-native'

export type IEachContent = {
  label: string;
  value: string;
};

export interface ObjectRendererProps {
  title?: string;
  content: IEachContent[];
}

/**
 * Describe your component here
 */
export const ObjectRenderer = React.memo((props: ObjectRendererProps) => {
  const { title, content } = props;

  return (
    <View>
      {title?.length > 0 && (
        <Text fontSize="xl" fontWeight="light" mb={3}>
          {title}
        </Text>
      )}
      <VStack>
        {content.map(({ label, value }) => {
          return (
            <HStack
              justifyContent="space-between"
              w="100%"
              mb={2}
              key={`${label}-${value}`}
            >
              <Text fontSize="lg" color="gray.700" fontWeight="medium">
                {label}
              </Text>

              <Text fontSize="lg" color="gray.900" fontWeight="semibold">
                {value}
              </Text>
            </HStack>
          );
        })}
      </VStack>
    </View>
  );
});
