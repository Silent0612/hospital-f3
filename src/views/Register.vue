<template>
  <div class="register-container">
    <el-card class="register-card">
      <div class="title">用户注册</div>
      <el-form :model="form" :rules="rules" ref="registerForm" label-width="80px">
        <el-form-item label="姓名" prop="username">
          <el-input v-model="form.username" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input type="password" v-model="form.confirmPassword" placeholder="请再次输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="form.gender">
            <el-radio label="1">男</el-radio>
            <el-radio label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthday">
          <el-date-picker v-model="form.birthday" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="register-button" @click="handleRegister">注册</el-button>
          <el-button class="login-button" @click="$router.push('/login')">返回登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    // 密码确认验证
    const validateConfirmPassword = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    return {
      form: {
        username: '',
        phone: '',
        password: '',
        confirmPassword: '',
        gender: '1',
        birthday: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validateConfirmPassword, trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        birthday: [
          { required: true, message: '请选择出生日期', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    handleRegister() {
      this.$refs.registerForm.validate(async valid => {
        if (valid) {
          try {
            const { confirmPassword, ...registerData } = this.form
            // 转换日期格式
            const formattedData = {
              ...registerData,
              birthday: registerData.birthday ? new Date(registerData.birthday).toISOString().split('T')[0] : null
            }
            console.log('发送注册请求:', formattedData)
            const { data } = await this.$http.post('/api/patient/register', formattedData)
            console.log('注册响应:', data)
            if (data.code === 200) {
              this.$message.success('注册成功')
              this.$router.push('/login')
            } else {
              this.$message.error(data.message || '注册失败')
            }
          } catch (error) {
            console.error('注册错误:', error)
            this.$message.error(error.response?.data?.message || '注册失败，请稍后重试')
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.register-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f2f5;
}

.register-card {
  width: 500px;
}

.title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #409EFF;
}

.register-button {
  width: 45%;
}

.login-button {
  width: 45%;
  margin-left: 10%;
}
</style>
