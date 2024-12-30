// ! src/axios.ts
// 这个文件用来统一所有的Axios配置
import axios from 'axios'

// 先设置一个固定的API服务器
const apiClient = axios.create({
  // 根URL
  baseURL: 'http://localhost:8000',
  // 超时时间
  timeout: 5000,
})

// 可以根据需要配置请求头和拦截器
apiClient.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default apiClient
