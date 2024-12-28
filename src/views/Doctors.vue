<template>
  <div class="doctors-container">
    <div class="page-header">
      <el-page-header @back="$router.go(-1)" :content="departmentName + '科室医生'"></el-page-header>
    </div>
    <el-row :gutter="20" class="doctor-list">
      <el-col :span="8" v-for="doctor in doctors" :key="doctor.id">
        <el-card class="doctor-card">
          <div class="doctor-avatar">
            <i v-if="!doctor.headimg" class="el-icon-user-solid"></i>
            <img v-else :src="doctor.headimg" alt="医生头像">
          </div>
          <div class="doctor-info">
            <h3 class="doctor-name">{{ doctor.username }}</h3>
            <p class="doctor-title">{{ doctor.title || '主治医师' }}</p>
            <p class="doctor-exp">从医经验：{{ doctor.experience || '5' }}年</p>
            <div class="doctor-comment">{{ doctor.comment || '专业医师，热心为患者服务' }}</div>
            <el-button type="primary" @click="handleAppointment(doctor)">预约挂号</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Doctors',
  props: {
    id: {
      type: Number,
      required: true,
      validator: value => !isNaN(value)
    }
  },
  data() {
    return {
      doctors: [],
      departmentName: ''
    }
  },
  created() {
    if (!isNaN(this.id)) {
      this.getDoctors()
      this.getDepartmentInfo()
    } else {
      this.$message.error('无效的科室ID')
      this.$router.push('/home/departments')
    }
  },
  methods: {
    async getDoctors() {
      try {
        console.log('正在获取科室ID为', this.id, '的医生列表');
        const { data: response } = await this.$http.get('/api/empinfo/findByDid', {
          params: {
            departmentid: this.id
          }
        });
        console.log('API响应:', response);
        if (response.code === 200) {
          this.doctors = response.data;
        } else {
          this.$message.error(response.message || '获取医生列表失败');
        }
      } catch (error) {
        console.error('获取医生列表错误:', error);
        this.$message.error('获取医生列表失败，请稍后重试');
      }
    },
    async getDepartmentInfo() {
      try {
        console.log('正在获取科室信息，ID:', this.id);
        const { data: response } = await this.$http.get('/api/departmentinfo/findById', {
          params: {
            id: this.id
          }
        });
        console.log('科室信息响应:', response);
        if (response.code === 200) {
          this.departmentName = response.data.departmentname;
        } else {
          this.$message.error(response.message || '获取科室信息失败');
        }
      } catch (error) {
        console.error('获取科室信息失败:', error);
        this.$message.error('获取科室信息失败');
      }
    },
    handleAppointment(doctor) {
      this.$router.push(`/home/appointment/${doctor.id}`);
    }
  }
}
</script>

<style scoped>
.doctors-container {
  padding: 20px;
}

.page-header {
  margin-bottom: 20px;
}

.doctor-list {
  margin-top: 20px;
}

.doctor-card {
  margin-bottom: 20px;
  height: 400px;
}

.doctor-avatar {
  text-align: center;
  margin-bottom: 15px;
}

.doctor-avatar img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
}

.doctor-avatar i {
  font-size: 120px;
  color: #dcdfe6;
}

.doctor-info {
  text-align: center;
}

.doctor-name {
  font-size: 18px;
  margin-bottom: 10px;
}

.doctor-title {
  color: #409EFF;
  margin-bottom: 10px;
}

.doctor-exp {
  color: #606266;
  margin-bottom: 10px;
}

.doctor-comment {
  color: #909399;
  margin-bottom: 15px;
  height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
