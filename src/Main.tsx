import React, { useContext } from 'react';
import { ThemeContext } from './components/ThemeProvider/ThemeProvider';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './navigation/StackNavigator';
import { useColorScheme } from 'react-native';

const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: 'rgb(16,94,218)',
    backgroundLight: 'rgb(48,48,51)',
    inputBgLight: '#383838',
    inputText: '#696868',
    chatRoomBg: '#2a2a2a',
    bgHigh: '#383838',
  },
};

const MyLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(16,94,218)',
    backgroundLight: 'rgb(213,213,213)',
    inputBgLight: '#e8e8e8',
    inputText: '#c5c5c5',
    chatRoomBg: '#F2F2F2',
    bgHigh: '#fff',
  },
};

const Main = () => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <NavigationContainer theme={isDarkTheme ? MyDarkTheme : MyLightTheme}>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default Main;
