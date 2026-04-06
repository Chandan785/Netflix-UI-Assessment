import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

// Placeholder Firebase configuration
// Note: To use real authentication, swap these placeholders with your actual Firebase Project keys.
const firebaseConfig = {
 apiKey: "AIzaSyDkZgYbqu0DTsfBNTYQXORtw75zGj-cmGM",
  authDomain: "binaireapp.firebaseapp.com",
  projectId: "binaireapp",
  storageBucket: "binaireapp.firebasestorage.app",
  messagingSenderId: "697434314540",
  appId: "1:697434314540:web:44e5d6e86368191f547e89",
  measurementId: "G-23ZJ6FRNDJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged };

