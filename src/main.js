import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VeeValidatePlugin from './includes/validation'
import App from './App.vue'
import router from './router'
import { auth } from './includes/firebase'
import { registerSW } from "virtual:pwa-register"
// import { GlobalComponents } from "./includes/_globals"
import progressBar from './includes/progress-bar'
import "nprogress/nprogress.css"

import './assets/main.css'
import './assets/base.css'
import Icon from "./directives/icon"
import i18n from './includes/i18n'


registerSW({immediate: true})
progressBar(router)
let app

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)

    app.use(createPinia())
    app.use(router)
    app.use(VeeValidatePlugin)
    app.directive("icon", Icon)
    app.use(i18n)
    // app.use(GlobalComponents)

    app.mount('#app')
  }
})
