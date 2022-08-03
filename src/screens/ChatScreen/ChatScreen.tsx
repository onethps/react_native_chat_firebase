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
import useKeyboard from '../../utils/useKeyboard';

const { height, width } = Dimensions.get('screen');

const HEIGHT = height;
const WIDTH = width;

const ChatScreen = ({ route }: ChatRoomProps) => {
  const nav = useAppNavigation();
  const isKeyboardOpen = useKeyboard();

  const { name, avatarUrl, messages } = route.params;

  const flatListRef = useRef<FlatList>(null);

  useLayoutEffect(() => {
    nav.setOptions({
      headerTitle: name,
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
    <View style={{ flex: 1 }}>
      <FlatList
        ref={flatListRef}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'flex-start',
          flexDirection: 'column-reverse',
        }}
        onLayout={() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }}
        data={messages}
        renderItem={({ item }) => {
          if (item.userId === 'PHiQ1KNx8HRXyoaoo60e94AaKlE2') {
            return (
              <View style={styles.myMessage}>
                <Text style={{ color: 'white' }}>{item.message}</Text>
              </View>
            );
          } else {
            return (
              <View style={styles.senderMessage}>
                <Text>{item.message}</Text>
              </View>
            );
          }
        }}
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
  myMessage: {
    flexDirection: 'row',
    backgroundColor: '#0084FF',
    alignSelf: 'flex-end',
    padding: 10,
    margin: 10,
    borderRadius: 50,
    borderBottomEndRadius: 5,
  },
  senderMessage: {
    flexDirection: 'row',
    backgroundColor: 'white',

    alignSelf: 'flex-start',
    padding: 10,
    margin: 10,
    borderRadius: 50,
    borderBottomStartRadius: 5,
  },
  iconSend: {
    color: 'white',
    backgroundColor: '#0084FF',
    padding: 10,
    borderRadius: 50,
    alignSelf: 'flex-end',
  },
});

export default ChatScreen;
