<template>
  <div class="login-container">
    <el-card class="login-card">
      <div class="title">医院预约挂号系统</div>
      <el-form :model="form" :rules="rules" ref="loginForm" label-width="0">
        <el-form-item prop="phone">
          <el-input v-model="form.phone" prefix-icon="el-icon-user" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="form.password" prefix-icon="el-icon-lock" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-button" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
      <div class="register-link">
        还没有账号？<router-link to="/register">立即注册</router-link>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        phone: '',
        password: ''
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          try {
            console.log('发送登录请求:', this.form)
            
            // 发送登录请求
            const response = await this.$http.post('/api/patient/login', {
              phone: this.form.phone,
              password: this.form.password
            })
            
            console.log('登录响应:', response)
            
            const data = response.data
            if (data.code === 200) {
              const userInfo = data.data
              // 检查用户角色
              if (userInfo.roleid === 2) { // 病人角色
                // 保存用户信息到localStorage
                localStorage.setItem('userInfo', JSON.stringify(userInfo))
                // 保存登录状态
                localStorage.setItem('isLogin', 'true')
                // 保存token（使用用户ID作为简单的token）
                localStorage.setItem('token', userInfo.id)
                
                this.$message.success('登录成功')
                // 病人跳转到科室列表页面
                this.$router.push('/home/departments')
              } else {
                this.$message.error('非病人用户不能登录')
              }
            } else {
              this.$message.error(data.message || '登录失败')
            }
          } catch (error) {
            console.error('登录错误:', error)
            if (error.response) {
              this.$message.error(error.response.data?.message || '登录失败，请检查用户名和密码')
            } else {
              this.$message.error('登录失败，请稍后重试')
            }
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #e0f2ff 0%, #f5f7fa 100%);
  padding: 20px;
}

.login-card {
  width: 400px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.login-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
}

.title {
  text-align: center;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 40px;
  color: #409EFF;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.el-form-item {
  margin-bottom: 25px;
}

.el-input {
  margin-bottom: 5px;
}

.el-input__inner {
  height: 45px;
  line-height: 45px;
  border-radius: 8px;
  border: 1px solid #dcdfe6;
  transition: all 0.3s ease;
}

.el-input__inner:focus {
  border-color: #409EFF;
  box-shadow: 0 0 0 2px rgba(64,158,255,0.2);
}

.login-button {
  width: 100%;
  height: 45px;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 1px;
  background: linear-gradient(135deg, #409EFF 0%, #36a3f7 100%);
  border: none;
  border-radius: 8px;
  margin-top: 10px;
  transition: all 0.3s ease;
}

.login-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(64,158,255,0.3);
}

.login-button:active {
  transform: translateY(0);
}

.register-link {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #606266;
}

.register-link a {
  color: #409EFF;
  text-decoration: none;
  font-weight: 500;
  margin-left: 5px;
  transition: all 0.3s ease;
}

.register-link a:hover {
  color: #36a3f7;
  text-decoration: underline;
}
</style>
