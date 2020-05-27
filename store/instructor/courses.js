export const state = () => ({
  items: [],
  item: {},
  canUpdateCourse: false
})
export const mutations = {
  SET_INSTRUCTOR_COURSES(state, courses) {
    state.items = courses
  },
  SET_COURSE(state, course) {
    state.item = course
  },
  SET_COURSE_VALUE(state, { value, field }) {
    state.item[field] = value
  },
  SET_CAN_UPDATE(state, canUpdate) {
    state.canUpdateCourse = canUpdate
  },
  ADD_LINE(state, field) {
    state.item[field].push({ value: '' })
  },
  REMOVE_LINE(state, { field, index }) {
    state.item[field].splice(index, 1)
  },
  SET_LINE(state, { field, value, index }) {
    state.item[field][index].value = value
  }
}

export const actions = {
  fetchInstructorCourses({ commit }) {
    return this.$axios
      .$get('/api/v1/products/user-products')
      .then(courses => {
        commit('SET_INSTRUCTOR_COURSES', courses)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },
  createCourse(_, form) {
    return this.$axios.$post('/api/v1/products/', form)
  },
  updateCourse({ state, commit }) {
    const course = state.item
    return this.$axios
      .$patch(`/api/v1/products/${course._id}`, course)
      .then(course => {
        commit('SET_COURSE', course)
        commit('SET_CAN_UPDATE', false)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  fetchCourseById({ commit }, id) {
    return this.$axios
      .$get(`/api/v1/products/${id}`)
      .then(course => {
        commit('SET_COURSE', course)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },

  // TODO: cache previous value and verify if you can update course
  // TODO: set canUpdate only when course values has beed updated
  updateLine({ commit }, { index, value, field }) {
    commit('SET_LINE', { index, value, field })
    commit('SET_CAN_UPDATE', true)
  },
  updateCourseValue({ commit }, { value, field }) {
    commit('SET_COURSE_VALUE', { value, field })
    commit('SET_CAN_UPDATE', true)
  }
}

export const getters = {
  getCourses(state) {
    return state.items
  }
}
