<script>
import { mapStores, mapState, mapWritableState } from 'pinia'
import useModalStore from '@/stores/modal'
import useUserStore from '@/stores/user'

export default {
  name: 'AppHeader',
  computed: {
    ...mapStores(useModalStore, useUserStore),
    ...mapWritableState(useModalStore, ['isOpen'])
  },
  methods: {
    toggleAuthModal() {
      this.modalStore.isOpen = !this.isOpen // to jest to samo
      console.log("this.modalStore.isOpen ", this.modalStore.isOpen)
    },
    signOut() { //redirect user after logout
      this.userStore.signout()
      console.log("this.$routert ", this.$router)
      // if (this.$route.name === 'manage') {
      if (this.$route.meta.requiresAuth) {
        this.$router.push({name: 'home', replace: true})
        // window.location.reload()
      }
    }
  }
}
</script>

<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link
      class="text-white font-bold uppercase text-2xl mr-4"
      :to="{name: 'home', path: ''}"
      :exact-active-class="no-active">
        Music</router-link>

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li v-if="!userStore.userLoggedIn ">
            <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal"
              >Login / Register</a
            >
          </li>
          <template v-else >
            <li >
            <router-link class="  px-2 text-white" to="/manage">Manage</router-link>
          </li>
          <li >
            <!-- <a class="px-2 text-white" @click.prevent="userStore.signout"  -->
            <a class="px-2 text-white" @click.prevent="signOut"
            href="#">Logout</a>
          </li>

          </template>
          <li >
            <router-link class="text-white    mr-4" to="/about">
        About</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
