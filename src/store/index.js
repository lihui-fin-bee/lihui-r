import Vue from 'vue'
import Vuex from 'vuex'
import risk from './modules/risk'
import auth from './modules/auth'
import app from './modules/app'
import settings from './modules/settings'

Vue.use(Vuex)

const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name
}

export default new Vuex.Store({
  modules: {
    risk,
    auth,
    app,
    settings
  },
  getters
})
