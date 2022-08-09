import React, { useMemo, useState } from 'react';
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
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../api';
import { firstCharAvatarGenerator } from '../../utils/avatarGenerator';
import { globalThemeTypes } from '../../types/types';
import { useTheme } from '@react-navigation/native';

const { height, width } = Dimensions.get('screen');

const HEIGHT = height;
const WIDTH = width;

const SignUpScreen = () => {
  const nav = useAppNavigation();
  const [error, setError] = useState(null);

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSignInPress = () => {
    nav.navigate('SignInScreen');
  };

  const onSignUpPress = async (data: any) => {
    setError(null);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      await setDoc(doc(db, 'users', result.user.uid), {
        uid: result.user.uid,
        email: data.email,
        password: data.password,
        avatar: firstCharAvatarGenerator(data.email),
      });
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerTextContainer}>
        <Text style={styles.h1}>Sign Up to Firebase Chat</Text>
        <Text>Please write your email and password</Text>
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
          onPress={handleSubmit(onSignUpPress)}
          color={'#212121'}
          title={'Sign Up'}
        />
      </TouchableOpacity>
      <Text style={styles.linkStyle} onPress={onSignInPress}>
        Already Have Account? Sign In Here
      </Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const createStyles = (theme: globalThemeTypes) =>
  StyleSheet.create({
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
      color: theme.colors.primary,
      textAlign: 'center',
      marginTop: 20,
    },
    errorText: {
      textAlign: 'center',
      marginTop: 20,
      color: 'red',
    },
  });

export default SignUpScreen;
