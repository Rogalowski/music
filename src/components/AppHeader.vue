<script>
import { mapStores, mapWritableState } from 'pinia'
import useModalStore from '@/stores/modal'
import useUserStore from '@/stores/user'

export default {
  name: 'AppHeader',
  computed: {
    ...mapStores(useModalStore, useUserStore),
    ...mapWritableState(useModalStore, ['isOpen']),
    currentLocale() {
      return this.$i18n.locale === "pl" ? "Polski" : "English"
    }
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
    },
    changeLocale() {
      this.$i18n.locale = this.$i18n.locale === "pl" ? "en" : "pl"
    }
  }
}
</script>

<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container flex items-center justify-start px-4 py-5 mx-auto">
      <!-- App Name -->
      <router-link
      class="mr-4 text-2xl font-bold text-white uppercase"
      :to="{name: 'home', path: ''}"
      :exact-active-class="no-active">
        Music</router-link>

      <div class="flex items-center flex-grow">
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
            <router-link class="px-2 text-white " to="/manage">Manage</router-link>
          </li>
          <li >
            <!-- <a class="px-2 text-white" @click.prevent="userStore.signout"  -->
            <a class="px-2 text-white" @click.prevent="signOut"
            href="#">Logout</a>
          </li>

          </template>
          <li >
            <router-link class="mr-4 text-white" to="/about">
        About</router-link>
          </li>
        </ul>
        <ul class="ml-auto">
            <li>
              <a class="px-2 text-white" href="#" @click.prevent="changeLocale">
                {{ currentLocale }}
              </a>
            </li>
          </ul>
      </div>
    </nav>
  </header>
</template>
