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
    // alias: '/manage',
    name: 'manage',
    component: ManageView
  },
  {
    path: '/manage',
    // redirect: '/manage-music'
    redirect: { name: 'manage' }, // lepiej tego uzywac
    beforeEnter: (to, from, next) => {
      //Manage Route Guard
      next()
    }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
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

router.beforeEach((to, from, next) => {
  next()
}) //checking auth user and let them to some site. Global Guard

export default router
