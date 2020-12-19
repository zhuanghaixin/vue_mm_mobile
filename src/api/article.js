import instance from '../utils/http'
import axios from 'axios'
// todo 7-6 取消接口调用
// todo 7-6-1 导入axios
//
let _cancel = ''

export function articleTechnicList (params) {
  return instance({
    url: '/articles/technic',
    method: 'GET',
    params
  })
}

export function articleTechnic (id) {
  return instance({
    url: `/articles/technic/${id}`,
    method: 'GET'
  })
}

export function articleTechnicTopSearch () {
  return instance({
    url: '/articles/technicTopSearch',
    method: 'GET'
  })
}

export function articleShareList (params) {
  // if (typeof _cancel === 'function') {
  //   _cancel()
  // }
  try {
    // todo 7-6-4 每次接口调用前取消
    _cancel()
  } catch (err) {
    // console.log('err')
    // console.log(err)
  }
  return instance({
    url: '/articles/share',
    method: 'GET',
    params,
    // todo 7-6-2 配置cancelToken   7-6-3 拿到该接口的取消方法
    cancelToken: new axios.CancelToken((cancel) => {
      // console.log('cancel')
      // console.log(cancel)
      _cancel = cancel //  todo 7-6-3 拿到该接口的取消方法
    })
  })
}

export function articleShareDetail (id) {
  return instance({
    url: `/articles/share/${id}`,
    method: 'GET'
  })
}

export function articleShareTopSearch () {
  return instance({
    url: '/articles/shareTopSearch',
    method: 'GET'
  })
}

export function articleComment (id) {
  return instance({
    url: `/articles/comments/${id}`,
    method: 'GET'
  })
}

// fixme authorization

export function addArticleComment () {
  return instance({
    url: '/articles/comments',
    method: 'POST'
  })
}

// fixme authorization
export function articleStar () {
  return instance({
    url: '/articles/star',
    method: 'POST'
  })
}

// fixme authorization
export function articleCollect () {
  return instance({
    url: '/articles/collect',
    method: 'POST'
  })
}

// fixme authorization
export function articleMergeHistory () {
  return instance({
    url: '/articles/mergeHistory',
    method: 'POST'
  })
}
