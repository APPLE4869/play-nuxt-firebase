import User from "~/models/User"

export const state = () => ({
  user: null
})

export const getters = {
  isAuthenticated(state) {
    return !!state.user
  },
  getUser(state) {
    return new User(state.user)
  },
}

export const mutations = {
  setUser(state, payload){
    state.user = payload
  }
}

export const actions = {
  async login({ commit }, user) {
    commit('setUser', user.toHash())
  },
  logout({ commit }){
    commit('setUser', null)
  }
}
