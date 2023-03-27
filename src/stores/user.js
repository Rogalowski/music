import { defineStore } from 'pinia'
import { usersCollection, auth, createUserWithEmailAndPassword } from '@/includes/firebase'

export default defineStore('user', {
  state: () => ({
    userLoggedIn: false
  }),
  actions: {
    async register(values) {
      await createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          const userCred = userCredential.user
          console.log('userCred: ', userCred)

          this.reg_alert_variant = 'bg-green-500'
          this.reg_alert_msg = 'Success! Account has been created'
          console.log('values: ', values)
          console.log('this.userStore.userLoggedIn: ', this.userLoggedIn)
        })
        .catch((error) => {
          this.reg_in_submission = false
          this.reg_alert_variant = 'bg-red-500'
          this.reg_alert_msg = `${error.code}`
          console.log('ERROR: ', error.message, error.code)
        })

      await usersCollection.add({
        name: values.name,
        email: values.email,
        age: values.age,
        country: values.country
      })

      this.userLoggedIn = true
    }
  }
})
