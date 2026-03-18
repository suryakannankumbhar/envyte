import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// 1. Import the Auth modules
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyAt7FPtAygtZp0tMU9Bt-VR-nRHEIsI1l4',
    authDomain: 'envyte-ac907.firebaseapp.com',
    projectId: 'envyte-ac907',
    storageBucket: 'envyte-ac907.firebasestorage.app',
    messagingSenderId: '593833194695',
    appId: '1:593833194695:web:58609eb548a11d382e7ae2',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// 2. Initialize Auth and the Google Provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
