import React, { useLayoutEffect, useRef } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ChatRoomProps, useAppNavigation } from '../../types';
import ChatMessage from '../../components/ChatMessage/ChatMessage';

const { height, width } = Dimensions.get('screen');

const HEIGHT = height;
const WIDTH = width;

const ChatRoomScreen = ({ route }: ChatRoomProps) => {
  const nav = useAppNavigation();

  const { name, avatarUrl, messages } = route.params;

  const flatListRef = useRef<FlatList>(null);

  useLayoutEffect(() => {
    nav.setOptions({
      headerTitle: () => (
        <Text
          numberOfLines={1}
          style={{ overflow: 'hidden', fontSize: 22, maxWidth: WIDTH - 50 }}
        >
          {name}
        </Text>
      ),
      headerTitleAlign: 'center',
      headerRight: () => (
        <TouchableOpacity>
          <Image
            style={{
              width: 40,
              height: 40,
              borderRadius: 100,
            }}
            source={{
              uri: avatarUrl,
            }}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        inverted
        onLayout={() => {
          flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
        }}
        data={messages}
        renderItem={({ item }) => <ChatMessage key={item.id} messageItem={item} />}
      />
      <View style={styles.newMessageContainer}>
        <TextInput
          multiline={true}
          style={styles.input}
          placeholder={'Write new message...'}
        />
        <Icon style={styles.iconSend} name={'send'} size={15} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  newMessageContainer: {
    backgroundColor: 'white',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  input: {
    backgroundColor: '#EBEDF0',
    marginHorizontal: 10,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    flex: 1,
  },
  iconSend: {
    color: 'white',
    backgroundColor: '#0084FF',
    padding: 10,
    borderRadius: 50,
    alignSelf: 'flex-end',
  },
});

export default ChatRoomScreen;
