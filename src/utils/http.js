// todo 2-3 axios封装
// 1 导入
import axios from 'axios'
// axios封装

// todo 3-8 登录错误处理
import { Toast } from 'vant'

const instance = axios.create({
  baseURL: process.env.VUE_APP_URL
})

instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    console.log('config')
    console.log(config)
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    if (response.data.code === 200) {
      return response.data
    } else {
      Toast.fail(response.data.message)
      return Promise.reject(new Error(response.data.message))
    }
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default instance
