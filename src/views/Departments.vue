<template>
  <div class="departments-container">
    <h2 class="page-title">选择就诊科室</h2>
    <el-row :gutter="30">
      <el-col :xs="24" :sm="12" :md="8" :lg="8" v-for="dept in departments" :key="dept.id">
        <el-card class="dept-card" shadow="hover" @click.native="handleDeptClick(dept)">
          <div class="dept-content">
            <div class="dept-icon" :class="getDeptIcon(dept.departmentname)">
              <i :class="getDeptIconClass(dept.departmentname)"></i>
            </div>
            <div class="dept-info">
              <div class="dept-name">{{ dept.departmentname }}</div>
              <div class="dept-desc">{{ dept.description || '暂无描述' }}</div>
              <div class="dept-action">
                <span>点击查看医生</span>
                <i class="el-icon-arrow-right"></i>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Departments',
  data() {
    return {
      departments: []
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      try {
        const { data: response } = await this.$http.get('/api/departmentinfo/list');
        console.log('科室列表响应:', response);
        if (response.code === 200) {
          this.departments = response.data;
        } else {
          this.$message.error(response.message || '获取科室列表失败');
        }
      } catch (error) {
        console.error('获取科室列表错误:', error);
        this.$message.error('获取科室列表失败，请稍后重试');
      }
    },
    handleDeptClick(dept) {
      this.$router.push(`/home/doctors/${dept.id}`)
    },
    getDeptIconClass(deptName) {
      const iconMap = {
        '内科': 'el-icon-first-aid-kit',
        '外科': 'el-icon-scissors',
        '儿科': 'el-icon-sugar',
        '妇科': 'el-icon-female',
        '眼科': 'el-icon-view',
        '耳鼻喉科': 'el-icon-headset',
        '口腔科': 'el-icon-tooth',
        '皮肤科': 'el-icon-magic-stick',
        '神经科': 'el-icon-lightning',
        '精神科': 'el-icon-moon',
        '中医科': 'el-icon-bangzhu',
        '康复科': 'el-icon-refresh-right'
      };
      return iconMap[deptName] || 'el-icon-first-aid-kit';
    },
    getDeptIcon(deptName) {
      const colorMap = {
        '内科': 'icon-blue',
        '外科': 'icon-green',
        '儿科': 'icon-orange',
        '妇科': 'icon-pink',
        '眼科': 'icon-purple',
        '耳鼻喉科': 'icon-cyan',
        '口腔科': 'icon-red',
        '皮肤科': 'icon-yellow',
        '神经科': 'icon-indigo',
        '精神科': 'icon-teal',
        '中医科': 'icon-brown',
        '康复科': 'icon-lime'
      };
      return colorMap[deptName] || 'icon-blue';
    }
  }
}
</script>

<style scoped>
.departments-container {
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 30px;
  text-align: center;
  position: relative;
}

.page-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 3px;
  background: linear-gradient(90deg, #409EFF, #36a3f7);
  border-radius: 3px;
}

.dept-card {
  margin-bottom: 30px;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
}

.dept-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.dept-content {
  display: flex;
  align-items: center;
  padding: 20px;
}

.dept-icon {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  font-size: 30px;
  transition: all 0.3s ease;
}

.dept-icon i {
  transition: all 0.3s ease;
}

.dept-card:hover .dept-icon i {
  transform: scale(1.1);
}

/* 图标颜色样式 */
.icon-blue { background: linear-gradient(135deg, #409EFF20, #409EFF40); color: #409EFF; }
.icon-green { background: linear-gradient(135deg, #67C23A20, #67C23A40); color: #67C23A; }
.icon-orange { background: linear-gradient(135deg, #E6A23C20, #E6A23C40); color: #E6A23C; }
.icon-pink { background: linear-gradient(135deg, #F56C6C20, #F56C6C40); color: #F56C6C; }
.icon-purple { background: linear-gradient(135deg, #9C27B020, #9C27B040); color: #9C27B0; }
.icon-cyan { background: linear-gradient(135deg, #00BCD420, #00BCD440); color: #00BCD4; }
.icon-red { background: linear-gradient(135deg, #F4433620, #F4433640); color: #F44336; }
.icon-yellow { background: linear-gradient(135deg, #FFEB3B20, #FFEB3B40); color: #FFB300; }
.icon-indigo { background: linear-gradient(135deg, #3F51B520, #3F51B540); color: #3F51B5; }
.icon-teal { background: linear-gradient(135deg, #00968820, #00968840); color: #009688; }
.icon-brown { background: linear-gradient(135deg, #79554820, #79554840); color: #795548; }
.icon-lime { background: linear-gradient(135deg, #CDDC3920, #CDDC3940); color: #827717; }

.dept-info {
  flex: 1;
}

.dept-name {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 8px;
}

.dept-desc {
  font-size: 14px;
  color: #909399;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
}

.dept-action {
  display: flex;
  align-items: center;
  color: #409EFF;
  font-size: 14px;
  font-weight: 500;
}

.dept-action i {
  margin-left: 5px;
  transition: all 0.3s ease;
}

.dept-card:hover .dept-action i {
  transform: translateX(5px);
}

@media screen and (max-width: 768px) {
  .departments-container {
    padding: 20px;
  }
  
  .dept-content {
    padding: 15px;
  }
  
  .dept-icon {
    width: 50px;
    height: 50px;
    font-size: 24px;
  }
  
  .dept-name {
    font-size: 16px;
  }
}
</style>
