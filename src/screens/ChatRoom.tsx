import React, { useLayoutEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ChatRoomProps, useAppNavigation } from '../types';
import Icon from 'react-native-vector-icons/FontAwesome';

const ChatRoom = ({ route }: ChatRoomProps) => {
  const navigation = useAppNavigation();

  const { name, avatarUrl } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
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
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'flex-start',
          flexDirection: 'column-reverse',
        }}
      >
        <View style={styles.myMessage}>
          <Text style={{ color: 'white' }}>Message1</Text>
        </View>
        <View style={styles.senderMessage}>
          <Text>Message2</Text>
        </View>
        <View style={styles.myMessage}>
          <Text style={{ color: 'white' }}>Message1</Text>
        </View>
        <View style={styles.myMessage}>
          <Text style={{ color: 'white' }}>Message1</Text>
        </View>
        <View style={styles.myMessage}>
          <Text style={{ color: 'white' }}>Message1</Text>
        </View>
      </ScrollView>

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

export default ChatRoom;
