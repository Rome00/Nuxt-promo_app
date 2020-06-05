export const actions = {
  async nuxtServerInit({ commit, dispatch }) {
    await dispatch('auth/getAuth').catch(() => {
      // eslint-disable-next-line no-console
      console.log('not auth')
    })
    await dispatch('courseHero/fetchCourseHero').catch(() => {})
  }
}
