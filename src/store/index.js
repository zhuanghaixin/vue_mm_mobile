import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'
import login from './modules/login'
import userInfo from './modules/userInfo'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: 0
  },
  getters,
  mutations,
  actions,
  modules: {
    login,
    userInfo
  }

  /* state: {
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
  } */
})
