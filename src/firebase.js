// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8VlKbZzzs8NgtuDDpi_76lgNbHaqKBoU",
  authDomain: "resoluteai-task-management.firebaseapp.com",
  projectId: "resoluteai-task-management",
  storageBucket: "resoluteai-task-management.appspot.com",
  messagingSenderId: "1088408637878",
  appId: "1:1088408637878:web:b5fb2a4b2d9e735f863117"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export default db;
export { auth };