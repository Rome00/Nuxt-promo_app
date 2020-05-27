export const state = () => ({
  courses: []
})
export const getters = {
  getCourses(state) {
    return state.courses.items
  }
}

export const actions = {
  fetchCourses({ commit }) {
    return this.$axios.$get('/api/v1/products').then(courses => {
      commit('SET_ITEMS', { resource: 'course', items: courses })
    })
  }
}

export const mutations = {
  SET_ITEMS(state, course) {
    state.courses = course
  }
}
