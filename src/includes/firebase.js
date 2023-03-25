import firebase from 'firebase/compat/app'
import 'firebase/auth'
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

export default firebase.initializeApp(firebaseConfig)
