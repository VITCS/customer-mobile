import { FontAwesome, Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { HStack, Input, useToken, View, VStack } from "native-base"
import * as React from "react"
import { Dimensions, ImageBackground, ImageSourcePropType } from "react-native"
import Carousel from "react-native-reanimated-carousel"
import { useDeliveryAddress } from "../../stores/cart"
import { spacing } from "../../theme"
import { Button, Text } from "../index"
import { useStyles } from "../../utils/styles"

const { width, height } = Dimensions.get("window")
export interface LandingPromotionsProps { }

export type IPromotion = {
  title: string
  content: () => React.ReactChild | React.ReactNode
  image: ImageSourcePropType
}

export const LandingPromotions = (props: LandingPromotionsProps) => {
  const { } = props

  const deliveryAddress = useDeliveryAddress()
  const styles = useStyles({
    create: (theme) => ({
      peragraphStyle: {
        fontSize: 14,
        color: theme.colors.background,
        marginBottom: spacing[4],
      },
      headings: {
        fontSize: 16,
        color: theme.colors.background,
      },

    }),
  })

  const isDeliveryAddressSet = React.useMemo(() => !!deliveryAddress, [deliveryAddress])
  const PROMOTIONS: IPromotion[] = [
    {
      title: "Amet minim mollit non",
      image: require("./banner.png"),
      content: function FirstContent() {
        const [primary] = useToken("colors", ["primary.400"])


        return (
          <>
            <Text style={[styles.peragraphStyle]}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis praesentium
              voluptates illo ea? Amet quidem ad esse voluptatum minus saepe obcaecati ab dolores
              pariatur temporibus atque, quam consequatur error sit!
            </Text>
            {!isDeliveryAddressSet && (
              <Input
                color="black"
                bg="white"
                fontSize="md"
                // p={3}
                placeholder="Enter Pincode / Delivery address"
                placeholderTextColor={"black"}
                InputLeftElement={
                  <FontAwesome
                    color={primary}
                    name="map-marker"
                    size={24}
                    style={{ marginLeft: spacing[2] }}
                  />
                }
                InputRightElement={
                  <HStack alignItems="center" mr={2}>
                    <Ionicons
                      name="md-locate-outline"
                      color={primary}
                      size={24}
                      style={{ marginRight: spacing[2] }}
                    />
                    <Text>Locate me</Text>
                  </HStack>
                }
              />
            )}
          </>
        )
      },
    },
    {
      title: "Classic brands",
      image: require("./brands.png"),

      content: function SecondContent() {

        return (
          <View>
            <Text style={[styles.peragraphStyle]}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis praesentium
              voluptates illo ea? Amet quidem ad esse voluptatum minus saepe obcaecati ab dolores
              pariatur temporibus atque, quam consequatur error sit!
            </Text>
            <Button mt={2} variant="outline" borderColor="primary.400">
              <Text style={[styles.headings]}>Explore</Text>
            </Button>
          </View>
        )
      },
    },
  ]
  return (
    <>
      <Carousel<IPromotion>
        data={PROMOTIONS}
        width={width}
        parallaxScrollingScale={0.5}
        height={height / 2.5}
        autoPlay={true}
        loop={true}
        autoPlayInterval={5000}
        renderItem={({ content, title, image }) => (
          <ImageBackground
            source={image}
            style={{ width: undefined, height: undefined, flex: 1 }}
            resizeMode="cover"
          >
            <LinearGradient
              style={{
                marginTop: "auto",
              }}
              start={{
                x: 0,
                y: 0,
              }}
              end={{
                x: 0,
                y: 0.4,
              }}
              colors={["transparent", "#000", "rgba(0,0,0,0.8)"]}
            >
              <VStack m={2} my={6}>
                <Text fontWeight="semibold" fontSize="xl" style={[styles.headings]}>
                  {title}
                </Text>
                {content()}
              </VStack>
            </LinearGradient>
          </ImageBackground>
        )}
      />
    </>
  )
}
