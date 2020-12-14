import instance from '../utils/http'

export function authInfo (token) {
  return instance({
    url: '/au/info',
    method: 'GET',
    //  fixme 获取用户信息 需要携带authorization请求头，这样比较麻烦，所以需要在请求拦截器中设置
    // headers: {
    //   authorization: `Bearer ${token}`
    // }
    needToken: true

  })
}

// fixme authorization
export function authEdit (data) {
  return instance({
    url: '/au/edit',
    method: 'POST',
    data: data
  })
}

// fixme 待修改
export function uplooad (data) {
  return instance({
    url: '/upload',
    method: 'POST'
  })
}
