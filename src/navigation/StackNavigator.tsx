import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import SignInScreen from '../screens/SignInScreen/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';
import { onAuthStateChanged } from 'firebase/auth';
import { HomeTabs } from '.';
import ChatScreen from '../screens/ChatScreen';
import { auth } from '../api';

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
          <HomeStack.Screen name={'ChatScreen'} component={ChatScreen} />
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
