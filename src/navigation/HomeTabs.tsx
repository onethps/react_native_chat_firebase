import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import ChatRoom from '../screens/ChatRoom';
import Authorization from '../screens/Authorization';
import Users from '../screens/Users';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackNavigator } from './StackNavigator';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name={'Home'} component={Home} />
      <Tab.Screen name={'Users'} component={Users} />
    </Tab.Navigator>
    // <Stack.Navigator>
    //   <Stack.Screen name={'StackNavigator'} component={StackNavigator} />
    //   <Stack.Screen
    //     name={'Home'}
    //     component={Home}
    //     options={{
    //       headerTitleAlign: 'center',
    //       headerTitle: 'Chats',
    //     }}
    //   />
    //   <Stack.Screen name={'ChatRoom'} component={ChatRoom} />
    //   <Stack.Screen name={'Authorization'} component={Authorization} />
    // </Stack.Navigator>
  );
};

export default HomeTabs;
