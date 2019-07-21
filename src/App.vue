<template>
    <div>
      <router-view></router-view>
    </div>
</template>

<script>
  import Login from './components/Login'
  import Index from './components/index/Index'
  import countDown from './components/CountDown'
  import MyTravel from './components/myTravel/MyTravel'
export default {
  components: {Login,Index,countDown,MyTravel}
}
</script>

<style scoped>

</style>
