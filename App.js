import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DrawerNavigation from './src/routes/DrawerNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {lightTheme, darkTheme} from './constants';
import {store} from './redux/store';
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer theme={lightTheme}>
        <DrawerNavigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
