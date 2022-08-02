import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  ChatRoom: { name: string; avatarUrl: string };
};

export type ChatRoomProps = NativeStackScreenProps<RootStackParamList, 'ChatRoom'>;

export type NavigationUseType = NavigationProp<RootStackParamList>;
export const useAppNavigation = () => useNavigation<NavigationUseType>();
