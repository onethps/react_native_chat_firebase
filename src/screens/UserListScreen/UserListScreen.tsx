import React, { useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { auth, db } from '../../api';
import { useAppNavigation } from '../../types';
import { globalThemeTypes, UserType } from '../../types/types';
import { useTheme } from '@react-navigation/native';

const UserListScreen = () => {
  const nav = useAppNavigation();
  const theme: globalThemeTypes = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [userList, setUserList] = useState<UserType[] | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'users'), where('uid', '!=', auth.currentUser?.uid));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let users = [] as UserType[];
      querySnapshot.forEach((doc) => {
        users.push(doc.data() as UserType);
      });
      setUserList(users);
    });

    return () => unsubscribe();
  }, []);

  const onNavToChatRoomPress = (userEmail: string, userId: string) => {
    nav.navigate('ChatRoomScreen', { userEmail, userId });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholderTextColor={theme.colors.inputText}
          style={styles.input}
          placeholder={'Search...'}
        />
      </View>
      <FlatList
        contentContainerStyle={{
          padding: 20,
        }}
        data={userList}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onNavToChatRoomPress(item.email, item.uid)}>
            <View style={styles.userContainer}>
              <Image
                style={styles.avatar}
                source={{
                  uri: item.avatar,
                }}
              />
              <View style={styles.userItem}>
                <Text style={styles.userItemText}>{item.email}</Text>
                <Text style={styles.userItemDesc}>was nearly</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => item.uid}
      />
    </View>
  );
};

const createStyles = (theme: globalThemeTypes) =>
  StyleSheet.create({
    container: {
      flex: 1,
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
      color: theme.colors.text,
      fontWeight: 'bold',
      fontSize: 18,
      backgroundColor: theme.colors.inputBgLight,
    },
    chatRows: {
      marginTop: 20,
    },
    userContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 2,
    },
    userItem: {
      padding: 5,
      flex: 2,
      borderBottomColor: theme.colors.border,
      borderBottomWidth: 1,
    },
    userItemText: {
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    userItemDesc: {
      color: theme.colors.text,
      opacity: 0.3,
      fontSize: 12,
    },
    avatar: {
      marginRight: 5,
      borderRadius: 50,
      width: 50,
      height: 50,
    },
  });

export default UserListScreen;
