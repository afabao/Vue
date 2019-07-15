<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6" :offset="3">
        <div class="grid-content bg-purple">
          <div class="tab">
            <el-tabs type="border-card" style="height: 500px" :stretch="true">
              <el-tab-pane label="登陆">
                <el-form style="margin-top: 50px" :model="loginForm" :rules="loginRules" status-icon ref="loginForm">
                  <el-form-item prop="userEmail">
                    <el-input prefix-icon="el-icon-mobile-phone" placeholder="邮箱" v-model="loginForm.userEmail"></el-input>
                  </el-form-item>
                  <div style="margin: 20px 0;"></div>
                  <el-form-item prop="userPassword">
                    <el-input prefix-icon="el-icon-picture" placeholder="密码" v-model="loginForm.userPassword"></el-input>
                  </el-form-item>
                  <div style="margin: 20px 0;"></div>
                  <div>
                    <div style="float: left">
                      <el-form-item prop="userIdentifying">
                        <el-input prefix-icon="el-icon-picture" placeholder="验证码" style="width: 150px" v-model="loginForm.userIdentifying"></el-input>
                      </el-form-item>
                    </div>
                    <div style="float: right" @click="refreshCodeLogin">
                      <loginIdentify :loginIdentifyCode="loginIdentityCode"></loginIdentify>
                    </div>
                  </div>
                  <div style="margin: 20px 0;"></div>
                  <div style="clear: both">
                    <el-link type="primary" >忘记密码?</el-link>
                  </div>
                  <div style="margin: 20px 0;"></div>
                  <el-form-item >
                    <el-button type="primary" @click="login('loginForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
              <el-tab-pane label="注册">
                <el-form style="margin-top: 20px" :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
                  <el-form-item prop="userTel">
                    <el-input prefix-icon="el-icon-mobile-phone" placeholder="手机" v-model="ruleForm.userTel"></el-input>
                  </el-form-item>
                  <div style="margin: 20px 0;"></div>
                  <el-form-item prop="userEmail">
                    <el-input prefix-icon="el-icon-message" placeholder="邮箱" v-model="ruleForm.userEmail"></el-input>
                  </el-form-item>
                  <div style="margin: 20px 0;"></div>
                  <el-form-item prop="userPassword">
                    <el-input prefix-icon="el-icon-postcard" placeholder="密码" v-model="ruleForm.userPassword"></el-input>
                  </el-form-item>
                  <div style="margin: 20px 0;"></div>
                  <el-form-item prop="password2">
                    <el-input prefix-icon="el-icon-postcard" placeholder="确认密码" v-model="ruleForm.password2"></el-input>
                  </el-form-item>
                  <div style="margin: 20px 0;"></div>
                  <div>
                    <div style="float: left">
                      <el-form-item prop="userIdentifying">
                        <el-input prefix-icon="el-icon-picture" placeholder="验证码" style="width: 150px" v-model="ruleForm.userIdentifying"></el-input>
                      </el-form-item>
                    </div>
                    <div style="float: right" @click="refreshCode">
                      <identify :identifyCode="identifyCode"></identify>
                    </div>
                  </div>
                  <br/>
                  <div style="margin: 10px 0;"></div>
