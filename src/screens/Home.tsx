import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../api/firebase';
import ChatRowItem from '../components/ChatRowItem';

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

const Home = () => {
  const [room, setRoom] = useState<RoomType[] | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, 'chat'),
      where(`users1.PHiQ1KNx8HRXyoaoo60e94AaKlE2`, '==', true),
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let rooms: RoomType[] = [];
      querySnapshot.forEach((doc) => {
        rooms.push(doc.data() as RoomType);
      });
      setRoom(rooms);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder={'Search...'} />
      </View>
      <FlatList
        contentContainerStyle={styles.chatRows}
        data={room}
        renderItem={({ item }) => <ChatRowItem item={item} />}
        keyExtractor={(item, index) => item.roomName + Math.floor(Math.random() * 100)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 0.7,
    borderBottomColor: '#e0e0e0',
  },
  input: {
    width: '100%',
    borderRadius: 10,
    padding: 5,
    textAlign: 'center',
    backgroundColor: '#EBEDF0',
  },
  chatRows: {
    marginTop: 20,
  },
});

export default Home;
