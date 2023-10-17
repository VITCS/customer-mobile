/* eslint-disable camelcase */
/* eslint-disable react-native/no-inline-styles */
import { useBottomSheetModal } from "@gorhom/bottom-sheet"
import { Divider, SmallCloseIcon, View } from "native-base"
import * as React from "react"
import { Dimensions, FlatList, TouchableOpacity, ViewStyle } from "react-native"
import { Button, Checkbox, spacing, useStyles } from "ui"
import { Text } from "../"
import { SearchFiltersContext } from "../../stores/search-filters"
import { color } from "../../theme"
import { titleCase } from "../../utils/format"

export interface ProductsFiltersModalProps {
  // filters: {
  attributes: Record<string, Array<{ doc_count: number; key: string }>>
  // }
}

const { width } = Dimensions.get("window")

const CONTAINER: ViewStyle = {
  flexDirection: "row",
}

/**
 * Describe your component here
 */
export const ProductsFiltersModal = (props: ProductsFiltersModalProps) => {
  const { attributes } = props
  const { dismiss } = useBottomSheetModal()

  const { attributes: filters, updateFilters, clearAll } = React.useContext(SearchFiltersContext)

  // console.log("attributes ", attributes)
  const allAttributes = Object.keys(attributes)

  const [selectedKeyFieldName, setSelectedFieldName] = React.useState<string>("")

  // const selectedFilterAttribute = React.useMemo(() => filters[selectedKeyFieldName], [
  //   attributes,
  //   selectedKeyFieldName,
  // ])

  const optionsForSelectedKey = React.useMemo(() => {
    return attributes[selectedKeyFieldName]
  }, [attributes, selectedKeyFieldName])

  // const [bg] = useToken("colors", ["primary.50"])
  const styles = useStyles({
    create: (theme) => ({
      attributes: {
        width: width * 0.4,
        // height: "100%",
        backgroundColor: theme.colors.background,
        // backgroundColor: bg,
      },
      values: {
        width: width * 0.5,
        // height: "100%",
        // height: "100%",

        backgroundColor: theme.colors.background,
      },
    }),
  })

  console.log("filtres are ", filters)

  return (
    <View
      style={{
        marginTop: 60,
        marginBottom: 40,
        height: '88%'
      }}
    >
      <View
        style={{
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <Button
          variant={"link"}
          style={{ marginLeft: "auto" }}
          onPress={() => {
            clearAll()
          }}
        >
          Clear All
        </Button>
      </View>
      <View style={CONTAINER}>
        {/* <Text>ProductsFiltersModal </Text> */}
        <FlatList
          data={allAttributes}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.attributes}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => setSelectedFieldName(item)}
              style={{
                backgroundColor:
                  selectedKeyFieldName === item ? color.palette.lighterGrey : color.palette.white,
                padding: 20,
                borderBottomWidth: 1,
                borderBottomColor: color.palette.lighterGrey,
              }}
            >
              <Text preset="bold" style={{ color: color.palette.black }}>
                {titleCase(item)}
              </Text>
            </TouchableOpacity>
          )}
        />

        <FlatList
          data={optionsForSelectedKey}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.values}
          ItemSeparatorComponent={() => <Divider />}
          renderItem={({ item, index }) => {
            const { doc_count, key } = item
            const value = filters[selectedKeyFieldName] && filters[selectedKeyFieldName][key]

            return (
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: spacing[3],
                }}
              >
                <Checkbox
                  value={value}
                  onValueChange={(selected) => {
                    console.log("called ", selected, selectedKeyFieldName, key)
                    updateFilters(selectedKeyFieldName, key, selected)
                  }}
                />
                <View
                  style={{
                    marginLeft: spacing[4],
                    width: "85%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text preset="bold" style={{ color: color.palette.black, marginLeft: 2 }}>
                    {key}( {doc_count})
                  </Text>
                  {/* <Text style={{ color: color.palette.lightGrey, fontWeight: "400", marginLeft: 3 }}>
                  </Text> */}
                </View>
              </View>
            )
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: "auto",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant={"outline"}
          style={{
            flex: 1,
            height: 60,
          }}
          onPress={() => {
            dismiss()
          }}
        >
          Cancel
        </Button>
        <Button
          style={{
            flex: 1,
            height: 60,
          }}
          onPress={() => {
            dismiss()
          }}
        >
          Apply
        </Button>
      </View>
    </View>
  )
}
