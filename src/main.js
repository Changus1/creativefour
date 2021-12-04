import Vue from 'vue'
import App from './App.vue'
import router from './router'
import mock from './mock-data.js'
import banner from './banner-data.js'

let data = {
  products: mock,
  favorites: [],
  spotlights: mock,
  banners: banner,
}

new Vue({
  router,
  data,
  render: h => h(App)
}).$mount('#app')