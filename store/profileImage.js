export const state = () => ({
  url: null
})

export const mutations = {
  setUrl(state, payload){
    state.url = payload
  }
}

export const actions = {
  async setUrl({ commit }, { url }) {
    commit('setUrl', url)
  }
}
