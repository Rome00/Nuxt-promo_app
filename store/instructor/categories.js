export const state = () => ({
  items: []
})
export const mutations = {
  SET_CATEGORIES(state, categories) {
    state.items = categories
  }
}
export const getters = {
  hasCategories(state) {
    return state.items.length > 0
  },
  getCategories(state) {
    return state.items
  }
}
export const actions = {
  fetchCategories({ commit, getters }) {
    if (getters.hasCategories) return

    return this.$axios
      .$get('/api/v1/categories')
      .then(categories => {
        commit('SET_CATEGORIES', categories)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  }
}
