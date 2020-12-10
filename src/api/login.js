import instance from '../utils/http'

export function authCode (data) {
  console.log('instance')
  console.log(instance)
  return instance({
    url: '/au/code',
    method: 'POST',
    data: data
  })
}

export function login (data) {
  return instance({
    url: '/au/login',
    method: 'POST',
    data: data
  })
}
