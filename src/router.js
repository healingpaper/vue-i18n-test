import VueRouter from 'vue-router'
import App from './App.vue'
import Vue from 'vue'


Vue.use(VueRouter)

const routes = [
  {
    name: 'root',
    path: '/:lang',
    component: App
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
