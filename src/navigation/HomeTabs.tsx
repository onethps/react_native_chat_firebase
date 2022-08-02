import React from 'react';
import Home from '../screens/Home';
import Users from '../screens/Users';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={'Chats'}
        component={Home}
        options={{
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerStatusBarHeight: 1,
        }}
      />
      <Tab.Screen
        name={'Users'}
        component={Users}
        options={{
          headerTitleAlign: 'center',
          headerTitle: 'Users',
          headerStatusBarHeight: 1,
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabs;
