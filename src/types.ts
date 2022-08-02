import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackNavigator } from './navigation/StackNavigator';
import { MessagesType } from './screens/Home';

export type RootStackParamList = {
  Home: undefined;
  Chat: { name: string; avatarUrl: string; messages: MessagesType[] };
  TabNavigator: undefined;
};

export type ChatRoomProps = NativeStackScreenProps<RootStackParamList, 'Chat'>;

export type NavigationUseType = NavigationProp<RootStackParamList>;
export const useAppNavigation = () => useNavigation<NavigationUseType>();
