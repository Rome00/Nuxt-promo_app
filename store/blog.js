import Vue from 'vue'

export const state = () => ({
  items: {
    all: [],
    featured: []
  },
  item: null,
  pagination: {
    count: 0, // Count of all of our published blogs
    pageCount: 0, // How many pages we want to display
    pageSize: 5, // How many items we want to display per page
    pageNum: 1 // Current page
  }
})

export const getters = {
  paginate(state) {
    return state.pagination
  },
  featuredBlogs(state) {
    return state.items.featured
  }
}

export const mutations = {
  SET_BLOG(state, { type, blogs }) {
    state.items[type] = blogs
  },
  GET_BLOG_BY_SLUG(state, blog) {
    state.item = blog
  },
  SET_PAGINATION(state, { count, pageCount }) {
    Vue.set(state.pagination, 'count', count)
    Vue.set(state.pagination, 'pageCount', pageCount)
  },
  SET_PAGE(state, currentPage) {
    Vue.set(state.pagination, 'pageNum', currentPage)
  }
}

export const actions = {
  // /api/v1/blogs?pageNum=10&pageSize=2
  fetchBlogs({ commit, state }, filter) {
    const url = this.$applyParamsToUrl('/api/v1/blogs', filter)
    return this.$axios
      .$get(url)
      .then(data => {
        const { blogs, count, pageCount } = data
        commit('SET_BLOG', { type: 'all', blogs })
        commit('SET_PAGINATION', { count, pageCount })
        return state.items
      })
      .catch(err => Promise.reject(err))
  },
  fetchFeaturedBlogs({ commit, state }, filter) {
    const url = this.$applyParamsToUrl('/api/v1/blogs', filter)
    return this.$axios
      .$get(url)
      .then(data => {
        const { blogs } = data
        commit('SET_BLOG', { type: 'featured', blogs })
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
