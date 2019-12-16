<template>
  <div class="login-container">
    <div class="form-container">
      <p class="title">Bgain风控管理系统</p>
      <div class="row-container">
        <span class="row-text">账号：</span><input v-model="userName" maxlength="20" class="row-input" type="text" placeholder="请输入账号">
      </div>
      <div class="row-container">
        <span class="row-text">密码：</span><input v-model="userPassword" maxlength="20" class="row-input" type="password" placeholder="请输入密码">
      </div>
      <div class="row-container row-container-special">
        <button class="login-button" @click="loginIn">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      userName: '',
      userPassword: ''
    }
  },
  computed: {
    ...mapState('auth/', ['authenticated'])
  },
  methods: {
    ...mapActions('auth/', ['login']),

    async loginIn() {
      if (this.userName === '' || this.userPassword === '') {
        Message.error({
          message: '账号或密码不能为空'
        })
      } else {
        // 调用登录接口
        try {
          await this.login({ userName: this.userName, password: this.userPassword })
          if (this.authenticated) {
            this.$router.push('/')
          }
        } catch (e) {
          Message.error({
            message: '账号或密码错误'
          })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color:#2d3a4b ;
  .form-container{
    min-width: 520Px;
    max-width: 100%;
    min-height: 400Px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title{
      color: #ffffff;
      font-size: 30Px;
    }
    .row-container{
      width: 80%;
      margin: 15Px;
      height: 50Px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #283443;
      border: 1px solid rgba(255,255,255,0.1);
      .row-text{
        height: 40Px;
        line-height: 40Px;
        color: #ffffff;
        font-size: 20Px;
        padding-left: 10Px;
      }
      .row-input{
        height: 35Px;
        flex: 1;
        font-size: 20Px;
        border: none;
        outline: none;
        color: #ffffff;
        background-color:#283443 ;
      }
      .login-button{
        width: 100%;
        height: 40Px;
        background-color: #1890ff;
        color: #ffffff;
        border:none;
        font-size: 20Px;
      }
    }
    .row-container-special{
      background-color: #2d3a4b;
      border: none;
    }
  }
}
</style>
