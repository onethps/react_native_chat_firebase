import React, { useEffect, useState } from 'react';
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
import firebase from 'firebase/compat';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../api';

const { height, width } = Dimensions.get('screen');

const HEIGHT = height;
const WIDTH = width;

const SignInScreen = () => {
  const nav = useAppNavigation();
  const [error, setError] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: 'test221232@mail.ru',
      password: 'test498498',
    },
  });

  const onSignUpPress = () => {
    nav.navigate('SignUpScreen');
    setError(null);
  };

  const onSignInPress = async (data: any) => {
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      if (auth.currentUser)
        await updateDoc(doc(db, 'users', auth.currentUser?.uid), {
          isOnline: true,
        });
    } catch (e) {
      setError(e.message);
    }
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
        secureTextEntry={true}
        name="password"
        placeholder="password"
        control={control}
        rules={{ required: 'Password is required' }}
      />
      <TouchableOpacity>
        <Button
          onPress={handleSubmit(onSignInPress)}
          color={'#212121'}
          title={'Sign In'}
        />
      </TouchableOpacity>
      <Text style={styles.linkStyle} onPress={onSignUpPress}>
        Dont Have Account
      </Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
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
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
  },
});

export default SignInScreen;
