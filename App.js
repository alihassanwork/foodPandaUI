import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import DrawerNavigation from './src/routes/DrawerNavigation';
import {NavigationContainer} from '@react-navigation/native';
const App = () => {
  return (
    <NavigationContainer>
      <DrawerNavigation />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
