import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    // 存储token
    token: localStorage.getItem('token') ? localStorage.getItem('token') : ''
  },
  /* actions: {
     changeLogin(ctx,Authorization){
       ctx.commit('changeLogin',Authorization);
     }
   },*/
  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin (state,token) {
      state.Authorization = token
      console.log("store/index.js---到这里了!");
      localStorage.setItem('token', token.token);
    }
  }
})

export default store


