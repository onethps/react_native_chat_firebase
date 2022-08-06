import React, { useEffect, useState } from 'react';
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
import { useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';
import { allUsersSelector, setAllUsers } from '../../store/UsersReducer';
import { useAppNavigation } from '../../types';
import { UserType } from '../../types/types';

const UserListScreen = () => {
  const nav = useAppNavigation();

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
        <TextInput style={styles.input} placeholder={'Search...'} />
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
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
  },
  userItem: {
    padding: 5,
    flex: 2,
    borderBottomWidth: 0.2,
    borderColor: '#b6b6b6',
  },
  userItemText: {
    fontWeight: 'bold',
  },
  userItemDesc: {
    color: '#727171',
    fontSize: 12,
  },
  avatar: {
    marginRight: 20,
    borderRadius: 50,
    width: 50,
    height: 50,
  },
});

export default UserListScreen;
