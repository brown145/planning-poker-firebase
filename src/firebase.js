import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBnrzoDhFnVbR9v7bShdrpoIBeFc3bm-Tc",
  authDomain: "planning-poker-389df.firebaseapp.com",
  databaseURL: "https://planning-poker-389df.firebaseio.com",
  projectId: "planning-poker-389df",
  storageBucket: "",
  messagingSenderId: "289812359932",
  appId: "1:289812359932:web:528afc366ace938e"
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signIn = () => auth.signInWithPopup(provider);
export const signOut = () => {
  console.log('do signOut');
  return auth.signOut();
};

export default firebase;
