import React from 'react';
import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const { height, width } = Dimensions.get('screen');

const HEIGHT = height;
const WIDTH = width;

const Authorization = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerTextContainer}>
        <Text style={styles.h1}>Sign in to Firebase Chat</Text>
        <Text>Please confirm your email and password</Text>
      </View>
      <TextInput style={styles.input} placeholder={'email'} />
      <TextInput style={styles.input} placeholder={'password'} />
      <TouchableOpacity>
        <Button color={'#212121'} title={'Login'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerTextContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  input: {
    borderWidth: 2,
    padding: 10,
    marginVertical: 10,
  },
});

export default Authorization;
