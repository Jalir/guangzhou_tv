import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './assets/css/normalize.css'
import './assets/css/common.less'
import VueClipboard from 'vue-clipboard2'
// import 'video.js/dist/video-js.css'
// import videojs from 'video.js'

axios.defaults.baseURL = 'http://1.12.63.60:5000'
// axios.defaults.baseURL = 'http://43.154.30.136:2121'
// axios.defaults.baseURL = 'https://gzapi2.jalir.xyz'
// axios.defaults.baseURL = 'http://gzapi.jalir.xyz:2121'

// axios.defaults.baseURL = 'http://localhost:2121'
// Vue.prototype.$videojs = videojs
Vue.prototype.$http = axios
Vue.use(VueClipboard)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// console.log(Vue.prototype)
