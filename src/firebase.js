import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
const firebaseConfig = {
    apiKey: "AIzaSyC2B1xnFXF7_v2gkLja1TRQd0oJTA1lIUw",
    authDomain: "yoube-ne.firebaseapp.com",
    projectId: "yoube-ne",
    storageBucket: "yoube-ne.appspot.com",
    messagingSenderId: "616381502498",
    appId: "1:616381502498:web:43ebd5e7672ed79827667b"
  };
firebase.initializeApp(firebaseConfig);

export default firebase.auth();