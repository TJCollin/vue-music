import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import fastclick from 'fastclick'
import './common/stylus/index.styl'

import router from './router'

fastclick.attach(document.body)

new Vue({
  el: '#app',
  render: h => h(App),
  router
})
