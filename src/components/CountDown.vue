<template>
  <div>
    激活账户邮件已发送至您的邮箱，请查收！！！{{time}}秒后返回登陆页面
  </div>
</template>

<script>
  export default {
    data () {
      return{
        time:""//倒计时
      }
    },

    //页面初始化调用
    created() {
      this.countDown();
    },

    methods: {
      countDown () {
        const TIME_COUNT = 3;
        if(!this.timer){
          this.time = TIME_COUNT;
          this.timer = setInterval(() => {
            if(this.time > 0 && this.time <= TIME_COUNT){
              this.time--;
            }else{
              clearInterval(this.timer);
              this.$router.push("/");
            }
          },1000)
        }
      }
    }
  }
</script>

<style scoped>

</style>
