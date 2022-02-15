import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerActions} from '@react-navigation/native';
import {MovieDetail, HomeScreen} from '../../screens/Home';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {useTheme} from '@react-navigation/native';

const Stack = createNativeStackNavigator();
const HomeStack = ({navigation, route}) => {
  const {colors} = useTheme();
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
            <View style={Styles.headerLeftContainer}>
              <TouchableOpacity
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                style={{marginLeft: 10}}>
                <Ionicons
                  name="menu-outline"
                  size={30}
                  color={colors.primary}
                />
              </TouchableOpacity>
              <View style={{paddingLeft: 15}}>
                <Text style={[Styles.currentLocation, {color: colors.primary}]}>
                  Current Location
                </Text>
                <Text style={[Styles.locationUser, {color: colors.text}]}>
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
                color={colors.primary}
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
const Styles = StyleSheet.create({
  headerLeftContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentLocation: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Muli',
  },
  locationUser: {
    fontSize: 14,
    fontFamily: 'Muli',
  },
});
