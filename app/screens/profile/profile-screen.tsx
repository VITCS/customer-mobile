import { Ionicons, Feather, FontAwesome } from "@expo/vector-icons"
import { createStackNavigator, StackScreenProps } from "@react-navigation/stack"
import { Box, HStack, Spinner, useToast, useToken, View, VStack } from "native-base"
import React, { useMemo, useState } from "react"
import { ActivityIndicator, FlatList, Image, StatusBar, TouchableOpacity } from "react-native"
import { Asset, launchImageLibrary } from "react-native-image-picker"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useMutation, useQueryClient } from "react-query"
import { Button, Text } from "ui"
import { LoginTabs, S3Image, Screen } from "../../components"
import { useGetProfileQuery } from "../../graphql/generated/graphql"
import { AuthStackParamsList, MainStackParamsList, ProfileStackParamList } from "../../navigators"
import { useLoggedInUser } from "../../stores/auth"
import { spacing } from "../../theme"
import { apiSdk, uploadImage } from "../../utils/api"
import { formatname } from "../../utils/format"
import { useStyles } from "../../utils/styles"
import { LoginScreen } from "../login/login-screen"

export const getBlob = async (fileUri) => {
  const resp = await fetch(fileUri)
  const imageBody = await resp.blob()
  return imageBody
}

const IMAGE_SIZE = 60

type IProps = StackScreenProps<ProfileStackParamList, "profileInfo"> &
  StackScreenProps<MainStackParamsList, "app">
const AuthStack = createStackNavigator<AuthStackParamsList>()

export const uploadToS3 = async (url: string, image: Asset) => {
  console.log(" inside upload s3", image.uri)
  const imageBody = await getBlob(image.uri)
  console.log(" imageBody inside upload s3", imageBody)
  const resp = await fetch(url, {
    body: imageBody,
    method: "PUT",
    headers: {
      "Content-Type": image.type,
    },
  })
  console.log("resp after upload -------", resp)
  return resp
}

