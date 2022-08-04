import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
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
import { ChatRoomProps, MessagesType, RoomType, useAppNavigation } from '../../types';
import SendMessageInput from '../../components/SendMessageInput';
import ChatMessage from '../../components/ChatMessage';
import { RootState, useAppDispatch, useAppSelector } from '../../store';
import {
  collection,
  doc,
  onSnapshot,
  query,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { auth, db } from '../../api';
import { setNewMessage, setRooms } from '../../store/ChatRoomReducer';

const { height, width } = Dimensions.get('screen');

const HEIGHT = height;
const WIDTH = width;

const ChatRoomScreen = ({ route }: ChatRoomProps) => {
  const nav = useAppNavigation();

  const { roomName, avatarUrl, roomId, roomMessages } = route.params;

  const flatListRef = useRef<FlatList>(null);

  const dispatch = useAppDispatch();

  const [value, setValue] = useState('');

  const onSendMessagePress = async (e: any) => {
    e.preventDefault();
    let newMessage: MessagesType = {
      message: value,
      createdAt: Timestamp.now(),
      userId: auth.currentUser?.uid,
    };

    try {
      await updateDoc(doc(db, 'chat', roomId.trim()), {
        messages: [newMessage, ...roomMessages],
      });
      setValue('');
      dispatch(setNewMessage({ newMessage, roomId }));
    } catch (e) {
      Alert.alert(e);
    }
  };

  useLayoutEffect(() => {
    nav.setOptions({
      headerTitle: () => (
        <Text
          numberOfLines={1}
          style={{ overflow: 'hidden', fontSize: 22, maxWidth: WIDTH - 50 }}
        >
          {roomName}
        </Text>
      ),
      headerTitleAlign: 'center',
      headerRight: () => (
        <TouchableOpacity>
          <Image
            style={{
              width: 40,
              height: 40,
              borderRadius: 100,
            }}
            source={{
              uri: avatarUrl,
            }}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  const [room, setRoom] = useState<MessagesType[] | null>(null);
  useEffect(() => {
    const q = query(collection(db, 'chat'), where(`roomId`, '==', roomId));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages: MessagesType[] = [];
      querySnapshot.forEach((doc) => {
        messages = doc.data().messages;
      });
      setRoom(messages);
    });
    return () => unsubscribe();
  }, [dispatch]);

  if (!room) {
    return (
      <View>
        <Text>.....</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        inverted
        onLayout={() => {
          flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
        }}
        data={room}
        renderItem={({ item }) => <ChatMessage key={item.id} messageItem={item} />}
      />
      <SendMessageInput
        value={value}
        setValue={setValue}
        onSendMessagePress={onSendMessagePress}
        roomId={roomId}
        roomMessages={room}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChatRoomScreen;
