import { defineStore } from 'pinia'
import {
  usersCollection,
  auth,
  createUserWithEmailAndPassword,
  updateProfile
} from '@/includes/firebase'

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

          this.userLoggedIn = true
          console.log('this.userStore.userLoggedIn: ', this.userLoggedIn)

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
    }
  }
})
