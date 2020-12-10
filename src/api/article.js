import instance from '../utils/http'

export function articleTechnicList () {
  return instance({
    url: '/articles/technic',
    method: 'GET'
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

export function articleShareList (id) {
  return instance({
    url: '/articles/share',
    method: 'GET'
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
