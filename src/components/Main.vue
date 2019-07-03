<template>
  <div class="main">
    <div class="left">
      aa
    </div>
    <div class="right">
      aa
    </div>
  </div>
</template>

<script>
    export default {}
</script>

<style scoped>
  .main{
    background-color: white;
    width: 1000px;
    height: 500px;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%,-50%);
    -moz-transform: translate(-50%,-50%);
    -o-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    border: lightgray solid 1px;
    border-radius: 5px;
  }
  .left{
    height: 500px;
    width: 500px;
    border-right: lightgray solid 1px;
  }
  .right{
    height: 500px;
    width: 500px;
  }
</style>
