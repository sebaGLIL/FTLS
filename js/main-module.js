// Import Firebase functions needed
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getFirestore, collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyD293OmXnh32SslMpxgx6nOP1r8Yiqz1pw",
  authDomain: "ftls-41ff7.firebaseapp.com",
  projectId: "ftls-41ff7",
  storageBucket: "ftls-41ff7.appspot.com",
  messagingSenderId: "990556714870",
  appId: "1:990556714870:web:ac8219e1ed1025b4106c57",
  measurementId: "G-G2L38CRKM3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Import and use additional scripts as needed
import './app.js';

export { db };
