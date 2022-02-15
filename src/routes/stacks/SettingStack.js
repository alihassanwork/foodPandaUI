import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import SettingScreen from '../../screens/Setting/SettingScreen';
import ImageUploader from '../../screens/Setting/ImageUploader';
const SettingStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
      <Stack.Screen name="ImageUploadScreen" component={ImageUploader} />
    </Stack.Navigator>
  );
};

export default SettingStack;
