import firebaseAuth from "@react-native-firebase/auth";
import firebaseDatabase from "@react-native-firebase/database";
import firebaseStorage from "@react-native-firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyAqSfgq-woUSwSxPSIrdvLTycoOTA-nlv8",
//   authDomain: "petido.firebaseapp.com",
//   projectId: "petido",
//   storageBucket: "petido.appspot.com",
//   messagingSenderId: "276306971828",
//   appId: "1:276306971828:web:46ee3479d66ee443b15be1",
//   measurementId: "G-W49BKLMX5R",
// };

// firebase.initializeApp(firebaseConfig);
export const auth = firebaseAuth;
export const database = firebaseDatabase();
export const storage = firebaseStorage();
