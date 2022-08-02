import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../api';

const UserListScreen = () => {
  const [allUsers, setAllUsers] = useState<any[] | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, 'users'),
      where(`uid`, '!=', 'PHiQ1KNx8HRXyoaoo60e94AaKlE2'),
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let users = [] as any;
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setAllUsers(users);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder={'Search...'} />
      </View>
      <FlatList
        contentContainerStyle={{
          padding: 20,
        }}
        data={allUsers}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Image
              style={styles.avatar}
              source={{
                uri: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/8a/8a702a7ab089d1934368702287381b9eb20798e6_full.jpg',
              }}
            />
            <View style={styles.userItem}>
              <Text style={styles.userItemText}>{item.email}</Text>
              <Text style={styles.userItemDesc}>was nearly</Text>
            </View>
          </View>
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
