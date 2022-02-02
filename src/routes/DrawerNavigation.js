import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import CustomDrawer from '../components/CustomDrawer';
import {TouchableOpacity, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeStack from './stacks/HomeStack';
const Drawer = createDrawerNavigator();

const DrawerNavigation = ({navigation}) => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
