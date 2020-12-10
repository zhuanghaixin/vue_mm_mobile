import instance from '@/utils'

// fixme authorization
export function systemMessage () {
  return instance({
    url: '/system-messages',
    method: 'GET'
  })
}

// fixme authorization
export function systemMessageRead () {
  return instance({
    url: '/system-messages/read',
    method: 'POST'
  })
}
