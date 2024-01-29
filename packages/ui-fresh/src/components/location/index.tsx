import { View } from "native-base";
import React, { ReactNode, useEffect, useState } from "react";
import { FlatListProps, StyleSheet, TouchableOpacity } from "react-native";
import RNAutoComplete from "react-native-autocomplete-input";
import { Text } from "../..";

type IOption = {
  id: string;
  label: string;
};

type IAutoCompleteInputProps = {
  getOptions: (text: string) => Promise<any[]>;
  onSelect: (option: IOption) => any;
};

// const mock_data = new Array(10).fill(0).map((_, i) => ({
//   id: i.toString(),
//   label: faker.name.findName(),
// }));

const Wrapper = ({ children }: { children: ReactNode }) => {
  // if (Platform.OS === "android") {
  return (
    <View
      style={{
        flex: 1,
        left: 0,
        position: "absolute",
        right: 0,
        top: 0,
        zIndex: 100,
      }}
    >
      {children}
    </View>
  );
  // } else {
  //   return <>{children}</>;
  // }
};
export const AutoCompleteInput = (props: IAutoCompleteInputProps) => {
  const { getOptions, onSelect } = props;
  const [searchValue, setSearchvalue] = useState("");
  const [data, setData] = useState<IOption[]>([]);
  const [showResults, setShowResults] = useState(true);

  useEffect(() => {
    async function fetchOptions() {
      try {
        const data = await getOptions(searchValue);

        // const formattedData = formatOptions(data);
        setData(data);
        setShowResults(true);
      } catch (error) {
        setShowResults(true);
      }
    }
    if (searchValue?.length > 1) {
      fetchOptions();
    }
  }, [searchValue]);
  return (
    <Wrapper>
      <RNAutoComplete
        hideResults={!showResults || searchValue?.length === 0}
        data={data}
        value={searchValue}
        onChangeText={setSearchvalue}
        listContainerStyle={styles.list}
        flatListProps={
          {
            keyExtractor: (_, idx) => idx.toString(),
            contentContainerStyle: styles.list,
            renderItem: ({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  onSelect(item);
                  setSearchvalue(null);
                  setShowResults(false);
                }}
              >
                <Text>{item.label}</Text>
              </TouchableOpacity>
            ),
          } as Partial<FlatListProps<IOption>>
        }
      />
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 12,
  },
  list: {
    backgroundColor: "#ffff",
  },
});
