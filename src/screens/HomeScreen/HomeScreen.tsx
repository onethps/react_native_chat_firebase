import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, TextInput, View } from 'react-native';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

import { RoomType } from '../../types';
import { auth, db } from '../../api';
import ChatRowItem from '../../components/ChatRowItem';
import { useTheme } from '@react-navigation/native';
import { globalThemeTypes } from '../../types/types';

const HomeScreen = () => {
  const [rooms, setRooms] = useState<RoomType[] | null>(null);

  const theme: globalThemeTypes = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const chatRowRenderItem = useCallback(
    ({ item, index }) => (
      <ChatRowItem
        item={item}
        index={index}
        //last message
        message={item.lastMsg}
      />
    ),
    [],
  );

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

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholderTextColor={theme.colors.inputText}
          style={styles.input}
          placeholder={'Search...'}
        />
      </View>
      {/*HOME PAGE ROOMS LIST*/}
      <FlatList
        contentContainerStyle={styles.chatRows}
        data={rooms}
        renderItem={chatRowRenderItem}
        keyExtractor={(item) => item.roomId}
      />
    </View>
  );
};

const createStyles = (theme: globalThemeTypes) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    inputContainer: {
      paddingHorizontal: 20,
      paddingVertical: 15,
      backgroundColor: theme.colors.background,
      borderBottomWidth: 0.7,
      borderBottomColor: theme.colors.border,
    },
    input: {
      width: '100%',
      borderRadius: 10,
      padding: 5,
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 18,
      color: theme.colors.text,
      backgroundColor: theme.colors.inputBgLight,
    },
    chatRows: {
      marginTop: 20,
    },
  });

export default HomeScreen;
