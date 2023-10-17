import { extendTheme } from "native-base"

const theme = extendTheme({
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
        // borderWidth: 1,
        // borderColor: "primary.900",
      },
    },
    // Input: {
    //   baseStyle: {
    //     // border: 1,
    //   },
    // },
    // Select: {
    //   baseStyle: {
    //     // border: 1,
    //   },
    // },
  },

  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    // heading: "Roboto",
    // body: "Roboto",
    // mono: "Roboto",
  },
  colors: {
    bg: "#fff",
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
})

// 2. Get the type of the CustomTheme
type CustomThemeType = typeof theme

// 3. Extend the internal NativeBase Theme
declare module "native-base" {
  interface ICustomTheme extends CustomThemeType {}
}
export default theme
