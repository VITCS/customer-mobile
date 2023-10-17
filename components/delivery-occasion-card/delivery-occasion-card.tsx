import { Feather, MaterialCommunityIcons } from "@expo/vector-icons"
import dayjs from "dayjs"
import { Box, HStack, Menu, Pressable } from "native-base"
import { space } from "native-base/lib/typescript/theme/styled-system"
import React, { memo } from "react"
import { Text } from "../"
import { CustomerOccasion } from "../../graphql/generated/graphql"
import { IGenericListItemOptions } from "../../utils/component-util-types"

export type DeliveryOccasionCardProps = Pick<
  CustomerOccasion,
  "id" | "occasionDate" | "occasionTitle" | "reminder"
> &
  IGenericListItemOptions

/**
 * Describe your component here
 */

const FORMAT = "D MMM"
export const DeliveryOccasionCard = memo(function DeliveryOccasionCard(
  props: DeliveryOccasionCardProps,
) {
  const { id, occasionDate, occasionTitle, reminder, onEdit, onDelete, index } = props
  const memoOnEdit = React.useCallback(() => {
    onEdit({
      id,
      index,
    })
  }, [onEdit, id, index])
  const memoOnDelete = React.useCallback(() => {
    onDelete({
      id,
      index,
    })
  }, [onDelete, id, index])
  const formattedDate = React.useMemo(() => occasionDate && dayjs(occasionDate).format(FORMAT), [
    occasionDate,
  ])
  return (
    <Box>
      <HStack justifyContent="space-between" alignItems="center">
        <HStack alignItems="center">
          <MaterialCommunityIcons name="calendar-star" size={24} color="#b72618" />
          <Text noOfLines={1} style={{ marginLeft: 5 }}>
            {occasionTitle}
          </Text>
        </HStack>
        <HStack alignItems="center">
          <Text style={{ marginRight: 5 }}>{formattedDate}</Text>
          {reminder && <Feather name="clock" color="green" size={16} style={{ marginRight: 5 }} />}
          {onEdit && (
            <Menu style={{ marginLeft: 5 }}
              trigger={(triggerProps) => {
                return (
                  <Pressable {...triggerProps}>
                    <MaterialCommunityIcons name="dots-vertical" size={24} />
                  </Pressable>
                )
              }}
            >
              <Menu.Item onPress={memoOnEdit}>Edit</Menu.Item>
              {onDelete && <Menu.Item onPress={memoOnDelete}>Delete</Menu.Item>}
            </Menu>
          )}
        </HStack>
      </HStack>
    </Box >
    // <Box
    //   key={id}
    //   flexDir="column"
    //   justifyContent="space-between"
    //   borderWidth={1}
    //   borderColor="primary.500"
    //   p={2}
    //   rounded={"sm"}
    //   pr={1}
    // >
    //   <HStack alignItems="center" justifyContent="space-between" mb={2}>
    //     <Text mr={2}>{formattedDate}</Text>
    //     {onEdit && (
    //       <Menu
    //         trigger={(triggerProps) => {
    //           return (
    //             <Pressable {...triggerProps}>
    //               <MaterialCommunityIcons name="dots-vertical" size={24} />
    //             </Pressable>
    //           )
    //         }}
    //       >
    //         <Menu.Item onPress={memoOnEdit}>Edit</Menu.Item>
    //         {onDelete && <Menu.Item onPress={memoOnDelete}>Delete</Menu.Item>}
    //       </Menu>
    //     )}
    //   </HStack>
    //   <HStack alignItems="center" justifyContent="space-between" mr={1}>
    //     <Text noOfLines={1} mr={2}>
    //       {occasionTitle}{" "}
    //     </Text>
    //     {reminder && <Feather name="clock" color="green" size={16} />}
    //   </HStack>
    // </Box>
  )
})
