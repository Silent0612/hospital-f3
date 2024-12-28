<template>
  <el-container class="home-container">
    <el-header>
      <div class="header-content">
        <div class="left-section">
          <div class="logo">医院预约挂号系统</div>
          <el-menu
            :default-active="$route.path"
            router
            mode="horizontal"
            class="horizontal-menu"
            background-color="transparent"
            text-color="#606266"
            active-text-color="#409EFF">
            <el-menu-item index="/home/departments">
              <i class="el-icon-s-grid"></i>
              <span>科室选择</span>
            </el-menu-item>
            <el-menu-item index="/home/records">
              <i class="el-icon-document"></i>
              <span>预约记录</span>
            </el-menu-item>
          </el-menu>
        </div>
        <div class="user-info">
          <span class="welcome-text">欢迎您，{{ userInfo.username }}</span>
          <el-button type="text" @click="handleLogout" class="logout-btn">退出登录</el-button>
        </div>
      </div>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}')
    }
  },
  methods: {
    handleLogout() {
      this.$confirm('确认退出登录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        this.$router.push('/login')
        this.$message.success('退出登录成功')
      }).catch(() => {})
    }
  }
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #e0f2ff 0%, #f5f7fa 100%);
}

.el-header {
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 0;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.05);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.left-section {
  display: flex;
  align-items: center;
}

.logo {
  font-size: 20px;
  font-weight: 600;
  color: #409EFF;
  margin-right: 40px;
  white-space: nowrap;
}

.horizontal-menu {
  border-bottom: none;
  display: flex;
  background-color: transparent;
}

.horizontal-menu .el-menu-item {
  height: 60px;
  line-height: 60px;
  border-bottom: 2px solid transparent;
  margin: 0 5px;
}

.horizontal-menu .el-menu-item.is-active {
  background: transparent;
  color: #409EFF !important;
  border-bottom: 2px solid #409EFF;
}

.horizontal-menu .el-menu-item:hover {
  background-color: rgba(64,158,255,0.1);
}

.user-info {
  display: flex;
  align-items: center;
}

.welcome-text {
  margin-right: 20px;
  color: #606266;
  font-size: 14px;
}

.logout-btn {
  color: #f56c6c;
  font-size: 14px;
  padding: 0;
}

.logout-btn:hover {
  color: #f78989;
}

.el-main {
  margin-top: 60px;
  padding: 20px;
  min-height: calc(100vh - 60px);
}

@media screen and (max-width: 768px) {
  .header-content {
    flex-direction: column;
    height: auto;
    padding: 10px;
  }

  .left-section {
    flex-direction: column;
    width: 100%;
  }

  .logo {
    margin-right: 0;
    margin-bottom: 10px;
  }

  .horizontal-menu {
    width: 100%;
    justify-content: center;
  }

  .user-info {
    margin-top: 10px;
  }
}
</style>
