import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ChatRoomProps, MessagesType, useAppNavigation } from '../../types';
import SendMessageInput from '../../components/SendMessageInput';
import ChatMessage from '../../components/ChatMessage';
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { auth, db } from '../../api';
import { useTheme } from '@react-navigation/native';
import { globalThemeTypes } from '../../types/types';

const { height, width } = Dimensions.get('screen');

const HEIGHT = height;
const WIDTH = width;

const ChatRoomScreen = ({ route }: ChatRoomProps) => {
  const nav = useAppNavigation();

  // const docsa = DocumentPicker.getDocumentAsync();

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const { roomId, userId, profileSender, userEmail } = route.params;

  const [roomMessages, setRoomMessages] = useState<MessagesType[] | any>(null);
  const [currentRoomId, setCurrentRoomId] = useState<string | undefined>(roomId);
  const [value, setValue] = useState<string>('');

  const flatListRef = useRef<FlatList>(null);
  //find room with users ID's
  useEffect(() => {
    const fetch = async () => {
      const subColRef = query(
        collection(db, 'chat'),
        where(`users.${userId}`, '==', true),
        where(`users.${auth.currentUser?.uid}`, '==', true),
      );
      try {
        const querySnapshot = await getDocs(subColRef);
        querySnapshot.forEach((doc) => {
          setCurrentRoomId(doc.data().roomId);
        });
      } catch (e) {
        console.log(e);
      }
    };
    fetch();
  }, [userId]);

  useEffect(() => {
    if (currentRoomId) {
      const subColRef = query(
        collection(db, 'chat', currentRoomId, 'messages'),
        orderBy('createdAt', 'desc'),
      );

      const unsubscribe = onSnapshot(
        subColRef,
        (querySnapshot) => {
          let messages: MessagesType[] = [];
          querySnapshot.forEach((doc) => {
            messages.push(doc.data() as MessagesType);
          });
          setRoomMessages(messages);
        },
        (err) => {
          console.log(err);
        },
      );

      return () => unsubscribe();
    }
  }, [currentRoomId]);

  ///change unread status///

  useEffect(() => {
    if (currentRoomId && auth.currentUser) {
      const subColRef = query(
        collection(db, 'chat', currentRoomId, 'messages'),
        where('unread', '==', true),
        where('userId', '!=', auth.currentUser?.uid),
      );

      const unsubscribe = onSnapshot(
        subColRef,
        (querySnapshot) => {
          querySnapshot.forEach(async (doc) => {
            await updateDoc(doc.ref, {
              unread: false,
            });
          });
        },
        (error) => {
          console.error(error);
        },
      );
      return () => unsubscribe();
    }
  }, [currentRoomId]);

  useLayoutEffect(() => {
    nav.setOptions({
      headerTitle: () => (
        <Text numberOfLines={1} style={styles.headerStyle}>
          {profileSender?.email || userEmail}
        </Text>
      ),
      headerTitleAlign: 'center',
      headerRight: () => (
        <TouchableOpacity onPress={onNavToProfilePress}>
          <Image
            style={styles.avatar}
            source={{
              uri: profileSender?.avatar,
            }}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  const onSendMessagePress = async () => {
    let newMessage: MessagesType = {
      message: value,
      createdAt: Timestamp.now(),
      userId: auth.currentUser?.uid,
      unread: true,
    };

    if (currentRoomId) {
      try {
        const newCityRef = doc(collection(db, 'chat', currentRoomId, 'messages'));
        //create new room with first message
        await setDoc(newCityRef, newMessage);
        //
        await updateDoc(doc(db, 'chat', currentRoomId), {
          lastMsg: value,
        });
        setValue('');
      } catch (e: any) {
        Alert.alert(e);
      }
    }

    if (!currentRoomId) {
      const usersInRoom: any = {};
      if (auth.currentUser && userId) {
        usersInRoom[auth.currentUser?.uid] = true;
        usersInRoom[userId] = true;
      }
      const newRoom = {
        createdAt: Timestamp.now(),
        users: usersInRoom,
      };

      try {
        const newRef = doc(collection(db, 'chat'));
        await setDoc(newRef, newRoom);
        const newMessages = doc(collection(db, 'chat', newRef.id, 'messages'));
        //update room with new message
        await setDoc(newMessages, newMessage);
        //
        await updateDoc(newRef, {
          roomId: newRef.id,
          lastMsg: value,
        });
        setValue('');
        setCurrentRoomId(newRef.id);
      } catch (e: any) {
        Alert.alert(e);
      }
    }
  };

  const onNavToProfilePress = () => {
    nav.navigate('ProfileScreen');
  };

  const chatMessageRenderItem = useCallback(
    ({ item, index }) => <ChatMessage key={index + item.message} messageItem={item} />,
    [],
  );

  return (
    <View style={styles.container}>
      {currentRoomId ? (
        <FlatList
          ref={flatListRef}
          inverted
          onLayout={() => {
            flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
          }}
          data={roomMessages}
          renderItem={chatMessageRenderItem}
          keyExtractor={(item, index) => item + index}
        />
      ) : (
        <View style={styles.chatBox}>
          <View style={styles.chatBoxTextContainer}>
            <Text style={styles.textTitle}>No messages yet...</Text>
            <Text style={styles.textDesc}>
              Send your first message to start chatting...
            </Text>
          </View>
        </View>
      )}
      <SendMessageInput
        value={value}
        setValue={setValue}
        onSendMessagePress={onSendMessagePress}
      />
    </View>
  );
};

const createStyles = (theme: globalThemeTypes) =>
  StyleSheet.create({
    headerStyle: {
      overflow: 'hidden',
      fontSize: 22,
      maxWidth: WIDTH - 50,
      color: theme.colors.text,
    },
    container: {
      flex: 1,
    },
    avatar: {
      width: 40,
      height: 40,
      marginHorizontal: 10,
      borderRadius: 100,
    },
    /// styles if no any messages
    chatBox: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 0.8,
    },
    chatBoxTextContainer: {
      width: '50%',
      height: 200,
      backgroundColor: theme.colors.bgHigh,

      padding: 20,
      borderRadius: 20,
    },
    textTitle: {
      color: theme.colors.text,
      fontWeight: 'bold',
      fontSize: 18,
      textAlign: 'center',
      marginVertical: 10,
    },
    textDesc: {
      color: theme.colors.text,
      textAlign: 'center',
    },
    /// styles if no any messages
  });

export default ChatRoomScreen;
