import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: '',
    isLogin: 'false'
  },
  getters: {
    getUserInfo (state) {
      return state.userInfo
    },
    getIsLogin (state) {
      return state.isLogin
    }
  },
  mutations: {
    setUserInfo (state, payload) {
      this.state.userInfo = payload
    },
    setIsLogin (state, payload) {
      state.isLogin = payload
    }
  },
  actions: {
    asyncSetUserInfo ({ commit }, payload) {
      commit('setUserInfo', payload)
    },
    asyncSetIslogin ({ commit }, payload) {
      commit('setIsLogin', payload)
    }
  }
})
