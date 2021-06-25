import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'

FastClick.attach(document.body)

createApp(App).use(store).use(router).mount('#app')
