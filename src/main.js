import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import 'vue-select/dist/vue-select.css';
import './style.css';
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
