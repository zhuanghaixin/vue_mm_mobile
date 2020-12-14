// todo 2-3 axios封装
// 1 导入
import axios from 'axios'
// axios封装

// todo 3-8 登录错误处理
import { Toast } from 'vant'

// todo 4-2-2 删除token
import * as Token from '@/utils/token'

// todo 4-2-3 导入vuex
import store from '@/store/index'

// todo 4-2-4 导入router
import router from '@/router/index'

const instance = axios.create({
  baseURL: process.env.VUE_APP_URL
})

instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // console.log('config')
    // console.log(config)
    // todo 4-3 请求拦截器
    if (config.needToken) {
      config.headers = { authorization: `Bearer ${Token.getLocalToken('mm_token')}` }
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  function (response) {
    console.log('response.data.code......')
    console.log(response.data.code)
    // 对响应数据做点什么
    if (response.data.code === 200) {
      return response.data
    } else if (response.data.code === 401 || response.data.code === 403) { // todo 4-2 token过期
      // todo 4-2-1 提示
      Toast.fail(response.data.message)
      // todo 4-2-2 删除token
      Token.removeLocalToken('mm_token')
      // todo 4-2-3 设置用户登录状态为false
      store.commit('setIsLogin', false)
      // todo 4-2-4 跳转到login
      router.push('/login')
      // todo 4-2-5 中止then
      return Promise.reject(new Error(response.data.message))
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
