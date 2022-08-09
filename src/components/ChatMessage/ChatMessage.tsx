import React, { FC, useMemo } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { auth } from '../../api';
import dayjs from 'dayjs';
import { globalThemeTypes } from '../../types/types';
import { useTheme } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type ChatMessageProps = {
  messageItem: {
    createdAt: any;
    message: string;
    userId: string;
    unread: boolean;
  };
};

const { width, height } = Dimensions.get('screen');
const WIDTH = width;
const HEIGHT = height;

const ChatMessage: FC<ChatMessageProps> = ({ messageItem }) => {
  const theme: globalThemeTypes = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const myId = auth.currentUser?.uid;
  const ownMessage = messageItem.userId === myId;
  const getTimeStampDate = dayjs(messageItem.createdAt.seconds * 1000).format('HH:mm');

  return (
    <View style={ownMessage ? styles.myMessage : styles.senderMessage}>
      <Text style={ownMessage ? { color: 'white' } : { color: 'black' }}>
        {messageItem.message}
      </Text>
      <View style={styles.timeAndSendStatusBox}>
        <Text
          style={[ownMessage ? { color: 'white' } : { color: 'black' }, styles.sendTime]}
        >
          {getTimeStampDate}
        </Text>
        {messageItem.unread ? (
          <Ionicons style={styles.sendStatus} name={'checkmark'} />
        ) : (
          <Ionicons style={styles.sendStatus} name={'checkmark-done'} />
        )}
      </View>
    </View>
  );
};

const createStyles = (theme: globalThemeTypes) =>
  StyleSheet.create({
    myMessage: {
      maxWidth: WIDTH - 50,
      flexDirection: 'row',
      backgroundColor: '#0084FF',
      alignSelf: 'flex-end',
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
      padding: 15,
      margin: 10,
      borderRadius: 20,
      borderBottomEndRadius: 5,
    },
    senderMessage: {
      flexDirection: 'row',
      alignSelf: 'flex-start',
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
      backgroundColor: 'white',
      padding: 15,
      margin: 10,
      borderRadius: 20,
      borderBottomStartRadius: 5,
    },

    timeAndSendStatusBox: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      alignSelf: 'flex-end',
    },
    sendTime: {
      paddingLeft: 10,
      fontSize: 10,
    },
    sendStatus: {
      paddingLeft: 2,
    },
  });

export default ChatMessage;
