import instance from '@/utils/http'

// fixme authorization
export function questionCompanyFilter (id) {
  return instance({
    url: `/questions/companyFilters/${id}`,
    method: 'GET'
  })
}

export function questionCompany (id) {
  return instance({
    url: `/questions/company/${id}`,
    method: 'GET'
  })
}

// fixme authorization
export function questionSubmit (data) {
  return instance({
    url: '/questions/submit',
    method: 'POST',
    needToken: true,
    data
  })
}

// fixme authorization
export function questionDetail (id) {
  return instance({
    url: `/questions/${id}`,
    method: 'GET',
    needToken: true
  })
}

// fixme authorization
export function questionCollect () {
  return instance({
    url: '/question/collect',
    method: 'POST'
  })
}

// fixme authorization
export function questionComment () {
  return instance({
    url: '/questions/comment',
    method: 'POST'
  })
}
