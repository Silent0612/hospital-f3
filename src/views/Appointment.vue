<template>
  <div class="appointment-container">
    <div class="page-header">
      <el-page-header @back="$router.go(-1)" content="预约挂号"></el-page-header>
    </div>
    
    <el-card class="appointment-card">
      <div class="doctor-info">
        <div class="doctor-avatar">
          <i v-if="!doctorInfo.headimg" class="el-icon-user-solid"></i>
          <img v-else :src="doctorInfo.headimg" alt="医生头像">
        </div>
        <div class="info-content">
          <h3>{{ doctorInfo.username }}</h3>
          <p v-if="doctorInfo.experience">{{ doctorInfo.experience }}</p>
          <p v-if="doctorInfo.comment">{{ doctorInfo.comment }}</p>
        </div>
      </div>

      <el-form :model="appointmentForm" :rules="rules" ref="appointmentForm" label-width="100px" class="appointment-form">
        <!-- 患者基本信息 -->
        <div class="section-title">患者信息</div>
        <el-form-item label="姓名" prop="userName">
          <el-input v-model="appointmentForm.userName" disabled></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="userGender">
          <el-input :value="appointmentForm.userGender === 1 ? '男' : '女'" disabled></el-input>
        </el-form-item>

        <el-form-item label="年龄" prop="userAge">
          <el-input v-model="appointmentForm.userAge" disabled></el-input>
        </el-form-item>

        <div class="section-title">预约信息</div>
        <el-form-item label="就诊日期" prop="appointmentDate">
          <el-date-picker
            v-model="appointmentForm.appointmentDate"
            type="date"
            placeholder="选择就诊日期"
            :picker-options="dateOptions">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="就诊时段" prop="timeSlot">
          <el-select v-model="appointmentForm.timeSlot" placeholder="请选择就诊时段">
            <el-option
              v-for="slot in timeSlots"
              :key="slot.value"
              :label="slot.label"
              :value="slot.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="就诊类型" prop="visitType">
          <el-radio-group v-model="appointmentForm.visitType">
            <el-radio :label="1">初诊</el-radio>
            <el-radio :label="2">复诊</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="病情描述" prop="description">
          <el-input
            type="textarea"
            v-model="appointmentForm.description"
            :rows="4"
            placeholder="请简要描述您的病情">
          </el-input>
        </el-form-item>

        <div class="fee-info">
          <span class="fee-label">挂号费用：</span>
          <span class="fee-amount">￥{{ registrationFee }}</span>
        </div>

        <el-form-item>
          <el-button type="primary" @click="submitAppointment" class="submit-btn">确认预约并支付</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Appointment',
  data() {
    return {
      doctorInfo: {},
      appointmentForm: {
        appointmentDate: '',
        timeSlot: '',
        visitType: 1,
        description: '',
        userName: '',
        userGender: null,
        userAge: null
      },
      rules: {
        appointmentDate: [
          { required: true, message: '请选择就诊日期', trigger: 'change' }
        ],
        timeSlot: [
          { required: true, message: '请选择就诊时段', trigger: 'change' }
        ],
        visitType: [
          { required: true, message: '请选择就诊类型', trigger: 'change' }
        ],
        description: [
          { required: true, message: '请填写病情描述', trigger: 'blur' }
        ]
      },
      timeSlots: [
        { value: '1', label: '上午 8:00-10:00' },
        { value: '2', label: '上午 10:00-12:00' },
        { value: '3', label: '下午 14:00-16:00' },
        { value: '4', label: '下午 16:00-18:00' }
      ],
      dateOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      registrationFee: 50
    }
  },
  created() {
    this.getDoctorInfo()
    this.getUserInfo()
  },
  methods: {
    async getDoctorInfo() {
      try {
        const { data } = await this.$http.get(`/api/empinfo/findById?id=${this.$route.params.doctorId}`)
        if (data.code === 200) {
          this.doctorInfo = data.data
        } else {
          this.$message.error(data.message)
        }
      } catch (error) {
        this.$message.error('获取医生信息失败')
      }
    },

    getUserInfo() {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
        if (!userInfo.id) {
          this.$message.error('请先登录')
          this.$router.push('/login')
          return
        }

        // 从用户信息中获取基本信息
        this.appointmentForm.userName = userInfo.username
        this.appointmentForm.userGender = userInfo.gender
        
        // 计算年龄
        if (userInfo.birthday) {
          const birthDate = new Date(userInfo.birthday)
          const today = new Date()
          let age = today.getFullYear() - birthDate.getFullYear()
          const monthDiff = today.getMonth() - birthDate.getMonth()
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--
          }
          this.appointmentForm.userAge = age
        }
      } catch (error) {
        console.error('获取用户信息失败:', error)
        this.$message.error('获取用户信息失败')
      }
    },

    async submitAppointment() {
      this.$refs.appointmentForm.validate(async valid => {
        if (!valid) {
          return
        }

        try {
          const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
          if (!userInfo.id) {
            this.$message.error('请先登录')
            this.$router.push('/login')
            return
          }

          const appointmentData = {
            doctorId: parseInt(this.$route.params.doctorId),
            userId: parseInt(userInfo.id),
            appointmentDate: this.appointmentForm.appointmentDate,
            timeSlot: this.appointmentForm.timeSlot,
            visitType: parseInt(this.appointmentForm.visitType),
            description: this.appointmentForm.description,
            fee: this.registrationFee,
            userName: this.appointmentForm.userName,
            userGender: this.appointmentForm.userGender,
            userAge: this.appointmentForm.userAge
          }

          console.log('提交的预约数据:', appointmentData)
          const response = await this.$http.post('/api/appointments', appointmentData)
          
          if (response.data && response.data.code === 200) {
            this.$alert('预约成功！请按时就医。', '预约结果', {
              confirmButtonText: '确定',
              type: 'success',
              callback: () => {
                this.$router.push('/home/records')
              }
            })
          } else {
            this.$message.error(response.data?.message || '预约失败')
          }
        } catch (error) {
          console.error('预约错误:', error)
          this.$message.error('预约失败，请稍后重试')
        }
      })
    }
  }
}
</script>

