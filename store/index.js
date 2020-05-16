export const actions = {
  async nuxtServerInit({ commit, dispatch }) {
    await dispatch('auth/getAuth').catch(() => {
      console.log('not auth')
    })
  }
}
