import Vue from 'vue'
import App from './App.vue'

export const eventBox =   new Vue ()

new Vue({
  el: '#app',
  render: h => h(App)
})
