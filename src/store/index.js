import Vue from 'vue'
import Vuex from 'vuex'
import apiService from '../apiService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //recibimos todos los datos necesarios para la app y los almacenamos

    deliveries: [],
    user: {},
    states: [],
    //
    token: "",

  },

  mutations: {

    setOrders(state, deliveries) {

      state.deliveries = deliveries;

    },

    setStates(state, states) {

      state.states = states;

    },

    login(state, user) {

      state.token = user.token;
      localStorage.token = user.token;

    },

    enRutaState(state) {

      state.deliveries.forEach(delivery => {
        delivery.state = "1";

      });

    },

    changeDelivery(state, delivery) {

      const index = state.deliveries.findIndex(item => item.id === delivery.id)
      if (index >= 0) state.deliveries.splice(index,1,delivery);

    },

    logout(state) {

      state.token = "";
      localStorage.token = "";
      localStorage.name = "";

    }
  },

  actions: {

    changeDelivery(context, delivery) {

      apiService.deliveries
        .modify(delivery)
        .then((response) => {
          context.commit('changeDelivery', response.data)
        })
        .catch((error) => {
          alert(error || error.message);
        })
    },

    loadStates(context) {
      return new Promise ((resolve)=>{
      apiService.states
        .getAll()
        .then((response) => {
          context.commit('setStates', response.data);
          resolve(response.data);
          
          })
        .catch((err) => {
          alert(err.message || err);
        })
      })
    },

    loadOrders(context) {
      apiService.deliveries
        .getAll()
        .then((response) => {
          context.commit('setOrders', response.data);
        })
        .catch((err) => {
          alert(err.message || err)
        })
    },

    login(context, user) {
      apiService.user
        .login(user)
        .then((response) => {
          context.commit('login', response[0]);
        })
        .catch((error) => {
          alert(error.message || error.status || error);
        })
    },

    enRutaState(context) {
      context.commit('enRutaState');
    },
  },
  
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,

    //con este getter conseguimos obtener el estado concreto de un pedido 
    getState: (state) => (id) => {
      return state.states.find(state => state.id === id);
    },

    getDeliveryWithOrder:(state)=> (order)=> {
      return state.deliveries.find(deliveries => deliveries.order === order);
    }
  }
})
