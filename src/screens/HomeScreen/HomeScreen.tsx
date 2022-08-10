import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';

import { RoomType } from '../../types';
import { auth, db } from '../../api';
import ChatRowItem from '../../components/ChatRowItem';
import { useTheme } from '@react-navigation/native';
import { globalThemeTypes } from '../../types/types';
import { SwipeListView } from 'react-native-swipe-list-view';

const HomeScreen = () => {
  const [rooms, setRooms] = useState<RoomType[] | null>(null);

  const theme: globalThemeTypes = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

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

  const deleteRoom = async (roomId: string) => {
    await deleteDoc(doc(db, 'chat', roomId));
  };

  const renderHiddenItem = (item: RoomType) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteRoom(item.roomId)}
      >
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

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
      <SwipeListView
        contentContainerStyle={styles.chatRows}
        data={rooms}
        renderItem={chatRowRenderItem}
        keyExtractor={(item) => item.roomId}
        renderHiddenItem={({ item }) => renderHiddenItem(item)}
        rightOpenValue={-75}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
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
      padding: 10,
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 18,
      color: theme.colors.text,
      backgroundColor: theme.colors.inputBgLight,
    },
    chatRows: {
      marginTop: 20,
    },
    backTextWhite: {
      color: '#FFF',
    },
    backRightBtn: {
      alignItems: 'center',
      bottom: 0,
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      width: 75,
    },
    backRightBtnRight: {
      backgroundColor: 'red',
      right: 0,
    },
    rowBack: {
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 15,
    },
  });

export default HomeScreen;
