import { signOut } from 'firebase/auth';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth, db, storage } from '../../api';
import { useAppNavigation } from '../../types';
import { globalThemeTypes, UserType } from '../../types/types';
import { useTheme } from '@react-navigation/native';
import { ThemeContext } from '../../components/ThemeProvider/ThemeProvider';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const ProfileScreen = () => {
  const nav = useAppNavigation();

  const theme: globalThemeTypes = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { toggleTheme } = useContext(ThemeContext);

  const [photo, setPhoto] = React.useState<any>(null);
  const [myProfile, setMyProfile] = useState<null | UserType>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPhoto(result.uri);
      uploadImg().catch((err) => console.warn(err));
    }
  };

  const uploadImg = async () => {
    if (photo) {
      const imgRef = ref(
        storage,
        `${auth.currentUser?.uid}/avatars/${photo.split('/').slice(-1)[0]}`,
      );
      try {
        const img = await fetch(photo);
        const bytes = await img.blob();
        const snap = await uploadBytes(imgRef, bytes);
        const url = await getDownloadURL(ref(storage, snap.ref.fullPath));
        if (auth.currentUser) {
          const washingtonRef = doc(db, 'users', auth.currentUser?.uid);
          await updateDoc(washingtonRef, {
            avatar: url,
          });
        }
      } catch (e) {
        console.log('e', e);
      }
    }
  };

  const onLogOutPress = async () => {
    await signOut(auth);
    nav.navigate('SignInScreen');
  };

  const menuElems = [
    { text: 'Theme', cb: toggleTheme },
    { text: 'Logout', cb: onLogOutPress },
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (auth.currentUser?.uid) {
          const profile = await getDoc(doc(db, 'users', auth.currentUser.uid));
          setMyProfile(profile.data() as UserType);
        }
      } catch (e) {}
    };
    fetchProfile().catch((error) => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.avatar} source={{ uri: myProfile?.avatar }} />
        <TouchableOpacity style={styles.photoIconCircle}>
          <Icon name={'camera-outline'} onPress={pickImage} size={25} color={'white'} />
        </TouchableOpacity>
        <Text style={styles.textStyle}>{myProfile?.email}</Text>
      </View>
      <View style={styles.menuButtonsGroup}>
        <Text style={styles.menuGroupTitle}>Account</Text>
        {menuElems.map((menuItem, i) => {
          return (
            <Pressable
              style={({ pressed }) => [
                {
                  color: theme.colors.text,
                  backgroundColor: pressed
                    ? theme.colors.background
                    : theme.colors.backgroundLight,
                },
              ]}
              onPress={menuItem.cb}
              key={i}
            >
              <View>
                <Text
                  style={
                    i === menuElems.length - 1
                      ? styles.menuItem
                      : styles.menuItemWithBorder
                  }
                >
                  {menuItem.text}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const createStyles = (theme: globalThemeTypes) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    avatar: {
      width: '100%',
      height: 300,
      position: 'relative',
    },
    photoIconCircle: {
      backgroundColor: theme.colors.primary,
      padding: 10,
      position: 'absolute',
      bottom: -20,
      right: 20,
      borderRadius: 20,
      zIndex: 10,
    },
    textStyle: {
      position: 'absolute',
      bottom: 20,
      left: 20,
      color: theme.colors.text,
      fontWeight: 'bold',
    },
    menuGroupTitle: {
      color: theme.colors.primary,
      fontWeight: 'bold',
    },
    menuButtonsGroup: {
      backgroundColor: theme.colors.backgroundLight,
      padding: 10,
      paddingHorizontal: 40,
    },
    menuItem: {
      paddingVertical: 10,
      color: theme.colors.text,
    },
    menuItemWithBorder: {
      paddingVertical: 10,
      color: theme.colors.text,
      borderColor: theme.colors.border,
      borderBottomWidth: 1,
    },
  });

export default ProfileScreen;
