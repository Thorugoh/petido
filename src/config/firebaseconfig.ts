import firebase from "firebase/app";

import "firebase/database";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAqSfgq-woUSwSxPSIrdvLTycoOTA-nlv8",
  authDomain: "petido.firebaseapp.com",
  projectId: "petido",
  storageBucket: "petido.appspot.com",
  messagingSenderId: "276306971828",
  appId: "1:276306971828:web:46ee3479d66ee443b15be1",
  measurementId: "G-W49BKLMX5R",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth;
export const database = firebase.database();
export const storage = firebase.storage();
