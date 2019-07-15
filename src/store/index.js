import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state:{
    token:''
  },
  mutations: {
    set_token(state, token) {
      console.log(state)
      console.log(token)
      state.token = token
      localStorage.setItem('token',token.token);
      console.log(localStorage.getItem('token'));
    },
  }
  })


