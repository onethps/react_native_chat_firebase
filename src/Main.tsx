import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import ChatRoom from './screens/ChatRoom';
import Authorization from './screens/Authorization';

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator initialRouteName={'Home'}>
      <Stack.Screen
        name={'Home'}
        component={Home}
        options={{
          headerTitleAlign: 'center',
          headerTitle: 'Chats',
        }}
      />
      <Stack.Screen name={'ChatRoom'} component={ChatRoom} />
      <Stack.Screen name={'Authorization'} component={Authorization} />
    </Stack.Navigator>
  );
};

export default Main;
