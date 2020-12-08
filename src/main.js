// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import $ from 'jquery'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import VueResource from 'vue-resource'
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueResource)
Vue.use(Vant)
import router from './router'
import App from './App'
Vue.prototype.$axios = axios;
axios.defaults.withCredentials = true
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
