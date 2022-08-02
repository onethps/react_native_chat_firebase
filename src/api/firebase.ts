import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
