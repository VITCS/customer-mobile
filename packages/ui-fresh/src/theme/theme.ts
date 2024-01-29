import { extendTheme } from "native-base";
import { MD3LightTheme as DefaultTheme } from "react-native-paper";

const config = {
  useSystemColorMode: true,
  // initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({
  fontConfig: {
    IBM: {
      100: {
        normal: "IBMt",
        italic: "Roboto-LightItalic",
      },
      200: {
        normal: "Roboto-Light",
        italic: "Roboto-LightItalic",
      },
      300: {
        normal: "Roboto-Light",
        italic: "Roboto-LightItalic",
      },
      400: {
        normal: "Roboto-Regular",
        italic: "Roboto-Italic",
      },
      500: {
        normal: "Roboto-Medium",
      },
      600: {
        normal: "Roboto-Medium",
        italic: "Roboto-MediumItalic",
      },
      // Add more variants
      //   700: {
      //     normal: 'Roboto-Bold',
      //   },
      //   800: {
      //     normal: 'Roboto-Bold',
      //     italic: 'Roboto-BoldItalic',
      //   },
      //   900: {
      //     normal: 'Roboto-Bold',
      //     italic: 'Roboto-BoldItalic',
      //   },
    },
  },

  components: {
    Button: {
      baseStyle: {
        rounded: "md",
      },
      defaultProps: {
        colorScheme: "primary",
        _loading: {
          bg: "primary.500",
        },
      },
    },
    Input: {
      baseStyle: {
        border: 1 / 2,

        borderColor: "gray.400",
        // paddingVertical: spacing[2],
      },
    },
    Select: {
      baseStyle: {
        border: 1 / 2,
        borderColor: "gray.400",
        height: "10",
        // paddingVertical: spacing[2],
      },
    },
  },

  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    // heading: "Roboto",
    // body: "Roboto",
    // mono: "Roboto",
  },
  colors: {
    bg: "white",
    primary: {
      50: "#FFF0EF",
      100: "#d47d74",
      200: "#cd675d",
      300: "#c55146",
      400: "#be3c2f",
      500: "#b72618",
      600: "#a52216",
      700: "#921e13",
      800: "#801b11",
      900: "#6e170e",
    },
    secondary: {
      50: "#9fb380",
      100: "#8ca467",
      200: "#79954d",
      300: "#658534",
      400: "#52761a",
      500: "#3F6701",
      600: "#395d01",
      700: "#325201",
      800: "#2c4801",
      900: "#263e01",
    },
  },
  config,
});

export default theme;

export const mdTheme = {
  ...DefaultTheme,
  roundness: 2,
  version: 3,
  colors: {
    ...DefaultTheme.colors,
    primary: "#B72618",
    secondary: "#FFF0EF",
    tertiary: "#6B4C4C",
  },
};
