<script>
import { mapActions } from 'pinia'
import useUserStore from "@/stores/user"

export default {
  name: 'LoginForm',
  data() {
    return {
      loginSchema: {
        email: 'required|min:3|max:22|email',
        password: 'required|min:8|max:64|excluded:password'
  },
  login_in_submission: false, // If the registration form is in submission, we'll want to disable the form if the request is still processing.
  login_show_alert: false, // Initially, we will want to hide the alert box.
  login_alert_variant: "bg-blue-500", //  indicate the form submission is in progress.
  login_alert_msg: "Please wait! We are logging you in"
}
  },
  methods: {
    ...mapActions(useUserStore, ['authenticate']),
    async login(values) {
      this.login_show_alert = true
      this.login_in_submission = true
      this.login_alert_variant = "bg-blue-500"
      this.login_alert_msg = "Please wait! We are logging you in"

      console.log(
        'authenticate values1: ',
        this.authenticate(values)
      )
      try {
      await this.authenticate(values)

      } catch(error) {

        this.login_in_submission = false
        this.login_alert_variant = "bg-red-500"
        this.login_alert_msg = "Invalid login, please try again!"
        return
      }

      this.login_alert_variant = "bg-green-500"
      this.login_alert_msg = "Success! You are logged in"

      console.log("Login values: ",values)
      window.location.reload()
    }
  }
    }

</script>


<template>
    <div class="text-white text-center font-bold p-4 rounded mb-4"
          v-if="login_show_alert"
          :class="login_alert_variant">
          {{  login_alert_msg }}
        </div>
          <!-- Login Form -->
          <!-- v-show="tab === 'login'" -->
          <vee-form
          :validation-schema="loginSchema"
          @submit="login">
            <!-- Email -->
            <div class="mb-3">
              <label class="inline-block mb-2">Email</label>
              <vee-field
                type="email"
                name="email"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Email"
              />
              <ErrorMessage class="text-red-600" name="email" />
            </div>
            <!-- Password -->
            <div class="mb-3">
              <label class="inline-block mb-2">Password</label>
              <vee-field
                type="password"
                name="password"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Password"
              />
              <ErrorMessage class="text-red-600" name="password" />
            </div>
            <button
              type="submit"
              :disabled="login_in_submission"
              class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
            >
              Submit
            </button>
          </vee-form>
</template>