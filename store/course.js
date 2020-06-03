export const state = () => ({
  courses: []
})

export const actions = {
  fetchCourses({ commit, state }) {
    return this.$axios.$get('/api/v1/products').then(courses => {
      commit('SET_ITEMS', { resource: 'course', items: courses })
      return state.courses
    })
  }
}

export const mutations = {
  SET_ITEMS(state, course) {
    state.courses = course
  }
}
