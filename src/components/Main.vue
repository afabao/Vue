<template>
<!--  <div class="main">-->
<!--    <div class="left">-->
<!--      <div class="tab">-->
<!--        <div class="tab-left">-->
<!--          <p>登陆</p>-->
<!--        </div>-->
<!--        <div class="tab-right">-->
<!--          <p>注册</p>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="right">-->
<!--      <div>a</div>-->
<!--    </div>-->
<!--  </div>-->
  <div>
    <el-row :gutter="20">
      <el-col :span="6" :offset="3">
        <div class="grid-content bg-purple">
          <div class="tab">
            <el-tabs type="border-card" style="height: 500px" :stretch="true">
              <el-tab-pane label="登陆">
                <el-form style="margin-top: 50px">
                  <el-input prefix-icon="el-icon-mobile-phone" placeholder="手机/邮箱"></el-input>
                  <div style="margin: 20px 0;"></div>
                  <el-input prefix-icon="el-icon-picture" placeholder="图片验证码" style="width: 150px"></el-input>
                  <div style="margin: 20px 0;"></div>
                  <el-input prefix-icon="el-icon-picture" placeholder="手机验证码" style="width: 150px"></el-input>
<!--                  <img src="http://localhost:8080/travel/getVerify" alt="aaa">-->
                  <br/>
                  <div style="margin: 20px 0;"></div>
                  <el-link type="primary" >忘记密码?</el-link>
                  <div style="margin: 20px 0;"></div>
                  <el-form-item >
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
              <el-tab-pane label="注册">
                <el-form style="margin-top: 20px">
                  <el-input prefix-icon="el-icon-mobile-phone" placeholder="手机"></el-input>
                  <div style="margin: 20px 0;"></div>
                  <el-input prefix-icon="el-icon-message" placeholder="邮箱"></el-input>
                  <div style="margin: 20px 0;"></div>
                  <el-input prefix-icon="el-icon-postcard" placeholder="密码" ></el-input>
                  <div style="margin: 20px 0;"></div>
                  <el-input prefix-icon="el-icon-postcard" placeholder="确认密码" ></el-input>
                  <div style="margin: 20px 0;"></div>
                  <div>
                    <div style="float: left">
                      <el-input prefix-icon="el-icon-picture" placeholder="手机验证码" style="width: 150px"></el-input>
                    </div>
                    <div style="float: right">
                      <img src="http://localhost:8080/travel/getVerify" alt="aaa">
                    </div>
                  </div>
                  <br/>
                  <div style="margin: 10px 0;"></div>
                  <div style="clear: both">
                    <el-link type="primary" style="float: bottom">条款</el-link><br/>
                    <el-checkbox v-model="checked">已阅读</el-checkbox>
                  </div>
                  <div style="margin: 20px 0;"></div>
                  <el-form-item >
                    <el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-col>
      <el-col :span="13" :offset=".5">
        <div class="grid-content ">
          <el-carousel :interval="5000"  arrow="always" height="500px">
            <el-carousel-item v-for="item in imgList" :key="item.id">
              <img :src="item.idView" alt="" class="carousel-image">
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
      data () {
        return {
          imgList: [
            {id:0,idView:require("../assets/1.jpg")},
            {id:0,idView:require("../assets/2.jpg")},
            {id:0,idView:require("../assets/3.jpg")}
          ],
          url: "/travel/getVerify"
        }
      }
    }
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
  .tab-left{
    float: left;
    text-align: center;
    width: 126.5px;
    height: 50px;
    line-height: 25px;
  }
  .tab-right{
    display: inline-block;
    background-color: aqua;
    width: 126.5px;
    text-align: center;
    height: 50px;
    line-height: 25px;
  }
  .tab{
    width: 350px;
    height: 50px;
    border-bottom: lightgray solid 1px;
  }
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: white;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 500px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .carousel-image{
    max-width: 110%;
    height-width: 100%;
  }
</style>
