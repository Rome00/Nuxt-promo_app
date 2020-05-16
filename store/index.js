export const mutations = {
  SET_ITEMS(state, { resource, items }) {
    state[resource].items = items
  }
}

export const getters = {
  getCourses: (state) => {
    return state.course.items
  }
}
