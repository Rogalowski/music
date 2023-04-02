import firebase from 'firebase/compat/app'
import 'firebase/auth'
import 'firebase/compat/firestore' // new database of firebase
// import { getFirestore } from 'firebase/firestore' //1
import 'firebase/compat/storage'

import { getAuth, updateProfile, createUserWithEmailAndPassword } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyBBxCKb8A--uc_vGRYtge_uqbMBGBpT2m4',
  authDomain: 'musicvue-4bd0f.firebaseapp.com',
  projectId: 'musicvue-4bd0f',
  storageBucket: 'musicvue-4bd0f.appspot.com',
  messagingSenderId: '455057842814',
  appId: '1:455057842814:web:db085b8b88bb1a8891ae2f',
  measurementId: 'G-Z3GNXXEL91'
}

const app = firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = getAuth()
const storage = firebase.storage()
// const db = getFirestore(app) //1

const usersCollection = db.collection('users')
const songsCollection = db.collection('songs')

// export { auth, db }
export {
  db,
  auth,
  storage,
  updateProfile,
  songsCollection,
  createUserWithEmailAndPassword,
  usersCollection
}
