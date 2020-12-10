import instance from '@/utils'

export function chartDataHot () {
  return instance({
    url: '/chart-data/hot',
    method: 'GET'
  })
}

export function chartDataIndex () {
  return instance({
    url: '/chart-data/indexes',
    method: 'POST'
  })
}

export function chartDataStatistics () {
  return instance({
    url: '/chart-data/statistics',
    method: 'POST'
  })
}
