import firebase from 'firebase/compat';
import { getFirestore } from 'firebase/firestore';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID,
// };

const firebaseConfig = {
  apiKey: 'AIzaSyD_o6I2tR7mED7lqlETYQO4u506p1zFYw8',
  authDomain: 'chat-d9c43.firebaseapp.com',
  projectId: 'chat-d9c43',
  storageBucket: 'chat-d9c43.appspot.com',
  messagingSenderId: '479593314060',
  appId: '1:479593314060:web:bc52200c8620c87310fb29',
  measurementId: 'G-LJ881PK69G',
};

// Initialize Firebase
getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
