export const state = () => ({
  courses: [],
  item: null
})

export const actions = {
  fetchCourses({ commit, state }) {
    return this.$axios.$get('/api/v1/products').then(courses => {
      commit('SET_ITEMS', { resource: 'course', items: courses })
      return state.courses
    })
  },
  fetchCourseBySlug({ commit, state }, slug) {
    return this.$axios.$get(`/api/v1/products/s/${slug}`).then(course => {
      commit('SET_ITEMS_BY_SLUG', course)
      return state.course
    })
  }
}

export const mutations = {
  SET_ITEMS(state, course) {
    state.courses = course
  },
  SET_ITEMS_BY_SLUG(state, course) {
    state.item = course
  }
}
