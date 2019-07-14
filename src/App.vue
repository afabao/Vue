<template>
    <div>
      <router-view></router-view>
    </div>
</template>

<script>
  import Login from './components/Login'
  import Index from './components/index/Index'
  import countDown from './components/CountDown'
export default {
  components: {Login,Index,countDown}

}
</script>

<style scoped>

</style>
