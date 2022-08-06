import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TextInput, View } from 'react-native';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';

import { RoomType } from '../../types';
import { auth, db } from '../../api';
import ChatRowItem from '../../components/ChatRowItem';
import { useAppDispatch, useAppSelector } from '../../store';
import { allRoomsSelector, setRooms } from '../../store/ChatRoomReducer';
import { setMyProfile } from '../../store/UsersReducer';
import { UserType } from '../../types/types';

const HomeScreen = () => {
  const [rooms, setRooms] = useState<RoomType[] | null>(null);
  const [userProfiles, setUserProfiles] = useState<UserType[] | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, 'chat'),
      where(`users.${auth.currentUser?.uid}`, '==', true),
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let rooms: RoomType[] = [];
      querySnapshot.forEach((doc) => {
        rooms.push(doc.data() as RoomType);
      });
      setRooms(rooms);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (rooms) {
      const q = query(
        collection(db, 'users'),
        where(`users.${auth.currentUser?.uid}`, '==', true),
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let rooms: RoomType[] = [];
        querySnapshot.forEach((doc) => {
          rooms.push(doc.data() as RoomType);
        });
        setRooms(rooms);
      });
      return () => unsubscribe();
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder={'Search...'} />
      </View>
      {/*HOME PAGE ROOMS LIST*/}
      <FlatList
        contentContainerStyle={styles.chatRows}
        data={rooms}
        renderItem={({ item, index }) => {
          return (
            <ChatRowItem
              item={item}
              index={index}
              //last message
              message={item.lastMsg}
            />
          );
        }}
        keyExtractor={(item) => item.roomId + Math.floor(Math.random() * 100)}
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

export default HomeScreen;
