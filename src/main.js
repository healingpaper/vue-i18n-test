import Vue from 'vue'
import App from './App.vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

new Vue({
  el: '#app',
  render: h => h(App)
})
