import { useTheme } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { Box } from "native-base"
import React from "react"
import { ScrollView, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { LandingPromotions } from "../../components"
import { LandingRecommendations } from "../../components/landing-recommendations/landing-recommendations"
import { HomeParamList } from "../../navigators"

type INavigation = StackScreenProps<HomeParamList, "landing">

export const LandingScreen: React.FC<INavigation> = (props) => {
  const { bottom } = useSafeAreaInsets()
  // const { navigation } = props

  // return (
  //   <View style={{
  //     padding: 130
  //   }} >
  //     <Text>Home </Text>
  //   </View>
  // )
  // const onCategoryPress = useCallback(
  //   (category: ICategory) => {
  //     navigation.navigate("search", {
  //       filter: {
  //         category,
  //       },
  //     })
  //   },
  //   [navigation.navigate],
  // )
  const { colors } = useTheme()
  return (
    <>
      <View flex={1}  >
        <ScrollView
          contentContainerStyle={{
            paddingBottom: bottom,

          }}
        >
          {/* <CategoriesMenu onPress={onCategoryPress} /> */}
          <LandingPromotions />

          {/* {(!userId || userId?.length === 0) && <LandingTestimonials />} */}
          <Box style={{
            backgroundColor: "#000",
          }}>
            <Box style={{
              backgroundColor: "#fff",
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30
            }}>
              <LandingRecommendations />
            </Box></Box>
        </ScrollView>
      </View >
    </>
  )
}
