import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}'),
    token: localStorage.getItem('token') || ''
  },
  mutations: {
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
    },
    SET_TOKEN(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    CLEAR_USER_INFO(state) {
      state.userInfo = {}
      state.token = ''
      localStorage.removeItem('userInfo')
      localStorage.removeItem('token')
    }
  },
  actions: {
    // 登录成功后保存用户信息
    saveUserInfo({ commit }, { userInfo, token }) {
      commit('SET_USER_INFO', userInfo)
      commit('SET_TOKEN', token)
    },
    // 退出登录
    logout({ commit }) {
      commit('CLEAR_USER_INFO')
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    userInfo: state => state.userInfo
  }
})
