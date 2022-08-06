import { signOut } from 'firebase/auth';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../../api';
import { useAppNavigation } from '../../types';
import { setIsLoggedIn } from '../../store/InitializeReducer';
import { RootState, useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';

const ProfileScreen = () => {
  const nav = useAppNavigation();
  const dispatch = useAppDispatch();

  const myProfile = useSelector((state: RootState) => state.users.myProfile);

  const menuElems = ['Theme', 'LogOut'];

  const onLogOutPress = async () => {
    await signOut(auth);
    dispatch(setIsLoggedIn(false));
    nav.navigate('SignInScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatar} />
      <Text>{myProfile.email}</Text>
      <Text>{myProfile.uid}</Text>
      <View style={styles.menuButtonsGroup}>
        {menuElems.map((menuItem, i) => {
          return (
            <TouchableOpacity onPress={onLogOutPress} key={i}>
              <View style={{ padding: 10 }}>
                <Text
                  style={
                    i === menuElems.length - 1
                      ? styles.menuItem
                      : styles.menuItemWithBorder
                  }
                >
                  {menuItem}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    width: '100%',
    height: '40%',
    backgroundColor: 'red',
    marginBottom: 10,
  },
  menuButtonsGroup: {
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: 'green',
  },
  menuItem: {
    height: 30,
    marginLeft: 20,
    color: 'white',
  },
  menuItemWithBorder: {
    height: 30,
    marginLeft: 20,
    color: 'white',

    borderBottomWidth: 1,
  },
});

export default ProfileScreen;
