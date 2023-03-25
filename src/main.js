import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VeeValidatePlugin from './includes/validation'
import App from './App.vue'
import router from './router'
import './includes/firebase'

import './assets/main.css'
import './assets/base.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VeeValidatePlugin)

app.mount('#app')
