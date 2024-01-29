import * as React from "react";
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Autocomplete from "react-native-autocomplete-input";
import { Text } from "../text/text";

type IOption = {
  text: string;
  value: any;
};

type Props = {
  value: string;
  onChange: (text: string) => any;
  options: IOption[];
};

export const AutocompleteInput = (props: Props) => {
  const { value, onChange, options, onSelect } = props;

  return (
    <View>
      {/* <View style={styles.autocompleteContainer}>
        <Autocomplete
          data={options}
          value={value}
          onChangeText={(text) => onChange(text)}
          flatListProps={{
            keyExtractor: (_, idx) => idx,
            renderItem: ({ item }) => <Text>{item?.text}</Text>,
          }}
        />
      </View> */}
      <View style={styles.autocompleteContainer}>
        <Autocomplete
          autoCorrect={false}
          data={options}
          value={value}
          onChangeText={onChange}
          listContainerStyle={
            {
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
              backgroundColor: "#fff",
            } as ViewStyle
          }
          flatListProps={{
            keyboardShouldPersistTaps: "always",
            keyExtractor: (item) => item.text,
            renderItem: ({ item: { text } }) => (
              <TouchableOpacity onPress={() => onChange(text)}>
                <Text style={styles.itemText}>{text}</Text>
              </TouchableOpacity>
            ),
          }}
        />
      </View>

      <View>
        <Text>Some content</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#F5FCFF",
    flex: 1,

    // Android requiers padding to avoid overlapping
    // with content and autocomplete
    paddingTop: 50,

    // Make space for the default top bar
    ...Platform.select({
      web: {
        marginTop: 0,
      },
      default: {
        marginTop: 25,
      },
    }),
  },
  itemText: {
    fontSize: 15,
    margin: 2,
  },
  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: "#F5FCFF",
    marginTop: 8,
  },
  infoText: {
    textAlign: "center",
  },
  autocompleteContainer: {
    // Hack required to make the autocomplete
    // work on Andrdoid
    flex: 1,
    backgroundColor: "#fff",
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 1,
    padding: 5,
  },
});
