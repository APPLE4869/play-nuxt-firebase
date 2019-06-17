import Profile from "~/models/Profile"

export const state = () => ({
  profile: null
})

export const getters = {
  isRegistered(state) {
    return !!state.profile
  },
  getProfile(state) {
    return Profile.fromHash(state.profile)
  },
}

export const mutations = {
  setProfile(state, payload){
    state.profile = payload
  }
}

export const actions = {
  async setProfile({ commit }, profile) {
    commit('setProfile', profile.toHash())
  }
}
