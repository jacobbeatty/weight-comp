import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import "firebase/compat/firestore";
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAz8AIOK9HkJU1-hyAfW92mfCqfkGDg_yM",
  authDomain: "weight-comp-jb.firebaseapp.com",
  projectId: "weight-comp-jb",
  storageBucket: "weight-comp-jb.appspot.com",
  messagingSenderId: "952250123026",
  appId: "1:952250123026:web:db96040f9ab146002da9cb",
  measurementId: "G-WKDV0NHQKF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {app, db, auth};
