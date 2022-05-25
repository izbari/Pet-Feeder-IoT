
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';


const firebaseConfig = {
  apiKey: "AIzaSyDjZncZlyFI9fTwRC32vv-dpzs_dSanrpU",
  authDomain: "petfeeder-42b6d.firebaseapp.com",
  databaseURL: "https://petfeeder-42b6d-default-rtdb.firebaseio.com",
  projectId: "petfeeder-42b6d",
  storageBucket: "petfeeder-42b6d.appspot.com",
  messagingSenderId: "618221925081",
  appId: "1:618221925081:web:174fe1da82d1dd98cb84c8"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

const firestore = app.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { firestore, auth,firebase ,storage };