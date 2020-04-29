<template>
  <div class="login">
    <div class="login-box">
      <!-- 头像区域 -->
      <div class="avater-box">
        <img src="~assets/img/logo.png" alt />
      </div>
      <!-- 登陆表单区域 -->
      <el-form
        label-width="0"
        ref="loginFormRef"
        :rules="LoginRules"
        :model="LoginForm"
        class="login-form"
      >
        <el-form-item prop="username" class="login-input">
          <!-- 用户名 -->
          <el-input v-model="LoginForm.username" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <!-- 密码 -->
          <el-input
            @keyup.enter.native="enterLogin"
            v-model="LoginForm.password"
            prefix-icon="el-icon-lock"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登陆</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
 
<script>
//导入网络请求
import { loginReq } from 'network/login'

export default {
  name: 'Login',
  data() {
    let checkUsername = (rule, value, callback) => {
      const regUsername = /^[a-zA-Z][\w]{2,9}$/
      if (regUsername.test(value)) return callback()
      callback(new Error('请输入合法的用户名'))
    }

    let checkPassword = (rule, value, callback) => {
      const regPsw = /^[\w.]{6,15}$/
      if (regPsw.test(value)) return callback()
      callback(new Error('请输入合法的登陆密码'))
    }

    return {
      //登陆表单的数据绑定对象
      LoginForm: {
        username: 'test',
        password: '123456'
      },
      //表单验证规则
      LoginRules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            validator: checkUsername,
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入登陆密码',
            trigger: 'blur'
          },
          {
            validator: checkPassword,
            trigger: 'blur'
          }
        ],
      }
    }
  },
  methods: {
    //点击按钮,重置表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const res = await loginReq(this.LoginForm)
        if (res.meta.status != 200) return this.$msg.error('用户名或密码错误')
        this.$msg.success('登陆成功')
        //保存token
        window.sessionStorage.setItem('token', res.data.token)
        // 跳转到home
        this.$router.push('/home')
      })
    },
    enterLogin() {
      this.login()
    }
  }
}
</script>
 
<style lang="less" scoped>
.login {
  height: 100%;
  background-color: #4a5a6a;
}
.login-box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  height: 300px;
  background-color: #eee;
  border-radius: 3px;
}
.avater-box {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 130px;
  height: 130px;
  border: 10px solid #fff;
  border-radius: 50%;
  overflow: hidden;
  background-color: #eee;
  box-shadow: 0 0 10px #ddd;
  img {
    width: 100%;
    height: 100%;
  }
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.login-form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
}
.login-input {
  margin-bottom: 20px;
}
</style>