import { Button as NButton } from "native-base";
import * as React from "react";
import { Text } from "../text/text";
import { textPresets } from "./button.presets";
import { ButtonProps } from "./button.props";

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Button(props: ButtonProps) {
  // grab the props
  const {
    preset = "primary",
    tx,
    text,
    children,
    textProps = {},
    ...rest
  } = props;

  const textStyle = textPresets[preset] || textPresets.primary;
  const textStyles = [textStyle];

  const content = children || <Text tx={tx} text={text} style={textStyles} />;

  return (
    <NButton {...rest}>
      {/* <Text style={textStyle} {...textProps}> */}
      {content}
      {/* </Text> */}
    </NButton>
  );
}
