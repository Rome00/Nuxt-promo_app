<template>
  <div>
    <Header title="Manage your Blogs" exit-link="/" />
    <div class="instructor-blogs">
      <div class="container">
        <div class="section">
          <div class="header-block">
            <h2>Your Stories</h2>
            <div class="title-menu">
              <button
                class="button"
                @click="() => $router.push({ name: 'instructor-blog-editor' })"
              >
                Write a story
              </button>
            </div>
          </div>
          <div class="tabs">
            <ul>
              <li @click="blogKey = 0">
                <a
                  class="has-amber-text text-lighten-1"
                  :class="{ 'is-active': blogKey === 0 }"
                >
                  Drafts
                </a>
              </li>
              <li @click="blogKey = 1">
                <a
                  class="has-green-text text-lighten-1"
                  :class="{ 'is-active': blogKey === 1 }"
                >
                  Published
                </a>
              </li>
            </ul>
          </div>
          <div class="blogs-container">
            <transition
              mode="out-in"
              :css="false"
              @before-enter="beforeEnter"
              @enter="enter"
              @before-leave="beforeLeave"
              @leave="leave"
            >
              <template v-if="blogKey === 0">
                <div v-if="blogs.drafts && blogs.drafts.length > 0" key="0">
                  <div
                    v-for="blog in blogs.drafts"
                    :key="blog._id"
                    class="blog-card"
                  >
                    <h2>{{ blog.title }}</h2>
                    <div class="blog-card-footer">
                      <span>
                        Last Edited:
                        <span class="has-grey-text">
                          {{ blog.updatedAt | date('llll') }}
                        </span>
                      </span>
                      <drop-down
                        :items="draftOptions"
                        @optionChanged="handelOption($event, blog)"
                      />
                    </div>
                  </div>
                </div>
                <!-- In case of no drafts blogs  -->
                <div v-else class="blog-error">
                  No Drafts :(
                </div>
              </template>
              <template v-else>
                <div v-if="blogs.published && blogs.published.length" key="1">
                  <div
                    v-for="blog in blogs.published"
                    :key="blog._id"
                    class="blog-card"
                    :class="{ featured: blog.featured }"
                  >
                    <h2>{{ blog.title }}</h2>
                    <div class="blog-card-footer">
                      <span>
                        Last Edited:
                        <span class="has-grey-text">
                          {{ blog.updatedAt | date('llll') }}
                        </span>
                      </span>
                      <drop-down
                        :items="publishedOptions(blog.featured)"
                        @optionChanged="handelOption($event, blog)"
                      />
                    </div>
                  </div>
                </div>
                <!-- In case of no drafts blogs  -->
                <div v-else class="blog-error">
                  No Drafts :(
                </div>
              </template>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { gsap } from 'gsap'
import DropDown from '@/components/shared/DropDown'
import Header from '@/components/shared/Header'
import {
  createPublishedOptions,
  createDraftsOptions,
  commands
} from '@/pages/instructor/blogs/options'

export default {
  layout: 'instructor',
  components: { Header, DropDown },
  async fetch({ store }) {
    await store.dispatch('instructor/blog/fetchUserBlogs')
  },
  data() {
    return {
      blogKey: 0
    }
  },
  computed: {
    ...mapState({
      blogs: ({ instructor }) => instructor.blog.items
    }),
    draftOptions() {
      return createDraftsOptions()
    }
  },
  methods: {
    handelOption(command, blog) {
      if (command === commands.EDIT_BLOG) {
        this.$router.push(`/instructor/blog/${blog._id}/edit`)
      }
      if (command === commands.DELETE_BLOG) {
        this.warningMessage(blog)
      }
      if (command === commands.TOGGLE_FEATURE) {
        this.updateBlog(blog)
      }
    },
    updateBlog(blog) {
      const featured = !blog.featured
      const featureStatus = featured ? 'Featured' : 'Un-Featured'
      this.$store
        .dispatch('instructor/blog/updatePublishedBlog', {
          id: blog._id,
          data: { featured }
        })
        .then(_ => {
          this.$toasted.success(`Blog has been ${featureStatus}!`, {
            duration: 2000,
            position: 'bottom-right'
          })
        })
        .catch(_ => {
          this.$toasted.error('blog status was not updated!', {
            duration: 2000,
            position: 'bottom-right'
          })
        })
    },
    publishedOptions(isFeatured) {
      return createPublishedOptions(isFeatured)
    },
    warningMessage(blog) {
      const isConfirm = confirm('Are you sure you want to delete blog ?')
      if (isConfirm) {
        this.$store
          .dispatch('instructor/blog/deleteBlog', blog)
          .then(_ =>
            this.$toasted.success('Blog was successfully deleted!', {
              duration: 2000,
              position: 'bottom-right'
            })
          )
          .catch(_ => {
            this.$toasted.error('blog cannot be deleted!', {
              duration: 2000,
              position: 'bottom-right'
            })
          })
      }
    },

    beforeEnter(el) {
      el.style.opacity = 0
    },
    enter(el, done) {
      gsap.to(el, {
        duration: 1,
        opacity: 1,

        ease: ' Back. easeInOut.config(3)',
        onComplete: done
      })
    },
    beforeLeave(el) {
      el.style.opacity = 1
    },
    leave(el, done) {
      gsap.to(el, {
        duration: 1,
        opacity: 0,

        ease: ' Back. easeInOut.config(3)',
        onComplete: done
      })
    }
  }
}
</script>

<style scoped lang="scss">
.is-active {
  border-bottom-color: #505763;
  color: #363636;
}
.blog-error {
  font-size: 35px;
}
.blog-card {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 20px 0;
  > h2 {
    font-size: 30px;
    font-weight: bold;
  }
  &-footer {
    color: rgba(0, 0, 0, 0.54);
  }
  &.featured {
    border-left: 8px solid #3cc314;
    padding-left: 10px;
    transition: border ease-out 0.2s;
  }
}
.header-block {
  display: flex;
  flex-direction: row;
  align-items: center;
  > h2 {
    font-size: 40px;
    font-weight: bold;
  }
  .title-menu {
    margin-left: auto;
  }
}
</style>
