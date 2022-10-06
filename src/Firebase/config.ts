
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDtmbuXSTZgI0ih6idK83OEqRd2P1xoSa0",
  authDomain: "crud-7d8c1.firebaseapp.com",
  projectId: "crud-7d8c1",
  storageBucket: "crud-7d8c1.appspot.com",
  messagingSenderId: "612998142635",
  appId: "1:612998142635:web:a3540545025c12cb3975ee",
  measurementId: "G-Z4D7FV3LBP"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
