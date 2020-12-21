// todo 2-3 axios封装
// 1 导入
import axios from 'axios'
// todo 3-8 登录错误处理
import { Toast } from 'vant'

// todo 4-2-2 删除token
import * as Token from '@/utils/token'

// todo 4-2-3 导入vuex
import store from '@/store/index'

// todo 4-2-4 导入router
import router from '@/router/index'
// axios封装
// todo 7-7 全局取消接口操作
// todo 7-7-1 定义取消方法集合
import { removeLocalToken } from '@/utils/token'
let cancelArr = []
// 取消某个接口
//  todo 7-7-3 全局定义取消方法论， 取消单个url或者取消全部
window.cancelAxios = function (url = '', cancelAll = false) {
  /*
    返回值=数组.filter((item,index,arr)=>{
      return true  返回值.push(item)
            false   不添加
    })
  */
  cancelArr = cancelArr.filter(item => {
    if (cancelAll) {
      // 取消所有接口请求
      item.c()
      return false
    } else {
      if (item.url === url) {
        item.c()
        return false
      } else {
        return true
      }
    }
  })
  // window.console.log(cancelArr)
}

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

    // todo 7-7-4 取消操作
    window.cancelAxios(config.url)
    // todo 7-7-2 生成每一个接口的取消方法并存储，同时存储该接口的url
    config.cancelToken = new axios.CancelToken(cancel => {
      cancelArr.push({
        url: config.url,
        c: cancel
      })
    })
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
      if (response.config.noError) {
        // todo 9-5-3 如果noError=true 不跳转登录页，删除token，中止then执行
        removeLocalToken('mm_token')
        return Promise.reject(new Error('人为的错误，别理'))
      } else {
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
      }
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
// fixme todo 7-8 统一处理所有接口请求
const _ajax = function (obj) {
  return new Promise((resolve, reject) => {
    instance(obj)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        console.log(err)
      })
  })
}

export default _ajax
