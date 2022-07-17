import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AccountNavigator from "./AccountNavigator";
import BadgesScreen from "../screens/BadgesScreen";
import ScanButton from "./ScanButton";
import routes from "./routes";
import ScanNavigator from "./ScanNavigator";
import AboutScreen from "../screens/AboutScreen";
import ChildAlert from "../screens/ChildMode/ChildAlert";

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="About"
      component={AboutScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="information"
            color={color}
            size={size}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Badges"
      component={BadgesScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="medal" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="ScanningScreen"
      component={ScanNavigator}
      options={({ navigation }) => ({
        tabBarButton: () => (
          <ScanButton onPress={() => navigation.navigate(routes.SCAN_ITEM)} />
        ),
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="barcode-scan"
            color={color}
            size={size}
          />
        ),
      })}
    />
    <Tab.Screen
      name="Account"
      component={AccountNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }}
    />
    
    <Tab.Screen
      name="SwitchMode"
      component={ChildAlert}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="account-switch"
            color={color}
            size={size}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
