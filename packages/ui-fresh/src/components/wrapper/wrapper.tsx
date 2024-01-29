import { NativeBaseProvider } from "native-base";
import * as React from "react";
import { Provider as PaperProvider } from "react-native-paper";

import { mdTheme, theme } from "../../";

/**
 * Describe your component here
 */
export const UiWrapper: React.FC<{ children: React.ReactNode }> = (props) => {
  const { children } = props;

  return (
    <>
      <NativeBaseProvider theme={theme}>
        <PaperProvider theme={mdTheme}>{children}</PaperProvider>
      </NativeBaseProvider>
    </>
  );
};
