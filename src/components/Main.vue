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
                <el-form style="margin-top: 20px" :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
                  <el-form-item prop="tel">
                    <el-input prefix-icon="el-icon-mobile-phone" placeholder="手机" v-model="ruleForm.tel"></el-input>
                  </el-form-item>
                  <div style="margin: 20px 0;"></div>
                  <el-form-item prop="email">
                    <el-input prefix-icon="el-icon-message" placeholder="邮箱" v-model="ruleForm.email"></el-input>
                  </el-form-item>
                  <div style="margin: 20px 0;"></div>
                  <el-form-item prop="password">
                    <el-input prefix-icon="el-icon-postcard" placeholder="密码" v-model="ruleForm.password"></el-input>
                  </el-form-item>
                  <div style="margin: 20px 0;"></div>
                  <el-form-item prop="password2">
                    <el-input prefix-icon="el-icon-postcard" placeholder="确认密码" v-model="ruleForm.password2"></el-input>
                  </el-form-item>
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
  import axios from 'axios'
  // const axiosInstance = axios.create({
  //   headers: {'Content-Type': 'application/json;charset=utf-8'},
  //   withCredentials: true
  // })

    export default {
      data () {
        //手机校验器
        var checkTel = (rule, value, callback) =>{
          if(!value){
            return callback(new Error("手机号码为空"))
          }
          setTimeout(()=>{
            if(!Number.isInteger(parseInt(value))){
              callback(new Error("手机号码格式不正确"))
            }else {
              var reg =/[0-9]{11}/
              if(!reg.test(value)){
                callback(new Error("请输入正确的手机号码"))
              }else{
                callback();
              }
            }
          },500);
        };
        //邮箱校验器
        var checkEmail = (rule, value, callback) => {
          if(!value){
            return callback(new Error("邮箱为空"))
          }else{
            var reg = /^[0-9a-zA-Z]+@\w+\.\w+$/;
            if(!reg.test(value)){
              callback(new Error("邮箱格式不正确"))
            }else{
              callback();
            }
          }
        };
        //密码校验器
        var checkPassword = (rule, value, callback) => {
          if(!value){
            return callback(new Error("密码为空"));
          }else{
            var reg = /^.{6,12}$/
            if(!reg.test(value)){
              callback(new Error("密码长度为6-12位"))
            }else{
              callback();
            }
          }
        };
        //确认密码校验器
        var checkPassword2 = (rule, value, callback) => {
          if(!value){
            callback(new Error("请确认密码"))
          }else{
            if(value !== this.ruleForm.password){
              callback(new Error("两次密码不一致"))
            }else{
              callback();
            }
          }
        };
        return {
          //图片
          imgList: [
            {id:0,idView:require("../assets/1.jpg")},
            {id:0,idView:require("../assets/2.jpg")},
            {id:0,idView:require("../assets/3.jpg")}
          ],
          url: "/travel/getVerify",
          //表单数据
          ruleForm:{
            tel: "",
            email: "",
            password: "",
            password2: "",
            val:""
          },
          //校验规则
          rules:{
            tel:[
              {validator: checkTel, trigger: blur}
            ],
            email:[
              {validator: checkEmail, trigger: blur}
            ],
            password:[
              {validator: checkPassword, trigger: blur}
            ],
            password2:[
              {validator: checkPassword2, trigger: blur}
            ]
          }
        }
      },

      methods:{
        submitForm(formName){
          this.$refs[formName].validate((valid) => {

            if(valid){
              //alert("submit")
              axios.post('/register',{
                user: this.ruleForm
              }).then(function (response) {
                console.log(response)
              }).catch(function (error) {
                console.log(error)
              })
            }else{
              //alert("error")
              return false;
            }
          })
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
