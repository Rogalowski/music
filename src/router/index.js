import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '@/views/HomeView.vue'
// import AboutView from '@/views/AboutView.vue'
// import ManageView from '@/views/ManageView.vue'
// import SongView from '@/views/SongView.vue'
import useUserStore from '@/stores/user'

const HomeView = () => import("@/views/HomeView.vue") //chuncked route optimization
const AboutView = () => import("@/views/AboutView.vue") //chuncked route optimization
const ManageView = () => import("@/views/ManageView.vue") //chuncked route optimization
const SongView = () => import("@/views/SongView.vue") //chuncked route optimization

const routes = [
  {
    name: 'home',
    path: '/',
    component: HomeView
  },
  {
    name: 'manage',
    path: '/manage-music',
    // alias: '/manage',
    component: ManageView,
    meta: {
      requiresAuth: true
    },
    beforeEnter(to, from, next) {
      //Manage Route Guard
      next()
    }
  },
  {
    path: '/manage',
    // redirect: '/manage-music'
    redirect: { name: 'manage' } // lepiej tego uzywac
  },
  {
    name: 'about',
    path: '/about',
    component: AboutView
  },
  {
    name: 'song',
    path: '/song/:id',
    component: SongView
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
  if (!to.meta.requiresAuth) {
    next()
    return
  }
  console.log('to.meta: ', to.meta)
  const store = useUserStore()

  if (store.userLoggedIn) {
    next()
  } else {
    next({ name: 'home' })
    // next() // non comon way, please use meta
  }
})
//checking auth user and let them to some site. Global Guard

export default router
