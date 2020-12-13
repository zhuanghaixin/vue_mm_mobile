import instance from '../utils/http'
export function authInfo (token) {
  return instance({
    url: '/au/info',
    method: 'GET',
    headets: {
      authorization: `Bearer ${token}`
    }

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
