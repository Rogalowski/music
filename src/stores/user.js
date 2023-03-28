import { defineStore } from 'pinia'
import {
  usersCollection,
  auth,
  createUserWithEmailAndPassword,
  updateProfile
} from '@/includes/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default defineStore('user', {
  state: () => ({
    userLoggedIn: false
  }),
  actions: {
    register(values) {
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          let userCredi = userCredential.user
          console.log('userCredi: ', userCredi)

          usersCollection.doc(userCredi.uid).set({
            name: values.name,
            email: values.email,
            age: values.age,
            country: values.country
          })

          updateProfile(userCredi, {
            displayName: values.name
          })
        })
        .catch((error) => {
          this.reg_in_submission = false
          this.reg_alert_variant = 'bg-red-500'
          this.reg_alert_msg = `${error.code}`
          console.log('ERROR: ', error.message, error.code)
        })
      this.userLoggedIn = true
      console.log('this.userStore.userLoggedIn: ', this.userLoggedIn)
    },
    async authenticate(values) {
      await signInWithEmailAndPassword(auth, values.email, values.password)

      console.log('signInWithEmailAndPassword: ', auth)
      this.userLoggedIn = true
    },
    async signout() {
      console.log(auth.signOut())
      await auth.signOut()
      this.userLoggedIn = false
    }
  }
})
