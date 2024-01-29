import { useTheme } from "@react-navigation/native";
// import { Text as NText } from "native-base";
import * as React from "react";
import { Text as NText } from "react-native";
import { translate } from "../../i18n";
import { TextProps } from "./text.props";
/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */

// type ITextStyle = StyleProp<TextStyle>

export const Text: React.FC<TextProps> = React.memo(function TextMemo(
  props: TextProps
) {
  // grab the props
  const {
    preset = "default",
    tx,
    txOptions,
    text,
    children,
    // style: styleOverride,
    ...rest
  } = props;

  // figure out which content to use
  const i18nText = tx && translate(tx, txOptions);
  const content = i18nText || text || children;
  const { colors } = useTheme();

  // const style = presets[preset] || presets.default
  // const styles = [baseStyle, style, styleOverride]

  return (
    <NText {...rest} style={[{ color: colors.text }, props.style]}>
      {content}
    </NText>
  );
});
