import React from 'react';
import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useForm } from 'react-hook-form';
import CustomInput from '../../components/CustomInput';
import { useAppNavigation } from '../../types';

const { height, width } = Dimensions.get('screen');

const HEIGHT = height;
const WIDTH = width;

const SignInScreen = () => {
  const nav = useAppNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSignUpPress = () => {
    nav.navigate('Register');
  };

  const onSignInPress = (data: any) => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerTextContainer}>
        <Text style={styles.h1}>Sign in to Firebase Chat</Text>
        <Text>Please confirm your email and password</Text>
      </View>
      <CustomInput
        secureTextEntry={false}
        name="email"
        placeholder="email"
        control={control}
        rules={{ required: 'Username is required' }}
      />
      <CustomInput
        secureTextEntry={false}
        name="password"
        placeholder="password"
        control={control}
        rules={{ required: 'Password is required' }}
      />
      <TouchableOpacity>
        <Button
          onPress={handleSubmit(onSignInPress)}
          color={'#212121'}
          title={'SignInScreen'}
        />
      </TouchableOpacity>
      <Text style={styles.linkStyle} onPress={onSignUpPress}>
        Dont Have Account
      </Text>
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
  linkStyle: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SignInScreen;
