export function setLocalToken (key, value) {
  window.localStorage.setItem(key, value)
}

export function getLocalToken (key) {
  return window.localStorage.getItem(key)
}

export function removeLocalToken (key) {
  window.localStorage.removeItem(key)
}
