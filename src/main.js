import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import fastclick from 'fastclick'
import './common/stylus/index.styl'
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad, {
  loading: require('common/image/default.png')
})

import router from './router'

fastclick.attach(document.body)

new Vue({
  el: '#app',
  render: h => h(App),
  router
})
