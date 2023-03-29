import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.scss'
import { router } from './router'
import './game'

const app = createApp(App)
app.use(router)
app.mount('#app')
