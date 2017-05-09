// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'

import './assets/stylus/index.styl'

// Vue.config.productionTip = false
Vue.prototype.$http = axios

// axios.create({
//     headers: {'content-type': 'application/x-www-form-urlencoded'}
// })
// Vue.prototype.$ajax = axios
// var ob = new Vue()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
