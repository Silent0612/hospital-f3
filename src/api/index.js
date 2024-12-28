import axios from 'axios'

// 创建axios实例
const api = axios.create({
  baseURL: '/api',
  timeout: 5000
})

// 请求拦截器
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 200) {
      return res
    } else {
      // 统一处理错误
      const error = new Error(res.message || '请求失败')
      error.code = res.code
      return Promise.reject(error)
    }
  },
  error => {
    return Promise.reject(error)
  }
)

// 用户相关接口
export const userApi = {
  // 登录
  login: (phone, password) => {
    return api.post('/shiro/login', { phone, password })
  },
  // 注册
  register: (data) => {
    return api.post('/user/register', data)
  },
  // 退出登录
  logout: () => {
    return api.post('/shiro/logout')
  }
}

// 科室相关接口
export const departmentApi = {
  // 获取所有科室
  getAll: () => {
    return api.get('/departmentinfo/list')
  }
}

// 医生相关接口
export const doctorApi = {
  // 根据科室ID获取医生列表
  getByDepartment: (depId) => {
    return api.get('/empinfo/findByDid', { params: { id: depId } })
  }
}

// 预约相关接口
export const appointmentApi = {
  // 创建预约
  create: (data) => {
    return api.post('/appointments', data)
  },
  // 获取预约列表
  getMyList: (userId, page = 1, size = 10) => {
    return api.get('/appointments/my', { 
      params: { 
        userId,
        page,
        size
      }
    })
  },
  // 获取预约详情
  getDetail: (id) => {
    return api.get(`/appointments/${id}`)
  },
  // 取消预约
  cancel: (id) => {
    return api.put(`/appointments/${id}/cancel`)
  }
}

export default {
  user: userApi,
  department: departmentApi,
  doctor: doctorApi,
  appointment: appointmentApi
}
