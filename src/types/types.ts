import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  ChatRoomScreen: {
    roomName: string;
    roomMessages: any[];
    avatarUrl: string;
    roomId: string;
  };
  SignUpScreen: undefined;
  SignInScreen: undefined;
};

export type ChatRoomProps = NativeStackScreenProps<RootStackParamList, 'ChatRoomScreen'>;

export type NavigationUseType = NavigationProp<RootStackParamList>;
export const useAppNavigation = () => useNavigation<NavigationUseType>();

export type MessagesType = {
  message: string;
  createdAt: any;
  userId: string | undefined;
};

export type RoomType = {
  createdAt: any;
  messages: MessagesType[];
  users: number[];
  roomName: string;
  roomId: string;
};
