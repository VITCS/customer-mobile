/* eslint-disable react-native/no-inline-styles */
import { FormControl, Input } from "native-base";
import * as React from "react";
import { ViewStyle } from "react-native";
import { TextInput, TextInputProps } from "react-native-paper";
import { TxKeyPath } from "../../i18n";
import { Text } from "../index";

// the base styling for the container
// const CONTAINER: ViewStyle = {
//   paddingVertical: spacing[1],
// }

// currently we have no presets, but that changes quickly when you build your app.
const PRESETS: { [name: string]: ViewStyle } = {
  default: {},
};

export type TextFieldProps = TextInputProps & {
  /**
   * The placeholder i18n key.
   */
  placeholderTx?: TxKeyPath;

  /**
   * The Placeholder text if no placeholderTx is provided.
   */
  placeholder?: string;

  label?: string;
  preset?: keyof typeof PRESETS;
  forwardedRef?: any;
  required?: boolean;
  errorMessage?: string;
};

/**
 * A component which has a label and an input together.
 */
export const TextField = React.memo(function TextField(props: TextFieldProps) {
  const {
    preset = "default",
    forwardedRef,
    required,
    errorMessage,
    ...rest
  } = props;
  // const isError = React.useMemo(() => errorMessage?.length > 0, [errorMessage])
  // const containerStyles = [CONTAINER, PRESETS[preset], styleOverride]
  return <TextInput label={"name *"} {...rest} />;
  return (
    <FormControl
      isRequired={required}
      isInvalid={errorMessage?.length > 0}
      mb={2}
    >
      <FormControl.Label>
        <Text fontSize={16} fontWeight="400" tx={labelTx}>
          {label}
        </Text>
      </FormControl.Label>

      <Input fontSize="md" fontWeight="400" mb={0} rounded={"sm"} {...rest} />
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
});
