export const state = () => ({
  items: {
    drafts: [],
    published: []
  },
  item: {},
  isActive: false
})

export const mutations = {
  SET_BLOG: (state, blog) => {
    state.item = blog
  },
  SET_BLOGS(state, { recourses, items }) {
    state.items[recourses] = items
  },
  SET_IS_ACTIVE: (state, isActive) => {
    state.isActive = isActive
  }
}

export const actions = {
  createBlog(_, blogData) {
    return this.$axios
      .$post('/api/v1/blogs', blogData)
      .then(blog => blog)
      .catch(error => Promise.reject(error))
  },
  fetchBlogById({ commit }, blogId) {
    return this.$axios
      .$get(`/api/v1/blogs/${blogId}`)
      .then(blog => commit('SET_BLOG', blog))
  },
  fetchUserBlogs({ commit }) {
    return this.$axios.$get('/api/v1/blogs/me').then(blogs => {
      const { published, drafts } = separateBlogs(blogs)
      commit('SET_BLOGS', { recourses: 'drafts', items: drafts })
      commit('SET_BLOGS', { recourses: 'published', items: published })
    })
  },
  updateBlog({ commit }, { data, id }) {
    commit('SET_IS_ACTIVE', true)
    return this.$axios
      .$patch(`/api/v1/blogs/${id}`, data)
      .then(blog => {
        commit('SET_BLOG', blog)
        commit('SET_IS_ACTIVE', false)
      })
      .catch(err => {
        commit('SET_IS_ACTIVE', true)
        return Promise.reject(err)
      })
  }
}

function separateBlogs(blogs) {
  const published = []
  const drafts = []
  blogs.forEach(blog => {
    blog.status === 'published' ? published.push(blog) : drafts.push(blog)
  })
  return { published, drafts }
}
