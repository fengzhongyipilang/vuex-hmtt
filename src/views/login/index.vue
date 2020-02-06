<template>
  <div class='container'>
    <van-nav-bar title="登录" left-arrow @click-left="$router.back()"></van-nav-bar>
    <!-- 手机号  验证码  登录按钮 -->
    <van-cell-group>
      <van-field
      :error-message="errMsg.mobile"
      v-model="loginForm.mobile" label="手机号"
      placeholder="请输入手机号"
      @blur="checkMobile()"
      >
      </van-field>

      <van-field
      :error-message="errMsg.code"
      v-model="loginForm.code"
      label="验证码"
      placeholder="请输入验证码"
      @blur="checkCode()"
      >
        <!-- slot指定给哪个坑填内容 -->
        <van-button  slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class='btn-box'>
      <van-button @click="login()" type="info" size="small" round block>登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      // 专门存放提示信息
      errMsg: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    checkMobile () {
      // 判断为空 或者 格式错误
      if (!this.loginForm.mobile) {
        this.errMsg.mobile = '手机号不能为空'
        return false
      }
      // 判断格式
      if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(this.loginForm.mobile)) {
        this.errMsg.mobile = '手机号格式不正确'
        return false
      }
      this.errMsg.mobile = '' // 清空error提示信息
      return true
    },
    checkCode () {
      if (!this.loginForm.code) {
        this.errMsg.code = '验证码不能为空'
        return false
      }
      if (!/^\d{6}$/.test(this.loginForm.code)) {
        this.errMsg.code = '验证码格式不正确'
        return false
      }
      this.errMsg.code = ''
      return true
    },
    login () {
      if (this.checkMobile() && this.checkCode()) {
        // 都通过了了 表示前端验证通过 还要调用接口
        // 提示信息 表示登录成功
        console.log('ok')
      }
    }
  }

}
</script>

<style scoped>
   .btn-box {
     padding: 20px;
   }
</style>
