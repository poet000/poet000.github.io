import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import( '@/views/Home/Home.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import( '@/views/AboutView.vue')
  },
  {
    path: '/TextAdventure/gndmx',
    name: 'gndmx',
    component: () => import( '@/components/TextAdventure.vue')
  },
  {
    path: '/TextAdventure/hldmx',
    name: 'hldmx',
    component: () => import( '@/components/TextAdventure.vue')
  },
  {
    path: '/ADFk',
    name: 'ADFk',
    component: () => import( '@/components/ADFk.vue')
  },
  {
    path: '/Tips',
    name: 'Tips',
    component: () => import( '@/components/Tips.vue')
  },
  {
    path: '/Join',
    name: 'Join',
    component: () => import( '@/components/Join.vue')
  },
  {
    path: '/Collaborate',
    name: 'Collaborate',
    component: () => import( '@/components/Collaborate.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
