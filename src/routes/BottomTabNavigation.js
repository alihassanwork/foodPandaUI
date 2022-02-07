import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./stacks/HomeStack";
import SettingScreen from "../screens/SettingScreen";
import ProfileScreen from "../screens/ProfileScreen";
const Tab = createBottomTabNavigator();
import Ionicons from "react-native-vector-icons/Ionicons";
const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "rgba(255, 255, 255, 1)",
          height: 60,
        },
        tabBarIcon: ({ focused }) => {
          switch (route.name) {
            case "HomeStack":
              return (
                <View
                  style={[
                    styles.iconStyle,
                    focused ? styles.iconFocusedStyle : null,
                  ]}
                >
                  <Ionicons name="ios-home-sharp" size={30} color="#E21A70" />

                  <Text
                    style={[
                      styles.labelText,
                      {
                        color: focused
                          ? "#E21A70"
                          : "rgba(155, 155, 155, 1)",
                      },
                    ]}
                  >
                    Home
                  </Text>
                </View>
              );
            case "Profile":
              return (
                <View
                  style={[
                    styles.iconStyle,
                    focused ? styles.iconFocusedStyle : null,
                    
                  ]}
                >
                  <Ionicons name="ios-person-circle-sharp" size={30} color="#E21A70" />

                  <Text
                    style={[
                      styles.labelText,
                      {
                        color: focused
                          ? "#E21A70"
                          : "rgba(155, 155, 155, 1)",
                      },
                    ]}
                  >
                    Profile
                  </Text>
                </View>
              );
            case "Progress":
              return (
                <View
                  style={[
                    styles.iconStyle,
                    focused ? styles.iconFocusedStyle : null,
                  ]}
                >
                  <Ionicons name="menu-outline" size={30} color="#E21A70" />

                  <Text
                    style={[
                      styles.labelText,
                      {
                        color: focused
                          ? "#E21A70"
                          : "rgba(155, 155, 155, 1)",
                      },
                    ]}
                  >
                    Progress
                  </Text>
                </View>
              );
            case "Setting":
              return (
                <View
                  style={[
                    styles.iconStyle,
                    focused ? styles.iconFocusedStyle : null,
                  ]}
                >
                  <Ionicons name="ios-settings-sharp" size={30} color="#E21A70" />

                  <Text
                    style={[
                      styles.labelText,
                      {
                        color: focused
                          ? "#E21A70"
                          : "rgba(155, 155, 155, 1)",
                      },
                    ]}
                  >
                    Setting
                  </Text>
                </View>
              );
            default:
              break;
          }
        },
      })}
    >
      <Tab.Screen name="HomeStack" component={HomeStack} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Setting" component={SettingScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;

const styles = StyleSheet.create({
  iconStyle: {
    width: 65,
    height: 65,
    borderRadius: 65 / 2,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  iconFocusedStyle: {
    top: -10,
    backgroundColor: "#FFFFFF",
    elevation: 7,
    shadowColor: "rgba(68, 189, 232, 0.3)",
    
  },
  labelText: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
  },
});
