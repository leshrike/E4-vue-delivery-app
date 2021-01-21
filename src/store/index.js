import Vue from 'vue'
import Vuex from 'vuex'
import apiService from '../apiService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    
      user:[],
      token: "",
  
  },
  
  mutations: {

    login(state,user){

      state.token = user.token;
      localStorage.token = user.token;
      localStorage.name = user.name;

    }
  },
  
  actions: {

    login(context,user){
      apiService.user
      .login(user)
      .then((response)=>{
        alert(response[0].token)  
        context.commit('login',response[0]);
          
      })
      .catch((error)=>{
          alert(error.message || error.status || error);
      })
    },
  },
  
  modules: {
  },
  
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status
  }
})
