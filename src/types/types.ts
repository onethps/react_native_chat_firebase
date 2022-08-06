import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  ChatRoomScreen: {
    userEmail?: string;
    roomMessages?: any[];
    roomId?: string;
    profileSender?: UserType | null;
    roomIndex?: number;
    userId?: string;
  };
  SignUpScreen: undefined;
  SignInScreen: undefined;
  ProfileScreen: undefined;
};

export type ChatRoomProps = NativeStackScreenProps<RootStackParamList, 'ChatRoomScreen'>;

export type NavigationUseType = NavigationProp<RootStackParamList>;
export const useAppNavigation = () => useNavigation<NavigationUseType>();

export type MessagesType = {
  message: string;
  createdAt: any;
  userId: string | undefined;
};

export type UserType = {
  avatar: string;
  email: string;
  isOnline: boolean;
  password: string;
  uid: string;
};

export type RoomType = {
  createdAt: any;
  messages?: MessagesType[];
  users: number[];
  roomName: string;
  roomId: string;
  lastMsg: string;
};
