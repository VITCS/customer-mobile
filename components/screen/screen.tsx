import { useTheme } from "@react-navigation/native"
import * as React from "react"
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
  ViewStyle,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useStyles } from "../../utils/styles"
import { isNonScrolling, offsets, presets } from "./screen.presets"
import { ScreenProps } from "./screen.props"

const isIos = Platform.OS === "ios"

function ScreenWithoutScrolling(props: ScreenProps) {
  const insets = useSafeAreaInsets()
  const preset = presets.fixed
  const style = props.style || {}
  const { colors } = useTheme()

  const styles = useStyles({
    create: (theme) => ({
      backgroundStyle: {
        backgroundColor: theme.colors.background,
        // backgroundColor: "red",
      },
    }),
  })
  const backgroundStyle: ViewStyle = { backgroundColor: colors.background }

  const insetStyle: ViewStyle = {
    paddingTop: props.unsafe ? 0 : insets.top,
    // paddingBottom: props.unsafe ? 0 : insets.bottom,
  }

  return (
    <KeyboardAvoidingView
      style={[preset.outer, styles.backgroundStyle]}
      behavior={isIos ? "padding" : "height"}
      keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}
    >
      <StatusBar barStyle={props.statusBar || "dark-content"} />
      <View style={[preset.inner, style, insetStyle]}>{props.children}</View>
    </KeyboardAvoidingView>
  )
}

function ScreenWithScrolling(props: ScreenProps) {
  const insets = useSafeAreaInsets()
  const colorScheme = useColorScheme()
  const preset = presets.scroll
  const style = props.style || {}
  const { colors } = useTheme()
  const backgroundStyle: ViewStyle = { backgroundColor: colors.background }
  const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top }
  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? "padding" : undefined}
      keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}
    >
      <StatusBar
        barStyle={props.statusBar || colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <View style={[preset.outer, backgroundStyle, insetStyle]}>
        <ScrollView
          style={[preset.outer, backgroundStyle]}
          contentContainerStyle={[preset.inner, style]}
          keyboardShouldPersistTaps={props.keyboardShouldPersistTaps || "handled"}
        >
          {props.children}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export function Screen(props: ScreenProps) {
  if (isNonScrolling(props.preset)) {
    return <ScreenWithoutScrolling {...props} />
  } else {
    return <ScreenWithScrolling {...props} />
  }
}
