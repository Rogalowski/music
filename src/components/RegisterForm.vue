<script>
import useModalStore from '@/stores/modal'
import { mapState, mapWritableState } from 'pinia'
// import { mapMutations, mapState } from 'vuex'
import firebase from "@/includes/firebase"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
  name: 'RegisterForm',
  data() {
    return {
      registerSchema: {
        name: 'required|min:3|max:100|alphaSpaces',
        email: 'required|min:3|max:22|email',
        age: 'required|min_value:18|max_value:100',
        password: 'required|min:8|max:64|excluded:password',
        // confirm_password: 'confirmed:@password',
        confirm_password: 'passwords_mismatch:@password',
        // country: 'required|excluded:Antarctica',
        country: 'required|country_excluded:Antarctica',
        // tos: 'required'
        tos: 'tos'
      },
      userData:{
        country: 'USA',
      },
      reg_in_submission: false, // If the registration form is in submission, we'll want to disable the form if the request is still processing.
      reg_show_alert: false, // Initially, we will want to hide the alert box.
      reg_alert_variant: "bg-blue-500", //  indicate the form submission is in progress.
      reg_alert_msg: "Please wait! Account is being created"
    }
  },

  methods: {
    register(values) {
      this.reg_show_alert = true
      this.reg_in_submission = true
      this.reg_alert_variant = "bg-blue-500"
      this.reg_alert_msg = "Please wait! Account is being created"


    try{



const auth = getAuth();
createUserWithEmailAndPassword(auth, values.email, values.password)
  .then((userCredential) => {
    // Signed in
    const userCred = userCredential.user
    console.log("userCred: ", userCred)
    // ...
  })


      // const userCred =  firebase.auth().createUserWithEmailAndPassword(
      //   values.auth, values.email, values.password
      // )
    } catch (error) {
      this.reg_in_submission = false;
      this.reg_alert_msg = 'bg-red-500'
      this.reg_alert_msg = 'An unexpected error appeard'
      return
    }

      this.reg_alert_variant = "bg-green-500"
      this.reg_alert_msg = "Success! Account has been created"
      console.log("values: ", values)

    }
  }
}
</script>


<template>
          <!-- Registration Form -->
          <div class="text-white text-center font-bold p-4 rounded mb-4"
          v-if="reg_show_alert"
          :class="reg_alert_variant">
          {{  reg_alert_msg }}
        </div>
        <!-- v-show="tab === 'register'" -->
          <vee-form  :validation-schema="registerSchema"
            @submit="register" :initial-values="userData">
            <!-- Name -->
            <div class="mb-3">
              <label class="inline-block mb-2">Name</label>
              <vee-field
                type="text"
                name="name"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Name"
                :rule="{ required: true }"
              />
              <ErrorMessage class="text-red-600" name="name" />
            </div>
            <!-- Email -->
            <div class="mb-3">
              <label class="inline-block mb-2">Email</label>
              <vee-field
                type="email"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Email"
                name="email"
                :rule="{ required: true }"
              />
              <ErrorMessage class="text-red-600" name="email" />
            </div>
            <!-- Age -->
            <div class="mb-3">
              <label class="inline-block mb-2">Age</label>
              <vee-field
                type="number"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                name="age"
              />
              <ErrorMessage class="text-red-600" name="age" />
            </div>
            <!-- Password -->
            <div class="mb-3">
              <label class="inline-block mb-2">Password</label>
              <vee-field
                name="password"
                type="password"
                :bails="false"
                v-slot="{ field, errors }"
              >
              <input
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Password"
                type="password"
                v-bind="field"
              />
              <div class="text-red-600" v-for="error in errors" :key="error">
              {{ error }}
              </div>
              </vee-field>
              <ErrorMessage class="text-red-600" name="password" />
            </div>
            <!-- Confirm Password -->
            <div class="mb-3">
              <label class="inline-block mb-2">Confirm Password</label>
              <vee-field
                name="confirm_password"
                type="password"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Confirm Password"
              />

            </div>
            <!-- Country -->
            <div class="mb-3">
              <label class="inline-block mb-2">Country</label>
              <vee-field as="select"
                name="country"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              >
                <option value="USA">USA</option>
                <option value="Mexico">Mexico</option>
                <option value="Germany">Germany</option>
                <option value="Antarctica">Antarctica</option>
              </vee-field>
              <ErrorMessage class="text-red-600" name="country" />
            </div>

            <!-- TOS -->
            <div class="mb-3 pl-6">
              <vee-field
              name="tos"
              type="checkbox"
              value="1"
              class="w-4 h-4 float-left -ml-6 mt-1 rounded" />
              <label class="inline-block">Accept terms of service</label>
            </div>
            <ErrorMessage class="text-red-600" name="tos" />
            <button
              type="submit"
              class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
              :disabled="reg_in_submission"
              >
              Submit
            </button>
          </vee-form>

</template>