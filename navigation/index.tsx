/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import i18n from 'i18n-js';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { useAuthContext } from '../hooks/useAuth';

import NotFoundScreen from '../screens/NotFoundScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LoginScreen from '../screens/LoginScreen';
import ControlScreen from '../screens/ControlScreen';
import ProjectsScreen from '../screens/ProjectsScreen';

import { RootStackParamList, RootTabParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

const Navigation = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
  const { auth } = useAuthContext();

  if (auth.type === 'initial') {
    return null;
  }

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
};

export default Navigation;

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { auth } = useAuthContext();

  return (
    <Stack.Navigator>
      {auth.type === 'unauthenticated' ? (
        <>
          <Stack.Screen
            name="Projects"
            component={ProjectsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: i18n.t('common.login_screen'),
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Root"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
        </>
      )}

      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: i18n.t('common.not_found_screen') }}
      />
    </Stack.Navigator>
  );
};

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

const BottomTabNavigator = () => {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Control"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Control"
        component={ControlScreen}
        options={{
          title: i18n.t('common.control_screen'),
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-key-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Projects"
        component={ProjectsScreen}
        options={{
          title: i18n.t('common.projects_screen'),
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-business-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: i18n.t('common.settings_screen'),
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-settings-outline" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
};

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
const TabBarIcon = (props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) => {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
};
