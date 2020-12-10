import instance from '../utils/http'

export function companyList (data) {
  return instance({
    url: '/companies/list',
    method: 'GET',
    params: data
  })
}

export function companyDetail (id) {
  return instance({
    url: `/companies/${id}`,
    method: 'GET'
  })
}

export function companyComments (id) {
  return instance({
    url: `/companies/${id}/comments`,
    method: 'GET'
  })
}

export function companyPosition (id) {
  return instance({
    url: `/companies/${id}/positions`,
    method: 'GET'
  })
}

export function companyPositionFilters (id) {
  return instance({
    url: `/companies/${id}/positionFilters`,
    method: 'GET'
  })
}

export function companyPositionDetial (id) {
  return instance({
    url: `/positions/${id}`,
    method: 'GET'
  })
}
