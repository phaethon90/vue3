import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

//请求拦截器
service.interceptors.request.use(
  (config) => {
    config.headers.Authorization = localStorage.getItem('token')
    return config
  },
  (error) => {
    return Promise.reject(new Error(error))
  }
)

//响应拦截器
service.interceptors.response.use(
  (response) => {
    // console.log(response)
    const { data, code, message } = response.data //解构取出数据，此处code为状态值
    //请求响应成功
    if (code === 200 || code === 201) {
      return data
    }
    //请求响应失败
    else {
      ElMessage.error(message)
      return Promise.reject(new Error(message)) //返回错误信息
    }
  },
  //没有响应时
  (error) => {
    error.response && ElMessage.error(error.response.data.message)
    return Promise.reject(new Error(error.response.data.message))
  }
)
export default service
