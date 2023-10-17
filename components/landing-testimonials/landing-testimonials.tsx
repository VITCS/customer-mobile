import { Avatar, View } from "native-base"
import * as React from "react"
import { Text } from "../"

export interface LandingTestimonialsProps {
  /**
   * An optional style override useful for padding & margin.
   */
}

const USER_IMAGE_URI =
  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60"
/**
 * Describe your component here
 */
export const LandingTestimonials = (props: LandingTestimonialsProps) => {
  const {} = props

  return (
    <View py={5} bg="white" px={3} borderWidth={1 / 2} borderColor="primary.400">
      <Text fontSize="2xl" textAlign="center" color="primary.400">
        Client testimonials
      </Text>

      <View alignItems="center" mt={4}>
        <Avatar
          source={{ uri: USER_IMAGE_URI }}
          borderWidth={1}
          borderColor="primary.300"
          size={"lg"}
        />
        <Text fontSize="lg" textAlign="center" noOfLines={2} isTruncated mx={4} fontWeight="medium">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima corporis necessitatibus
          alias illo blanditiis officia quisquam, iusto quod doloremque, ipsam pariatur assumenda
          facere reprehenderit eum rem enim molestiae odio nam.
        </Text>
      </View>
    </View>
  )
}