<style scoped>
.appointment-container {
  padding: 30px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.page-header {
  margin-bottom: 30px;
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.05);
}

.appointment-card {
  max-width: 800px;
  margin: 0 auto;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
}

.appointment-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.12);
}

.doctor-info {
  display: flex;
  align-items: center;
  padding: 25px 0;
  border-bottom: 1px solid #ebeef5;
  margin-bottom: 25px;
  background: #fafafa;
  border-radius: 8px;
  padding: 20px;
}

.doctor-avatar {
  width: 120px;
  height: 120px;
  margin-right: 30px;
  text-align: center;
  border: 3px solid #fff;
  border-radius: 50%;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  overflow: hidden;
}

.doctor-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.doctor-avatar img:hover {
  transform: scale(1.05);
}

.doctor-avatar i {
  font-size: 80px;
  color: #909399;
  line-height: 120px;
}

.info-content h3 {
  margin: 0 0 15px 0;
  font-size: 24px;
  color: #303133;
  font-weight: 600;
}

.info-content p {
  margin: 8px 0;
  color: #606266;
  font-size: 14px;
  line-height: 1.6;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
  margin: 30px 0 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #409EFF;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 50px;
  height: 2px;
  background: #409EFF;
}

.appointment-form {
  margin-top: 30px;
  padding: 0 20px;
}

.appointment-form :deep(.el-form-item) {
  margin-bottom: 25px;
}

.appointment-form :deep(.el-input__inner) {
  border-radius: 8px;
}

.appointment-form :deep(.el-textarea__inner) {
  border-radius: 8px;
  min-height: 120px;
}

.fee-info {
  margin: 30px 0;
  padding: 20px;
  background-color: #ecf5ff;
  border-radius: 8px;
  border: 1px solid #d9ecff;
  transition: all 0.3s ease;
}

.fee-info:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.fee-label {
  font-size: 16px;
  color: #409EFF;
  font-weight: 500;
}

.fee-amount {
  font-size: 24px;
  color: #f56c6c;
  font-weight: 600;
  margin-left: 10px;
}

.submit-btn {
  width: 100%;
  margin-top: 30px;
  height: 50px;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 1px;
  border-radius: 25px;
  background: linear-gradient(135deg, #409EFF 0%, #36a3f7 100%);
  border: none;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(64,158,255,0.3);
}

.submit-btn:active {
  transform: translateY(0);
}
</style>
