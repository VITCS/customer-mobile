/* eslint-disable react-native/no-inline-styles */
import { FormControl, IInputProps, Input } from "native-base";
import * as React from "react";
import { View, ViewStyle } from "react-native";
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

export type TextFieldProps = IInputProps & {
  /**
   * The placeholder i18n key.
   */
  placeholderTx?: TxKeyPath;

  /**
   * The Placeholder text if no placeholderTx is provided.
   */
  placeholder?: string;

  /**
   * The label i18n key.
   */
  labelTx?: TxKeyPath;

  /**
   * The label text if no labelTx is provided.
   */
  label?: string;
  preset?: keyof typeof PRESETS;
  forwardedRef?: any;
  required?: boolean;
  errorMessage?: string | false;
  labelRight?: React.ReactNode;
};

/**
 * A component which has a label and an input together.
 */
export const TextField = React.memo(function TextField(props: TextFieldProps) {
  const {
    placeholderTx,
    placeholder,
    label,
    preset = "default",
    forwardedRef,
    required,
    labelTx,
    errorMessage,
    labelRight,
    ...rest
  } = props;
  // const isError = React.useMemo(() => errorMessage?.length > 0, [errorMessage])
  // const [errorColor] = useToken("colors", ["red.400"]);
  // const containerStyles = [CONTAINER, PRESETS[preset], styleOverride]
  return (
    <FormControl
      isRequired={required}
      isInvalid={errorMessage?.length > 0}
      mb={2}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <FormControl.Label>
          <Text fontSize={16} fontWeight="400" tx={labelTx}>
            {label}
          </Text>
        </FormControl.Label>
        {labelRight}
      </View>

      <Input fontSize="md" fontWeight="400" mb={0} rounded={"sm"} {...rest} />
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
});
