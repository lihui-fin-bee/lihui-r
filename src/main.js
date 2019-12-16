import Vue from 'vue'
import mixin from './utils/mixin'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import 'amfe-flexible'
import './assets/reset.scss'
import 'normalize.css'

import '@/icons' // icon
import '@/permission' // permission control
Vue.mixin(mixin)
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
