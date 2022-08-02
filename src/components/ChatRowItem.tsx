import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAppNavigation } from '../types';

const { height, width } = Dimensions.get('screen');

const HEIGHT = height;
const WIDTH = width;

const ChatRowItem = () => {
  const nav = useAppNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        nav.navigate('Chat', {
          name: 'Viktor',
          avatarUrl:
            'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/8a/8a702a7ab089d1934368702287381b9eb20798e6_full.jpg',
        })
      }
    >
      <View style={styles.container}>
        <View>
          <Image
            style={styles.avatar}
            source={{
              uri: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/8a/8a702a7ab089d1934368702287381b9eb20798e6_full.jpg',
            }}
          />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.name}>Viktor</Text>
            <Text style={{ color: '#9a9a9a' }}>10:30</Text>
          </View>
          <Text numberOfLines={2} style={styles.desc}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias cum dolore
            dolores ea, eaquessssssssss
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
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  textContainer: {
    paddingHorizontal: 10,
    width: WIDTH - 40 - 50,
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
