import Vue from 'vue'
import VueRouter from 'vue-router'

import login from '../views/login.vue'
import logout from '../views/logout.vue'
import entregas from '../views/entregas.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:{
      name:"login"
    }
  },
  {
    path: '/login',
    name:'login',
    component: login,
    meta:{
      guest:true
    }
  },
  {
    path:'/entregas',
    name:'entregas',
    component: entregas,
    beforeEnter:(to,from,next)=>{
        if(!localStorage.token){
          next(false);
        }else{
          next();
        }
    },
    meta:{
      requiresAuth:true
    }
  },
  {
    path:'/logout',
    name:'logout',
    component: logout,
    beforeEnter:(to,from,next)=>{
        if(!localStorage.token){
          next(false);
        }else{
          next();
        }
    },
    meta:{
      requiresAuth:true
    }
  }

]

const router = new VueRouter({
  routes
  mode:"history"
})

export default router
