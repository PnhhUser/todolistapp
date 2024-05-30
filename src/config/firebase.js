// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpV8YIC96WF-HbNpuD67YQhEbk9z_5Ufc",
  authDomain: "todolistapp-8de23.firebaseapp.com",
  projectId: "todolistapp-8de23",
  storageBucket: "todolistapp-8de23.appspot.com",
  messagingSenderId: "681810261658",
  appId: "1:681810261658:web:1c2d1e213719cf456dd123",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
