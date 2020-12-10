import instance from '../utils/http'

export function interviewFilter () {
  return instance({
    url: '/interview/filters',
    method: 'GET'
  })
}

export function interviewQuestion () {
  return instance({
    url: '/interview/questions',
    method: 'GET'
  })
}
