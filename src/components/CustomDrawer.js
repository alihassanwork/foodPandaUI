import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
const {height} = Dimensions.get('screen');
const CustomDrawer = props => {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: 'white'}}>
        <View style={styles.headerContainer}>
          <TouchableWithoutFeedback onPress={() => alert('Navigate to login')}>
            <Text style={styles.textStyle}>Log in / Create account</Text>
          </TouchableWithoutFeedback>
        </View>
        <TouchableOpacity
          onPress={() => alert('Navigate to help center screen')}>
          <View style={styles.helpContainer}>
            <Ionicons
              name="md-help-circle-outline"
              size={30}
              style={{paddingHorizontal: 10}}
              color="#E21A70"
            />
            <Text style={[styles.textStyle, {color: 'black'}]}>
              Help Center
            </Text>
          </View>
          <View style={styles.footerContainer}>
            <TouchableOpacity
              onPress={() => alert('Navigate to setting screen')}>
              <Text style={[styles.textStyle, {color: 'black'}]}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert('terms and conditions')}>
              <Text style={[styles.textStyle, {color: 'black'}]}>
                Terms & Conditions / Privacy
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  headerContainer: {
    height: height * 0.25,
    backgroundColor: '#E21A70',
    justifyContent: 'flex-end',
    padding: 15,
  },
  textStyle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    fontFamily: 'Muli',
  },
  helpContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 0.15,
    height: 60,
  },
  footerContainer: {
    paddingHorizontal: 15,
    height: 100,
    justifyContent: 'space-evenly',
  },
});
