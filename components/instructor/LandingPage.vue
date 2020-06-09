<template>
  <div class="card manage-card">
    <header class="card-header card-section">
      <p class="card-header-title">Course Landing Page</p>
    </header>
    <div class="card-content card-section">
      <form>
        <div class="field">
          <label class="label">Course title</label>
          <div class="control">
            <input
              class="input is-medium"
              type="text"
              placeholder="Dart and Flutter From Zero to Hero "
              :value="course.title"
              @input="$event => emitCourseValue($event, 'title')"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Course subtitle</label>
          <div class="control">
            <input
              class="input is-medium"
              type="text"
              placeholder="Build real mobile Application for Android and iOS."
              :value="course.subtitle"
              @input="$event => emitCourseValue($event, 'subtitle')"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Course description</label>
          <div class="control">
            <course-editor
              :init-content="course.description"
              @editorContent="
                content => emitCourseValue(content, 'description')
              "
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Category</label>
          <div class="select is-medium">
            <select
              :value="course.category._id"
              @change="$event => emitCourseValue($event, 'category')"
            >
              <option disabled value="">Select Category</option>
              <option
                v-for="category in categories"
                :key="category._id"
                :value="category._id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="field">
          <label class="label">Course Image</label>
          <div class="columns">
            <div v-show="course.image" class="column">
              <figure class="image is-4by2">
                <img :src="course.image" />
              </figure>
            </div>
            <div class="column centered">
              <div class="control">
                <input
                  class="input is-medium"
                  type="text"
                  placeholder="https://images.unsplash.com/photo-1498837167922-ddd27525d352"
                  :value="course.image"
                  @input="$event => emitCourseValue($event, 'image')"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label">Course Link</label>
          <div class="control">
            <input
              class="input is-medium"
              type="text"
              placeholder="https://www.udemy.com/vue-js-2-the-full-guide-by-real-apps-vuex-router-node"
              :value="course.productLink"
              @input="$event => emitCourseValue($event, 'productLink')"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Course Video Link</label>
          <div class="control">
            <input
              class="input is-medium"
              type="text"
              placeholder="https://www.youtube.com/watch?v=WQ9sCAhRh1M"
              :value="course.promoVideoLink"
              @input="$event => emitCourseValue($event, 'promoVideoLink')"
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import courseValue from '@/mixins/courseValueEmit'
import courseEditor from '@/components/editor/courseEditor'

export default {
  components: {
    courseEditor
  },
  mixins: [courseValue],
  computed: {
    categories() {
      return this.$store.state.instructor.categories.items
    }
  },
  methods: {
    emitCategory(categoryId) {
      const categoryFound = this.categories.find(cat => cat._id === categoryId)
      this.$emit('courseValueUpdated', {
        value: categoryFound,
        field: 'category'
      })
    }
  }
}
</script>
