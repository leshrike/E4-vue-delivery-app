import Vue from 'vue'
import Vuex from 'vuex'
import apiService from '../apiService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //recibimos todos los datos necesarios para la app y los almacenamos

    orders: [],
    user: {},
    states: [],
    token: "",

  },

  mutations: {

    setOrders(state, orders) {

      state.orders = orders;

    },

    setStates(state, states) {

      state.states = states;

    },

    login(state, token) {

      state.token = token;
      localStorage.token = token;

    },

    enRutaState(state) {

      state.orders.forEach(delivery => {
        delivery.state = "1";

      });

    },

    changeDelivery(state, delivery) {

      const index = state.orders.findIndex(item => item.id === delivery.id)
      if (index >= 0) state.orders.splice(index,1,delivery);

    },

    logout(state) {

      state.token = "";
      localStorage.token = "";
      localStorage.name = "";

    }
  },

  actions: {

    changeDelivery(context, delivery) {

      apiService.orders.modify(delivery)
        .then((response) => {
          context.commit('changeDelivery', response.data.data)
        })
        .catch((error) => {
          alert(error || error.message);
        })
    },

    loadStates(context) {
      return new Promise ((resolve)=>{
      apiService.states.getAll()
        .then((response) => {
          context.commit('setStates', response.data.data);
          resolve(response.data);
          
          })
        .catch((err) => {
          alert(err.message || err);
        })
      })
    },

    loadOrders(context) {
      apiService.orders
        .getAll()
        .then((response) => {
          context.commit('setOrders', response.data.data);
        })
        .catch((err) => {
          alert(err.message || err)
        })
    },

    login(context, user) {
      apiService.users.login(user)
        .then((response) => {
          context.commit('login', response);
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
      return state.orders.find(orders => orders.order === order);
    }
  }
})
