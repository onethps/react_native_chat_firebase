import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import UserListScreen from '../screens/UserListScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileScreen from '../screens/ProfileScreen';
import { View } from 'react-native';

const Tab = createBottomTabNavigator();

export const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';

          if (route.name === 'Chats') {
            iconName = focused ? 'chatbox' : 'chatbox-outline';
          }
          if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }
          if (route.name === 'Users') {
            iconName = focused ? 'people-sharp' : 'people-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
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
        name={'Users'}
        component={UserListScreen}
        options={{
          headerTitleAlign: 'center',
          headerTitle: 'UserListScreen',
          headerStatusBarHeight: 1,
        }}
      />
      <Tab.Screen
        name={'Settings'}
        component={ProfileScreen}
        options={{
          headerTransparent: true,
          headerTitle: '',
        }}
      />
    </Tab.Navigator>
  );
};
