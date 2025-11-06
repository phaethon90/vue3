import axios from 'axios'
import { ElMessage } from 'element-plus'
import { diffTokenTime } from '@/utils/auth'
import store from '@/store'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

//请求拦截器
service.interceptors.request.use(
  (config) => {
    //先判断是否存在token，再判断token是否过期
    if (localStorage.getItem('token')) {
      if (diffTokenTime()) {
        store.dispatch('app/logout')
        return Promise.reject(new Error('登录已过期，请重新登录'))
      }
    }
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
    if (error.response) {
      ElMessage.error(error.response.data.message)
      return Promise.reject(new Error(error.response.data.message))
    } else {
      if (error.message) {
        ElMessage.error(error.message)
      }
      return Promise.reject(error)
    }
  }
)
export default service
