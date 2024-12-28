<template>
  <div class="records-container">
    <div class="page-header">
      <h2 class="page-title">我的预约记录</h2>
      <div class="header-desc">共 {{ total }} 条记录</div>
    </div>

    <el-card class="records-card" shadow="hover">
      <el-table
        v-loading="loading"
        :data="records"
        style="width: 100%"
        :header-cell-style="{ background: '#f5f7fa', color: '#606266', fontWeight: '600' }"
        :row-class-name="tableRowClassName">
        
        <el-table-column
          prop="doctorName"
          label="医生姓名"
          min-width="100">
          <template slot-scope="scope">
            <div class="doctor-name">
              <i class="el-icon-user"></i>
              {{ scope.row.doctorName }}
            </div>
          </template>
        </el-table-column>

        <el-table-column
          prop="departmentName"
          label="就诊科室"
          min-width="120">
          <template slot-scope="scope">
            <el-tag size="medium" :type="getDepartmentTagType(scope.row.departmentName)">
              {{ scope.row.departmentName }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column
          prop="appointmentDate"
          label="就诊日期"
          min-width="120">
          <template slot-scope="scope">
            <div class="date-info">
              <i class="el-icon-date"></i>
              {{ formatDate(scope.row.appointmentDate) }}
            </div>
          </template>
        </el-table-column>

        <el-table-column
          prop="timeSlot"
          label="就诊时段"
          min-width="120">
          <template slot-scope="scope">
            <div class="time-info">
              <i class="el-icon-time"></i>
              {{ getTimeSlotLabel(scope.row.timeSlot) }}
            </div>
          </template>
        </el-table-column>

        <el-table-column
          prop="description"
          label="症状描述"
          min-width="200"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="description-cell">
              <i class="el-icon-document"></i>
              {{ scope.row.description }}
            </div>
          </template>
        </el-table-column>

        <el-table-column
          prop="status"
          label="状态"
          min-width="100">
          <template slot-scope="scope">
            <el-tag
              :type="getStatusType(scope.row.status)"
              effect="dark"
              size="medium"
              class="status-tag">
              {{ getStatusLabel(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column
          label="操作"
          min-width="120"
          fixed="right">
          <template slot-scope="scope">
            <el-button
              v-if="canCancel(scope.row)"
              type="danger"
              size="mini"
              class="cancel-btn"
              @click="handleCancel(scope.row)">
              取消预约
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container" v-if="total > 0">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Records',
  data() {
    return {
      loading: false,
      records: [],
      currentPage: 1,
      total: 0,
      timeSlots: {
        '1': '上午 8:00-10:00',
        '2': '上午 10:00-12:00',
        '3': '下午 14:00-16:00',
        '4': '下午 16:00-18:00'
      }
    }
  },
  created() {
    this.getRecords()
  },
  methods: {
    tableRowClassName({ row }) {
      if (row.status === 2) {
        return 'cancelled-row'
      }
      return ''
    },
    getDepartmentTagType(dept) {
      const typeMap = {
        '内科': '',
        '外科': 'success',
        '儿科': 'warning',
        '妇科': 'danger',
        '眼科': 'info',
        '耳鼻喉科': ''
      }
      return typeMap[dept] || ''
    },
    async getRecords() {
      this.loading = true
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
        console.log('当前用户信息:', userInfo)
        
        if (!userInfo.id) {
          this.$message.error('请先登录')
          this.$router.push('/login')
          return
        }
        
        const response = await this.$http.get(`/api/appointments/user/${userInfo.id}`)
        console.log('预约记录响应:', response)
        
        if (response.data && response.data.code === 200) {
          if (Array.isArray(response.data.data)) {
            this.records = response.data.data
            this.total = this.records.length
            console.log('获取到的预约记录:', this.records)
          } else {
            console.error('返回的数据不是数组:', response.data.data)
            this.records = []
            this.total = 0
          }
        } else {
          this.$message.error(response.data?.message || '获取预约记录失败')
        }
      } catch (error) {
        console.error('获取预约记录错误:', error)
        this.$message.error('获取预约记录失败，请稍后重试')
      } finally {
        this.loading = false
      }
    },
    formatDate(date) {
      if (!date) return ''
      const d = new Date(date)
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    },
    getTimeSlotLabel(timeSlot) {
      return this.timeSlots[timeSlot] || '未知时段'
    },
    getStatusType(status) {
      const types = {
        0: 'warning',    // 待就诊
        1: 'success',    // 已完成
        2: 'info'        // 已取消
      }
      return types[status] || 'info'
    },
    getStatusLabel(status) {
      const labels = {
        0: '待就诊',
        1: '已完成',
        2: '已取消'
      }
      return labels[status] || '未知状态'
    },
    canCancel(record) {
      return record.status === 0 && new Date(record.appointmentDate) > new Date()
    },
    handleCurrentChange(page) {
      this.currentPage = page
      this.getRecords()
    },
    async handleCancel(record) {
      try {
        await this.$confirm('确认取消该预约吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        
        const response = await this.$http.put(`/api/appointments/${record.id}/cancel`)
        if (response.data && response.data.code === 200) {
          this.$message.success('预约取消成功')
          this.getRecords()
        } else {
          this.$message.error(response.data?.message || '取消预约失败')
        }
      } catch (error) {
        if (error !== 'cancel') {
          console.error('取消预约错误:', error)
          this.$message.error('取消预约失败，请稍后重试')
        }
      }
    }
  }
}
</script>

<style scoped>
.records-container {
  padding: 30px;
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: #303133;
  margin: 0;
  position: relative;
  padding-left: 16px;
}

.page-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 20px;
  background: linear-gradient(to bottom, #409EFF, #36a3f7);
  border-radius: 2px;
}

.header-desc {
  color: #909399;
  font-size: 14px;
}

.records-card {
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
}

.doctor-name,
.date-info,
.time-info,
.description-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.doctor-name i,
.date-info i,
.time-info i,
.description-cell i {
  font-size: 16px;
  color: #909399;
}

.status-tag {
  border-radius: 4px;
  padding: 6px 12px;
}

.cancel-btn {
  padding: 8px 16px;
  font-size: 13px;
  border-radius: 4px;
}

.pagination-container {
  margin-top: 24px;
  display: flex;
  justify-content: center;
}

:deep(.el-table) {
  border-radius: 8px;
  overflow: hidden;
}

:deep(.el-table th) {
  background-color: #f5f7fa !important;
  padding: 12px 0;
}

:deep(.el-table td) {
  padding: 16px 0;
}

:deep(.el-table--enable-row-hover .el-table__body tr:hover > td) {
  background-color: #f5f7fa;
}

:deep(.cancelled-row) {
  color: #909399;
  background-color: #f5f7fa;
}

:deep(.el-tag) {
  border-radius: 4px;
  padding: 0 12px;
  height: 28px;
  line-height: 26px;
}

@media screen and (max-width: 768px) {
  .records-container {
    padding: 15px;
  }

  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .header-desc {
    margin-left: 16px;
  }
}
</style>
