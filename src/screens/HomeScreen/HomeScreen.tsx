import React, { useEffect } from 'react';
import { FlatList, StyleSheet, TextInput, View } from 'react-native';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

import { RoomType } from '../../types';
import { db } from '../../api';
import ChatRowItem from '../../components/ChatRowItem';
import { useAppDispatch, useAppSelector } from '../../store';
import { allRooms, setRooms } from '../../store/ChatRoomReducer';

const HomeScreen = () => {
  const dispatch = useAppDispatch();

  const allRoomChats = useAppSelector(allRooms);

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
      dispatch(setRooms(rooms));
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder={'Search...'} />
      </View>
      {/*home messages LIST   //////////////////////////////////////*/}
      <FlatList
        contentContainerStyle={styles.chatRows}
        data={allRoomChats}
        renderItem={({ item, index }) => {
          return (
            <ChatRowItem
              roomIndex={index}
              item={item}
              message={item.messages[0].message}
            />
          );
        }}
        keyExtractor={(item) => item.roomId}
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
