import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: 'departments',
        name: 'Departments',
        component: () => import('../views/Departments.vue')
      },
      {
        path: 'doctors/:id',
        name: 'Doctors',
        component: () => import('../views/Doctors.vue'),
        props: route => ({
          id: Number(route.params.id)
        })
      },
      {
        path: 'appointment/:doctorId',
        name: 'Appointment',
        component: () => import('../views/Appointment.vue')
      },
      {
        path: 'records',
        name: 'Records',
        component: () => import('../views/Records.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
  
  // 不需要登录的路由
  if (to.path === '/login' || to.path === '/register') {
    next()
    return
  }
  
  // 需要登录但未登录
  if (!token) {
    next('/login')
    return
  }
  
  // 只允许病人访问
  if (userInfo.roleid !== 2) {
    next('/login')
    return
  }
  
  next()
})

export default router
