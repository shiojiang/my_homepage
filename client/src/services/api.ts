import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器 - 添加 Token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 响应拦截器 - 统一错误处理
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const isAuthEndpoint = error.config?.url?.startsWith('/auth/')

    // 401 且非认证接口（登录/注册）才清除登录态
    if (error.response?.status === 401 && !isAuthEndpoint) {
      localStorage.removeItem('token')
      // 清除 Zustand 持久化数据
      localStorage.removeItem('auth-storage')
      window.location.href = '/login'
    }

    return Promise.reject(error)
  },
)

export default api
