import Vue from 'vue';
import Router from 'vue-router'
import index from '../components/index/Index'
import login from '../components/Login'
import countDown from '../components/CountDown'
import MyTravel from "../components/myTravel/MyTravel";
Vue.use(Router)
// 页面刷新时，重新赋值token

const router = new Router({
  routes: [
    {path: '/index', name:'index',component:index,meta:{requireAuth:true}},
    {path: '/' , name:'',component: login},
    {path: '/countDown', name:'countDown',component:countDown},
    {path: '/myTravel', name:'myTravel',component:MyTravel},
  ],
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next();
  } else {
    let token = localStorage.getItem('token');
    if (token === null || token === '') {
      //  this.$alert("登录成功","提示",{
      //   confirmButtonText:"确定",
      //   callback: setTimeout => {
      //     this.$router.push({path:'/'})
      //   }
      // },1000)
      alert("没有权限","提示",{
        confirmButtonText:"确定",
        callback: setTimeout => {
          next("/")
        }
      },1000)
      //next('/');
    } else {
      next();
    }
  }
});

export default router


