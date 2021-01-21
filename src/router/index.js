import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import login from '../views/login.vue'
import entregas from '../views/entregas.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      guest:true
    }
  },
  {
    path: '/Settings',
    name: 'Ajustes',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/login',
    name:'Login',
    component: login,
    meta:{
      guest:true
    }
  },
  {
    path:'/login',
    name:'Entregas',
    component: entregas,
    meta:{
      requiresAuth:true
    }
  }

]

const router = new VueRouter({
  routes
})

export default router
