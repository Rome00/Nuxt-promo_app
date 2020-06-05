export const state = () => ({
  heroes: []
})

export const mutations = {
  SET_HEROS: (state, heroes) => {
    state.heroes = heroes
  }
}

export const actions = {
  fetchHeroes({ commit, store }) {
    return this.$axios.$get('api/v1/product-heroes').then(heroes => {
      commit('SET_HEROS', heroes)
      return state.heros
    })
  },
  activateHero({ commit }, heroId) {
    return this.$axios
      .$patch(`/api/v1/product-heroes/${heroId}`)
      .then(activeHero => {
        commit('courseHero/SET_HERO', activeHero, { root: true })
        return activeHero
      })
      .catch(error => Promise.reject(error))
  }
}
