import { Ionicons } from "@expo/vector-icons"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import faker from "faker"
import { Box, HStack, Image, Spinner, useToken, VStack } from "native-base"
import React, { useMemo } from "react"
import { Dimensions, View } from "react-native"
import { ObjectRenderer, PurchaseOptions, Screen, Text } from "../../components"
import { IMAGE_PLACEHOLDER_URL } from "../../config/constants"
import { useGetProductQuery } from "../../graphql/generated/graphql"
import { HomeParamList, ProductsParamList } from "../../navigators"
import { apiSdk } from "../../utils/api"
import { makeDisplayString } from "../../utils/format"
import { useStyles } from "../../utils/styles"

const reviewCount = faker.datatype.number({ min: 0, max: 100 })

// const productSizes = ["750 ml", "1.75 L", "375 ml", "200 ml", "50 ml"]
const { height } = Dimensions.get("window")

type Props = StackScreenProps<HomeParamList, "productInfo">

export const ProductInfoScreen: React.FC<Props> = (props) => {
  const { route } = props
  const navigation = useNavigation<NavigationProp<ProductsParamList, "productInfo">>()

  const [productId, purpose] = React.useMemo(() => {
    const id = route.params?.product?.id
    const p = route?.params?.purpose
    return [id, p]
  }, [route])
  // const recommendations = React.useMemo(() => route?.params?.siblings, [route?.params?.siblings])

  // const [product, setProduct] = React.useState<IProduct>(null)
  // const [isLoading, setLoading] = React.useState(true)

  const { data, isLoading, isError } = useGetProductQuery(apiSdk, {
    filter: {
      id: {
        eq: productId,
      },
    },
    limit: 1,
  })
  const styles = useStyles({
    create: ({ colors }) => ({
      textRed: {
        color: colors.primary
      }
    }),
  })

  const [star] = useToken("colors", ["yellow.500"])
  const product = useMemo(() => data?.searchProducts?.items[0], [data])
  // if (isLoading) {
  //   return <Spinner mt={24} size="lg" />
  // }

  // if (!product) {
  //   return null
  // }

  const {
    prodFullName = "",
    prodCategory = "",
    flavour = "",
    images = [],
    abv = "",
    prodMinor = "",
  } = product || {}
  return (
    <>
      <Screen preset="scroll" unsafe>
        {isLoading ? (
          <Spinner mt={24} size="lg" />
        ) : isError ? (
          <Text textAlign={"center"} width="100%" alignSelf={"center"}>
            Something went wrong. Please try again later.
          </Text>
        ) : (
          <>
            <VStack>
              <Image
                source={{ uri: images?.length > 0 ? images[0] : IMAGE_PLACEHOLDER_URL }}
                size="xl"
                height={height / 3}
                alt={prodFullName}
                width="100%"
                resizeMode="cover"
              />

              <VStack space="md" mx={3} mt={2} mb={3}>
              <Text fontSize="2xl" fontWeight="bold">
                  {prodFullName}
                </Text>

                <HStack width="100%">
                  {new Array(5).fill(0).map((_, i) => (
                    <Ionicons name="star" key={i} color={star} size={20} />
                  ))}
                  <Text style={{ marginLeft: 4 ,  marginRight: 2}}>{"5.0"}</Text>
                  <Text style={{ marginLeft: 2 ,  marginRight: 2}}>{"|"} </Text>

                  <Text ml={2} fontWeight="light" color="gray.500"  style={styles.textRed} >
                    ({reviewCount} Reviews)
                  </Text>
                </HStack>
                {/* {prodLongDesc && <Text>{prodLongDesc}</Text>} */}
              </VStack>
              <View
                style={{
                  paddingHorizontal: 12,
                }}
              > 
              <Text fontWeight="Bold" ml={3} style={{ fontSize: 16 ,  marginBottom: 10}}  >
                Description
               </Text>
                <ObjectRenderer
                  content={[
                    {
                      label: "Category :",
                      value: makeDisplayString(prodCategory),
                    },
                    {
                      label: "Region :",
                      value: makeDisplayString(prodMinor),
                    },
                    {
                      label: "Abv :",
                      value: makeDisplayString(abv),
                    },
                    {
                      label: "Ingredients :",
                      value: makeDisplayString(flavour),
                    },
                    {
                      label:"Product Details :",
                      value: makeDisplayString(""),
                    }
                  ]}
                />
              </View>
            </VStack>
            <Box h="1000">
              <PurchaseOptions id={productId} prodShortDesc="" {...{ prodFullName }} />
            </Box>
          </>
        )}
      </Screen>
      {/* {validCartItems?.length > 0 && ( */}
      {/* <Animated.View entering={SlideInDown} exiting={SlideOutUp}>
        <Button
          position="absolute"
          bottom={0}
          alignSelf="center"
          w="95%"
          // isDisabled={isCartInValid}
          py={3}
          _text={{ fontSize: "lg" }}
          onPress={() => navigation.navigate("cart")}
        >
          Go to cart
        </Button>
      </Animated.View> */}
      {/* )} */}
    </>
  )
}
