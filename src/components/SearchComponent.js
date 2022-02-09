import React from 'react';
import {View, StyleSheet, TextInput, Dimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const SearchComponent = props => {
  return (
    <View style={[styles.container]}>
      <View style={styles.inputWrapper}>
        <Ionicons
          name="ios-search-outline"
          size={30}
          style={{paddingHorizontal: 10}}
          color="#8D8D8D"
        />
        <TextInput
          placeholder="Search for shops & restaurants"
          style={styles.formField}
          placeholderTextColor={'#888888'}
          borderWidth={0}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.25,
  },
  formField: {
    borderWidth: 0.5,
    paddingHorizontal: 12,
    fontSize: 16,
    height: 40,
    width: '80%',
  },
  inputWrapper: {
    backgroundColor: '#F7F7F7',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
});

export default SearchComponent;
