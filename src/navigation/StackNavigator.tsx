import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../api';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { HomeTabs } from './HomeTabs';
import { useAppDispatch, useAppSelector } from '../store';
import { isInitialized, setIsLoggedIn } from '../store/InitializeReducer';

const HomeStack = createNativeStackNavigator();

export const StackNavigator = () => {
  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector(isInitialized);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setIsLoggedIn(true));
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
