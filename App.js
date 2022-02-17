import React from 'react';
import DrawerNavigation from './src/routes/DrawerNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {lightTheme, darkTheme} from './constants';
import {store} from './redux/store';
import {Provider} from 'react-redux';
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
