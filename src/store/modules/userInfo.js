import * as AuthApi from '@/api/auth'
// import login from './modules/login'
const state = {
  userInfo: ''
}
const getters = {
  getUserInfo (state) {
    return state.userInfo
  },
  // todo 9-9-2 使用getter进行封装
  setState (state, getters) {
    if (!getters.getIsLogin) {
      return 0
    }
    console.log(state, getters)
    return (fn, id) => {
      return getters.getUserInfo[fn] && getters.getUserInfo[fn].includes(+id)
    }
  },
  getTotalQuestion (state, getters) {
    return getters.getUserInfo.collectQuestions.length + getters.getUserInfo.errorQuestions.length
  },
  getRate (state, getters) {
    return (total) => {
      return parseInt(getters.getTotalQuestion / total * 100)
    }
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
