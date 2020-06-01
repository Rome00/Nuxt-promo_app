export const state = () => ({
  items: {
    all: [],
    featured: []
  },
  item: null
})

export const mutations = {
  GET_BLOG: (state, { type, blogs }) => {
    state.items[type] = blogs
  },
  GET_BLOG_BY_SLUG(state, blog) {
    state.item = blog
  }
}

export const actions = {
  fetchBlogs({ commit }) {
    return this.$axios
      .$get('/api/v1/blogs')
      .then(data => {
        const { blogs } = data
        commit('GET_BLOG', { type: 'all', blogs })
      })
      .catch(err => Promise.reject(err))
  },
  fetchFeaturedBlogs({ commit, state }, filter) {
    const url = this.$applyParamsToUrl('/api/v1/blogs', filter)
    return this.$axios
      .$get(url)
      .then(data => {
        const { blogs } = data
        commit('GET_BLOG', { type: 'featured', blogs })
        return state.items.featured
      })
      .catch(error => Promise.reject(error))
  },
  fetchBlogBySlug({ commit }, slug) {
    return this.$axios
      .$get(`/api/v1/blogs/s/${slug}`)
      .then(blog => {
        commit('GET_BLOG_BY_SLUG', blog)
      })
      .catch(err => Promise.reject(err))
  }
}
