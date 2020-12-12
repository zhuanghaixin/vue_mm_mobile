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
  asyncSetUserInfo ({ commit }, payload) {
    commit('setUserInfo', payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
