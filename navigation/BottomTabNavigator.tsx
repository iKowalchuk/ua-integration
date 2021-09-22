/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ControlScreen from '../screens/ControlScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { BottomTabParamList, ControlParamList, SettingsParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Control"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Control"
        component={TabControlNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-key-outline" color={color} />
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={TabSettingsNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-settings-outline" color={color} />
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabControlStack = createStackNavigator<ControlParamList>();

const TabControlNavigator = () => {
  return (
    <TabControlStack.Navigator>
      <TabControlStack.Screen
        name="Control"
        component={ControlScreen}
        options={{ headerTitle: 'Control' }}
      />
    </TabControlStack.Navigator>
  );
};

const TabSettingsStack = createStackNavigator<SettingsParamList>();

const TabSettingsNavigator = () => {
  return (
    <TabSettingsStack.Navigator>
      <TabSettingsStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerTitle: 'Settings' }}
      />
    </TabSettingsStack.Navigator>
  );
};
