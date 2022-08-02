import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackNavigator } from './navigation/StackNavigator';

export type RootStackParamList = {
  Home: undefined;
  Chat: { name: string; avatarUrl: string };
  TabNavigator: undefined;
};

export type ChatRoomProps = NativeStackScreenProps<RootStackParamList, 'Chat'>;

export type NavigationUseType = NavigationProp<RootStackParamList>;
export const useAppNavigation = () => useNavigation<NavigationUseType>();
