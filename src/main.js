import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'
Vue.use(require('vue-wechat-title'))
Vue.config.productionTip = false
axios.defaults.baseURL='http://127.0.0.1:8888/'
axios.interceptors.request.use(config =>{
  console.log(config)
  config.headers.Authorization =window.sessionStorage.getItem('token')
  //最后必须return config
  return config
})
Vue.prototype.$http =axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
