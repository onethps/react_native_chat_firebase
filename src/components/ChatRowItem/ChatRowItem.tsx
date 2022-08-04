import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RoomType, useAppNavigation } from '../../types';
import { formatDate } from '../../utils/formatDate';

const { height, width } = Dimensions.get('screen');

const HEIGHT = height;
const WIDTH = width;

const ChatRowItem = ({
  item,
  message,
  roomIndex,
}: {
  item: RoomType;
  message: any;
  roomIndex: number;
}) => {
  const nav = useAppNavigation();

  const onNavToChatRoomPress = () => {
    nav.navigate('ChatRoomScreen', {
      roomName: item.roomName,
      roomMessages: item.messages,
      roomId: item.roomId,
      avatarUrl:
        'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/8a/8a702a7ab089d1934368702287381b9eb20798e6_full.jpg',
    });
  };

  return (
    <TouchableOpacity onPress={onNavToChatRoomPress}>
      <View style={styles.container}>
        <View style={styles.circle}>
          <Image
            source={{
              uri: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/8a/8a702a7ab089d1934368702287381b9eb20798e6_full.jpg',
            }}
            style={styles.avatar}
          />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.name}>{item.roomName}</Text>
            <Text style={{ color: '#9a9a9a' }}>
              {formatDate(item.messages[0].createdAt.toDate())}
            </Text>
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
  },
  circle: {},
  avatar: {
    flex: 1,
    borderRadius: 50,
    width: '40%',
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
