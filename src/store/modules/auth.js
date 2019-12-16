import * as Auth from '@/utils/auth'
import AuthService from '@/api/auth'
// import router from '@router';
import * as types from '../mutationTypes'

const state = {
  authenticated: !!Auth.getToken()
}

const mutations = {
  [types.AUTHENTICATED](state) {
    state.authenticated = true
  }
}

const actions = {
  async login({ commit }, params) {
    try {
      const response = await AuthService.login(params)
      commit(types.AUTHENTICATED)
      Auth.setToken(response)
    } catch (error) {
      throw error
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
