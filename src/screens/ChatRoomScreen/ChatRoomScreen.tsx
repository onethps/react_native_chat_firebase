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
import { ChatRoomProps, MessagesType, useAppNavigation } from '../../types';
import SendMessageInput from '../../components/SendMessageInput';
import ChatMessage from '../../components/ChatMessage';
import { useAppDispatch } from '../../store';
import {
  collection,
  doc,
  getDoc,
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

const { height, width } = Dimensions.get('screen');

const HEIGHT = height;
const WIDTH = width;

const ChatRoomScreen = ({ route }: ChatRoomProps) => {
  const { roomId, userId, profileSender, userEmail } = route.params;

  const [currentRoomId, setCurrentRoomId] = useState(roomId);
  const dispatch = useAppDispatch();
  const nav = useAppNavigation();
  const flatListRef = useRef<FlatList>(null);

  const [value, setValue] = useState('');
  const [roomMessages, setRoomMessages] = useState<MessagesType[] | any>(null);

  // set messages from user list
  useEffect(() => {
    const fetch = async () => {
      const subColRef = query(
        collection(db, 'chat'),
        where(`users.${userId}`, '==', true),
        where(`users.${auth.currentUser?.uid}`, '==', true),
      );
      const querySnapshot = await getDocs(subColRef);
      querySnapshot.forEach((doc) => {
        setCurrentRoomId(doc.data().roomId);
      });
    };
    fetch();
  }, [userId]);

  useEffect(() => {
    if (currentRoomId) {
      const subColRef = query(
        collection(db, 'chat', currentRoomId, 'messages'),
        orderBy('createdAt', 'desc'),
      );

      const unsubscribe = onSnapshot(subColRef, (querySnapshot) => {
        let messages: MessagesType[] = [];
        querySnapshot.forEach((doc) => {
          messages.push(doc.data() as any);
        });
        setRoomMessages(messages);
      });

      return () => unsubscribe();
    }
  }, [dispatch, currentRoomId]);

  useLayoutEffect(() => {
    nav.setOptions({
      headerTitle: () => (
        <Text
          numberOfLines={1}
          style={{ overflow: 'hidden', fontSize: 22, maxWidth: WIDTH - 50 }}
        >
          {profileSender?.email || userEmail}
        </Text>
      ),
      headerTitleAlign: 'center',
      headerRight: () => (
        <TouchableOpacity onPress={onNavToProfilePress}>
          <Image
            style={{
              width: 40,
              height: 40,
              marginHorizontal: 10,
              borderRadius: 100,
            }}
            source={{
              uri: profileSender?.avatar,
            }}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  const onSendMessagePress = async () => {
    if (currentRoomId) {
      // const subColRef = query(collection(db, 'chat', currentRoomId));

      let newMessage: MessagesType = {
        message: value,
        createdAt: Timestamp.now(),
        userId: auth.currentUser?.uid,
      };
      try {
        const newCityRef = doc(collection(db, 'chat', currentRoomId, 'messages'));
        await setDoc(newCityRef, newMessage);
        await updateDoc(doc(db, 'chat', currentRoomId), {
          lastMsg: value,
        });
        setValue('');
      } catch (e) {
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
        roomName: route.params.userEmail,
        users: usersInRoom,
      };

      try {
        const newRef = doc(collection(db, 'chat'));
        await setDoc(newRef, newRoom);
        const newMessages = doc(collection(db, 'chat', newRef.id, 'messages'));
        await setDoc(newMessages, {
          message: value,
          createdAt: Timestamp.now(),
          userId: auth.currentUser?.uid,
        });
        await updateDoc(newRef, {
          roomId: newRef.id,
          lastMsg: value,
        });
        setValue('');
        setCurrentRoomId(newRef.id);
      } catch (e) {
        Alert.alert(e);
      }
    }
  };

  const onNavToProfilePress = () => {
    nav.navigate('ProfileScreen');
  };

  return (
    <View style={styles.container}>
      {roomMessages?.length ? (
        <FlatList
          ref={flatListRef}
          inverted
          onLayout={() => {
            flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
          }}
          data={roomMessages}
          renderItem={({ item, index }) => {
            return <ChatMessage key={index} messageItem={item} />;
          }}
          keyExtractor={(item, index) => item + index}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <Text>No messages</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChatRoomScreen;
