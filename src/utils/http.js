// todo 2-3 axios封装
// 1 导入
import axios from 'axios'
// axios封装

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
    return response
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default instance
