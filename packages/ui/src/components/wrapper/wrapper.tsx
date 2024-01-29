import { NativeBaseProvider } from "native-base";
import * as React from "react";
import { theme } from "../../";

/**
 * Describe your component here
 */
export const UiWrapper: React.FC<{ children: React.ReactNode }> = (props) => {
  const { children } = props;

  return (
    <>
      <NativeBaseProvider theme={theme}>{children}</NativeBaseProvider>
    </>
  );
};
