import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// all of it should be moved to .env file but it won't work for reviewing
const firebaseConfig = {
  apiKey: "AIzaSyB7P2VyfCOfAafVDywdT3p8-7aMnXyNgXI",
  authDomain: "sora-ae45f.firebaseapp.com",
  databaseURL: "https://sora-ae45f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "sora-ae45f",
  storageBucket: "sora-ae45f.appspot.com",
  messagingSenderId: "94900345181",
  appId: "1:94900345181:web:004dbd7ffa75f6f06470b4",
  measurementId: "G-BD5LCR415Y"
}

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)