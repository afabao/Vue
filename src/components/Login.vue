<template>
  <div class="login">
    <Header/>
    <Main/>
    <Footer/>
  </div>
</template>

<script>
  import Header from './Header'
  import Main from './Main'
  import Footer from './Footer'
export default {
   data () {
     return {

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