export const ProfileScreen: React.FC<IProps> = ({ navigation }) => {
  // Pull in navigation via hook
  // const userId = getUserId()
  const toast = useToast()
  const userId = useLoggedInUser()
  const queryClient = useQueryClient()
  const {
    data: { getCustomerProfile } = {
      getCustomerProfile: null,
    },
    error,
    isLoading,
    refetch,
  } = useGetProfileQuery(
    apiSdk,
    {
      userId,
    },
    {
      enabled: userId?.length > 0,
      staleTime: 0,

      // retry: 0,
    },
  )
  const { mutate: mutateImage } = useMutation(
    (values) => {
      return uploadImage({
        userId,
        newImage,
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getCustomerProfile"])
        toast.show({
          title: "Successfully uploaded image",
        })
        refetch()
      },
    },
  )
  const isLoggedIn = useMemo(() => userId?.length > 0, [userId])
  const { top } = useSafeAreaInsets()
  const [newImage, setNewImage] = useState<Asset>(null)
  const [imageUploadLoading, setImageUploadLoading] = useState(false)
  const [bg] = useToken("colors", ["primary.300"])
  const styles = useStyles({
    create: (theme, { width, height }) => ({
      heading: {
        fontSize: 20,
        fontWeight: "600",
        color: theme.colors.background,
      },
      loginBtn: {},
      content: {
        paddingHorizontal: spacing[3],
        paddingVertical: spacing[4],
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
      },
      name: {
        fontSize: 16,
        fontWeight: "500",
        maxWidth: width / 2.5,
        color: theme.colors.background,
      },
      userId: {
        fontSize: 16,
        color: theme.colors.background,
        fontWeight: "300",
      },
      container: {
        backgroundColor: theme.colors.primary,
        height: height / 3.5,
        paddingTop: top,
      },
      editBtn: {
        color: theme.colors.background,
        backgroundColor: bg,
      },
      listLabel: {
        fontSize: 16,
        color: theme.colors.text,
        fontWeight: "500",
      },
      listIcon: {
        marginLeft: "auto",
      },
      listItem: {
        paddingHorizontal: spacing[4],
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: spacing[5],
      },
      settingsHeading: {
        color: theme.colors.text,
        opacity: 0.7,
        paddingHorizontal: spacing[4],
        marginTop: spacing[4],
        fontSize: 14,
      },
      seperator: {
        height: 1,
        width: "100%",
        backgroundColor: theme.colors.text,
        opacity: 0.5,
      },
    }),
  })
  return (
    <Screen unsafe>
      {/* <StatusBar barStyle="light-content" /> */}
      <View style={styles.container}>
        {/* <HStack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          mx={4}
          mb={3}
        >
          <Text style={[styles.heading]}>
        
            My profile
          </Text> */}
        {/* {isLoggedIn && (
            <HStack alignItems="center">
              <Button
                variant="link"
                onPress={() => {
                  // navigation.navigate("test")
                  // return
                  navigation.navigate("editUserProfile")
                }}
              >
                <Text color="primary.500" underline>
                  Edit
                </Text>
              </Button>
              <Menu
                trigger={(triggerProps) => {
                  return (
                    <Pressable accessibilityLabel="Profile menu" {...triggerProps}>
                      <Icon as={() => <Feather size={24} name="more-vertical" />} />
                    </Pressable>
                  )
                }}
              >
                <MenuItems navigation={navigation as any} />
              </Menu>
            </HStack>
          )} */}
        {/* </HStack> */}
        {isLoading ? (
          <>
            <ActivityIndicator style={styles.primaryText} size="large" />
          </>
        ) : isLoggedIn ? (
          <>
            {getCustomerProfile && (
              <>
                <View style={[styles.content]}>
                  <VStack>
                    {/* <Image
                    source={
                      (getCustomerProfile?.profileImage?.length > 0 && {
                        uri: getCustomerProfile?.profileImage,
                      }) ||
                      require("app/assets/user.png")
                    }
                    style={{
                      width: IMAGE_SIZE,
                      backgroundColor: "grey",
                      height: IMAGE_SIZE,
                      borderRadius: IMAGE_SIZE / 2,
                      marginHorizontal: 16,
                    }}
                  /> */}
                    {/* <S3Image
                    s3Path={getCustomerProfile?.profileImage}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 50,
                    }}
                  /> */}
                    <TouchableOpacity
                      style={{
                        alignSelf: "center",
                      }}
                      onPress={() => {
                        launchImageLibrary(
                          {
                            mediaType: "photo",
                            quality: 0.4,
                          },
                          (pickedImage) => {
                            if (pickedImage?.assets?.length > 0) {
                              const selectedImage = pickedImage?.assets[0]
                              console.log("picked image ", selectedImage)
                              setNewImage(selectedImage)
                            }
                          },
                        )
                      }}
                    >
                      {imageUploadLoading && (
                        <Box
                          flex={1}
                          zIndex={100}
                          width={120}
                          borderRadius={60}
                          height={120}
                          bg="gray.50"
                          position="absolute"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <View
                            style={{
                              flex: 1,
                              width: "100%",
                              height: "100%",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Spinner />
                          </View>
                        </Box>
                      )}
                      <FontAwesome
                        name={"edit"}
                        size={20}
                        color="#000000"
                        style={{
                          padding: 2,
                          position: "absolute",
                          backgroundColor: "#FFFFFF",
                          zIndex: 10,

                          right: 0,
                          bottom: 0,
                        }}
                      />
                      <S3Image
                        s3Path={getCustomerProfile?.profileImage}
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: 50,
                        }}
                      />
                    </TouchableOpacity>
                    {newImage && (
                      <Button onPress={() => mutateImage()} width="100" alignSelf="center" mt={3}>
                        Upload
                      </Button>
                    )}
                  </VStack>
                   <View paddingLeft={4}>
                    <Text style={[styles.name]} isTruncated numberOfLines={4}>
                      {formatname(
                        getCustomerProfile.firstName,
                        getCustomerProfile.middleName,
                        getCustomerProfile.lastName,
                      )}
                    </Text>
                    <Text style={[styles.userId]}>
                    Id : {' '}
                      {getCustomerProfile.userId}
                    </Text>
                  </View>

                  <Button
                    style={[
                      {
                        marginLeft: "auto",
                      },
                      styles.editBtn,
                    ]}
                    onPress={() => {
                      navigation.navigate("editUserProfile")
                      // launchImageLibrary(
                      //   {
                      //     mediaType: "photo",
                      //     quality: 0.4,
                      //   },
                      //   (pickedImage) => {
                      //     if (pickedImage?.assets?.length > 0) {
                      //       const selectedImage = pickedImage?.assets[0]
                      //       setNewImage(selectedImage)
                      //     }
                      //   },
                      // )
                    }}
                  >
                    Edit profile
                  </Button>
                </View>
              </>
            )}
          </>
        ) : (
          <>
            {/* {
            navigation.navigate("auth", { screen: "login", })
          } */}
            {/* <LoginScreen navigation={"login"} route={undefined}/> */}
            <View justifyContent="center" alignItems="center" mt={10}>
              <Button
                // variant={"outline"}
                style={[styles.editBtn]}
                onPress={() => {
                  navigation.navigate("auth", {
                    screen: "login",
                  })
                }}
              >
                LOGIN
              </Button>
            </View>
            {/* <AuthStack.Navigator
              screenOptions={{
                headerShown: false,
              }}
              detachInactiveScreens
            >
              <AuthStack.Screen
                options={{
                  headerTitle: "Login",
                }}
                name="login"
                component={LoginScreen}
              />
            </AuthStack.Navigator> */}
          </>
        )}
      </View>
      {getCustomerProfile && (
        <FlatList<{ label: string; screenName: keyof ProfileStackParamList }>
          data={[
            {
              label: "Delivery contacts",
              screenName: "deliveryContacts",
            },
            {
              label: "Payments",
              screenName: "paymentMethods",
            },
            {
              label: "My orders",
              screenName: "myOrders",
            },
            {
              label: "Settings",
              screenName: "settings",
            },
            {
              label: "Change Password",
              screenName: "changePassword",
            },
          ]}
          keyExtractor={(item) => item.label}
          ItemSeparatorComponent={() => <View style={styles.seperator} />}
          ListHeaderComponent={() => {
            return <Text style={styles.settingsHeading}>General</Text>
          }}
          renderItem={({ item }) => {
            const { label, screenName } = item
            return (
              <TouchableOpacity
                style={[styles.listItem]}
                onPress={() => {
                  navigation.navigate(screenName)
                }}
              >
                <Text style={[styles.listLabel]}>{label}</Text>
                <Ionicons style={styles.listIcon} name="chevron-forward" />
              </TouchableOpacity>
            )
          }}
        />
      )}
    </Screen>
  )
}
