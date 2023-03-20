import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAYSXO7OLATb3fCbqblI4ys-PryQBcxIU8",
  authDomain: "todo-9da1b.firebaseapp.com",
  projectId: "todo-9da1b",
  storageBucket: "todo-9da1b.appspot.com",
  messagingSenderId: "284297030443",
  appId: "1:284297030443:web:be57662eeddef7476fb36e",
  measurementId: "G-RK1MCHWFW9"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export{db};