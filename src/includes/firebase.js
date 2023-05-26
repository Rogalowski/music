import firebase from 'firebase/compat/app'
import 'firebase/auth'
import 'firebase/compat/firestore' // new database of firebase
// import { getFirestore } from 'firebase/firestore' //1
import 'firebase/compat/storage'

import { getAuth, updateProfile, createUserWithEmailAndPassword } from 'firebase/auth'
import { initializeFirestore, CACHE_SIZE_UNLIMITED } from "firebase/firestore";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_VUE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_VUE_APP_FIREBASE_AUTH_DOAMIN,
  projectId: import.meta.env.VITE_VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_VUE_APP_FIREBASE_MESSENGING_SENDER_ID,
  appId: import.meta.env.VITE_VUE_APP_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_VUE_APP_FIREBASE_MEASURMENT_ID
}

const app = firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = getAuth()
const storage = firebase.storage() 

// db.enablePresistance().catch((error) => {
//   console.log(`Firebase presistnace error ${error.code}`)
// }) 


//caching data firebase workbox ?? firebase ver9
// initializeFirestore(app, {localCache: persistentLocalCache(/*settings*/{})});

const usersCollection = db.collection('users')
const songsCollection = db.collection('songs')
const commentsCollection = db.collection('comments')

// export { auth, db }
export {
  db,
  auth,
  storage,
  updateProfile,
  songsCollection,
  createUserWithEmailAndPassword,
  usersCollection,
  commentsCollection
}
