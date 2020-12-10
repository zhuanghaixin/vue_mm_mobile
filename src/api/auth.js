import instance from '@/utils'

export function authInfo (data) {
  return instance({
    url: '/au/code',
    method: 'GET',
    params: data
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
