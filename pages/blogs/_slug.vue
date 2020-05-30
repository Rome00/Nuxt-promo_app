<template>
  <div class="blog-editor-container">
    <div class="container">
      <div class="blog-section-user card">
        <div class="columns">
          <div class="column is-one-quarter card-header">
            <user-tile
              class="card-header-title"
              :name="blog.author.name"
              :avatar="blog.author.avatar"
              :date="blog.createdAt"
            />
          </div>
          <div class="column card-content">
            <editor-view :init-content="blog.content" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import UserTile from '@/components/shared/UserTile'
import EditorView from '@/components/editor/components/EditorView'

export default {
  components: {
    UserTile,
    EditorView
  },
  async fetch({ store, params }) {
    await store.dispatch('blog/fetchBlogBySlug', params.slug)
  },
  computed: {
    ...mapState({
      blog: ({ blog }) => blog.item
    })
  }
}
</script>

<style lang="scss" scoped>
.blog-content,
.blog-section-user {
  margin: 10px auto;
  .columns {
    margin-left: 0;
    margin-right: 0;
  }
}
</style>