<!--                  <router-link to="index">aaa</router-link>-->
                  <router-view></router-view>
                  <div style="clear: both">
                    <el-link type="primary" style="float: bottom" @click="openClause">条款</el-link><br/>
                    <el-checkbox v-model="isRead">已阅读</el-checkbox>
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
  import identify from './Identifing'
  import loginIdentify from './LoginIdentifing'
  import { mapMutations } from 'vuex'
    export default {
      name: "codetest",
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
            if(value !== this.ruleForm.userPassword){
              callback(new Error("两次密码不一致"))
            }else{
              callback();
            }
          }
        };
        //验证码校验器
        var checkIdentifyCode = (rule, value, callback) => {
          if(!value){
            callback(new Error("请输入验证码"))
          }else{
            if(this.identifyCode !== this.ruleForm.userIdentifying){
              callback(new Error("验证码不正确"))
            }else{
              callback()
            }
          }
        };
        //验证登陆邮箱
        var checkLoginEmail = (rule, value, callback) => {
          if(!value){
            callback(new Error("请输入登陆邮箱"))
          }else{
            callback();
          }
        };
        //验证登陆密码
        var checkLoginPasswod = (rule, value, callback) => {
          if(!value){
            callback(new Error("请输入登陆密码"))
          }else{
            callback();
          }
        };
        //验证码校验器
        var checkLoginIdentifyCode = (rule, value, callback) => {
          if(!value){
            callback(new Error("请输入验证码"))
          }else{
            if(this.loginIdentityCode !== this.loginForm.userIdentifying){
              callback(new Error("验证码不正确"))
            }else{
              callback()
            }
          }
        };
        return {
          //图片
          imgList: [
            {id:0,idView:require("../assets/1.jpg")},
            {id:1,idView:require("../assets/2.jpg")},
            {id:2,idView:require("../assets/3.jpg")}
          ],
          url: "/travel/getVerify",
          //表单数据
          ruleForm:{
            userTel: "",
            userEmail: "",
            userPassword: "",
            password2: "",
            userIdentifying:"",
          },
          loginForm:{
            userEmail: "",
            userPassword: "",
            userIdentifying: "",
          },
          userToken: "",
          identifyCode: "",
          identifyCodes: "1234567890",
          loginIdentifyCodes: "1234567890",
          loginIdentityCode: "",
          isRead: false,
          //校验规则
          rules:{
            userTel:[
              {validator: checkTel, trigger: blur}
            ],
            userEmail:[
              {validator: checkEmail, trigger: blur}
            ],
            userPassword:[
              {validator: checkPassword, trigger: blur}
            ],
            password2:[
              {validator: checkPassword2, trigger: blur}
            ],
            userIdentifying: [
              {validator: checkIdentifyCode, trigger: blur}
            ],
          },
          loginRules:{
            userEmail:[
              {validator: checkLoginEmail, trigger: blur}
            ],
            userPassword:[
              {validator: checkLoginPasswod, trigger: blur}
            ],
            userIdentifying: [
              {validator: checkLoginIdentifyCode, trigger: blur}
            ]
          }
        }
      },

      //实例
      components:{identify,loginIdentify},

      methods:{
        submitForm(formName){
          const _this = this
         // _this.$router.push({path:'/index'})
          this.$refs[formName].validate((valid) => {
            if(valid){
              if(!this.isRead){
                alert("请阅读条款")
                return;
              }
              axios.create({
                headers: {'Content-Type': 'application/json;charset=utf-8'},
                withCredentials: true
              }).post('/register',{
                userTel : this.ruleForm.userTel,
                userEmail: this.ruleForm.userEmail,
                userPassword: this.ruleForm.userPassword,
                userIdentifying: this.ruleForm.userIdentifying
              }).then(function (data) {
                if(data.status === 200){
                  _this.$router.push({path:'/downClause'})
                }
              }).catch(function (error) {
                console.log(error)
              })

            }else{
              return false;
            }
          })
        },
        ...mapMutations(['set_token']),
        login(loginForm){
          const _this = this
          //_this.$router.push({path:'/index'})
          this.$refs[loginForm].validate((valid) => {
            if(valid){
              axios.post('/login',{
                userEmail: this.loginForm.userEmail,
                userPassword: this.loginForm.userPassword,
              }).then(function (data) {
                console.log(data)
                if(data.data.code === 10001){

                  alert(data.data.msg)
                }else{
                  _this.userToken = data.data.token;
                  _this.set_token({token:_this.userToken})
                  _this.$router.push({path:'/index'})
                }
              }).catch(function (error) {

              })

            }else{
              //alert("error")
              return false;
            }
          })
        },
        refreshCode() {
          this.identifyCode = "";
          this.makeCode(this.identifyCodes, 4);
        },
        makeCode(o, l) {
          for (let i = 0; i < l; i++) {
            this.identifyCode += this.identifyCodes[
              this.randomNum(0, this.identifyCodes.length)
              ];
          }
          console.log(this.identifyCode);
        },
        randomNum(min, max) {
          return Math.floor(Math.random() * (max - min) + min);
        },
        refreshCodeLogin() {
          //alert(1)
          this.loginIdentityCode = "";
          this.makeCodeLogin(this.loginIdentifyCodes, 4);
        },
        makeCodeLogin(o, l) {
          for (let i = 0; i < l; i++) {
            this.loginIdentityCode += this.loginIdentifyCodes[
              this.randomNumLogin(0, this.loginIdentifyCodes.length)
              ];
          }
          console.log(this.loginIdentityCode);
        },
        randomNumLogin(min, max) {
          return Math.floor(Math.random() * (max - min) + min);
        },

        //打开条款
        openClause(){
          this.$confirm("这两个词汉语翻译相同,但应用的领域不同:(term做条款讲时,必须用复数)\n" +
            "clause：指法律条款或有法律效力的条款,a part of a written law or legal document covering a particular subject of the whole law or document:\n" +
            "terms,做条款讲时,意思和conditions差不多,翻译成情况、条件更合适,指限制或定义某件事（如协议或合同）的一些条件或规则,大家都同意这些条件的情况下,此事才有效或发生.\n" +
            "the conditions or rules that limit something (such as an agreement or a contract) :the things that must be agreed upon in order for something to happen or continue" +
            "这两个词汉语翻译相同,但应用的领域不同:(term做条款讲时,必须用复数)\n" +
            "clause：指法律条款或有法律效力的条款,a part of a written law or legal document covering a particular subject of the whole law or document:\n" +
            "terms,做条款讲时,意思和conditions差不多,翻译成情况、条件更合适,指限制或定义某件事（如协议或合同）的一些条件或规则,大家都同意这些条件的情况下,此事才有效或发生.\n" +
            "the conditions or rules that limit something (such as an agreement or a contract) :the things that must be agreed upon in order for something to happen or continue","条款",{
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            lockScroll: false
            //type: "info",
          }).then( () => {
            this.isRead = true
          }).catch( () => {
            this.isRead = false
          })
        }
      },
      mounted() {
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
      },
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
