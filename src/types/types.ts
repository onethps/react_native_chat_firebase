import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Chat: { name: string; avatarUrl: string; messages: MessagesType[] };
  Register: undefined;
};

export type ChatRoomProps = NativeStackScreenProps<RootStackParamList, 'Chat'>;

export type NavigationUseType = NavigationProp<RootStackParamList>;
export const useAppNavigation = () => useNavigation<NavigationUseType>();

export type MessagesType = {
  createdAt: string;
  message: string;
  userId: string;
};

export type RoomType = {
  createdAt: string;
  messages: MessagesType[];
  users: number[];
  roomName: string;
};
