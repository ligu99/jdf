import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import * as filters from './utils/filters.js'

import "./assets/css/reset.css"
import './assets/css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/global.min.css'

Vue.use(ElementUI, { size: 'small' })

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
