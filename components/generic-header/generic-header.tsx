import { Feather, Ionicons } from "@expo/vector-icons"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { Badge, HStack, useToken } from "native-base"
import * as React from "react"
import { TouchableOpacity } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { MainStackParamsList } from "../../navigators"
import { useCart } from "../../stores/cart"
import { useStyles } from "../../utils/styles"
import { HeaderLocationPicker } from "../index"

export interface GenericHeaderProps {
  showCart?: boolean
}

const cartCountOffset = -12
/**
 * Describe your component here
 */
export const GenericHeader = (props: GenericHeaderProps) => {
  const { showCart = true } = props
  const [primary] = useToken("colors", ["primary.200"])
  const { top } = useSafeAreaInsets()

  const navigation = useNavigation<NavigationProp<MainStackParamsList, "app">>()

  const cart = useCart()

  const cartItemsCount = React.useMemo(
    () => cart?.cartShipment?.items?.map((r) => r.lineItems.length).reduce((a, b) => a + b, 0),
    [cart],
  )

  const styles = useStyles({
    create: (theme, { }) => ({
      container: {
        paddingVertical: 16,
        paddingHorizontal: 12,
      },
    }),
  })

  return (
    <HStack pt={top} style={[styles.container]}>
      <HeaderLocationPicker />
      <HStack ml="auto" space="md" alignItems="center">
        <TouchableOpacity>
          <Feather name="bell" color={primary} size={24} />
        </TouchableOpacity>
        {showCart && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("cart")
            }}
          >
            {cartItemsCount > 0 && (
              <Badge
                rounded={"full"}
                colorScheme="primary"
                _text={{ color: "white" }}
                position="absolute"
                top={cartCountOffset}
                right={cartCountOffset}
              >
                {cartItemsCount}
              </Badge>
            )}
            <Ionicons name="cart-outline" color={primary} size={24} />
          </TouchableOpacity>
        )}
      </HStack>
    </HStack>
  )
}
