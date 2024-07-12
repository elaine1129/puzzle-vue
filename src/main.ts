import { createApp } from 'vue'
import router from './router'
// vuetify
import vuetify from './plugins/vuetify'
// Plugin
import alertPlugin from './plugins/alertPlugin'

import './assets/css/style.css'
import './assets/css/common.less'
import App from './App.vue'

createApp(App).use(router).use(vuetify).use(alertPlugin).mount('#app')
