import React from "react"
import { ActivityIndicator, ImageBackground, ViewStyle } from "react-native"
import { spacing } from "../../theme"
import FullLogo from "./Full-Logo"

const ROOT: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
}
const defaultImage = require("./../../assets/splash-background.png")

type Props = {}
export const SplashScreen: React.FC<Props> = () => {
  // useEffect(() => {
  //   async function checkTokens() {
  //     try {
  //       const token = await AsyncStorage.getItem(AUTH_TOKEN)
  //       if (token) {
  //         navigation.push("app")
  //       } else {
  //         navigation.push("auth")
  //       }
  //     } catch (error) {
  //       console.log("[checkTokens]::error", error)

  //       navigation.push("auth")
  //     }
  //   }
  //   setTimeout(() => {
  //     checkTokens()
  //   }, 2000)
  // }, [])
  return (
    <ImageBackground source={defaultImage} style={ROOT}>
      <FullLogo
        style={{
          marginBottom: spacing[4],
        }}
      />
      <ActivityIndicator size="large" />
    </ImageBackground>
  )
}
