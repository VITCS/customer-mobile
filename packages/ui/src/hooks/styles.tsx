import { Theme, useTheme } from "@react-navigation/native";
import { Dimensions, StyleSheet } from "react-native";

export type StyleMaker<T = StyleSheet.NamedStyles<any>> = (
  them: Theme,
  dimentions: { width: number; height: number }
) => T;

// generic function to create a style object from a theme
export function useStyles<T extends StyleSheet.NamedStyles<any>>(config: {
  create: StyleMaker<T>;
}): StyleSheet.NamedStyles<
  T & typeof baseUtilStyles & typeof screenStyles & typeof formStyles
> {
  const { create } = config;
  const theme = useTheme();
  const baseUtilStyles = StyleSheet.create({
    row: {
      flexDirection: "row",
    },

    column: {
      flexDirection: "column",
    },
    center: {
      justifyContent: "center",
      alignItems: "center",
    },
    primaryText: {
      color: theme.colors.primary,
    },
    seperator: {
      height: 1,
      width: "100%",
      backgroundColor: theme.colors.text,
      opacity: 0.5,
    },
  });

  const formStyles = StyleSheet.create({
    inputContainer: {
      borderWidth: 1,
      borderRadius: 8,
      borderStyle: "solid",
      minHeight: 40,
      borderColor: theme.colors.border,
    },
  });
  const screenStyles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
  });
  const { width, height } = Dimensions.get("window");
  const resultStyles: StyleSheet.NamedStyles<T> = create(theme, {
    width,
    height,
  });
  // const composedStyles = StyleSheet.compose(baseUnitStyles, resultStyles)
  return { ...screenStyles, ...baseUtilStyles, ...resultStyles, ...formStyles };
}
