import instance from '../utils/http'

// fixme authorization
export function comments () {
  return instance({
    url: '/comments',
    method: 'POST'
  })
}

// fixme authorization
export function artileCommentStar (data) {
  return instance({
    url: '/article-comments/star',
    method: 'POST',
    data,
    needToken: true
  })
}
