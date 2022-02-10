import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {HooksTest} from '../components';
import {useFetch} from '../hooks';
const SettingScreen = () => {
  //useState hook
  //counter is current state while setCounter mutate the counter value
  const [counter, setCounter] = useState(0);
  const [email, setEmail] = useState('');
  const [toggle, setToggle] = useState(true);
  const [fetchCounter, setFetchCounter] = useState(0);
  // useEffect hook
  useEffect(() => {
    //mounting phase
    console.log('render');

    //cleanup function return function inside useEffect function logic in cleanup function

    return () => {
      //unmounting phase
      console.log('unmount');
    };
    //[] is dependency array
  }, [email]);

  //custom hook to fetch url data
  const {data, loading} = useFetch(
    `http://numbersapi.com/${fetchCounter}/trivia`,
  );
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
      <View style={styles.effectContainer}>
        <Text style={styles.heading}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email address"
          placeholderTextColor={'#333'}
          value={email}
          onChangeText={text => setEmail(text)}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text style={styles.heading}>Your email: {email}</Text>

        <Text style={styles.heading}>Mounting and unmounting Component</Text>
        <TouchableOpacity
          style={styles.toggle}
          onPress={() => setToggle(!toggle)}>
          <Text style={styles.heading}>Toggle Component Visibility</Text>
        </TouchableOpacity>
        <Text style={styles.heading}>{loading ? 'Loading....' : data}</Text>
        <TouchableOpacity
          style={styles.toggle}
          onPress={() => setFetchCounter(prevState => prevState + 1)}>
          <Text style={styles.heading}>Fetch Next Data {fetchCounter}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
// {toggle && <HooksTest />}

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomColor: 'green',
    borderBottomWidth: 1,
  },
  effectContainer: {
    borderBottomWidth: 1,
    height: 300,

    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#F7F7F7',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    color: '#333',
    paddingLeft: 10,
  },
  toggle: {
    width: '50%',
    height: 60,
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
