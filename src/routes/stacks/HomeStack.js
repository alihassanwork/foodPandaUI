import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TouchableOpacity, View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerActions} from '@react-navigation/native';
import HomeScreen from '../../screens/HomeScreen';
import {MovieDetail} from '../../screens/Home';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
const Stack = createNativeStackNavigator();
const HomeStack = ({navigation, route}) => {
  const tabHiddenRoutes = ['MovieDetail'];
  React.useLayoutEffect(() => {
    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    } else {
      navigation.setOptions({tabBarStyle: {display: 'flex'}});
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: null,
          headerLeft: () => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                style={{marginLeft: 10}}>
                <Ionicons name="menu-outline" size={30} color="#E21A70" />
              </TouchableOpacity>
              <View style={{paddingLeft: 15}}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    color: '#E21A70',
                    fontFamily: 'Muli',
                  }}>
                  Current Location
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#333',
                    fontFamily: 'Muli',
                  }}>
                  Cubator 1 Sunrise Avenue
                </Text>
              </View>
            </View>
          ),
          headerRight: ({focused}) => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <Ionicons
                name="ios-cart-outline"
                size={25}
                color="#E21A70"
                style={{paddingRight: 20}}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetail}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
