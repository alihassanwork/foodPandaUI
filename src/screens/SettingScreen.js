import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';

const SettingScreen = () => {
  const [counter, setCounter] = useState(0);
  return (
    <View style={styles.container}>
      <View style={styles.counterContainer}>
        <Button
          onPress={() => setCounter(prevState => prevState - 1)}
          title="Decrement"
          color="red"
        />
        <Text>Counter Value: {counter}</Text>
        <Button
          onPress={() => setCounter(prevState => prevState + 1)}
          title="Increment"
          color="green"
        />
      </View>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
