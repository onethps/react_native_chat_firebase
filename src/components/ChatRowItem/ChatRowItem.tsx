import React, { useEffect, useMemo, useState } from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { RoomType, useAppNavigation } from '../../types';
import { formatDate } from '../../utils/formatDate';
import { auth, db } from '../../api';
import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore';
import { UserType } from '../../types/types';
import { Theme, useTheme } from '@react-navigation/native';

const ChatRowItem = ({
                       item,
                       message,
                       index,
                     }: {
  item: RoomType;
  message: any;
  index: number;
}) => {
  const nav = useAppNavigation();
  const [profileSender, setProfileSender] = useState<UserType | null>(null);
  const [unreadCount, setUnreadCount] = useState<null | number>(null);

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const onNavToChatRoomPress = () => {
    nav.navigate('ChatRoomScreen', {
      roomMessages: item.messages,
      roomId: item.roomId,
      roomIndex: index,
      profileSender,
    });
  };

  useEffect(() => {
    let isMounted = true;
    if (item) {
      const getSenderId = Object.keys(item.users).filter(
        (id) => id !== auth.currentUser?.uid,
      );
      const fetchUserSenderProfile = async () => {
        const docSnap = await getDoc(doc(db, 'users', getSenderId[0]));
        if (docSnap.exists()) {
          if (isMounted) setProfileSender(docSnap.data() as UserType);
        } else {
          console.log('No such document!');
        }
      };
      fetchUserSenderProfile().catch((err) => {
        if (!isMounted) return;
      });
    }

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (item.roomId) {
      const q = query(
        collection(db, 'chat', item.roomId, 'messages'),
        where(`unread`, '==', true),
        where('userId', '!=', auth.currentUser?.uid),
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let rooms: RoomType[] = [];
        querySnapshot.forEach((doc) => {
          rooms.push(doc.data() as RoomType);
        });
        setUnreadCount(rooms.length);
      });
      return () => unsubscribe();
    }
  }, []);

  return (
    <TouchableHighlight onPress={onNavToChatRoomPress}>
      <View style={styles.container}>
        <View>
          <Image
            source={{
              uri: profileSender?.avatar,
            }}
            style={styles.avatar}
          />
          {unreadCount ? (
            <View style={styles.unreadMessagesCountContainer}>
              <Text style={styles.unreadCount}>{unreadCount}</Text>
            </View>
          ) : null}
        </View>
        <View style={styles.textContainer}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.name}>{profileSender?.email}</Text>
            <Text style={{ color: '#9a9a9a' }}>{formatDate(new Date())}</Text>
          </View>
          <Text numberOfLines={2} style={styles.desc}>
            {message}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 5,
      paddingHorizontal: 10,
      justifyContent: 'center',
      width: '100%',
    },
    avatar: {
      marginRight: 5,
      borderRadius: 50,
      width: 50,
      height: 50,
      position: 'relative',
    },
    unreadMessagesCountContainer: {
      backgroundColor: theme.colors.primary,
      position: 'absolute',
      bottom: 0,
      right: 0,
      paddingHorizontal: 5,
      borderRadius: 10,
      borderColor: theme.colors.border,
      borderWidth: 2,
    },
    unreadCount: {
      color: theme.colors.text,
    },
    textContainer: {
      paddingHorizontal: 10,
      flex: 2,
      paddingVertical: 5,
      borderBottomColor: theme.colors.border,
      borderBottomWidth: 1,
    },
    headerTextContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    name: {
      fontSize: 16,
      color: theme.colors.text,
    },
    desc: {
      color: theme.colors.text,
      opacity: 0.5,
    },
  });

export default ChatRowItem;
