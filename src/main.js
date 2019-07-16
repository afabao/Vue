import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import router from './router/index'
import store from './store'
import a from 'vue-infinite-scroll'
import InfiniteLoading from 'vue-infinite-loading';
import { InfiniteScroll } from 'mint-ui'
Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api'  //关键代码

Vue.use (InfiniteScroll)
Vue.use(ElementUI)
Vue.use(InfiniteLoading)
new Vue({
  el: '#app',
  router: router,
  store,
  components:{App},
  template: '<App/>',
  mode: 'history'
});

//异步请求前在header里加入token
axios.interceptors.request.use(function(config){
  config.headers.token=localStorage.getItem("token");
  return config;
})
//异步请求后，判断token是否过期
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if(error.response){
      switch (error.response.status) {
        case 401:
          localStorage.removeItem("token");
          this.$router.push("/");
      }
    }
  });
  //异步请求前判断请求的连接是否需要token
  router.beforeEach((to, from, next) => {
    if (to.path === '/') {
      next();
    } else {
      let token = localStorage.getItem('token');
      console.log("我是浏览器本地缓存的token: "+token);
      if (token === 'null' || token === '') {
        next('/');
      } else {
        next();
      }
    }
  });


