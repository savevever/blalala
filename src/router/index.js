import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../page/homepage.vue';
import Setting from '../page/account-setting.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/Setting',
    name: 'about',
    component: Setting
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
