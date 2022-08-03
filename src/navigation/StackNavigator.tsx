import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { HomeTabs } from '.';
import { auth } from '../api';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

const HomeStack = createNativeStackNavigator();

export const StackNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      }
    });
  }, []);

  return (
    <HomeStack.Navigator>
      {isLoggedIn ? (
        <>
          <HomeStack.Screen
            name={'HomeScreen'}
            component={HomeTabs}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen name={'ChatRoomScreen'} component={ChatRoomScreen} />
        </>
      ) : (
        <>
          <HomeStack.Screen name={'SignInScreen'} component={SignInScreen} />
          <HomeStack.Screen name={'SignUpScreen'} component={SignUpScreen} />
        </>
      )}
    </HomeStack.Navigator>
  );
};
