import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RoomType, useAppNavigation } from '../../types';
import { formatDate } from '../../utils/formatDate';
import { auth, db } from '../../api';
import { doc, getDoc } from 'firebase/firestore';
import { UserType } from '../../types/types';

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

  const onNavToChatRoomPress = () => {
    nav.navigate('ChatRoomScreen', {
      roomMessages: item.messages,
      roomId: item.roomId,
      roomIndex: index,
      profileSender,
    });
  };

  const [profileSender, setProfileSender] = useState<UserType | null>(null);

  useEffect(() => {
    let isMounted = true;
    if (item) {
      const getSenderId = Object.keys(item.users).filter(
        (id) => id !== auth.currentUser?.uid,
      );
      const fetchUserEmail = async () => {
        const docSnap = await getDoc(doc(db, 'users', getSenderId[0]));
        if (docSnap.exists()) {
          if (isMounted) setProfileSender(docSnap.data() as UserType);
        } else {
          console.log('No such document!');
        }
      };
      fetchUserEmail().catch((err) => {
        if (!isMounted) return;
      });
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <TouchableOpacity onPress={onNavToChatRoomPress}>
      <View style={styles.container}>
        <View style={styles.circle}>
          <Image
            source={{
              uri: profileSender?.avatar,
            }}
            style={styles.avatar}
          />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.name}>{profileSender?.email}</Text>
            {/*TODO fix date*/}
            <Text style={{ color: '#9a9a9a' }}>{formatDate(new Date())}</Text>
          </View>
          <Text numberOfLines={2} style={styles.desc}>
            {message}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  circle: {},
  avatar: {
    flex: 1,
    borderRadius: 50,
    width: '20%',
    aspectRatio: 1,
  },
  textContainer: {
    paddingHorizontal: 10,
    flex: 2,
    paddingVertical: 5,
    borderBottomColor: '#ececec',
    borderBottomWidth: 1,
  },
  headerTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
  },
  desc: {
    color: '#9a9a9a',
  },
});

export default ChatRowItem;
