import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import ManageView from '@/views/ManageView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/manage-music',
    name: 'manage',
    component: ManageView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/manage',
    redirect: '/manage-music'
    // redirect: { name: 'manage' } // lepiej tego uzywac
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' }
    // redirect: { name: 'manage' } // lepiej tego uzywac
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-purple-500'
})

export default router
