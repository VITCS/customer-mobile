import { Auth } from "@aws-amplify/auth"
import { Amplify, Hub } from "@aws-amplify/core"
import NetInfo from "@react-native-community/netinfo"
import * as updates from "expo-updates"
import * as WebBrowser from "expo-web-browser"
import { NativeBaseProvider } from "native-base"
import React, { useEffect } from "react"
import { Alert, AppStateStatus, Linking, Platform } from "react-native"
import "react-native-get-random-values"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import { enableScreens } from "react-native-screens"
import {
  focusManager,
  onlineManager,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "react-query"
import { theme, UiWrapper } from "ui"
import { AUTH_TOKEN } from "./config/constants"
import env from "./config/env"
import { RootNavigator } from "./navigators"
import { SearchFiltersProvider } from "./stores/search-filters"
import AmplifyAuthStorage from "./utils/AuthSyncStorage"
import { storage } from "./utils/storage"

// import "./config/analytics"
enableScreens()

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

/**
 * This is the root component of our app.
 */

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (err: {
      response: {
        status: number | string
      }
    }) => {
      if (parseInt(err.response.status as any) === 401) {
        storage.delete(AUTH_TOKEN)
      }
    },
  }),
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})
console.log("flipper plugin", __DEV__)

if (__DEV__) {
  const wrapper = { queryClient }
  import("react-query-native-devtools")
    .then(({ addPlugin }) => {
      addPlugin(wrapper)

      console.log("flipper plugin")
    })
    .catch((err) => console.log("Error when initializing React Query Flipper plug-in", err))
}
onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    console.log("online state  changed", state)
    setOnline(state.isConnected)
  })
})

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    console.log("AppState changed", status)
    focusManager.setFocused(status === "active")
  }
}

async function urlOpener(url, redirectUrl) {
  console.log("urlOpener", url, redirectUrl)
  const result = await WebBrowser.openAuthSessionAsync(url, redirectUrl)
  console.log("after urlOpener", result)
  const { type, url: newUrl } = result
  if (type === "success" && Platform.OS === "ios") {
    WebBrowser.dismissBrowser()
    return Linking.openURL(newUrl)
  }
}
export const App = () => {
  // const navigationRef = useRef<NavigationContainerRef<any>>(null)

  // setRootNavigation(navigationRef)
  // useBackButtonHandler(navigationRef, canExit)
  // const { initialNavigationState, onNavigationStateChange } = useNavigationPersistence(
  //   storage,
  //   NAVIGATION_PERSISTENCE_KEY,
  // )

  const [isReady, setIsReady] = React.useState(false)

  // useEffect(() => {
  //   const subscription = AppState.addEventListener("change", onAppStateChange)

  //   return () => subscription?.remove()
  // }, [])

  useEffect(() => {
    async function checkForUpdates() {
      try {
        if (__DEV__) {
          return
        }
        const update = await updates.checkForUpdateAsync()
        console.log("update", update)
        // if (!__DEV__) {
        //   Alert.alert("Update valeu is ", update.isAvailable)
        // }
        if (update.isAvailable) {
          Alert.alert("New Update available", "Please update app and reload ", [
            {
              text: "Update",
              onPress: async () => {
                await updates.fetchUpdateAsync()
                await updates.reloadAsync()
              },
            },

            {
              text: "Cancel",
              onPress: () => {
                setIsReady(true)
              },
              style: "cancel",
            },
          ])
        } else {
          setIsReady(false)
        }
      } catch (error) {
        Alert.alert("Error " + error.message)
        console.log("error in fetching update", error)
      } finally {
        console.log("finally")
        setIsReady(true)
      }
    }
    checkForUpdates()
  }, [])

  useEffect(() => {
    storage.set("ageConfirmation", true)
    function configureAmplify() {
      console.log("configureAmplify", env.aws_cognito_identity_pool_id, env.aws_user_pools_id)
      Amplify.configure({
        ...env,
        Auth: {
          identityPoolId: env.aws_cognito_identity_pool_id,
          userPoolId: env.aws_user_pools_id,
        },
        oauth: {
          ...env.oauth,
          urlOpener,
        },
      })

      // Amplify.configure(updatedAwsConfig)
      Auth.configure({
        storage: AmplifyAuthStorage,
      })
    }

    configureAmplify()
  }, [])

  // if (!isReady) {
  //   return (
  //     <View>
  //       <SplashScreen />
  //     </View>
  //   )
  // }

  return (
    <NativeBaseProvider theme={theme as any}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <UiWrapper>
            {/* <StatusBar style="auto" /> */}
            <SearchFiltersProvider>
              <RootNavigator />
            </SearchFiltersProvider>
          </UiWrapper>
        </SafeAreaProvider>
      </QueryClientProvider>
    </NativeBaseProvider>
  )
}
