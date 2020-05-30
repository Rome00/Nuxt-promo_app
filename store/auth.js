export const state = () => ({
  user: null
})
export const getters = {
  authUser(state) {
    return state.user || null
  },
  isAuthenticated(state) {
    return !!state.user
  },
  isAdmin(state) {
    return state.user && state.user.role && state.user.role === 'admin'
  }
}

export const actions = {
  // Login actin
  login({ commit }, loginData) {
    return this.$axios
      .$post('/api/v1/users/login', loginData)
      .then(user => {
        commit('SET_USER', user)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },
  // Login from local storage
  getAuth({ commit, getters }) {
    const authUser = getters.authUser
    if (authUser) return Promise.resolve(authUser)
    return this.$axios
      .$get('/api/v1/users/me')
      .then(user => {
        commit('SET_USER', user)
      })
      .catch(error => {
        commit('SET_USER', null)
        return Promise.reject(error)
      })
  },
  // Log out user
  logOutUser({ commit }) {
    return this.$axios
      .$post('/api/v1/users/logout')
      .then(() => {
        commit('SET_USER', null)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },
  // Register user
  registerUser(_, registerData) {
    return this.$axios
      .$post('/api/v1/users/register', registerData)
      .catch(error => {
        let errorMessage = 'Uuups, something went wrong, try to register again!'
        if (error.response.data.errors) {
          errorMessage = error.response.data.errors.message
        }
        return Promise.reject(errorMessage)
      })
  }
}

export const mutations = {
  SET_USER(state, user) {
    state.user = user
  }
}
