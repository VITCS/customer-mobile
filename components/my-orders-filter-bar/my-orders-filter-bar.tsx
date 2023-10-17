import * as React from "react"
import { FlatList, Text, TouchableOpacity } from "react-native"
// import { Text } from "ui"
import { OrderStatus } from "../../graphql/generated/graphql"
import { StyleMaker, useStyles } from "../../utils/styles"

export interface MyOrdersFilterBarProps {
  status: OrderStatus
  onStatusChange: (status: OrderStatus) => void

  dateRange?: {
    start?: string
    end?: string
  }
  onDateRangeChange?: (dateRange: { start?: string; end?: string }) => void
}

/**
 * Describe your component here
 */

const filterOrderStatuses = [OrderStatus.Created, OrderStatus.Fulfilled, OrderStatus.Cancelled]
  // .reverse()
  .map((status) => ({
    label: status.toString(),
    value: status.toString(),
  }))

const createStyles: StyleMaker = (theme) => ({
  container: {
    // justifyContent: "",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  badge: {
    backgroundColor: theme.colors.background,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    borderRadius: 18,
    padding: 10,
    marginRight: 12,
    height: 40,
  },
  badgeText: {
    color: theme.colors.primary,
  },
  badgeTextSelected: {
    color: "#fff",
  },
  badgeSelected: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.background,
  },
})

export const MyOrdersFilterBar = (props: MyOrdersFilterBarProps) => {
  const { status, onStatusChange, dateRange, onDateRangeChange } = props

  // const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false)
  // const modalRef = React.useRef<BottomSheetModal>(null)

  const styles = useStyles({ create: createStyles })
  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={filterOrderStatuses}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, index }) => {
        const { label, value } = item
        const isSelected = value === status.toString()
        return (
          <TouchableOpacity
            onPress={() => {
              onStatusChange(value as OrderStatus)
            }}
            style={[styles.badge, isSelected ? styles.badgeSelected : {}]}
          >
            <Text style={[isSelected ? styles.badgeTextSelected : styles.badgeText]}>{label}</Text>
          </TouchableOpacity>
        )
      }}
    ></FlatList>
  )
}
