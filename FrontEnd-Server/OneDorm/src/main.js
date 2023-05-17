import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import './assets/main.css'

const app = createApp(App)
app.use(VueCookies, { 
    expires: '1d'
  })
// const $cookies = inject('$cookies');

app.use(createPinia())

app.use(router)

app.mount('#app')
