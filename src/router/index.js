import Vue from 'vue';
import Router from 'vue-router'
import index from '../components/index/Index'
import login from '../components/Login'
import countDown from '../components/CountDown'
Vue.use(Router)


const router = new Router({
  routes: [
    {path: '/index', name:'index',component:index,meta:{requireAuth:true}},
    {path: '/' , name:'',component: login},
    {path: '/countDown', name:'countDown',component:countDown},
  ],
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next();
  } else {
    let token = localStorage.getItem('Authorization');

    if (token === 'null' || token === '') {
      next('/login');
    } else {
      next();
    }
  }

});
export default router

//导航守卫判断用户是否登陆

