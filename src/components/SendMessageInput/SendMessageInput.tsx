import React, { FC, useMemo } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';
import { globalThemeTypes } from '../../types/types';

type SendMessageInputType = {
  value: string;
  setValue: (val: string) => void;
  onSendMessagePress: (e: any) => void;
};

const SendMessageInput: FC<SendMessageInputType> = ({
  onSendMessagePress,
  setValue,
  value,
}) => {
  const theme: globalThemeTypes = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.newMessageContainer}>
      <Ionicons
        name={'md-attach-sharp'}
        style={{ fontSize: 25, color: theme.colors.inputText }}
      />
      <TextInput
        placeholderTextColor={theme.colors.inputText}
        value={value}
        onChangeText={setValue}
        multiline={true}
        style={styles.input}
        placeholder={'Message...'}
      />
      <Icon name={'microphone'} style={{ fontSize: 20, color: theme.colors.inputText }} />

      {value ? (
        <TouchableOpacity onPress={onSendMessagePress}>
          <Icon style={styles.iconSend} name={'send'} size={15} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const createStyles = (theme: globalThemeTypes) =>
  StyleSheet.create({
    newMessageContainer: {
      backgroundColor: theme.colors.bgHigh,
      paddingVertical: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
    },
    input: {
      backgroundColor: theme.colors.chatRoomBg,
      marginHorizontal: 15,
      borderRadius: 20,
      paddingHorizontal: 20,
      color: theme.colors.text,
      fontSize: 18,
      fontWeight: 'bold',
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
