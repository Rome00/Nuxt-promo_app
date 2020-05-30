<template>
  <!-- Finish handling of URL -->
  <div>
    <Header title="Write your blog" exit-link="/instructor/blogs">
      <!-- TODO: Check if blog status is active -->
      <template v-if="blog.status === 'active'" #actionMenu>
        <div class="full-page-takeover-header-button">
          <Modal
            title="Review Details"
            open-title="Publish"
            open-btn-class="button is-success is-medium is-inverted is-outlined"
            @opened="checkBlogValidity"
            @submitted="updateBlogStatus($event, 'published')"
          >
            <div>
              <div class="title">
                Once you publish blog you cannot change url to a blog.
              </div>
              <!-- Check for error -->
              <div v-if="!publishError">
                <div class="subtitle">
                  This will be your blog's url after publish:
                </div>
                <article class="message is-success">
                  <div class="message-body">
                    <strong>{{ getBlogUrl() }}/blogs/{{ slug }}</strong>
                  </div>
                </article>
              </div>
              <article v-else class="message is-danger">
                <div class="message-body">
                  {{ publishError }}
                </div>
              </article>
            </div>
          </Modal>
        </div>
      </template>
      <template v-else #actionMenu>
        <div class="full-page-takeover-header-button">
          <Modal
            open-title="Unpublish"
            open-btn-class="button is-success is-medium is-inverted is-outlined"
            title="Unpublish Blog"
            @submitted="updateBlogStatus($event, 'active')"
          >
            <div>
              <div class="title">
                Unpublish blog so it's no longer displayed in blogs page
              </div>
            </div>
          </Modal>
        </div>
      </template>
    </Header>
    <div class="blog-editor-container">
      <div class="container">
        <editor
          ref="editor"
          :is-saving="isSaving"
          @editorMounted="initBlogContent"
          @editorUpdated="updateBlog"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import slugify from 'slugify'
import Editor from '@/components/editor'
import Header from '@/components/shared/Header'
import Modal from '@/components/shared/Modal'

export default {
  layout: 'instructor',
  components: {
    Editor,
    Header,
    Modal
  },
  async fetch({ params, store }) {
    await store.dispatch('instructor/blog/fetchBlogById', params.id)
  },
  data() {
    return {
      publishError: '',
      slug: '',
      error: true
    }
  },
  computed: {
    ...mapState({
      blog: ({ instructor }) => instructor.blog.item,
      isSaving: ({ instructor }) => instructor.blog.isSaving
    })
  },
  methods: {
    // TODO: fix color scheme of code block in editor!
    initBlogContent(initContent) {
      if (this.blog && this.blog.content) {
        initContent(this.blog.content)
      }
    },
    updateBlog(blogData) {
      if (!this.isSaving) {
        this.$store
          .dispatch('instructor/blog/updateBlog', {
            data: blogData,
            id: this.blog._id
          })
          .then(_ =>
            this.$toasted.success('Blog Updated!', {
              duration: 2000,
              position: 'bottom-right'
            })
          )
          .catch(_ =>
            this.$toasted.error('Blog cannot be saved!', {
              duration: 2000,
              position: 'bottom-right'
            })
          )
      }
    },
    checkBlogValidity() {
      const title = this.$refs.editor.getNodeValueByName('title')
      this.error = true
      this.publishError = ''
      this.slug = ''
      if (title && title.length > 15) {
        // create slug from title
        this.slug = this.slugify(title)
        this.error = false
      } else {
        this.publishError =
          'Cannot publish! Title needs to be longer than 24 characters!'
      }
    },
    getBlogUrl() {
      return process.client && window.location.origin
    },
    slugify(text) {
      return slugify(text, {
        replacement: '-',
        remove: null,
        lower: true
      })
    },

    updateBlogStatus({ closeModal }, status) {
      const blogContent = this.$refs.editor.getContent()
      blogContent.status = status

      const message =
        status === 'published'
          ? 'Blog has been successfully published'
          : 'Blog has been successfully unpublished'
      if (!this.error) {
        this.$store
          .dispatch('instructor/blog/updateBlog', {
            data: blogContent,
            id: this.blog._id
          })
          .then(_ => {
            this.$toasted.success(message, {
              duration: 3000,
              position: 'bottom-right'
            })
            closeModal()
          })
          .catch(_ => {
            this.$toasted.error('Blog cannot be published', {
              duration: 3000,
              position: 'bottom-right'
            })
            closeModal()
          })
      } else {
        this.$toasted.error(this.publishError, {
          duration: 3000,
          position: 'bottom-right'
        })
      }
    }
  }
}
</script>
