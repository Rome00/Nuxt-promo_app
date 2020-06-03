export const state = () => ({
  item: null
})

export const mutations = {
  SET_HERO: (state, hero) => {
    state.item = hero
  }
}

export const actions = {
  createHero({ commit, state }, heroData) {
    this.$axios
      .$post('/api/v1/product-heroes', heroData)
      .then(hero => {
        commit('SET_HERO', hero)
        return state.item
      })
      .catch(err => Promise.reject(err))
  },
  fetchCourseHero({ commit, state }) {
    return this.$axios
      .$get('/api/v1')
      .then(data => {
        const { productHero } = data
        commit('SET_HERO', productHero)
        return state.item
      })
      .catch(err => Promise.reject(err))
  }
}
