import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DrawerNavigation from './src/routes/DrawerNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';

import {store} from './redux/store';
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <DrawerNavigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
