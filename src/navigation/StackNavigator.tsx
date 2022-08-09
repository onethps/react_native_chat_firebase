import React, { useEffect, useMemo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../api';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { useAppDispatch, useAppSelector } from '../store';
import { isInitialized, setIsLoggedIn } from '../store/InitializeReducer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import UserListScreen from '../screens/UserListScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import { useTheme } from '@react-navigation/native';
import { globalThemeTypes } from '../types/types';
import { StyleSheet } from 'react-native';

const HomeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const HomeTabs = () => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

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
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name={'Chats'}
        component={HomeScreen}
        options={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
        }}
      />
      <Tab.Screen
        name={'Users'}
        component={UserListScreen}
        options={{
          headerTitleAlign: 'center',
          headerTitle: 'Users',
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
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
          <HomeStack.Screen
            name={'ProfileScreen'}
            component={ProfileScreen}
            options={{
              headerTransparent: true,
              title: '',
            }}
          />
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

const createStyles = (theme: globalThemeTypes) => StyleSheet.create({});
