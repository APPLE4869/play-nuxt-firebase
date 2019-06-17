import Post from "~/models/Post"

export const state = () => ({
  posts: []
})

export const getters = {
  getPosts(state) {
    return state.posts.map(p => new Post(p))
  }
}

export const mutations = {
  mergePosts(state, payload){
    state.posts = state.posts.concat(payload)
  },
  setPosts(state, payload) {
    state.posts = payload
  },
}

export const actions = {
  resetPosts({ commit }) {
    commit('setPosts', [])
  },
  mergePosts({ commit }, posts) {
    const postHashes = posts.map(p => p.toHash())
    commit('mergePosts', postHashes)
  }
}
