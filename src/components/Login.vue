<template>
  <div class="login">
    <Header/>
    <Main/>
    <Footer/>
  </div>
</template>

<script>
  import axios from 'axios'
  import Header from './Header'
  import Main from './Main'
  import Footer from './Footer'
  const axiosInstance = axios.create({
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    withCredentials: true
  })
export default {
   data () {
     return {
        imgList:[
          {id: 1,idView: '../assets/images/1.jpg'}
        ]
     }
   },

  methods: {

  },

  components:{Header,Main,Footer}


}
</script>

<style scoped>
  .login{
    background: url("../assets/3.jpg");
    width: 100%;
    height: 100%;
    position:fixed;
  }
</style>
