import React from 'react';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import UserListScreen from '../screens/UserListScreen/UserListScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name={'Chats'}
        component={HomeScreen}
        options={{
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerStatusBarHeight: 1,
        }}
      />
      <Tab.Screen
        name={'UserListScreen'}
        component={UserListScreen}
        options={{
          headerTitleAlign: 'center',
          headerTitle: 'UserListScreen',
          headerStatusBarHeight: 1,
        }}
      />
    </Tab.Navigator>
  );
};
