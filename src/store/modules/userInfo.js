import * as AuthApi from '@/api/auth'
// import login from './modules/login'
const state = {
  userInfo: ''
}
const getters = {
  getUserInfo (state) {
    return state.userInfo
  }
}
const mutations = {
  setUserInfo (state, payload) {
    state.userInfo = payload
  }
}

const actions = {
  async refreshUserInfo ({ commit }, payload) {
    // 用户信息
    // fixme 为什么这里可以使用setIsLogin
    const res = await AuthApi.authInfo()
    commit('setUserInfo', res.data)
    commit('setIsLogin', true)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
