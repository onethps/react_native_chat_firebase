import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { auth } from '../../api';

type ChatMessageProps = {
  messageItem: {
    createdAt: number;
    message: string;
    userId: string;
  };
};

const ChatMessage: FC<ChatMessageProps> = ({ messageItem }) => {
  const myId = auth.currentUser?.uid;

  const checkOwnMessage = messageItem.userId === myId;

  return (
    <View style={checkOwnMessage ? styles.myMessage : styles.senderMessage}>
      <Text style={checkOwnMessage ? { color: 'white' } : { color: 'black' }}>
        {messageItem.message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default ChatMessage;
