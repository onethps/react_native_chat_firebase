import React, { FC } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type SendMessageInputType = {
  roomId: string;
  roomMessages: any[];
  value: string;
  setValue: (val: string) => void;
  onSendMessagePress: (e: any) => void;
};

const SendMessageInput: FC<SendMessageInputType> = ({
  roomId,
  roomMessages,
  onSendMessagePress,
  setValue,
  value,
}) => {
  return (
    <View style={styles.newMessageContainer}>
      <TextInput
        value={value}
        onChangeText={setValue}
        multiline={true}
        style={styles.input}
        placeholder={'Write new message...'}
      />
      <TouchableOpacity onPress={onSendMessagePress}>
        <Icon style={styles.iconSend} name={'send'} size={15} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default SendMessageInput;
