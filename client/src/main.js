import Vue from 'vue'
import App from './App.vue'
import store from "./store"
import router from './router'
import Vuelidate from "vuelidate"
const VueUploadComponent = require('vue-upload-component')


Vue.component('file-upload', VueUploadComponent)
Vue.use(Vuelidate)
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')


