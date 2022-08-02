import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Chat from '../screens/Chat';
import HomeTabs from './HomeTabs';

const HomeStack = createNativeStackNavigator();

export const StackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name={'Home'}
        component={HomeTabs}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen name={'Chat'} component={Chat} />
    </HomeStack.Navigator>
  );
};
