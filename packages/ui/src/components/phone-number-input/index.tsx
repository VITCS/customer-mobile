import * as React from "react";
import { TextInputProps } from "react-native";
import PhoneInput from "react-native-phone-number-input";

export const PhonenumberInput = (props: TextInputProps) => {
  const { value, onChangeText, ...rest } = props;

  return (
    <PhoneInput
      textInputProps={{
        ...rest,
        maxLength: 10,
      }}
      value={value}
      onChangeFormattedText={(text) => {
        // console.log("value change to ", text);
        onChangeText(text);
        // }
      }}
      withDarkTheme
      withShadow
    />
  );
};
