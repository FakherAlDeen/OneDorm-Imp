import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import './assets/main.css'
import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)
app.use(vue3GoogleLogin, {
  clientId: '1004647144378-1egaeb5a1q63ihqv5tb8pv4s82ogpn83.apps.googleusercontent.com'
})
app.use(VueCookies, { 
    expires: '1d'
  })
// const $cookies = inject('$cookies');

app.use(createPinia())

app.use(router)

app.mount('#app')
