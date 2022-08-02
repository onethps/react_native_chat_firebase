import firebase from 'firebase/compat';
import { getFirestore } from 'firebase/firestore';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from '../constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth } from 'firebase/auth';
import { getReactNativePersistence } from 'firebase/auth/react-native';

// Initialize Firebase
export default !getApps.length ? initializeApp(firebaseConfig) : getApp();

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth, db, storage };
