<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Microsoft YaHei', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
  background: linear-gradient(135deg, #e0f2ff 0%, #f5f7fa 100%);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
}

/* 全局样式覆盖 */
.el-card {
  border-radius: 12px;
  border: none;
  transition: all 0.3s ease;
}

.el-button {
  border-radius: 8px;
  font-weight: 500;
  padding: 12px 20px;
  transition: all 0.3s ease;
}

.el-button--primary {
  background: linear-gradient(135deg, #409EFF 0%, #36a3f7 100%);
  border: none;
}

.el-button--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(64,158,255,0.3);
  background: linear-gradient(135deg, #36a3f7 0%, #409EFF 100%);
}

.el-input__inner {
  border-radius: 8px;
  padding: 0 15px;
  height: 40px;
  border: 1px solid #dcdfe6;
  transition: all 0.3s ease;
}

.el-input__inner:focus {
  border-color: #409EFF;
  box-shadow: 0 0 0 2px rgba(64,158,255,0.2);
}

.el-menu {
  border-right: none;
  background: transparent;
}

.el-menu-item {
  height: 50px;
  line-height: 50px;
  margin: 8px 0;
  border-radius: 8px;
}

.el-menu-item.is-active {
  background: linear-gradient(135deg, #409EFF 0%, #36a3f7 100%);
  color: white !important;
}

.el-menu-item:hover {
  background: rgba(64,158,255,0.1);
}

.el-table {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.05);
}

.el-table th {
  background-color: #f5f7fa;
  color: #606266;
  font-weight: 600;
}

.el-pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
