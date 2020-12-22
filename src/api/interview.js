import instance from '../utils/http'

export function interviewFilters () {
  return instance({
    url: '/interview/filters',
    method: 'GET',
    needToken: true
  })
}

export function interviewQuestion () {
  return instance({
    url: '/interview/questions',
    method: 'GET'
  })
}
