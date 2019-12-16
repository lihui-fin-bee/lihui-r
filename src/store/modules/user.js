import UserService from '@/api/user'
import { resetRouter } from '@/router'
import avatar from '@/assets/avatar.gif'
import { handlerSuccessResponse, getToken, setToken, removeToken, getName, setName, removeName } from '@/utils/auth'

const state = {
  token: getToken(),
  name: '',
  avatar: avatar
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  //  login
  async login({ commit }, userInfo) {
    try {
      await UserService.login(userInfo)
      /*   setToken(response)*/
    } catch (errorMessage) {
      return Promise.reject(errorMessage)
    }
  },

  // logout
  logout({ commit, state }) {
    try {
      removeToken()
    } catch (e) {
      throw e
    }
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  },

  tgeCon({ commit }, data) {
    return new Promise((resolve, reject) => {
      tgeCon(data).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

