import { StackScreenProps } from "@react-navigation/stack"
import { HStack, Spinner, Switch } from "native-base"
import React from "react"
import { FlatList } from "react-native"
import { useQueryClient } from "react-query"
import { Text } from "ui"
import { Screen } from "../../components"
import {
  CustomerProfile,
  useGetProfileQuery,
  useUpdateCustomerProfileMutation,
} from "../../graphql/generated/graphql"
import { SettingStackParamList } from "../../navigators"
import { apiSdk, getUserId } from "../../utils/api"
import { useStyles } from "../../utils/styles"

type IProps = StackScreenProps<SettingStackParamList, "settingsInfo">

const settingKeys: Array<{ dataKey: keyof CustomerProfile; label: string }> = [
  {
    dataKey: "orderLineitemReplacement",
    label: "Item replacement",
  },
  {
    dataKey: "subscribeToNotification",
    label: "Enable notifications",
  },
]

export const SettingsScreen: React.FC<IProps> = ({ navigation }) => {
  const { data, isLoading, isError } = useGetProfileQuery(apiSdk, {
    userId: getUserId(),
  })
  const queryClient = useQueryClient()
  const { mutate, isLoading: mutateLoading } = useUpdateCustomerProfileMutation(apiSdk, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["getProfile"])
    },
    onError: (error) => {
      console.log("error in update customer profile", error)
    },
  })

  const handleSettingsChange = (key, value) => {
    mutate({
      input: {
        userId: getUserId(),
        [key]: value,
      },
    })
  }
  const styles = useStyles({
    create: (theme) => ({}),
  })

  return (
    <Screen unsafe preset="scroll">
      {isLoading ? (
        <Spinner size={"lg"} mt={120} />
      ) : (
        <FlatList
          contentContainerStyle={{
            marginTop: 12,
            // backgroundColor: "blue",
          }}
          scrollEnabled={false}
          data={settingKeys}
          keyExtractor={(item, index) => index?.toString()}
          // ItemSeparatorComponent={() => <View style={styles.seperator} />}
          renderItem={({ item, index }) => {
            const { label, dataKey } = item
            const isEnabled = data?.getCustomerProfile && data?.getCustomerProfile[dataKey]
            return (
              <HStack
                px={3}
                w={"full"}
                alignItems="center"
                py={3}
                borderColor="gray.400"
                borderBottomWidth={1}
                justifyContent={"space-between"}
              >
                <Text fontSize="xl" fontWeight={"semibold"}>
                  {label}
                </Text>
                <Switch
                  isChecked={isEnabled}
                  onToggle={() => {
                    handleSettingsChange(dataKey, !isEnabled)
                  }}
                />
              </HStack>
            )
          }}
        />
      )}
    </Screen>
  )
}
