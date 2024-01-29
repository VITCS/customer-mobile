import React, { ReactNode, useEffect, useState } from "react";
import {
  FlatListProps,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import RNAutoComplete from "react-native-autocomplete-input";
import { Searchbar } from "react-native-paper";
import { Text } from "../..";
type IOption = {
  id: string;
  label: string;
};

type IAutoCompleteInputProps = {
  getOptions: (text: string) => Promise<any[]>;
  onSelect: (option: IOption) => any;
};

// const { width } = Dimensions.get("window");

// const mock_data = new Array(10).fill(0).map((_, i) => ({
//   id: i.toString(),
//   label: faker.name.findName(),
// }));

const Wrapper = ({ children }: { children: ReactNode }) => {
  if (Platform.OS === "android") {
    return (
      <View
        style={{
          flex: 1,
          left: 0,
          position: "absolute",
          right: 0,
          top: 0,
          backgroundColor: "#fff",
          zIndex: 10000,
          width: "100%",
        }}
      >
        {children}
      </View>
    );
  } else {
    return (
      <View
        style={{
          width: "100%",
        }}
      >
        {children}
      </View>
    );
  }
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
        value={searchValue}
        onChangeText={setSearchvalue}
        data={data}
        placeholder=" Search for address"
        renderTextInput={(p) => {
          return <Searchbar placeholder="Search for address" {...p} />;
        }}
        listContainerStyle={styles.list}
        flatListProps={
          {
            keyExtractor: (_, idx) => idx.toString(),
            contentContainerStyle: styles.list,
            renderItem: ({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  setSearchvalue(item.label);
                  onSelect(item);
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
    backgroundColor: "#fff",
    zIndex: 100000,
  },
  list: {
    backgroundColor: "#ffff",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#000",
    shadowOffset: {
      height: 4,
      width: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: "#000",
    zIndex: 100000,
  },
});
